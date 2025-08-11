"use client";

export const runtime = "edge";

import { useRouter } from "next/navigation";

export default function GohikiOkite() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[url('/img/background.png')] bg-cover bg-center bg-fixed relative font-serif flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white/90 rounded-lg shadow-xl p-8 space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-[#162b42] mb-4">
            【百年蕎麦 壽】ご贔屓さんの掟
          </h1>
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-[#162b42]">
              ご贔屓さんとは
            </h2>
            <p>
              壽を愛し、壽に愛される人。
              <br />
              店とお客様が互いに歩み寄り、支え合う存在です。
              <br />
              ただ通うだけの「常連」ではなく、壽と一緒にこの空気をつくる仲間です。
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-[#162b42]">
              ご贔屓さんになる条件
            </h2>
            <p>形式的条件：1か月の間に3回来店すること。</p>
            <p>本当の条件：下の掟を自然に守れる人。</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-[#162b42]">
              ご贔屓さんの掟
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <b>一、仲良く、ほどよく</b>
                <br />
                ご贔屓さん同士は笑顔で。相手の様子を見ながら距離感を保ち、偶然の出会いも楽しむべし。
              </li>
              <li>
                <b>二、ご贔屓さんは仲間、初めての人は未来のご贔屓さん</b>
                <br />
                席や順番を譲れば、縁が広がる。
              </li>
              <li>
                <b>三、長居はほどほどに</b>
                <br />
                混んできたら次の方へ場所を譲るのがご贔屓の粋。
              </li>
              <li>
                <b>四、厨房は狭い、心は広く</b>
                <br />
                混んできたら、皿運びや片付けもご贔屓さんの嗜み。
              </li>
              <li>
                <b>五、大人の空気を守るべし</b>
                <br />
                大声や騒ぎはご法度。学生ノリや過度なはしゃぎは禁止。
              </li>
              <li>
                <b>六、しつこさは禁物</b>
                <br />
                過度な絡みや空気を読まない行為は遠慮いただきます。
              </li>
              <li>
                <b>七、壽の夜は蕎麦と酒を主役に</b>
                <br />
                肴は会話と空気。静かに、ゆるやかに味わう時間を大切に。
              </li>
            </ol>
          </section>
          <div className="text-center mt-8">
            <button
              className="bg-[#162b42] text-white px-6 py-2 rounded hover:bg-[#1e3a5c] transition"
              onClick={() => router.back()}
            >
              戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
