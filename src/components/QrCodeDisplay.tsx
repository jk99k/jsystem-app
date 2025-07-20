"use client";
import QRCode from "react-qr-code";

export default function QrCodeDisplay({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 mt-4">
      <QRCode value={url} size={200} />
    </div>
  );
}
