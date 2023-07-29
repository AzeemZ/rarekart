import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import TextButton from "./Buttons/TextButton";

export default function HeroBanner() {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
      >
        <div className="relative">
          <img
            src="/slide-01.jpg"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="absolute left-5 md:left-8 sm:left-16 top-1/2 transform -translate-y-1/2 text-black/70 text-left space-y-2 sm:space-y-6">
            <div>
              <span className="bg-gray-700 text-gray-100 text-xs md:text-base sm:text-xs p-1 rounded-md">
                50% off
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-5xl md:text-5xl lg:text-7xl my-4">
                New Cocktail <br />
                Dresses
              </span>
            </div>
            <TextButton value="Shop Now" />
          </div>
        </div>

        <div className="relative">
          <img
            src="/slide-02.jpg"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="absolute right-5 md:right-8 sm:right-16 top-1/2 transform -translate-y-1/2 text-black/70 text-right space-y-2 sm:space-y-6">
            <div>
              <span className="bg-gray-700 text-gray-100 text-xs md:text-base sm:text-xs p-1 rounded-md">
                Spring Revolution
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-5xl md:text-5xl lg:text-7xl my-4">
                Night Summer <br />
                Dresses
              </span>
            </div>
            <TextButton value="Shop Now" addtionalClass="absolute right-0" />
          </div>
        </div>

        <div className="relative">
          <img
            src="/slide-03.jpg"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="absolute left-5 md:left-8 sm:left-16 top-1/2 transform -translate-y-1/2 text-black/70 text-left space-y-2 sm:space-y-6">
            <div>
              <span className="bg-gray-700 text-gray-100 text-xs md:text-base sm:text-xs p-1 rounded-md">
                Spring promo
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-5xl md:text-5xl lg:text-7xl my-4">
                The Weekend <br />
                Promotions
              </span>
            </div>
            <TextButton value="Shop Now" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
