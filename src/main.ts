import "./scss/styles.scss";

import Catalog from "../src/components/models/Catalog";
import Cart from "../src/components/models/Cart";
import Buyer from "../src/components/models/Buyer";

import { apiProducts } from "../src/utils/data";

const catalog = new Catalog();
const cart = new Cart();
const buyer = new Buyer();

catalog.saveProducts(apiProducts.items);
console.log("Массив товаров из каталога: ", catalog.getProducts());

const allProducts = catalog.getProducts();
console.log(
  "Метод getProducts возвращает:",
  allProducts.length > 0 ? "Есть товары" : "Нет товаров."
);

const getProductById = catalog.getProductById(
  "854cef69-976d-4c2a-a18c-2aa45046c390"
);
if (getProductById) {
  console.log(`Продукт найден по ID: ${getProductById.id}`);
} else {
  console.log("Продукта с таким ID не найдено.");
}

const firstProduct = catalog.getProducts()[1];
catalog.selectProduct(firstProduct);
console.log(
  "Выбранный продукт:",
  catalog.getSelectedProduct()?.title || "Нет выбранного продукта."
);

const currentSelectedProduct = catalog.getSelectedProduct();
if (currentSelectedProduct) {
  console.log("Текущий выбранный продукт:", currentSelectedProduct.title);
} else {
  console.log("Нет выбранного продукта.");
}

