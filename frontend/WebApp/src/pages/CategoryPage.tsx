import { useEffect } from 'react';
import { useGetItemsQuery } from '../features/api/apiSlice';
import { Item } from '../services/types';
import ProductCard from '../components/ProductCard';
import { AiOutlineLoading } from 'react-icons/ai';

type props = {
   category: string;
   theme: any;
};

const CategoryPage: React.FC<props> = ({ category, theme }) => {
   const { data: itemsData, isLoading, error } = useGetItemsQuery('');

   return (
      <div className={`pt-6  ${theme.textColor} `}>
         <div className=" mx-10 h-full   ">
            <h1 className="my-4 text-center text-2xl font-bold text-teal-600  sm:text-4xl">
               {category}
            </h1>
            {itemsData &&
            itemsData?.filter((i) => i.quantity > 0 && i.category === category)
               ?.length > 0 ? (
               <ul>
                  <div className="flex  flex-wrap justify-center text-xs ">
                     {itemsData
                        ?.filter(
                           (i) => i.quantity > 0 && i.category === category
                        )
                        .map((item: Item) => (
                           <div
                              key={item._id}
                              className={`my-2 rounded-md sm:m-2`}
                           >
                              <ProductCard item={item} theme={theme} />
                           </div>
                        ))}
                  </div>
               </ul>
            ) : !isLoading ? (
               <h1 className="my-4 text-center text-lg font-bold opacity-60 sm:text-2xl">
                  We are currently out of products of this category
               </h1>
            ) : (
               <div className="flex justify-center py-10 text-center">
                  <AiOutlineLoading className="animate-spin" size={70} />
               </div>
            )}
         </div>
      </div>
   );
};

export default CategoryPage;
