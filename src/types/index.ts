export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface OrderItem {
  id: string;
  description?: string;
  image?: string;
  title?: string;
  category?: string;
  price?: number | null;
}

export interface OrderPayload {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface ProductListResponse {
  total: number;
  items: object[];
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

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface ValidationResult {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}
