"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { loginByToken, checkInCustomer, checkOutCustomer, getActiveCustomers } from "@/services/api/customers";

const AUTH_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://jishikawasys.com"
    : "http://localhost:3005";

interface Customer {
  id: number;
  store_id: number;
  token?: string | null;
  token_issued_at?: string | null;
  name?: string;
  email?: string;
  phone?: string;
  is_attended?: boolean;
  is_paid?: boolean;
}

export default function EntryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const storeId = params?.store_id as string;
  const [isStaff, setIsStaff] = useState<boolean | null>(null);
  const [customerChecked, setCustomerChecked] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showStaffOperations, setShowStaffOperations] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isCustomerActive, setIsCustomerActive] = useState<boolean>(false);

  // 1. まずcustomer存在チェック
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      router.replace(`/${storeId}/register`);
      return;
    }
    loginByToken(storeId, token)
      .then(customerData => {
        if (!customerData) {
          router.replace(`/${storeId}/register?token=${token}`);
        } else {
          setCustomer(customerData);
          setCustomerChecked(true);
        }
      })
      .catch(() => {
        router.replace(`/${storeId}/register?token=${token}`);
      });
  }, [router, searchParams, storeId]);

  // 2. customerが存在した場合のみauth-check
  useEffect(() => {
    if (!customerChecked) return;
    const token = searchParams.get("token");
    const iframe: HTMLIFrameElement = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = `${AUTH_ORIGIN}/auth-check`;
    document.body.appendChild(iframe);
    const handler = (event: MessageEvent) => {
      if (event.origin !== AUTH_ORIGIN) return;
      if (event.data === "auth_ok") setIsStaff(true);
      if (event.data === "auth_ng") {
        setIsStaff(false);
        // 3. auth_ngならhome画面にリダイレクト
        router.replace(`/${storeId}/home?token=${token}`);
      }
    };
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
      document.body.removeChild(iframe);
    };
  }, [customerChecked, router, storeId]);

  // 3. スタッフ操作画面が開かれた時に出席状況をチェック
  useEffect(() => {
    if (!showStaffOperations || !customer) return;
    
    const checkActiveStatus = async () => {
      try {
        const activeCustomers = await getActiveCustomers(storeId);
        const isActive = activeCustomers.some(attendance => attendance.customer_id === customer.id);
        setIsCustomerActive(isActive);
      } catch (err) {
        console.error('出席状況の取得に失敗しました:', err);
        setIsCustomerActive(false);
      }
    };

    checkActiveStatus();
  }, [showStaffOperations, customer, storeId]);

  // 出席処理（入店処理）
  const handleAttend = async () => {
    if (!customer) return;

    try {
      setActionLoading(true);
      setMessage(null);
      
      await checkInCustomer(storeId, customer.id);
      setMessage("入店処理が完了しました");
      // 出席状況を更新
      setIsCustomerActive(true);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setActionLoading(false);
    }
  };

  // 退店処理
  const handleCheckOut = async () => {
    if (!customer) return;

    try {
      setActionLoading(true);
      setMessage(null);
      
      await checkOutCustomer(storeId, customer.id);
      setMessage("退店処理が完了しました");
      // 出席状況を更新
      setIsCustomerActive(false);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setActionLoading(false);
    }
  };

  // まだcustomerチェック中
  if (!customerChecked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/img/background.png')] bg-cover bg-center bg-fixed">
        <div className="bg-white/90 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-700 mx-auto mb-4" />
          <p className="text-lg font-semibold text-[#162b42]">お客様情報確認中…</p>
        </div>
      </div>
    );
  }

  // スタッフ認証中
  if (isStaff === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/img/background.png')] bg-cover bg-center bg-fixed">
        <div className="bg-white/90 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-700 mx-auto mb-4" />
          <p className="text-lg font-semibold text-[#162b42]">スタッフ認証確認中…</p>
        </div>
      </div>
    );
  }

  // スタッフ認証成功時の画面
  if (isStaff) {
    if (!showStaffOperations) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/img/background.png')] bg-cover bg-center bg-fixed">
          <div className="bg-white/90 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
            <p className="text-2xl font-bold text-amber-800 mb-4">スタッフ認証済み</p>
            <p className="text-[#162b42] mb-6">顧客操作画面に移動しますか？</p>
            <button
              onClick={() => setShowStaffOperations(true)}
              className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700"
            >
              顧客操作画面を開く
            </button>
          </div>
        </div>
      );
    }

    // スタッフ操作画面
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-6 mb-6">
              <h1 className="text-3xl font-bold text-amber-800 mb-2">スタッフ操作画面</h1>
              <p className="text-[#162b42]">店舗ID: {storeId}</p>
            </div>

            {customer && (
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-6 mb-6">
                <h2 className="text-2xl font-bold text-amber-800 mb-4">顧客情報</h2>
                <div className="space-y-2 text-[#162b42]">
                  <p><strong>顧客ID:</strong> {customer.id}</p>
                  <p><strong>店舗ID:</strong> {customer.store_id}</p>
                  {customer.name && <p><strong>名前:</strong> {customer.name}</p>}
                  {customer.email && <p><strong>メール:</strong> {customer.email}</p>}
                  {customer.phone && <p><strong>電話番号:</strong> {customer.phone}</p>}
                  <p><strong>出席状況:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      isCustomerActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isCustomerActive ? '出席中' : '未出席'}
                    </span>
                  </p>

                </div>
              </div>
            )}

            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">顧客操作</h2>
              
              {message && (
                <div className={`p-3 rounded-md mb-4 ${
                  message.includes('完了') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {message}
                </div>
              )}

              <div className="flex gap-4">
                {!isCustomerActive && (
                  <button
                    onClick={handleAttend}
                    disabled={actionLoading}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    入店処理
                  </button>
                )}
                {isCustomerActive && (
                  <button
                    onClick={handleCheckOut}
                    disabled={actionLoading}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    退店処理
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 顧客フローのUI（customerが存在し、スタッフ認証も未認証の場合）
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/img/background.png')] bg-cover bg-center bg-fixed">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <p className="text-2xl font-bold text-amber-800 mb-2">ようこそ！</p>
        <p className="text-[#162b42]">ご来店ありがとうございます。<br />入店記録が作成されました。</p>
      </div>
    </div>
  );
} 