import { Product } from './product.model';
import { Customer } from './customer.model';

export interface Transaction {
  _id?: string;
  transationId: number;
  customerId: string;
  productId: string;
  transationType: 'in' | 'out';
  quantity?: string;
  transationIdParent: string;
  customerData?: Partial<Customer>;
  productData?: Partial<Product>;
  transactionParentData?: Partial<Transaction>;
  createdAt?: Date;
  updatedAt?: Date;
}
