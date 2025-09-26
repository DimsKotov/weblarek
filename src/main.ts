import "./scss/styles.scss";

import Catalog from "../src/components/models/Catalog";
import Cart from "../src/components/models/Cart";
import Buyer from "../src/components/models/Buyer";
import Api from "../src/components/server/Api";

import { apiProducts } from "../src/utils/data";

const api = new Api('https://larek-api.nomoreparties.co');
console.log("Запрос на сервер", api)

const catalog = new Catalog();
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

const buyer = new Buyer();
buyer.saveAddress("Spb Vosstania 1");
console.log("Адрес доставки", buyer.getData().address);

buyer.savePhone("+71234567890");
console.log("Телефон", buyer.getData().phone);

buyer.saveData(
  "card",
  "example@example.com",
  "+71234567890",
  "Spb Vosstania 1"
);
console.log("Данные покупателя", buyer.getData());

buyer.clearData();
console.log("Очищаем данные", buyer.getData());

buyer.saveData(
  "card",
  "example@example.com",
  "+71234567890",
  "Spb Vosstania 1"
);
console.log("Валидация", buyer.validate());

const cart = new Cart();

cart.addItem({
  id: "854cef69-976d-4c2a-a18c-2aa45046c390",
  description: "Если планируете решать задачи в тренажёре, берите два.",
  image: "../5_Dots.svg",
  title: "1 час в сутках",
  category: "софт-скил",
  price: 750,
});

console.log("Выбранный товар", cart.getItems());

cart.removeItem("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log("Удалить товар", cart.getItems());

cart.clearCart();
console.log("Очистить корзину", cart.getItems());

cart.addItem({
  id: "854cef69-976d-4c2a-a18c-2aa45046c390",
  description: "Если планируете решать задачи в тренажёре, берите два.",
  image: "../5_Dots.svg",
  title: "1 час в сутках",
  category: "софт-скил",
  price: 750,
});
console.log("Добавить товар", cart.getItems());

cart.addItem({
  id: "854cef69-976d-4c2a-a18c-2aa45046c390",
  description: "Если планируете решать задачи в тренажёре, берите два.",
  image: "../5_Dots.svg",
  title: "1 час в сутках",
  category: "софт-скил",
  price: 750,
});

console.log("Общая стоимость", cart.getTotalPrice());

console.log("Кол-то товаров", cart.getCount());

console.log("Есть ли товар", cart.hasItem("854cef69-976d-4c2a-a18c-2aa45046c390"));
