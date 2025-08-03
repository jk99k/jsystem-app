export const runtime = "edge";

import QrCodeDisplay from "@/components/QrCodeDisplay";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function RegisterComplete({ searchParams }: Props) {
  const params = await searchParams;
  const tempToken =
    typeof params.temp_token === "string" ? params.temp_token : undefined;
  const qrUrl = typeof params.qr_url === "string" ? params.qr_url : undefined;
  const qrValue = tempToken || qrUrl;

  return (
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 mx-auto p-8 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold text-amber-800 mb-2">
        ご登録ありがとうございました！
      </h1>
      {qrValue ? (
        <>
          <p className="text-lg text-[#162b42]">
            このQRコードをスクリーンショットして、
            <br />
            次回来店時にスタッフにご提示ください。
          </p>
          <div className="break-all text-xs text-gray-500 border rounded bg-white/70 px-2 py-1 mt-2">
            {qrValue}
          </div>
          <QrCodeDisplay url={qrValue} />
        </>
      ) : (
        <p className="text-lg text-[#162b42]">ご登録が完了しました。</p>
      )}
    </div>
  );
}
