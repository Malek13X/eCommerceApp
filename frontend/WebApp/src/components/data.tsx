import { TbLayoutDashboard } from 'react-icons/tb';
import { HiTemplate } from 'react-icons/hi';
import { GiSellCard } from 'react-icons/gi';
import { AiFillCrown } from 'react-icons/ai';

export const navLinks = [
   {
      title: 'Dashboard',
      link: '/',
      icon: <TbLayoutDashboard />
   },
   {
      title: 'Nav 1',
      link: '/signin',
      icon: <HiTemplate />
   },
   {
      title: 'Nav 2',
      link: '/signup',
      icon: <AiFillCrown />
   },
   {
      title: 'Test',
      link: '/test',
      icon: <GiSellCard />
   }
];

export const lightTheme = {
   primaryColor: '[#eeeeee]',
   secondaryColor: 'slate-700',
   borderColor: 'border-slate-600',
   bgColor: 'bg-[#eeeeee]',
   mainBg: 'bg-gray-200',

   textColor: 'text-slate-700',
   hoverColor: 'hover:bg-slate-700',
   hoverTextColor: 'hover:text-[#eeeeee]',
   hoverFontBold: 'hover:font-bold'
};
export const darkTheme = {
   primaryColor: 'slate-700',
   secondaryColor: '[#eeeeee]',
   borderColor: 'dark:border-[#eeeeee] ',
   bgColor: 'dark:bg-slate-700',
   mainBg: 'dark:bg-[#171e2b]',
   textColor: 'dark:text-[#eeeeee]',
   hoverColor: 'hover:dark:bg-slate-200',
   hoverTextColor: 'hover:dark:text-slate-700',

   hoverFontBold: 'hover:dark:font-bold'
};

export interface iTheme {
   primaryColor: string;
   secondaryColor: string;
   borderColor: string;
   bgColor: string;
   textColor: string;
   hoverColor: string;
}
