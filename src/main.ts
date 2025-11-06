import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Cart } from "../src/components/models/Cart";
import { Buyer } from "../src/components/models/Buyer";
import { ApiServer } from "../src/components/server/Api";
import { Catalog } from "../src/components/models/Catalog";
import { Basket } from "./components/views/Modal/Basket";
import { CardBasket } from "../src/components/views/Card/CardBasket";
import { CardCatalog } from "../src/components/views/Card/CardCatalog";
import { CardPreview } from "../src/components/views/Card/CardPreview";
import { Contact } from "../src/components/views/Contact";
import { Gallery } from "../src/components/views/Gallery";
import { Header } from "../src/components/views/Header";
import { Modal } from "../src/components/views/Modal/Modal";
import { Order } from "../src/components/views/Order";
import { Success } from "../src/components/views/Modal/Success";
import { API_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { ProductListResponse } from "./types";
import { IProduct } from "./types";
import { IBuyer } from "../src/types/index";
import { IOrder } from "../src/components/views/Order";

const events = new EventEmitter();
const products = new Catalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);
const gallery = new Gallery(ensureElement(".gallery"));
const modal = new Modal(events, ensureElement(".modal"));
const header = new Header(events, ensureElement(".header"));
const basket = new Basket(
  events,
  cloneTemplate(ensureElement<HTMLTemplateElement>("#basket"))
);
const cardPreview = new CardPreview(
  cloneTemplate(ensureElement<HTMLTemplateElement>("#card-preview")),
  events
);
const cardBasket = new CardBasket(
  cloneTemplate(ensureElement<HTMLTemplateElement>("#card-basket")),
  events
);
const order = new Order(
  cloneTemplate(ensureElement<HTMLTemplateElement>("#order")),
  events
);
const contact = new Contact(
  cloneTemplate(ensureElement<HTMLTemplateElement>("#order")),
  events
);

const apiClient = new Api(API_URL);
const serverApi = new ApiServer(apiClient);

serverApi
  .fetchProducts()
  .then((result: ProductListResponse) => {
    products.saveProducts(result.items);
  })
  .catch((error) => {
    console.error(error);
  });

events.on("catalog:change", () => {
  //Закгрузка карточек товара в галерею
  const items = products.getProducts().map((item) => {
    const cardCatalog = new CardCatalog(
      cloneTemplate(ensureElement<HTMLTemplateElement>("#card-catalog")),
      { onClick: () => events.emit("card:select", item) }
    );
    return cardCatalog.render(item);
  });
  gallery.render({ catalog: items });
});

events.on("basket:open", () => {
  //Открытие модалки корзины
  modal.render({ content: basket.render() });
  modal.openModal();
  const isEmpty = basket.isEmpty(); // Проверяем корзину через метод isEmpty()
  if (isEmpty) {
    basket.buttonStatus = true;
    basket.listOfProducts = ["Корзина пуста"];
  } else {
    basket.buttonStatus = false;
  }
});

events.on("card:select", (selectedItem: IProduct) => {
  //Выбираем карточку
  products.selectProduct(selectedItem);
});

events.on("catalog:select", () => {
  //Обработчик в карточке превью
  const product = products.getSelectedProduct();
  let buttonText;
  if (product) {
    const isInCart = cart.hasItem(product.id);
    if (product.price) {
      buttonText = isInCart ? "Удалить из корзины" : "Купить";
    } else {
      buttonText = "Недоступно";
    }
  }
  modal.content = cardPreview.render({
    ...product,
    buttonText,
  });

  modal.openModal();
});

events.on("card:button", () => {
  const selectedProduct = products.getSelectedProduct(); // Получаем выбранный товар
  if (selectedProduct) {
    const isInCart = cart.hasItem(selectedProduct.id); // Проверяем наличие товара в корзине
    if (isInCart) {
      cart.removeItem(selectedProduct);
      modal.closeModal();
      // Удаляем товар из корзины, если он уже там есть
    } else {
      cart.addItem(selectedProduct);
      // Добавляем товар в корзину, если его там нет
    }
  }
});

events.on("cart:change", () => {
  header.counter = cart.getCount();
  const items = cart.getItems().map((item, index) => {
    const cardBasket = new CardBasket(
      cloneTemplate(ensureElement<HTMLTemplateElement>("#card-basket")),
      events
    );
    return cardBasket.render({ ...item, index: index + 1 });
  });

  basket.totalCounter = `${cart.getTotalPrice()}  синапсов`;
  basket.render({ listOfProducts: items });
});

events.on("product:delete", ({ id }) => {
  const productToRemove = cart.getItems().find((item) => item.id === id);
  if (productToRemove) {
    cart.removeItem(productToRemove);
  }
  const isEmpty = basket.isEmpty(); // Проверяем корзину через метод isEmpty()
  if (isEmpty) {
    basket.buttonStatus = true;
    basket.listOfProducts = ["Корзина пуста"];
  } else {
    basket.buttonStatus = false;
  }
});

events.on("basket:arrange", () => {
  //Открытие модалки корзины
  modal.render({ content: order.render() });
  modal.openModal();
});

events.on("form:change", (event: { field: keyof IBuyer; value: string }) => {
  buyer.setData({ [event.field]: event.value });  
});

events.on('data:change', () => {  
  const validationResult = buyer.validate();
  const { payment, address } = validationResult;  
  const isValid = !(payment || address);  
  const formData = {
    payment: buyer.getData().payment,
    address: buyer.getData().address,
    buttonStatus: !isValid, 
    errors: payment || address
  };
  
  order.render(formData);
});

