import { LOGO_BLACK } from "@/configs";
import Image from "next/image";

const RaceItem = ({
  image,
  count,
  imgAlt,
  className,
}: {
  image?: string;
  count: number;
  imgAlt: string;
  className?: string;
}) => {
  return (
    <div className={`w-[48px] h-[48px] relative ${className ?? ""}`}>
      <Image
        src={image ?? LOGO_BLACK}
        alt={imgAlt}
        layout="fill"
        className="brightness-50 rounded-md object-cover"
      />
      <span className="w-[20px] h-[20px] absolute top-[-3px] right-[-3px] font-bold text-black bg-[#c5d674] text-[12px] rounded-full text-center">
        {count}
      </span>
    </div>
  );
};

export default RaceItem;
