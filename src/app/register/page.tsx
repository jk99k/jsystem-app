'use client';
import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    furigana: '',
    nickname: '',
    gender: '',
    birthplace: '',
    zipcode: '',
    address: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    email: '',
    expectations: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        expectations: [...prev.expectations, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        expectations: prev.expectations.filter((item) => item !== value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.expectations.length === 0) {
      alert('「百年蕎麦 壽」でどんな交流を期待しますか？を少なくとも1つ選んでください。');
      return;
    }

    try {
      const response = await fetch('/api/register/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('ご登録ありがとうございました！');
        // フォーム初期化
        setFormData({
          name: '',
          furigana: '',
          nickname: '',
          gender: '',
          birthplace: '',
          zipcode: '',
          address: '',
          birthYear: '',
          birthMonth: '',
          birthDay: '',
          email: '',
          expectations: [],
        });
      } else {
        const error = await response.text();
        alert(`送信に失敗しました: ${error}`);
      }
    } catch (err) {
      console.error(err);
      alert('通信エラーが発生しました');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#372f1e] bg-[url('/img/wood_texture.jpg')] bg-no-repeat bg-cover bg-fixed bg-center relative overflow-hidden">
      <div className="max-w-[600px] mx-auto p-5 bg-white/90 rounded-lg font-sans h-[99vh] box-border overflow-y-auto">
        <h1 className="text-2xl mb-2 text-center">百年蕎麦 壽 ご贔屓さん登録フォーム</h1>
        <p className="text-gray-700 text-sm mb-4 text-center">
          <span className="text-red-600 mr-1">*</span>は必須項目です
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { name: 'name', label: '名前（本名でお願いします）', placeholder: '例：壽 太郎' },
            { name: 'furigana', label: 'ふりがな（ひらがなでお願いします）', placeholder: '例：ことぶき たろう' },
            { name: 'nickname', label: 'ニックネーム（店員やお客様同士が呼び合う「あだ名」をどうぞ）', placeholder: '例：ぶっきー' }
          ].map(({ name, label, placeholder }) => (
            <label key={name} className="flex flex-col text-sm mb-2">
              <span><span className="text-red-600 mr-1">*</span>{label}</span>
              <input
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="mt-1 p-2 text-base border border-gray-400 rounded"
              />
            </label>
          ))}

          <label className="flex flex-col text-sm mb-2">
            <span><span className="text-red-600 mr-1">*</span>性別</span>
            <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 p-2 text-base border border-gray-400 rounded">
              <option value="">選択してください</option>
              <option value="男性">男性</option>
              <option value="女性">女性</option>
              <option value="その他">その他</option>
            </select>
          </label>

          <label className="flex flex-col text-sm mb-2">
            <span><span className="text-red-600 mr-1">*</span>出身地</span>
            <select name="birthplace" value={formData.birthplace} onChange={handleChange} required className="mt-1 p-2 text-base border border-gray-400 rounded">
              <option value="">選択してください</option>
              {["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"].map(pref => (
                <option key={pref} value={pref}>{pref}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm mb-2">
            <span>郵便番号</span>
            <input
              type="text"
              name="zipcode"
              maxLength={7}
              pattern="\d*"
              placeholder="例：6048066"
              value={formData.zipcode}
              onChange={async (e) => {
                const zip = e.target.value;
                setFormData({ ...formData, zipcode: zip });
                if (zip.length === 7) {
                  try {
                    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
                    const data = await res.json();
                    if (data.results && data.results.length > 0) {
                      const result = data.results[0];
                      const baseAddress = `${result.address1}${result.address2}${result.address3}`;
                      setFormData((prev) => ({ ...prev, address: baseAddress }));
                    } else {
                      alert('該当する住所が見つかりませんでした');
                    }
                  } catch {
                    alert('郵便番号検索に失敗しました');
                  }
                }
              }}
              className="mt-1 p-2 text-base border border-gray-400 rounded"
            />
          </label>

          <label className="flex flex-col text-sm mb-2">
            <span>住所</span>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="例：京都府京都市中京区御幸町通蛸薬師上ル伊勢屋町354−1"
              className="mt-1 p-2 text-base border border-gray-400 rounded"
            />
          </label>

          <label className="flex flex-col text-sm mb-2">
            <span><span className="text-red-600 mr-1">*</span>生年月日</span>
            <div className="flex gap-2 mt-1">
              <select name="birthYear" value={formData.birthYear} onChange={handleChange} required className="flex-1 p-2 text-base border border-gray-400 rounded">
                <option value="">年</option>
                {Array.from({ length: 120 }, (_, i) => {
                  const year = new Date().getFullYear() - (119 - i);
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
              <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required className="flex-1 p-2 text-base border border-gray-400 rounded">
                <option value="">月</option>
                {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </select>
              <select name="birthDay" value={formData.birthDay} onChange={handleChange} required className="flex-1 p-2 text-base border border-gray-400 rounded">
                <option value="">日</option>
                {[...Array(31)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </select>
            </div>
          </label>

          <label className="flex flex-col text-sm mb-2">
            <span><span className="text-red-600 mr-1">*</span>メールアドレス</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="例：kotobuki@example.com"
              className="mt-1 p-2 text-base border border-gray-400 rounded"
            />
          </label>

          <label className="flex flex-col text-sm mb-2">
            <span><span className="text-red-600 mr-1">*</span>「百年蕎麦 壽」でどんな交流を期待しますか？（複数選択可）</span>
            <div className="flex flex-col gap-1 mt-2 pl-1">
              {["一人で静かに飲む", "新しい飲み友をみつけたい", "スタッフと話したい"].map((text) => (
                <label key={text} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="expectations"
                    value={text}
                    checked={formData.expectations.includes(text)}
                    onChange={handleCheckboxChange}
                  />
                  {text}
                </label>
              ))}
            </div>
          </label>

          <button type="submit" className="p-3 text-lg bg-[#5c3b1e] text-white rounded-md hover:bg-[#7b512c] transition-colors duration-300">登録する</button>
        </form>
      </div>
    </div>
  );
}
