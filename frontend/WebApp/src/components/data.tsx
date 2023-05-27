export const lightTheme = {
   primaryColor: '[#eeeeee]',
   secondaryColor: 'slate-700',
   borderColor: 'border-slate-600',
   bgColor: 'bg-[#eeeeee]',
   mainBg: 'bg-slate-300',

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

export interface ITheme {
   primaryColor: string;
   secondaryColor: string;
   borderColor: string;
   bgColor: string;
   textColor: string;
   hoverColor: string;
}
