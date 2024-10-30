import { FC } from "react";

export const AboutUsSection: FC = () => {
  return (
    <section className="relative py-16 bg-[#8B1E3F] z-0">
      <div className="container mx-auto px-4 pt-10 max-w-7xl">
        <h2 className="text-5xl font-bold mb-8 text-center text-[#FFD700]">
          About Us
        </h2>
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-xl">
          <p className="mb-6 text-xl font-medium text-[#555555] leading-relaxed">
            Living in a multi-generational home in Auckland with more people
            than bedrooms (because rent is higher than our hopes & dreams), we
            end up with extra rubbish faster than you can say “whats for dinner,
            mum?”. And by rubbish day, there’s no way it all fits in the bins, despite
            our best recycling efforts. Looking around the neighbourhood we noticed we’re not alone, others are
            struggling too—some even resort to a cheeky roadside dump for their
            overflow!
          </p>
          <p className="mb-6 text-xl font-medium text-[#555555] leading-relaxed">
            Enter the{" "}
            <span className="font-bold text-[#ffc107]">Clean Sweep Duo!</span>{" "}
            We&apos;re a mother-daughter team with a mission to make rubbish
            removal easy, affordable, and yes—surprisingly friendly! With our
            little car and big dreams, we&apos;re here to help others clear
            their spaces and keep our streets just a little bit cleaner than
            before! 
          </p>
        </div>
      </div>
    </section>
  );
};
