import Image from "next/image";

interface HeaderProps {
  formattedDate: string;
}

export default function Header({ formattedDate }: HeaderProps) {
  // 日付の数字部分だけspanで囲む
  const dateWithSerif = formattedDate.replace(
    /([0-9０-９]+)/g,
    match =>
      `<span class='font-[\'Yu Mincho\',_\'Noto Serif JP\',_serif]'>${match}</span>`
  );

  return (
    <header className="border-b-2 border-[#162b42] shadow-lg flex h-20 bg-[#162b42] relative overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0 bg-[url('/img/background.png')] bg-cover bg-center opacity-20"></div>
      {/* 下5%の黒いグラデーション */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-black/60 to-transparent z-10"></div>

      <div className="h-20 w-20 flex items-center justify-center relative z-20">
        <Image
          src="/img/kotobuki_logo.jpg"
          alt="百年蕎麦 壽 ロゴ"
          width={72}
          height={72}
          className="rounded-full object-cover border-2 drop-shadow-xl"
        />
      </div>
      <div className="flex-1 flex items-center relative z-20">
        <div className="text-left w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-100 tracking-wide drop-shadow-lg leading-snug">
            <span className="block md:inline">百年蕎麦 壽 <span dangerouslySetInnerHTML={{ __html: dateWithSerif }} /></span>
            <span className="block md:inline">ご贔屓さん出席状況</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
