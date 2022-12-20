export const calculateTotalPrice = ({
    items,
    productList,
}: {
    items: any[];
    productList: any[];
}) => {
    const listOfItems = [...items];
    const listOfProduct = [...productList];
    let totalPrice = 0;

    listOfItems.forEach((item) => {
        const findProduct = listOfProduct.find(
            (product) => product.name === item.name
        );

        totalPrice = totalPrice + findProduct.price * item.quantity;
    });

    return Number(totalPrice.toFixed(2));
};
