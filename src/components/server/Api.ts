import { IApi } from "../../types";
import { ProductListResponse } from "../../types";

class Api {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  public async fetchProducts(): Promise<ProductListResponse> {
    return await this.api.get<ProductListResponse>("products");
  }

  public async sendOrder(
    customerData: { name: string; email: string },
    productIds: number[],
    paymentMethod: string,
    deliveryAddress: string,
    phoneNumber: string,
    totalAmount: number
  ): Promise<object> {
    const orderDetails = {
      payment: paymentMethod,
      email: customerData.email,
      phone: phoneNumber,
      address: deliveryAddress,
      total: totalAmount,
      items: productIds.map((id) => String(id)),
    };
    return await this.api.post("orders", orderDetails);
  }
}

export default Api;
