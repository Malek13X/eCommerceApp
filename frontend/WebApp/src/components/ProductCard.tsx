import React from 'react';

const ProductCard: React.FC<{ item: any }> = ({ item }) => {

   return (
      <div className="min-h-60 max-w-sm overflow-hidden rounded-sm bg-gray-400 shadow-lg">
         <img src="" alt="" className="w-full rounded-t-sm bg-gray-600" />
         
         <div
            id="image"
            className=" h-60 rounded-t-msm bg-gray-600 p-3"
         ></div>

         <div className="flex justify-between">
            <div id="title" className="mx-5 my-4 text-xl font-bold">
               {item.title}
            </div>
            
            <div id="price" className="text-md mx-5 my-4 pt-1 ">
               {item.price}
            </div>
         </div>

         <div className="text-md mx-5 mb-3">{item.description}</div>
      </div>
   );
};
export default ProductCard;
