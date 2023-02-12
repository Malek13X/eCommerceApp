import React from 'react';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const Categories: React.FC<{ theme: any }> = ({ theme }) => {
   const categoryClasses =  `w-28  px-3 font-bold ${theme.hoverFontBold} py-2 justify-center flex  cursor-check  hover:opacity-80 select-none `;

   const slideLeft = () => {
      const slider = document.getElementById('slider');
      slider ? (slider.scrollLeft = slider.scrollLeft - 200) : null;
   };
   const slideRight = () => {
      const slider = document.getElementById('slider');
      slider ? (slider.scrollLeft = slider.scrollLeft + 200) : null;
   };

   return (
      <div
         className={` ${theme.mainBg} flex h-12 select-none  justify-center shadow-md `}
      >
         <TiArrowLeftThick
            onClick={slideLeft}
            className={` cursor-check h-full  w-14 cursor-pointer    px-1 sm:w-9   lg:hidden ${theme.hoverColor} hover:dark:bg-opacity-10`}
         />
         <div
            id="slider"
            className="scrollbar-hide Touch-pan-x flex  h-full items-center  overflow-x-scroll scroll-smooth whitespace-nowrap text-sm opacity-90"
         >
            <Link to="/test" className={categoryClasses}>
               Electronics
            </Link>
            <Link to="/test" className={categoryClasses}>
               Fashion
            </Link>
            <Link to="/" className={categoryClasses}>
               Mechanical
            </Link>
            <Link to="/" className={categoryClasses}>
               Books
            </Link>
            <Link to="/test" className={categoryClasses}>
               Electronics
            </Link>
            <Link to="/test" className={categoryClasses}>
               Fashion
            </Link>
            <Link to="/" className={categoryClasses}>
               Mechanical
            </Link>
            <Link to="/" className={categoryClasses}>
               Books
            </Link>
            <Link to="/test" className={categoryClasses}>
               Electronics
            </Link>
            <Link to="/test" className={categoryClasses}>
               Fashion
            </Link>
            <Link to="/" className={categoryClasses}>
               Mechanical
            </Link>
            <Link to="/" className={categoryClasses}>
               Books
            </Link>
         </div>
         <TiArrowRightThick
            onClick={slideRight}
            className={` cursor-check h-full w-14 cursor-pointer justify-end px-1 sm:w-9 md:w-10 lg:hidden ${theme.hoverColor} hover:dark:bg-opacity-10`}
         />
      </div>
   );
};

export default Categories;
