import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 100);
        }).toThrow('Id is required');
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("p1", "", 100);
        }).toThrow('Name is required');
    });

    it('shoudl throw error when id and name are empty', () => {
        expect(() => {
            new Product("", "", 100);
        }).toThrow('product: Id is required, product: Name is required');
    });

    it("should throw error when price is less than 0", () => {
        expect(() => {
            new Product("p1", "Product 1", -1);
        }).toThrow('product: Price must be greater than 0');
    });

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(150);

        expect(product.price).toBe(150);
    });
});
