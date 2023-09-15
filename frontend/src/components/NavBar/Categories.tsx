import React from 'react';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const Categories: React.FC<{ theme: any }> = ({ theme }) => {
   const categoryClasses = `w-fit  px-3 xl:px-5 font-bold ${theme.hoverFontBold} py-2 justify-center flex  cursor-check  hover:opacity-80 select-none `;

   const slideLeft = () => {
      const slider = document.getElementById('slider');
      slider ? (slider.scrollLeft = slider.scrollLeft - 200) : null;
   };
   const slideRight = () => {
      const slider = document.getElementById('slider');
      slider ? (slider.scrollLeft = slider.scrollLeft + 200) : null;
   };
   const categories = [
      { category: 'Art', link: '/art' },
      { category: 'Electronics', link: '/electronics' },
      { category: 'Entertainment', link: '/entertainment' },
      { category: 'Fashion', link: '/fashion' },
      { category: 'Furniture', link: '/furniture' },
      { category: 'Food', link: '/food' },
      { category: 'Gifts', link: '/gifts' },
      { category: 'Health', link: '/health' },
      { category: 'Home', link: '/home' },
      { category: 'Jewelry', link: '/jewelry' },
      { category: 'Kids', link: '/kids' },
      { category: 'Pet', link: '/pet' },
      { category: 'Sports', link: '/sports' },
      { category: 'Tools', link: '/tools' }
   ];

   return (
      <div
         className={` ${theme.mainBg} flex h-12  select-none justify-center bg-opacity-60  shadow-md `}
      >
         <TiArrowLeftThick
            onClick={slideLeft}
            className={` cursor-check h-full  w-14 cursor-pointer ${theme.mainBg}  px-1 sm:w-9 lg:hidden  ${theme.hoverColor} hover:dark:bg-opacity-10`}
         />
         <div
            id="slider"
            className="scrollbar-hide  Touch-pan-x   flex   items-center  overflow-x-scroll scroll-smooth whitespace-nowrap sm:text-sm text-xs opacity-90"
         >
            {categories.map((cat, index) => (
               <Link key={index} to={cat.link} className={categoryClasses}>
                  {cat.category}
               </Link>
            ))}
         </div>
         <TiArrowRightThick
            onClick={slideRight}
            className={` cursor-check h-full w-14 cursor-pointer justify-end px-1 sm:w-9 md:w-10 lg:hidden ${theme.hoverColor} hover:dark:bg-opacity-10`}
         />
      </div>
   );
};

export default Categories;
