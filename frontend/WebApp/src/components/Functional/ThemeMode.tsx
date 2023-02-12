import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsMoon, BsSun } from 'react-icons/bs';
import { AppDispatch } from '../../app/store';

import { switchTheme } from '../../features/user/UISlice';

const ThemeMode: React.FC<{ theme: any; size: string}> = ({ theme, size }) => {
   const dispatch = useDispatch<AppDispatch>();
   const { themeMode } = useSelector((state: any) => state.UI);

   useEffect(() => {}, []);
   return (
      <div
         id="theme-mode"
         className={`${size === 'big' ? 'hidden md:block pr-6 pl-2 ' : 'md:hidden block scale-125 ml-5'}
         h-fit w-fit items-center justify-center  hover:opacity-80  `}
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
