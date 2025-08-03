"use client";

export const runtime = "edge";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getActiveCustomers,
  CustomerAttendance,
  updateCustomerComment,
  getActiveStaff,
  ActiveStaff,
} from "@/services/api/customers";
import CommentModal from "../../../components/CommentModal";

const currentDate = new Date();
const formattedDate = `${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;

export default function Home() {
  // スタッフ一覧の状態
  const [activeStaff, setActiveStaff] = useState<ActiveStaff[]>([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const storeId = params.store_id as string;
  const [activeCustomers, setActiveCustomers] = useState<CustomerAttendance[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentTargetId, setCommentTargetId] = useState<number | null>(null);

  // 出勤中スタッフ一覧取得
  useEffect(() => {
    const fetchActiveStaff = async () => {
      try {
        const staff = await getActiveStaff(storeId);
        setActiveStaff(staff);
      } catch (err) {
        // スタッフ取得エラーはエラー表示しない（顧客と独立）
        console.error("出勤中スタッフの取得エラー:", err);
      }
    };
    fetchActiveStaff();
  }, [storeId]);

  // 出席中の顧客一覧を取得
  useEffect(() => {
    const fetchActiveCustomers = async () => {
      try {
        setLoading(true);
        const customers = await getActiveCustomers(storeId);
        setActiveCustomers(customers);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "出席中顧客の取得に失敗しました"
        );
        console.error("出席中顧客の取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveCustomers();
  }, [storeId]);

  // tokenがクエリに存在する場合、該当顧客のモーダルを表示
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;
    // 出席中顧客一覧からtoken一致する顧客を探す
    const target = activeCustomers.find(c => c.customer.token === token);
    if (target) {
      setCommentTargetId(target.customer.id);
      setShowCommentModal(true);
    }
  }, [searchParams, activeCustomers]);

  // コメント送信処理
  const handleCommentSubmit = async (comment: string) => {
    if (!commentTargetId) return;
    await updateCustomerComment(commentTargetId, comment);
    router.replace(`/${storeId}/home`);
    setShowCommentModal(false);
  };

  return (
    <div className="min-h-screen bg-[url('/img/background.png')] bg-cover bg-center bg-fixed relative font-serif">
      <CommentModal
        open={showCommentModal}
        onClose={() => {
          setShowCommentModal(false);
          router.replace(`/${storeId}/home`);
        }}
        onSubmit={handleCommentSubmit}
      />
      {/* 背景オーバーレイ */}
      <div className="fixed inset-0 bg-[rgba(40,30,15,0.15)] pointer-events-none -z-10" />
      {/* メインコンテナ */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ヘッダー */}
        <Header formattedDate={formattedDate} />

        {/* メインコンテンツ */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl px-4 space-y-10">
            {/* ご贔屓さん出席状況テーブル */}
            <section className="bg-white/90 backdrop-blur-sm shadow-xl border border-[#162b42]/30 overflow-hidden">
              <div className="bg-[#162b42] px-4 md:px-8 py-4">
                <h2 className="text-lg md:text-xl font-bold text-amber-100 text-center tracking-wide">
                  現在出席中のご贔屓さん
                </h2>
              </div>

              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
                  <p className="text-[#162b42]">読み込み中...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
                  >
                    再試行
                  </button>
                </div>
              ) : activeCustomers.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-[#162b42] text-lg">
                    現在出席中のご贔屓さんはいません
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#162b42]/20">
                      <tr>
                        <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30">
                          出身地
                        </th>
                        <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30">
                          ニックネーム
                        </th>
                        <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30">
                          コメント
                        </th>
                        <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30">
                          来店回数
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeCustomers.map(customer => (
                        <tr
                          key={customer.id}
                          className="bg-white/60 hover:bg-white/80 transition-colors duration-200"
                        >
                          <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20 font-medium">
                            {customer.customer.home_town}
                          </td>
                          <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20">
                            {customer.customer.nickname}
                          </td>
                          <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20">
                            {customer.customer.comment || "-"}
                          </td>
                          <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20 font-semibold">
                            {customer.customer.visit_count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* 本日のスタッフテーブル */}
            <section className="bg-white/80 backdrop-blur-sm shadow-xl border border-[#162b42]/30 overflow-hidden">
              <div className="bg-[#162b42] px-4 md:px-8 py-4">
                <h2 className="text-lg md:text-xl font-bold text-amber-100 text-center tracking-wide">
                  本日のスタッフ
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#162b42]/20">
                    <tr>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-1/2">
                        ニックネーム
                      </th>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-1/2">
                        一言
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeStaff.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="text-center py-4">
                          出勤中のスタッフはいません
                        </td>
                      </tr>
                    ) : (
                      activeStaff.map((staff, i) => (
                        <tr
                          key={i}
                          className="bg-white/80 hover:bg-white/80 transition-colors duration-200"
                        >
                          <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20 font-semibold">
                            {staff.nickname || "名無し"}
                          </td>
                          <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20">
                            {staff.comment || ""}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* お店からの一言 */}
            <section className="relative shadow-xl border border-[#162b42]/30 overflow-hidden">
              <div className="absolute inset-0 bg-white/80 z-0 border border-[#162b42]/30" />
              <div className="relative z-10">
                <div className="bg-[#162b42] px-4 md:px-8 py-4">
                  <h2 className="text-lg md:text-xl font-bold text-amber-100 text-center tracking-wide">
                    お店からの一言
                  </h2>
                </div>

                <div className="p-4 md:p-8">本日プレオープン🍶</div>
              </div>
            </section>
          </div>
        </main>

        {/* フッター */}
        <Footer />
      </div>
    </div>
  );
}
