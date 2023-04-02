import React, { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import regionsData from './regionsData.json';

interface PhoneNumberInputProps {
   theme: any;
   userPhone: string;
   phoneInfo: { region: string; number: string };
   setPhoneInfo: React.Dispatch<
      React.SetStateAction<{ region: string; number: string }>
   >;
}

const Phone: React.FC<PhoneNumberInputProps> = ({
   userPhone,
   phoneInfo,
   setPhoneInfo,
   theme
}: PhoneNumberInputProps) => {
   const [regions, setRegions] = useState(regionsData);
   const [selectedRegion, setSelectedRegion] = useState(
      userPhone
         ? regionsData.find((r) => r.code === userPhone.split(' ')[0])
         : regionsData.find((r) => r.code.includes('AE'))
   );

   const handleRegionChange = (
      region: any,
      event: React.MouseEvent<HTMLButtonElement>
   ) => {
      event.preventDefault();
      setSelectedRegion(region);

      setPhoneInfo({
         region: `${region?.code} ${region?.dial_code}`,
         number: phoneInfo.number
      });
   };

   const handlePhoneInfoChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const region = `${selectedRegion?.code} ${selectedRegion?.dial_code}`;
      const number = event.target.value;

      setPhoneInfo({
         region: region,
         number: number
      });
      console.log(
         `Phone.tsx: ${selectedRegion?.dial_code}${event.target.value}`
      );
   };
   useEffect(() => {
      return () => {};
   }, []);

   return (
      <div className={`flex h-fit items-center space-x-4 ${theme.textColor}`}>
         <Menu>
            {({ open }) => (
               <>
                  <div>
                     <Menu.Button
                        className={`rounded-sm border dark:border-gray-300 ${theme.borderColor} px-3 py-[10px] `}
                     >
                        <div className="flex justify-between text-lg">
                           <div className="px-1">{selectedRegion?.emoji}</div>
                           <div>{selectedRegion?.code}</div>
                        </div>
                     </Menu.Button>
                  </div>
                  <Transition show={open}>
                     <Menu.Items
                        static
                        className={`absolute  z-50 mt-2 h-48 w-fit origin-top-right overflow-y-scroll rounded-sm ${theme.bgColor} shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                     >
                        <div className="py-1">
                           {regions.map((region) => (
                              <Menu.Item key={region.code}>
                                 {({ active }) => (
                                    <button
                                       className={`${
                                          active
                                             ? 'bg-gray-100 text-gray-900'
                                             : `${theme.textColor}`
                                       } block w-full px-4 py-2 text-left text-sm`}
                                       onClick={(event) =>
                                          handleRegionChange(region, event)
                                       }
                                    >
                                       <div className="flex justify-between text-lg">
                                          <div className="px-1">
                                             {region.emoji}
                                          </div>
                                          <div>{region.code}</div>
                                       </div>
                                    </button>
                                 )}
                              </Menu.Item>
                           ))}
                        </div>
                     </Menu.Items>
                  </Transition>
               </>
            )}
         </Menu>
         <div className="relative inline-flex w-full border ">
            <div
               className={` flex  w-fit items-center bg-white px-3 font-medium text-slate-800 `}
            >
               <div>{selectedRegion?.dial_code}</div>
            </div>
            <input
               className="block w-full items-center rounded-sm border-0 border-gray-200 p-3   text-slate-700 shadow-sm focus:dark:ring-2 focus:dark:ring-slate-400"
               type="number"
               name="phone"
               value={phoneInfo.number}
               placeholder={userPhone.split(' ')[2]}
               onChange={handlePhoneInfoChange}
            />
            <span className="absolute right-2 inline-flex  h-full items-center ">
               <svg
                  fill="none"
                  className="h-6 w-6 text-slate-700"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
               </svg>
            </span>
         </div>
      </div>
   );
};

export default Phone;
