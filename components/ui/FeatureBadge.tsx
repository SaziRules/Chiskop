import React from "react";

interface FeatureBadgeProps {
  label: string;
}

export default function FeatureBadge({ label }: FeatureBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-chiskop-offWhite pr-5  rounded-full">
      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-chiskop-red text-white text-[12px] md:text-[22px] font-bold">
        ✓
      </div>
      <span className="text-[9px] md:text-[20px] text-chiskop-black font-regular pl-2 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
