import { FC } from "react";

export const AboutUsSection: FC = () => {
  return (
    <section className="relative py-16 bg-[#8B1E3F] z-0">
      <div className="container mx-auto px-4 pt-10">
        <h2 className="text-5xl font-bold mb-8 text-center text-[#FFD700]">
          About Us
        </h2>
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-xl">
          <p className="mb-6 text-lg text-[#555555] leading-relaxed">
            Living in a multi-generational home (with more people in our house
            than we had bedrooms for due to high rental prices), we quickly
            found ourselves drowning in extra rubbish that didn’t fit in the
            council bins, no matter how much we recycled or reused. We also
            noticed we were not the only ones with this problem, as some folks
            were turning to sneaky roadside dumping for their extra bags.
          </p>
          <p className="mb-6 text-lg text-[#555555] leading-relaxed">
            That’s when{" "}
            <span className="font-bold text-[#ffc107]">Clean Sweep Duo</span>{" "}
            was born! We are a mother-daughter team with a mission: to make
            rubbish removal simple, affordable, and, dare we say, a bit
            friendlier. We may only have a small car to start this mission, but
            we have a big goal – to help others clear out their home clutter and
            keep the streets clean — one bag at a time!
          </p>
        </div>
      </div>
    </section>
  );
};
