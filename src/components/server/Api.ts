import { IApi } from "../../types";
import { ProductListResponse, OrderRequest, OrderResponse } from "../../types";

export class ApiServer {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  public fetchProducts(): Promise<ProductListResponse> {
    return this.api.get<ProductListResponse>('/product/');
  }

  public sendOrder(order: OrderRequest): Promise<OrderResponse> {
    return this.api.post<OrderResponse>('/order/', order);
  }
}
