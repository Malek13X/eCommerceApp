import React, { useState } from 'react';
import { Item } from '../services/types';

type Props = {
   itemsData: Item[];
};

const Carousel: React.FC<Props> = ({ itemsData }) => {
   const [activeIndex, setActiveIndex] = useState(0);

   const handlePrevSlide = () => {
      setActiveIndex((prevIndex) =>
         prevIndex === 0 ? itemsData.length - 1 : prevIndex - 1
      );
   };

   const handleNextSlide = () => {
      setActiveIndex((prevIndex) =>
         prevIndex === itemsData.length - 1 ? 0 : prevIndex + 1
      );
   };

   return (
      <div>
         <div
            id="indicators-carousel"
            className="relative w-full"
            data-carousel="static"
         >
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
               {itemsData?.map((item: Item, index: number) => (
                  <div
                     key={index}
                     className={`carousel-item${
                        index === activeIndex ? ' active' : ''
                     }`}
                     data-carousel-item={index === activeIndex ? 'active' : undefined}
                  >
                     <img
                        src={item.imageUrl}
                        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt={item.title}
                        title={item.title}
                     />
                  </div>
               ))}
            </div>
            {/* Slider indicators */}
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
               {itemsData.map((item: any, index: number) => (
                  <button
                     key={index}
                     type="button"
                     className="h-3 w-3 rounded-full"
                     aria-current={index === activeIndex ? 'true' : 'false'}
                     aria-label={`Slide ${index + 1}`}
                     data-carousel-slide-to={index}
                     onClick={() => setActiveIndex(index)}
                  ></button>
               ))}
            </div>
            {/* Slider controls */}
            <button
               type="button"
               className="group absolute top-0 left-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
               data-carousel-prev
               onClick={handlePrevSlide}
            >
               <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
                  <svg
                     aria-hidden="true"
                     className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                     ></path>
                  </svg>
                  <span className="sr-only">Previous</span>
               </span>
            </button>
            <button
               type="button"
               className="group absolute top-0 right-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
               data-carousel-next
               onClick={handleNextSlide}
            >
               <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
                  <svg
                     aria-hidden="true"
                     className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                     ></path>
                  </svg>
                  <span className="sr-only">Next</span>
               </span>
            </button>
         </div>
      </div>
   );
};

export default Carousel;
