import UpdateCustomerUseCase from "./update.product.usecase";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import Product from "../../../domain/product/entity/product";

const MockProductRepository = (): ProductRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    };
};

describe("Unit Test UpdateProductUseCase", () => {
    it("should update a product", async () => {
        const productRepository = MockProductRepository();
        const updateProductUseCase = new UpdateCustomerUseCase(productRepository);

        const product = new Product("1", "Product A", 100);
        productRepository.find = jest.fn().mockResolvedValue(product);
        productRepository.update = jest.fn();

        const input = {
            id: "1",
            name: "Updated Product A",
            price: 150,
        };

        const result = await updateProductUseCase.execute(input);

        expect(result).toEqual({
            id: "1",
            name: "Updated Product A",
            price: 150,
        });
        expect(productRepository.find).toHaveBeenCalledWith("1");
        expect(productRepository.update).toHaveBeenCalledWith(product);
    });
});