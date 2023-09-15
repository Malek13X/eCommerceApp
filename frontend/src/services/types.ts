export type DocsList = Array<{ name: string; url: string }>;

export type INewItem = {
   title: string;
   description: string;
   category: string;
   price: number;
   quantity: number;
   image: File | null;
};

export type Item = {
   _id: string;
   title: string;
   description: string;
   category: string;
   price: number;
   quantity: number;
   imageUUID: string;
   imageUrl: string;
};

export type Cart = {
   userId: string;
   items: Array<Item>;
   totalPrice: number;
};

export interface INewOrder {
   userId: string;
   items: Array<{
      itemId: string;
      quantity: number;
   }>;
   totalPrice: number;
}

// Order represents the data structure for an existing order
export interface Order {
   _id: string; // Unique identifier for the order
   userId: string; // User ID or reference
   items: Array<{
      itemId: string; // Product ID or reference
      quantity: number;
   }>;
   totalPrice: number;
   orderDate: Date;
}
