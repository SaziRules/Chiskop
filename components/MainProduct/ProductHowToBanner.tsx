import React from "react";

export default function ProductHowToBanner() {
  const steps = [
    {
      num: 1,
      title: "SQUEEZE",
      text: "Squeeze adequate amount of cream onto the spatula and smooth over an even layer to cover the hair. DO NOT RUB IN.",
    },
    {
      num: 2,
      title: "LEAVE",
      text: "Leave on for 7 minutes and check if the hair comes out easily on a small area. DO NOT exceed 10 minutes in total. Hair removal depends on hair thickness. Once the hair is coming off easily, remove with the spatula or wet face towel.",
    },
    {
      num: 3,
      title: "RINSE",
      text: "Thereafter, rinse your skin thoroughly with water and pat dry. To maintain a smooth skin, apply a moisturiser over the area.",
    },
  ];

  return (
    <section className="w-full bg-chiskop-black text-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="relative flex flex-col md:flex-row justify-between items-stretch text-center">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col justify-start items-center text-center px-4 md:px-6 relative"
            >
              {/* Step number */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-chiskop-red text-white font-extrabold text-[22px] mb-5">
                {step.num}
              </div>

              {/* Arrow between circles (centered perfectly) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[38px] right-[-12%] w-[120px] h-0.5 bg-white">
                  <div className="absolute right-0 -top-1.5 w-0 h-0 border-t-[6px] border-b-[6px] border-l-10 border-t-transparent border-b-transparent border-l-white"></div>
                </div>
              )}

              {/* Title */}
              <h3 className="text-[18px] md:text-[20px] font-extrabold uppercase mb-2 tracking-wide">
                {step.title}
              </h3>

              {/* Text */}
              <p className="text-[13px] md:text-[14px] text-gray-300 leading-relaxed max-w-[340px] mx-auto">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
