import { IProduct } from "../../types";

class Catalog {
  private products: IProduct[] = [];
  public selectedProduct: IProduct | undefined;

  saveProducts(products: IProduct[]): void {
    this.products = [...products];
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  selectProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | undefined {
    return this.selectedProduct;
  }
}

export default Catalog;
