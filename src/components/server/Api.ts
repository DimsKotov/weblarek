import { IApi } from "../../types";

class Api {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  public async fetchProducts(): Promise<object[]> {
    return await this.api.get<object[]>("products");
  }

  public async sendOrder(
    customerData: { name: string; email: string },
    productIds: number[]
  ): Promise<object> {
    const orderDetails = {
      customer: customerData,
      products: productIds,
    };
    return await this.api.post("orders", orderDetails);
  }
}

export default Api;
