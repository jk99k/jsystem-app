// ファイル: src/app/page.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// サンプルデータ（実際のアプリではAPIから取得）
const attendanceData = [
  {
    id: 1,
    prefecture: "京都府",
    nickname: "荷掛テスト",
    message: "今日もよろしくお願いします！",
    visits: 5,
  },
  {
    id: 2,
    prefecture: "京都府",
    nickname: "荷掛テスト",
    message: "久しぶりです！",
    visits: 5,
  },
  {
    id: 3,
    prefecture: "和歌山県",
    nickname: "アドベンチャーワールド",
    message: "楽しい時間を過ごせました",
    visits: 107,
  },
  {
    id: 4,
    prefecture: "沖縄県",
    nickname: "海ぶどう",
    message: "沖縄の味を思い出しました",
    visits: 107,
  },
  {
    id: 5,
    prefecture: "大阪府",
    nickname: "たこ焼き命",
    message: "大阪の味が恋しくなりました",
    visits: 107,
  },
  {
    id: 6,
    prefecture: "富山県",
    nickname: "氷見カレー",
    message: "富山の海の幸が美味しかったです",
    visits: 107,
  },
  {
    id: 7,
    prefecture: "京都府",
    nickname: "荷掛テスト",
    message: "また来ます！",
    visits: 5,
  },
  {
    id: 8,
    prefecture: "富山県",
    nickname: "黒部ダム",
    message: "黒部ダムの水のように澄んだお酒でした",
    visits: 107,
  },
  {
    id: 9,
    prefecture: "北海道",
    nickname: "いくら",
    message: "北海道の海の幸が恋しくなりました",
    visits: 107,
  },
  {
    id: 10,
    prefecture: "和歌山県",
    nickname: "ア",
    message: "和歌山の自然を感じました",
    visits: 107,
  },
];

const staffData = [
  {
    prefecture: "京都府",
    name: "乾　祐樹",
    nickname: "ぬい",
    message: "店長です！",
  },
  {
    prefecture: "京都府",
    name: "荷掛　聖也",
    nickname: "にか",
    message: "最近入りました！",
  },
  {
    prefecture: "京都府",
    name: "馬場 喜滉",
    nickname: "馬場ちゃん",
    message: "ワインソムリエ目指してます！",
  },
];

const currentDate = new Date();
const formattedDate = `${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('/img/background.png')] bg-cover bg-center bg-fixed relative font-serif">
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#162b42]/20">
                    <tr>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-1/5">
                        出身地
                      </th>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-2/5">
                        ニックネーム
                      </th>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-2/5">
                        一言
                      </th>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-1/4 whitespace-nowrap">
                        出席回数
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((person) => (
                      <tr
                        key={person.id}
                        className="bg-white/60 hover:bg-white/80 transition-colors duration-200"
                      >
                        <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20 font-medium">
                          {person.prefecture}
                        </td>
                        <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20">
                          {person.nickname}
                        </td>
                        <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20">
                          {person.message}
                        </td>
                        <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20 font-semibold">
                          {person.visits}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-1/5">
                        出身地
                      </th>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-1/5">
                        スタッフ名
                      </th>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-2/5">
                        ニックネーム
                      </th>
                      <th className="px-2 md:px-8 py-3 md:py-4 text-left text-sm md:text-base font-semibold text-[#162b42] border-b border-[#162b42]/30 w-1/5">
                        一言
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffData.map((staff, i) => (
                      <tr
                        key={i}
                        className="bg-white/80 hover:bg-white/80 transition-colors duration-200"
                      >
                        <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20 font-medium">
                          {staff.prefecture}
                        </td>
                        <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20 font-semibold">
                          {staff.name}
                        </td>
                        <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20">
                          {staff.nickname}
                        </td>
                        <td className="px-2 md:px-8 py-3 md:py-4 text-sm md:text-base text-[#162b42] border-b border-[#162b42]/20">
                          {staff.message}
                        </td>
                      </tr>
                    ))}
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

                <div className="p-4 md:p-8">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <span className="text-xl md:text-2xl">🍶</span>
                      <div>
                        <p className="text-base md:text-lg text-[#162b42] font-medium">
                          大阪の地酒「〇〇」入荷しました！
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <span className="text-xl md:text-2xl">🐟</span>
                      <div>
                        <p className="text-base md:text-lg text-[#162b42] font-medium">
                          本日限定「エイヒレ炙り」あります！
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
