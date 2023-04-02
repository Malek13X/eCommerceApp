import React from 'react';
import Phone from '../components/Functional/Phone';

const Home: React.FC<{ theme: any }> = ({ theme }) => {
   return (
      <div className="flex flex-wrap justify-center">
         <div className={`${theme.textColor} `}></div>
      </div>
   );
};

export default Home;
