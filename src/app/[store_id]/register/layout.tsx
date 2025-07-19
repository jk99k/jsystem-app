import Footer from "@/components/Footer";
import React from "react";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[url('/img/background.png')] bg-cover bg-center bg-fixed relative">
      {/* 背景オーバーレイ */}
      <div className="fixed inset-0 bg-[rgba(40,30,15,0.2)] pointer-events-none -z-10"></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
      <Footer />
    </div>
  );
} 