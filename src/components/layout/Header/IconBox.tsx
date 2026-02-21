import { cn } from "@/lib/utils";
import Image from "next/image";

export function IconBox({ src, size = 20, boxClass }: { src: string; size?: number; boxClass?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 border border-neutral-200 rounded-sm",
        boxClass || "w-8 h-8"
      )}
    >
      <Image src={src} alt="" width={size} height={size} className="opacity-70" />
    </div>
  );
}
