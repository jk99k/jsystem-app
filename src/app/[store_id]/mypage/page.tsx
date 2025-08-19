"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getCustomerByToken,
  updateCustomerByToken,
  CustomerDetail,
} from "@/services/api/customers";
import { QUESTION_OPTIONS } from "@/constants/questionOptions";

const currentDate = new Date();
const formattedDate = `${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;

export default function MyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const storeId = params.store_id as string;
  const token = searchParams.get("token");

  const [customerData, setCustomerData] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<CustomerDetail>>({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  // 顧客情報取得
  useEffect(() => {
    if (!token) {
      setError("トークンが見つかりません");
      setLoading(false);
      return;
    }

    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const data = await getCustomerByToken(token);
        setCustomerData(data);
        setFormData(data);
        // 質問の回答をコンマ区切りから配列に変換
        if (data.question_answers) {
          setSelectedAnswers(
            data.question_answers.split(",").filter(answer => answer.trim())
          );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "顧客情報の取得に失敗しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [token]);

  // フォーム更新処理
  const handleUpdate = async () => {
    if (!token || !formData) return;

    try {
      setUpdateLoading(true);
      const updateData = {
        ...formData,
        question_answers_array: selectedAnswers,
      };
      await updateCustomerByToken(token, updateData);
      const updatedData = {
        ...formData,
        question_answers: selectedAnswers.join(","),
      } as CustomerDetail;
      setCustomerData(updatedData);
      setIsEditing(false);
      alert("情報を更新しました");
    } catch (err) {
      alert(err instanceof Error ? err.message : "更新に失敗しました");
    } finally {
      setUpdateLoading(false);
    }
  };

  // 質問回答の選択/解除処理
  const handleAnswerToggle = (answer: string) => {
    setSelectedAnswers(prev =>
      prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/img/background.png')] bg-cover bg-center bg-fixed relative font-serif">
        <div className="fixed inset-0 bg-[rgba(40,30,15,0.15)] pointer-events-none -z-10" />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header formattedDate={formattedDate} />
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <p className="ml-4 text-[#162b42]">読み込み中...</p>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[url('/img/background.png')] bg-cover bg-center bg-fixed relative font-serif">
        <div className="fixed inset-0 bg-[rgba(40,30,15,0.15)] pointer-events-none -z-10" />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header formattedDate={formattedDate} />
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 max-w-md w-full">
              <h2 className="text-xl font-bold text-red-600 mb-4">エラー</h2>
              <p className="text-[#162b42] mb-4">{error}</p>
              <button
                onClick={() => router.push(`/${storeId}/home`)}
                className="bg-[#162b42] text-white px-4 py-2 rounded hover:bg-[#1e3a5c] transition"
              >
                ホームに戻る
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/img/background.png')] bg-cover bg-center bg-fixed relative font-serif">
      <div className="fixed inset-0 bg-[rgba(40,30,15,0.15)] pointer-events-none -z-10" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header formattedDate={formattedDate} />

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-[#162b42]/30 overflow-hidden">
            <div className="bg-[#162b42] px-4 md:px-8 py-4">
              <h2 className="text-lg md:text-xl font-bold text-amber-100 text-center tracking-wide">
                マイページ
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {isEditing ? (
                // 編集モード
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      お名前
                    </label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={e =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      ふりがな
                    </label>
                    <input
                      type="text"
                      value={formData.furigana || ""}
                      onChange={e =>
                        setFormData({ ...formData, furigana: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      ニックネーム
                    </label>
                    <input
                      type="text"
                      value={formData.nickname || ""}
                      onChange={e =>
                        setFormData({ ...formData, nickname: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      value={formData.mail_address || ""}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          mail_address: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      性別
                    </label>
                    <select
                      value={formData.gender || ""}
                      onChange={e =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value="男">男</option>
                      <option value="女">女</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      出身地
                    </label>
                    <input
                      type="text"
                      value={formData.home_town || ""}
                      onChange={e =>
                        setFormData({ ...formData, home_town: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      郵便番号
                    </label>
                    <input
                      type="text"
                      value={formData.post_code || ""}
                      onChange={e =>
                        setFormData({ ...formData, post_code: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      住所
                    </label>
                    <input
                      type="text"
                      value={formData.address || ""}
                      onChange={e =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-1">
                      生年月日
                    </label>
                    <input
                      type="date"
                      value={formData.birth_date || ""}
                      onChange={e =>
                        setFormData({ ...formData, birth_date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-2">
                      質問への回答
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {QUESTION_OPTIONS.map(option => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAnswers.includes(option)}
                            onChange={() => handleAnswerToggle(option)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-[#162b42]">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleUpdate}
                      disabled={updateLoading}
                      className="flex-1 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition disabled:opacity-50"
                    >
                      {updateLoading ? "更新中..." : "更新"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(customerData || {});
                        // 質問の回答を元に戻す
                        if (customerData?.question_answers) {
                          setSelectedAnswers(
                            customerData.question_answers
                              .split(",")
                              .filter(answer => answer.trim())
                          );
                        } else {
                          setSelectedAnswers([]);
                        }
                      }}
                      className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                // 表示モード
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        お名前
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.name}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        ふりがな
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.furigana}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        ニックネーム
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.nickname}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        メールアドレス
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.mail_address}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        性別
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.gender}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        出身地
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.home_town}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        郵便番号
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.post_code || "-"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        住所
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.address}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#162b42] mb-1">
                        生年月日
                      </label>
                      <p className="text-[#162b42] bg-gray-50 p-2 rounded">
                        {customerData?.birth_date}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162b42] mb-2">
                      質問への回答
                    </label>
                    <div className="bg-gray-50 p-2 rounded">
                      {customerData?.question_answers ? (
                        <div className="flex flex-wrap gap-2">
                          {customerData.question_answers
                            .split(",")
                            .filter(answer => answer.trim())
                            .map((answer, index) => (
                              <span
                                key={index}
                                className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm"
                              >
                                {answer.trim()}
                              </span>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">-</p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => router.push(`/${storeId}/home`)}
                      className="flex-1 bg-[#162b42] text-white py-2 rounded hover:bg-[#1e3a5c] transition"
                    >
                      ホームに戻る
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
