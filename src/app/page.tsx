// ファイル: src/app/page.tsx

import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <header className="header">
        <div className="header-content">
          <Image
            src="/img/kotobuki_logo.jpg"
            alt="百年蕎麦 壽 ロゴ"
            width={80}
            height={80}
            className="logo"
          />
          {/* 日付は当日の日付を取得させる */} 
          <h1>百年蕎麦 壽　7月10日　ご贔屓さん出席状況</h1>
        </div>
      </header>
      {/* QRコードを読み込んだご贔屓さんの会員情報をDBから取得してループ表示 */}
      <main>
        <div className="table-scroll-area">
          <table>
            <thead>
              <tr>
                <th>出身地</th>
                <th>ニックネーム</th>
                <th>入り時間</th>
                <th>出席回数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>京都府</td>
                <td>荷掛テスト</td>
                <td>13:25</td>
                <td>5</td>
              </tr>
              <tr>
                <td>京都府</td>
                <td>荷掛テスト</td>
                <td>13:25</td>
                <td>5</td>
              </tr>
              <tr>
                <td>和歌山県</td>
                <td>アドベンチャーワールド</td>
                <td>14:03</td>
                <td>107</td>
              </tr>
              <tr>
                <td>沖縄県</td>
                <td>海ぶどう</td>
                <td>14:03</td>
                <td>107</td>
              </tr>
              <tr>
                <td>大阪府</td>
                <td>たこ焼き命</td>
                <td>14:03</td>
                <td>107</td>
              </tr>
              <tr>
                <td>富山県</td>
                <td>氷見カレー</td>
                <td>15:03</td>
                <td>107</td>
              </tr>
              <tr>
                <td>京都府</td>
                <td>荷掛テスト</td>
                <td>15:03</td>
                <td>5</td>
              </tr>
              <tr>
                <td>富山県</td>
                <td>黒部ダム</td>
                <td>15:03</td>
                <td>107</td>
              </tr>
              <tr>
                <td>北海道</td>
                <td>いくら</td>
                <td>15:13</td>
                <td>107</td>
              </tr>
              <tr>
                <td>和歌山県</td>
                <td>ア</td>
                <td>15:53</td>
                <td>107</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      {/* 出勤スタッフの情報をDB?から取得してループ表示 */}
      {/* 一言は当日の出勤スタッフが自由に記載できるようにする？ */}
      <section className="staff-message-wrapper">
        <div className="staff-section">
          <h2>本日の出勤スタッフ</h2>
          <table className="staff-table">
            <thead>
              <tr>
                <th>出身地</th>
                <th>スタッフ名</th>
                <th>ニックネーム</th>
                <th>一言</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>京都府</td>
                <td>乾　祐樹</td>
                <td>ぬい</td>
                <td>店長です！</td>
              </tr>
              <tr>
                <td>京都府</td>
                <td>荷掛　聖也</td>
                <td>にか</td>
                <td>最近入りました！</td>
              </tr>
              <tr>
                <td>京都府</td>
                <td>馬場 喜滉</td>
                <td>馬場ちゃん</td>
                <td>ワインソムリエ目指してます！</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* お店からの一言は当日の出勤スタッフが自由に記載できるようにする？ */}
        <div className="message-section">
          <h2>お店からの一言</h2>
          <div className="message-box">
            🍶 大阪の地酒「〇〇」入荷しました！<br />
            🐟 本日限定「エイヒレ炙り」あります！
          </div>
        </div>
      </section>
      {/* 公式SNSのURLが変更された場合は適宜変更 */}
      <footer>
        <a href="https://linktr.ee/kotobuki_tachi" target="_blank">公式HP</a>
        <a href="https://www.instagram.com/kotobuki_tachi/" target="_blank">Instagram</a>
        <a href="https://x.com/kotobuki_tachi" target="_blank">X（旧Twitter）</a>
        <a href="https://www.instagram.com/kotobuki_tachi/" target="_blank">Facebook（準備中）</a>
      </footer>
    </div>
  );
}
