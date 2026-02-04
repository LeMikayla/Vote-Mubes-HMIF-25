import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import CandidateCard from "./cards/candidateCard";

export default function CandidateSlider({
  candidates,
  setSwiperRef,
  onSlideChange,
}) {
  return (
    <div className="w-full relative flex items-center justify-center pb-12 flex-1 overflow-visible">
      <Swiper
        modules={[EffectCoverflow]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={0}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
        className="w-full h-full overflow-visible py-4"
      >
        {candidates.map((candidate) => (
          <SwiperSlide
            key={candidate.id}
            className="w-[170px]! flex! items-center justify-center"
          >
            {({ isActive }) => (
              <div
                className={`transition-all duration-300 ease-out ${
                  isActive
                    ? "scale-100 opacity-100 z-20"
                    : "scale-[0.85] opacity-60 z-10 blur-[0.5px] grayscale-30"
                }`}
              >
                <CandidateCard candidate={candidate} isActive={isActive} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
