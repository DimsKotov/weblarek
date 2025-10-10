import { IApi } from "../../types";
import { ProductListResponse, OrderRequest, OrderResponse } from "../../types";

class ApiServer {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  public async fetchProducts(): Promise<ProductListResponse> {
    return await this.api.get<ProductListResponse>("products");
  }

  public async sendOrder(order: OrderRequest): Promise<OrderResponse> {
    return await this.api.post<OrderResponse>("orders", order);
  }
}

export default ApiServer;