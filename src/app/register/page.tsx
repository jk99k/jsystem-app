'use client';
import React, { useState } from 'react';
import styles from './register.module.css';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.expectations.length === 0) {
      alert('「百年蕎麦 壽」でどんな交流を期待しますか？を少なくとも1つ選んでください。');
      return;
    }

    console.log('登録データ:', formData);
    // バリデーションやAPI送信など
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>百年蕎麦 壽 ご贔屓さん登録フォーム</h1>
      <p className={styles.note}>
        <span className={styles.required}>*</span>は必須項目です
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <span>
            <span className={styles.required}>*</span>名前（本名でお願いします）
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="例：壽 太郎"
          />
        </label>

        <label className={styles.label}>
          <span>
            <span className={styles.required}>*</span>ふりがな（ひらがなでお願いします）
          </span>
          <input
            type="text"
            name="furigana"
            value={formData.furigana}
            onChange={handleChange}
            required
            placeholder="例：ことぶき たろう"
          />
        </label>

        <label className={styles.label}>
          <span>
            <span className={styles.required}>*</span>ニックネーム（店員やお客様同士が呼び合う「あだ名」をどうぞ）
          </span>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            placeholder="例：ぶっきー"
          />
        </label>

        <label className={styles.label}>
          <span>
            <span className={styles.required}>*</span>性別
          </span>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">選択してください</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
          </select>
        </label>

        <label className={styles.label}>
          <span>
            <span className={styles.required}>*</span>出身地
          </span>
          <select name="birthplace" value={formData.birthplace} onChange={handleChange} required>
            <option value="">選択してください</option>
            {[
              "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
              "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
              "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
              "岐阜県", "静岡県", "愛知県", "三重県",
              "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
              "鳥取県", "島根県", "岡山県", "広島県", "山口県",
              "徳島県", "香川県", "愛媛県", "高知県",
              "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
            ].map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          <span>郵便番号（入力必須ではありませんが、なにかお送りするかもしれません。）</span>
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
                    setFormData((prev) => ({
                      ...prev,
                      address: baseAddress,
                    }));
                  } else {
                    alert('該当する住所が見つかりませんでした');
                  }
                } catch (err) {
                  alert('郵便番号検索に失敗しました');
                }
              }
            }}
          />
        </label>

        <label className={styles.label}>
          <span>住所（正確な住所を入力してください）</span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="例：京都府京都市中京区御幸町通蛸薬師上ル伊勢屋町354−1"
          />
        </label>

        <label className={styles.label}>
          <span>
            <span className={styles.required}>*</span>生年月日
          </span>
          <div className={styles.birthdate}>
            <select name="birthYear" value={formData.birthYear} onChange={handleChange} required>
              <option value="">年</option>
              {Array.from({ length: 120 }, (_, i) => {
                const year = new Date().getFullYear() - (119 - i);
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
            <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required>
              <option value="">月</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select name="birthDay" value={formData.birthDay} onChange={handleChange} required>
              <option value="">日</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </label>

        <label className={styles.label}>
          <span>
            <span className={styles.required}>*</span>メールアドレス
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="例：kotobuki@example.com"
          />
        </label>

        <label className={styles.label}>
          <span>
            <span className={styles.required}>*</span>「百年蕎麦 壽」でどんな交流を期待しますか？（複数選択可）
          </span>
          <div className={styles.checkboxGroup}>
            {[
              "静かに一人で蕎麦と酒を楽しみたい",
              "同じ趣味・話題を持つ人と話したい",
              "新しい飲み友を見つけたい",
              "スタッフと色々な話がしたい",
              "特に何も期待しない／流れに任せる"
            ].map((text) => (
              <label key={text}>
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
        {/* 登録ボタン押下後にDB登録処理や登録完了画面、登録完了メール送信処理も必要？ */}
        <button type="submit" className={styles.button}>登録する</button>
      </form>
    </div>
  );
}
