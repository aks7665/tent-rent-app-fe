export interface Product {
  _id?: string;
  title: string;
  price: number;
  booked: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
