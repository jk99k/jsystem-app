"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface HeaderProps {
  formattedDate: string;
}

export default function Header({ formattedDate }: HeaderProps) {
  const router = useRouter();
  const params = useParams();
  const storeId = params.store_id as string;

  // 日付の数字部分だけspanで囲む
  const dateWithSerif = formattedDate.replace(
    /([0-9０-９]+)/g,
    match =>
      `<span class='font-[\'Yu Mincho\',_\'Noto Serif JP\',_serif]'>${match}</span>`
  );

  return (
    <header className="border-b-2 border-[#162b42] shadow-lg bg-[#162b42] relative overflow-hidden flex items-center h-auto min-h-20 px-2 md:px-4 py-0">
      {/* 背景画像 */}
      <div className="absolute inset-0 bg-[url('/img/background.png')] bg-cover bg-center opacity-20"></div>
      {/* 下5%の黒いグラデーション */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-black/60 to-transparent z-10"></div>

      <div className="h-14 w-14 md:h-20 md:w-20 flex items-center justify-center relative z-20 flex-shrink-0 ml-1 md:ml-4">
        <Image
          src="/img/kotobuki_logo.jpg"
          alt="百年蕎麦 壽 ロゴ"
          width={56}
          height={56}
          className="rounded-full object-cover border-2 drop-shadow-xl"
        />
      </div>
      <div className="flex-1 flex flex-row items-center justify-between relative z-20 min-w-0 gap-2 md:gap-4">
        <div className="text-left flex-1 min-w-0">
          <h1 className="text-base md:text-3xl font-bold text-amber-100 tracking-wide drop-shadow-lg leading-snug truncate">
            <span className="block md:inline">
              百年蕎麦 壽{" "}
              <span dangerouslySetInnerHTML={{ __html: dateWithSerif }} />
            </span>
            <span className="block md:inline">ご贔屓さん出席状況</span>
          </h1>
        </div>
        <div className="flex items-center flex-shrink-0">
          <button
            className="font-semibold cursor-pointer rounded px-3 py-2 text-xs md:text-sm shadow transition whitespace-nowrap text-white"
            onClick={() => router.push(`/${storeId}/gohiki-okite`)}
            style={{maxWidth:'180px'}}
          >
            ご贔屓さんの掟
          </button>
        </div>
      </div>
    </header>
  );
}
