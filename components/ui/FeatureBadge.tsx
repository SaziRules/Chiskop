import React from "react";

interface FeatureBadgeProps {
  label: string;
}

export default function FeatureBadge({ label }: FeatureBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-chiskop-offWhite pr-5  rounded-full">
      <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-chiskop-red text-white text-[12px] md:text-[22px] font-bold">
        ✓
      </div>
      <span className="text-[12px] md:text-[18px] text-chiskop-black font-regular pl-2 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
