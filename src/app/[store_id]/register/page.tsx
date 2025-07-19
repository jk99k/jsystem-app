"use client";
import React, { useState } from "react";
import { registerCustomer } from "@/services/api/customers";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import type { CustomerBase } from "@/services/api/customers";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    furigana: "",
    nickname: "",
    gender: "",
    birthplace: "",
    zipcode: "",
    address: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    email: "",
    expectations: [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        expectations: [...prev.expectations, value],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        expectations: prev.expectations.filter(item => item !== value),
      }));
    }
  };

  const params = useParams();
  const storeId = params?.store_id as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = searchParams.get("token");
    const payload: Omit<CustomerBase, 'question_answers'> & { question_answers?: string[], token?: string } = {
      name: formData.name,
      furigana: formData.furigana,
      nickname: formData.nickname,
      mail_address: formData.email,
      gender: formData.gender,
      home_town: formData.birthplace,
      post_code: formData.zipcode || undefined,
      address: formData.address,
      birth_date: `${formData.birthYear}-${String(formData.birthMonth).padStart(2, "0")}-${String(formData.birthDay).padStart(2, "0")}`,
      question_answers: formData.expectations,
      ...(token ? { token } : {}),
    };
    try {
      const result = await registerCustomer(storeId, payload);
      const qrUrl = typeof result.qr_url === "string" ? result.qr_url : "";
      router.push(`/${storeId}/register/complete${qrUrl ? `?qr_url=${encodeURIComponent(qrUrl)}` : ""}`);
    } catch {
      alert("登録に失敗しました");
    }
  };

  const prefectures = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ];

  const expectationOptions = [
    "静かに一人で蕎麦と酒を楽しみたい",
    "同じ趣味・話題を持つ人と話したい",
    "新しい飲み友を見つけたい",
    "スタッフと色々な話がしたい",
    "特に何も期待しない／流れに任せる",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - (119 - i));
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 mx-auto">
      <div className="p-6">
        {/* ヘッダー */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            百年蕎麦 壽 ご贔屓さん登録フォーム
          </h1>
          <p className="text-sm text-gray-600">
            <span className="text-red-500 mr-1">*</span>は必須項目です
          </p>
        </header>
        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本情報セクション */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
              基本情報
            </h2>
            {/* 名前 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>
                名前（本名でお願いします）
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="例：壽 太郎"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            {/* ふりがな */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>
                ふりがな（ひらがなでお願いします）
              </label>
              <input
                type="text"
                name="furigana"
                value={formData.furigana}
                onChange={handleChange}
                required
                placeholder="例：ことぶき たろう"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            {/* ニックネーム */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>
                ニックネーム（店員やお客様同士が呼び合う「あだ名」をどうぞ）
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                required
                placeholder="例：ぶっきー"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            {/* 性別・出身地 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>性別
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">選択してください</option>
                  <option value="男性">男性</option>
                  <option value="女性">女性</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>出身地
                </label>
                <select
                  name="birthplace"
                  value={formData.birthplace}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">選択してください</option>
                  {prefectures.map(pref => (
                    <option key={pref} value={pref}>
                      {pref}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
          {/* 住所情報セクション */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
              住所情報
            </h2>
            {/* 郵便番号 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                郵便番号（入力必須ではありませんが、なにかお送りするかもしれません。）
              </label>
              <input
                type="text"
                name="zipcode"
                maxLength={7}
                pattern="\d*"
                placeholder="例：6048066"
                value={formData.zipcode}
                onChange={async e => {
                  const zip = e.target.value;
                  setFormData({ ...formData, zipcode: zip });
                  if (zip.length === 7) {
                    try {
                      const res = await fetch(
                        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`
                      );
                      const data = await res.json();
                      if (data.results && data.results.length > 0) {
                        const result = data.results[0];
                        const baseAddress = `${result.address1}${result.address2}${result.address3}`;
                        setFormData(prev => ({
                          ...prev,
                          address: baseAddress,
                        }));
                      } else {
                        alert("該当する住所が見つかりませんでした");
                      }
                    } catch {
                      alert("郵便番号検索に失敗しました");
                    }
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            {/* 住所 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                住所（正確な住所を入力してください）
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="例：京都府京都市中京区御幸町通蛸薬師上ル伊勢屋町354−1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </section>
          {/* 個人情報セクション */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
              個人情報
            </h2>
            {/* 生年月日 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>生年月日
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">年</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">月</option>
                  {months.map(month => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">日</option>
                  {days.map(day => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* メールアドレス */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>メールアドレス
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="例：kotobuki@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </section>
          {/* 期待事項セクション */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
              期待事項
            </h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                「百年蕎麦
                壽」でどんな交流を期待しますか？（複数選択可）
              </label>
              <div className="space-y-3 pl-2">
                {expectationOptions.map(text => (
                  <label
                    key={text}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="expectations"
                      value={text}
                      checked={formData.expectations.includes(text)}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-700">{text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
          {/* 送信ボタン */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-amber-800 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
            >
              登録する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
