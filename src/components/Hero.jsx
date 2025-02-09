import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Typography } from '@material-tailwind/react';
import img1 from '../assets/hero-carousel-img.jpg'
import img2 from '../assets/hero-carousel-img2.jpg'
import img3 from '../assets/hero-carousel-img3.jpg'

const Hero = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            loop={true}
            slidesPerView={1}
            navigation
            pagination={false}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
        >
            {/* Slide 1 - Regular Slide */}
            <SwiperSlide>
                <div className="relative w-full h-full bg-cover bg-center flex items-start justify-left px-5 text-white"
                    style={{ backgroundImage: `url(${img3})` }}>
                    <div className="text-left bg-transparent p-6 mt-10 sm:mt-20 rounded-lg">
                        <Typography variant='h1' className=" max-w-md  font-extrabold">Africa's finest research platform</Typography>
                        <Typography variant='h4' className="max-w-sm sm:max-w-lg font-semibold mt-2 text-gray-200">Get the best research materials from Top African Institutions</Typography>
                    </div>
                </div>
            </SwiperSlide>

            {/* Slide 2 - CTA Slide */}
            <SwiperSlide>
                <div
                    className="relative w-full h-full bg-cover bg-center flex items-center justify-left px-5 text-white"
                    style={{ backgroundImage: `url(${img1})` }}
                >
                    <div className="text-left   bg-transparent bg-opacity-50 p-10 sm:px-6 rounded-lg">
                        <Typography variant="h1" className="font-bold max-w-xl text-3xl md:text-5xl">
                            Discover the Knowledge You Need
                        </Typography>
                        <Typography variant="lead" className="max-w-sm sm:max-w-lg font-semibold mt-2">
                            Explore thousands of academic books, journals, and research papers
                            from top African institutions. Find exactly what you need today!
                        </Typography>
                        <button
                            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
                            onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Browse Collections
                        </button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Hero;
