const dataFormat = {
  id: -1,
  customerName: "",
  items: [
    {
      id: -1,
      name: "",
      quantity: 1,
      orderId: -1,
    },
  ],
  totalPrice: 0,
  status: "",
};
const dummyData = [
  {
    id: "#1",
    customerName: "Jennifer",
    items: [
      {
        id: "4",
        name: "Dou Sa Bing",
        quantity: 1,
      },
      {
        id: "5",
        name: "Xiang Bing",
        quantity: 10,
      },
    ],
    totalPrice: 32,
    status: "unfulfill",
    createdAt: new Date(),
    deliveryDate: new Date(),
  },
  {
    id: "#2",
    customerName: "Joel",
    items: [
      {
        id: "6",
        name: "Dou Sa Bing",
        quantity: 1,
      },
      {
        id: "7",
        name: "Xiang Bing",
        quantity: 10,
      },
    ],
    totalPrice: 40,
    status: "fulfilled",
    createdAt: new Date(),
    deliveryDate: new Date(),
  },
  {
    id: "#3",
    customerName: "Nicholas",
    items: [
      {
        id: "8",
        name: "Dou Sa Bing",
        quantity: 1,
      },
      {
        id: "9",
        name: "Xiang Bing",
        quantity: 10,
      },
    ],
    totalPrice: 32,
    status: "unfulfill",
    createdAt: new Date(),
    deliveryDate: new Date(),
  },
];
const defaultOptions = [
  {
    id: "adasd",
    name: "Dou Sa Bing",
    price: 3.5,
    active: true,
  },
  {
    id: "opsicdn",
    name: "Xiang Bing",
    price: 3.0,
    active: true,
  },
];
export { dataFormat, dummyData, defaultOptions };
