export type DocsList = Array<{ name: string; url: string }>;

export interface INewItem {
   title: string;
   description: string;
   categories: string[];
   price: number;
   quantity: number;
   image: File | null;
}

export type Item = {
   _id: string;
   title: string;
   description: string;
   categories: string[];
   price: number;
   quantity: number;
   imageUUID: string;
   imageUrl: string;
};
