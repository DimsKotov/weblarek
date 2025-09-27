export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface ProductListResponse {
  total: number;
  items: IProduct[];
}

export interface OrderRequest {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: IProduct[];
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export type TPayment = "cash" | "card";

export interface ValidationResult {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}
