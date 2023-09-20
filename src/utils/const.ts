export const orderInitialState = {
  id: "",
  customer_name: "",
  phone_number: "",
  items: [],
  total_price: 0,
  status: "",
  created_at: new Date(),
  delivery_date:
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() < 10
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1) +
    "-" +
    (new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate()),
};

export const productInitialState = {
  id: "",
  name: "",
  price: 0,
  active: false,
};

export const languageList = [
  {
    name: "CN",
    routeLangPath: "cn",
  },
  {
    name: "EN",
    routeLangPath: "en",
  },
];
