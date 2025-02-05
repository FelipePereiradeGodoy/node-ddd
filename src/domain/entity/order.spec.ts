import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const item = new OrderItem("item1", "item 1", 10, "p1", 1);
            new Order("", "123", [item]);
        }).toThrow('Id is required');
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            const item = new OrderItem("item1", "item 1", 10, "p1", 1);
            new Order("123", "", [item]);
        }).toThrow('CustomerId is required');
    });

    it("should throw error when item is empty", () => {
        expect(() => {
            new Order("123", "123", []);
        }).toThrow('Items are required');
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const order = new Order("o1", "c1", [item]);

        const total = order.total();

        expect(total).toBe(200);

        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
        const order2 = new Order("o2", "c2", [item, item2]);

        const total2 = order2.total();

        expect(total2).toBe(600);
    });

    it("should throw error if the item qtd is less or equal 0", () => {
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
            const order = new Order("o1", "c1", [item]);
        }).toThrow('Quantity must be greater than 0');
    });
});