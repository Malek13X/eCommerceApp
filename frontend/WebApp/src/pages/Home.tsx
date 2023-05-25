import React from 'react';
import ItemForm from '../components/Functional/ItemForm';
const Home: React.FC<{ theme: any }> = ({ theme }) => {
   return (
      <div className="flex flex-wrap justify-center">
         <div className={`${theme.textColor} `}>
            
         </div>
      </div>
   );
};

export default Home;
