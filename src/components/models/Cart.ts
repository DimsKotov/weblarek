import { IProduct } from "../../types";

class Cart {
  private items: IProduct[] = [];

  addItem(item: IProduct): void {
    if (!this.hasItem(item.id)) {
      this.items.push(item);
    }
  }

  removeItem(item: IProduct): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  clearCart(): void {
    this.items.length = 0;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return !!this.getItems().find((item) => item.id === id);
  }
}

export default Cart;
