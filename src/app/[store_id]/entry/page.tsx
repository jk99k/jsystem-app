"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EntryPage() {
  const router = useRouter();
  // const params = useParams();
  // const storeId = params?.store_id || ""; // 今後の拡張用
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "expired" | "notfound">("loading");

  useEffect(() => {
    const token = searchParams.get("token");
    // トークンがない場合は仮会員登録ページへリダイレクト
    if (!token) {
      router.replace("/register?temp=1");
      return;
    }
    // モックAPI: トークンの有効性をチェック
    setStatus("loading");
    setTimeout(() => {
      // ここで本来はAPI通信
      if (token === "expired") {
        setStatus("expired");
      } else if (token === "notfound") {
        setStatus("notfound");
      } else {
        setStatus("success");
      }
    }, 1200);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/img/background.png')] bg-cover bg-center bg-fixed">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-700 mx-auto mb-4" />
            <p className="text-lg font-semibold text-[#162b42]">確認中…</p>
          </>
        )}
        {status === "success" && (
          <>
            <p className="text-2xl font-bold text-amber-800 mb-2">ようこそ！</p>
            <p className="text-[#162b42]">ご来店ありがとうございます。<br />入店記録が作成されました。</p>
          </>
        )}
        {status === "expired" && (
          <>
            <p className="text-xl font-bold text-red-700 mb-2">有効期限切れ</p>
            <p className="text-[#162b42]">QRコードの有効期限が切れています。<br />スタッフに再発行をお申し付けください。</p>
          </>
        )}
        {status === "notfound" && (
          <>
            <p className="text-xl font-bold text-red-700 mb-2">QRコードが無効です</p>
            <p className="text-[#162b42]">このQRコードは登録されていません。<br />新規登録をお願いします。</p>
            <button
              className="mt-4 px-6 py-2 bg-amber-800 text-white rounded hover:bg-amber-700"
              onClick={() => router.replace("/register?temp=1")}
            >
              新規登録へ
            </button>
          </>
        )}
      </div>
    </div>
  );
} 