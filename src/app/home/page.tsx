// pages/index.tsx または pages/index.js
import Image from "next/image";

// JSONデータの型定義(任意)
type FavoredCustomer = {
  home_town: string;
  nickname: string;
  comment: string;
  attendance: number;
  tags: string[];
};

type Staff = {
  origin: string;
  name: string;
  nickname: string;
  comment: string;
};

type ShopData = {
  favoredCustomers: FavoredCustomer[];
  staffs: Staff[];
  shopComments: string[];
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-[#372f1e] bg-[url('/img/wood_texture.jpg')] bg-no-repeat bg-cover bg-fixed bg-center relative overflow-hidden">
      <div className="fixed inset-0 bg-[rgba(40,30,15,0.2)] pointer-events-none -z-10"></div>

      {/* ヘッダー */}
      <header className="px-4 py-2 bg-[rgba(50,38,18,0.85)] border-b-4 border-[#2b220f] shadow-[inset_0_-4px_8px_rgba(0,0,0,0.6)] shrink-0">
        <div className="flex items-center gap-3">
          <Image
            src="/img/kotobuki_logo.jpg"
            alt="百年蕎麦 壽 ロゴ"
            width={64}
            height={64}
            className="rounded-full object-contain"
          />
          <h1 className="text-lg sm:text-2xl text-[#d4c8ad] tracking-[2px] font-serif drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
            百年蕎麦 壽　7月10日　ご贔屓さん出席状況
          </h1>
        </div>
      </header>

      {/* メイン */}
      <main className="flex-1 overflow-y-auto px-4 py-3 text-[#3a2f1b]">
        {/* ご贔屓さんテーブル */}
        <div className="max-h-[70vh] overflow-x-auto mb-5 border-2 border-[#3f3520] bg-[rgba(255,255,240,0.6)] rounded">
          <table className="w-full border-collapse bg-[rgba(255,255,240,0.4)] border-4 border-[#3f3520] text-sm sm:text-[1.05rem] font-mono tracking-wider">
            <thead>
              <tr className="bg-[rgba(220,200,160,0.7)] text-[#2a2108] font-bold uppercase tracking-wide">
                <th className="px-2 py-1 sm:px-4 sm:py-2 border-4 border-[#3f3520]">出身地</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border-4 border-[#3f3520]">
                  <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-1 text-center w-full">
                    <span>ニックネーム</span>
                    <span className="bg-yellow-200 text-yellow-900 text-[0.6rem] px-1.5 py-0.5 rounded-full shadow-inner whitespace-nowrap">
                      楽しみ方
                    </span>
                  </div>
                </th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border-4 border-[#3f3520]">一言</th>
                {/* 幅のレスポンシブ対応 */}
                <th className="border-4 border-[#3f3520] px-1 py-1 sm:px-3 sm:py-2 
                   sm:w-auto  text-center">
                  出席回数
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 1 ? 'bg-[rgba(255,255,240,0.5)]' : ''} hover:bg-[rgba(255,255,200,0.2)]`}
                >
                  {["京都府", "荷掛テスト", "海に行きたい", "5"].map((text, j) => {
                    if (j === 1) {
                      // ニックネーム（左寄せ）
                      return (
                        <td
                          key={j}
                          className="px-2 py-1 sm:px-4 sm:py-2 border-4 border-[#3f3520] text-left bg-[rgba(255,255,240,0.65)] font-semibold text-[#1e1406]"
                        >
                          <div className="flex flex-wrap sm:flex-nowrap justify-start items-center gap-1 w-full text-left">
                            <span>{text}</span>
                            {["一人飲み", "飲み友探し", "スタッフと会話"].map((tag, idx) => {
                              const tagColor = {
                                "一人飲み": "bg-red-200 text-red-900",
                                "飲み友探し": "bg-blue-200 text-blue-900",
                                "スタッフと会話": "bg-green-200 text-green-900",
                              }[tag] || "bg-gray-200 text-gray-800";
                              return (
                                <span
                                  key={idx}
                                  className={`${tagColor} text-xs px-1.5 py-0.5 rounded-full shadow-inner whitespace-nowrap`}
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                      );
                    }
                    if (j === 2) {
                      // 一言（左寄せ）
                      return (
                        <td
                          key={j}
                          className="px-2 py-1 sm:px-4 sm:py-2 border-4 border-[#3f3520] text-left bg-[rgba(255,255,240,0.65)] font-semibold text-[#1e1406]"
                        >
                          {text}
                        </td>
                      );
                    }
                    return (
                      <td
                        key={j}
                        className={`${
                          j === 3
                            ? 'w-[28px] min-w-[28px] sm:w-auto sm:min-w-[64px] px-1 sm:px-3'
                            : 'px-2 sm:px-4'
                        } py-1 sm:py-2 border-4 border-[#3f3520] text-center bg-[rgba(255,255,240,0.65)] font-semibold text-[#1e1406]`}
                      >
                        {text}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* 出勤スタッフと一言 */}
      <section className="flex flex-col sm:flex-row gap-4 p-4 bg-[rgba(255,255,255,0.4)] text-sm text-[#333] border-t border-[#ccc]">
        {/* 出勤スタッフ */}
        <div className="flex-1 w-full sm:w-auto">
          <h2 className="text-base mb-2 text-[#2d1d0f] border-l-4 border-[#8b5c2c] pl-2">
            本日の出勤スタッフ
          </h2>
          <div className="overflow-x-auto border border-[#3f3520] bg-[rgba(255,255,240,0.6)] rounded">
            <table className="w-full border-collapse text-sm sm:text-[1.05rem] font-mono tracking-wider border border-[#3f3520]">
              <thead>
                <tr className="bg-[rgba(220,200,160,0.7)] text-[#2a2108] font-bold uppercase tracking-wider">
                  <th className="px-2 py-1 border border-[#3f3520]">出身地</th>
                  <th className="px-2 py-1 border border-[#3f3520]">スタッフ名</th>
                  <th className="px-2 py-1 border border-[#3f3520] text-left">ニックネーム</th>
                  <th className="px-2 py-1 border border-[#3f3520] text-left">一言</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["京都府", "乾 祐樹", "ぬい", "店長です！"],
                  ["京都府", "馬場 喜滉", "馬場ちゃん", "ワインソムリエ目指してます！"],
                  ["京都府", "荷掛 聖也", "にか", "最近入りました！"]
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${idx % 2 === 1 ? 'bg-[rgba(255,255,240,0.5)]' : ''} hover:bg-[rgba(255,255,200,0.2)]`}
                  >
                    {row.map((text, i) => (
                      <td
                        key={i}
                        className={`px-2 py-1 border border-[#3f3520] bg-[rgba(255,255,240,0.65)] font-semibold text-[#1e1406] shadow-sm ${
                          (i === 2 || i === 3) ? "text-left" : "text-center"
                        }`}
                      >
                        {text}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* お店からの一言 */}
        <div className="flex-1 w-full sm:w-auto">
          <h2 className="text-base mb-2 text-[#2d1d0f] border-l-4 border-[#8b5c2c] pl-2">
            お店からの一言
          </h2>
          <div className="bg-[rgba(255,250,240,0.85)] border border-[#8b5c2c] p-4 rounded text-[0.95rem] leading-relaxed text-[#3a2a1c]">
            🍶 大阪の地酒「〇〇」入荷しました！<br />
            🐟 本日限定「エイヒレ炙り」あります！
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="px-4 py-4 bg-[rgba(50,38,18,0.85)] border-t-4 border-[#2b220f] text-center text-sm sm:text-base font-mono text-[#d1c7a1] tracking-widest shadow-[inset_0_2px_5px_rgba(255,255,255,0.1)]">
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://linktr.ee/kotobuki_tachi" target="_blank" className="hover:underline hover:text-[#f0e9c7]">公式HP</a>
          <a href="https://www.instagram.com/kotobuki_tachi/" target="_blank" className="hover:underline hover:text-[#f0e9c7]">Instagram</a>
          <a href="https://x.com/kotobuki_tachi" target="_blank" className="hover:underline hover:text-[#f0e9c7]">X（旧Twitter）</a>
          <a href="https://www.instagram.com/kotobuki_tachi/" target="_blank" className="hover:underline hover:text-[#f0e9c7]">Facebook（準備中）</a>
        </div>
      </footer>
    </div>
  );
}
