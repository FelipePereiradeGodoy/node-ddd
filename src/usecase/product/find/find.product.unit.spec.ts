import FindProductUseCase from "./find.product.usecase";
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

describe("Unit Test FindProductUseCase", () => {
    it("should find a product by id", async () => {
        const productRepository = MockProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const product = new Product("1", "Product A", 100);
        productRepository.find = jest.fn().mockResolvedValue(product);

        const input = {
            id: "1",
        };

        const result = await findProductUseCase.execute(input);

        expect(result).toEqual({
            id: "1",
            name: "Product A",
            price: 100,
        });
        expect(productRepository.find).toHaveBeenCalledWith("1");
    });
});