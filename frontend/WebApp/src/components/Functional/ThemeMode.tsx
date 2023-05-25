import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsMoon, BsSun } from 'react-icons/bs';
import { AppDispatch } from '../../app/store';

import { switchTheme } from '../../features/UISlice';

type props = {
   size: string;
   style: string;
};

const ThemeMode: React.FC<props> = ({ size, style }) => {
   const dispatch = useDispatch<AppDispatch>();
   const { themeMode } = useSelector((state: any) => state.UI);

   useEffect(() => {}, []);
   return (
      <div
         id="theme-mode"
         className={`${
            size === 'big' ? 'hidden pl-4  md:block ' : 'ml-5 block  md:hidden'
         }
         h-fit w-fit items-center justify-center  hover:opacity-80 ${style} `}
      >
         {themeMode === 'dark' ? (
            <BsSun
               id="light"
               className="cursor-check h-6 w-6 cursor-pointer"
               onClick={() => dispatch(switchTheme())}
            />
         ) : (
            <BsMoon
               id="dark"
               className="cursor-check h-6 w-6 cursor-pointer"
               onClick={() => dispatch(switchTheme())}
            />
         )}
      </div>
   );
};

export default ThemeMode;
