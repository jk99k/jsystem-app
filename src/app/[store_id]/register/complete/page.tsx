export const runtime = "edge";

import QrCodeDisplay from "@/components/QrCodeDisplay";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ store_id: string }>;
};

export default async function RegisterComplete({
  searchParams,
  params,
}: Props) {
  const searchParamsData = await searchParams;
  const paramsData = await params;
  const storeId = paramsData.store_id;
  const tempToken =
    typeof searchParamsData.temp_token === "string"
      ? searchParamsData.temp_token
      : undefined;
  const qrUrl =
    typeof searchParamsData.qr_url === "string"
      ? searchParamsData.qr_url
      : undefined;
  const token =
    typeof searchParamsData.token === "string"
      ? searchParamsData.token
      : undefined;
  const qrValue = tempToken || qrUrl || token;

  return (
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 mx-auto p-8 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold text-amber-800 mb-2">
        ご登録ありがとうございました！
      </h1>
      {(tempToken || qrUrl) ? (
        <>
          <p className="text-lg text-[#162b42]">
            このQRコードをスクリーンショットして、
            <br />
            次回来店時にスタッフにご提示ください。
          </p>
          <div className="break-all text-xs text-gray-500 border rounded bg-white/70 px-2 py-1 mt-2">
            {tempToken || qrUrl}
          </div>
          <QrCodeDisplay url={tempToken || qrUrl || ""} />
        </>
      ) : (
        <p className="text-lg text-[#162b42]">ご登録が完了しました。</p>
      )}

      <div className="flex flex-col space-y-4 mt-8 w-full">
        <Link
          href={`/${storeId}/home`}
          className="bg-[#162b42] text-white text-center py-3 px-6 rounded-lg hover:bg-[#1e3a5c] transition-colors"
        >
          出席状況を確認する
        </Link>

        {qrValue && (
          <Link
            href={`/${storeId}/mypage?token=${encodeURIComponent(qrValue)}`}
            className="bg-amber-600 text-white text-center py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors"
          >
            マイページで情報を確認・編集
          </Link>
        )}
      </div>
    </div>
  );
}
