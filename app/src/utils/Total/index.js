export const Total = (product) => {
    var subtotal = 0;
    product.map((item) => {
        subtotal = subtotal + item["total"];
        return item;
    });
    return subtotal;
};