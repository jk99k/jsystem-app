export default function Footer() {
  return (
    <footer className="border-t-2 border-[#162b42] shadow-lg bg-[#162b42] relative overflow-hidden min-h-[4rem] md:h-16">
      {/* 背景画像 */}
      <div className="absolute inset-0 bg-[url('/img/background.png')] bg-cover bg-center opacity-20"></div>
      {/* 上5%の黒いグラデーション */}
      <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black/60 to-transparent z-10"></div>

      <div className="w-full relative z-20 px-4 py-3 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 pt-2">
          <div className="text-sm text-amber-100 font-medium drop-shadow-xl text-center md:text-left">
            © 2025 百年蕎麦 壽. All rights reserved.
          </div>

          <div className="flex items-center gap-3 md:gap-4 text-white flex-wrap justify-center">
            <a
              href="https://linktr.ee/kotobuki_tachi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-amber-100 hover:text-amber-200 transition-colors duration-200 font-medium"
            >
              公式HP
            </a>
            <a
              href="https://www.instagram.com/kotobuki_tachi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-amber-100 hover:text-amber-200 transition-colors duration-200 font-medium"
            >
              Instagram
            </a>
            <a
              href="https://x.com/kotobuki_tachi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-amber-100 hover:text-amber-200 transition-colors duration-200 font-medium"
            >
              X（旧Twitter）
            </a>
            <a
              href="https://www.instagram.com/kotobuki_tachi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-amber-100 hover:text-amber-200 transition-colors duration-200 font-medium"
            >
              Facebook（準備中）
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
