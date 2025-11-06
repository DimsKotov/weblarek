import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class Catalog {
  private products: IProduct[] = []; // массив всех товаров
  public selectedProduct: IProduct | undefined; // выбранный товар
  private events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }
  
  saveProducts(products: IProduct[]): void {
    // Метод сохраняет новый список товаров в состоянии каталога. Используется, при загрузке списка c сервера.
    this.products = [...products];
    this.events.emit('catalog:change');
  }

  getProducts(): IProduct[] {
    // Возвращает полный список товаров из текущего состояния каталога. Используется для вывода всех товаров в компоненте интерфейса.
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    // Поиск продукта по уникальному ID. Если нужно показать детальную информацию о конкретном товаре.    
    return this.products.find((product) => product.id === id);
  }

  selectProduct(product: IProduct): void {
    // Устанавливает выбранный товар. Этот метод нужен, если нужно отметить какой-то товар как активный, например, для показа подробностей именно этого товара.
    this.selectedProduct = product;
    this.events.emit('catalog:select');
  }

  getSelectedProduct(): IProduct | undefined {
    //Возвращает текущий выбранный товар. Может использоваться, для рендеринга деталей выбранного товара на странице.
    return this.selectedProduct;
  }
}
