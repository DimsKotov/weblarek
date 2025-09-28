import { IApi } from "../../types";
import { ProductListResponse, OrderRequest } from "../../types";

class ApiServer {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  public async fetchProducts(): Promise<ProductListResponse> {
    return await this.api.get<ProductListResponse>("products");
  }

  public async sendOrder(order: OrderRequest): Promise<object> {
    return await this.api.post("orders", order);
  }
}

export default ApiServer;
