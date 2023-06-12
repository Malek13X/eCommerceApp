import React, { useEffect, useState } from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/NavBar/SearchBar';
import UserMenu from '../components/Functional/UserMenu';
import SignDropdown from '../components/NavBar/SignDropDown';
import axios from 'axios';
import { useGetItemsQuery } from '../features/api/apiSlice';
import { Item } from '../services/types';

const Test: React.FC<{ theme: any }> = ({ theme }) => {
   const [items, setItems] = useState<Item[]>();

   const { data: itemsData, isLoading, error } = useGetItemsQuery('');
   useEffect(() => {
      if (itemsData) {
         setItems(itemsData);
      }

      return () => {};
   }, [itemsData]);

   return <div className={`pt-6  ${theme.textColor} `}></div>;
};

export default Test;
