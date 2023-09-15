export const palenightPalette = {
   Black: { 'bg-Black': 'bg-[#292d3e]', 'text-black': 'text-[#292d3e]' },
   DarkGray: {
      'bg-DarkGray': 'bg-[#444267]',
      'text-DarkGray': 'text-[#444267]'
   },
   DarkGreen: {
      'bg-DarkGreen': 'bg-[#32374d]',
      'text-DarkGreen': 'text-[#32374d]'
   },
   DarkYellow: {
      'bg-DarkYellow': 'bg-[#676e95]',
      'text-DarkYellow': 'text-[#676e95]'
   },
   DarkBlue: {
      'bg-DarkBlue': 'bg-[#8796b0]',
      'text-DarkBlue': 'text-[#8796b0]'
   },
   DarkCyan: {
      'bg-DarkCyan': 'bg-[#959dcb]',
      'text-DarkCyan': 'text-[#959dcb]'
   },
   Gray: { 'bg-Gray': 'bg-[#959dcb]', 'text-Gray': 'text-[#959dcb]' },
   White: { 'bg-White': 'bg-[#ffffff]', 'text-White': 'text-[#ffffff]' },
   Red: { 'bg-Red': 'bg-[#f07178]', 'text-Red': 'text-[#f07178]' },
   DarkRed: { 'bg-DarkRed': 'bg-[#f78c6c]', 'text-DarkRed': 'text-[#f78c6c]' },
   Yellow: { 'bg-Yellow': 'bg-[#ffcb6b]', 'text-Yellow': 'text-[#ffcb6b]' },
   Green: { 'bg-Green': 'bg-[#c3e88d]', 'text-Green': 'text-[#c3e88d]' },
   Cyan: { 'bg-Cyan': 'bg-[#89ddff]', 'text-Cyan': 'text-[#89ddff]' },
   Blue: { 'bg-Blue': 'bg-[#82aaff]', 'text-Blue': 'text-[#82aaff]' },
   Magenta: { 'bg-Magenta': 'bg-[#c792ea]', 'text-Magenta': 'text-[#c792ea]' },
   DarkMagenta: {
      'bg-DarkMagenta': 'bg-[#ff5370]',
      'text-DarkMagenta': 'text-[#ff5370]'
   }
};

export const lightTheme = {
   primaryColor: '[#eeeeee]',
   secondaryColor: 'slate-700',
   borderColor: 'border-slate-800',
   bgColor: 'bg-slate-100',
   mainBg: 'bg-white',

   textColor: 'text-slate-700',
   hoverColor: 'hover:bg-gray-700',
   hoverTextColor: 'hover:text-[#eeeeee]',
   hoverFontBold: 'hover:font-bold'
};
export const darkTheme = {
   primaryColor: 'slate-700',
   secondaryColor: '[#eeeeee]',
   borderColor: 'dark:border-gray-300 ',
   bgColor: 'dark:bg-[#212f3f]',
   mainBg: 'dark:bg-[#18222d]',
   textColor: 'dark:text-gray-300',
   hoverColor: 'hover:dark:bg-gray-300',
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

export const allowedCategories = [
   'Electronics',
   'Fashion',
   'Home & Furniture',
   'Beauty & Personal Care',
   'Sports & Outdoors',
   'Health & Wellness',
   'Books, Movies & Music',
   'Toys & Games',
   'Automotive & Tools',
   'Jewelry & Watches',
   'Food & Beverages',
   'Pet Supplies',
   'Baby & Kids',
   'Gifts & Occasions',
   'Art & Collectibles',
   'Office & School Supplies'
];
