import ListProductUseCase from "./list.product.usecase";
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

describe("Unit Test ListProductUseCase", () => {
    it("should list all products", async () => {
        const productRepository = MockProductRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        const products = [
            new Product("1", "Product A", 100),
            new Product("2", "Product B", 200),
        ];
        productRepository.findAll = jest.fn().mockResolvedValue(products);

        const input = {};

        const result = await listProductUseCase.execute(input);

        expect(result).toEqual({
            products: [
                { id: "1", name: "Product A", price: 100 },
                { id: "2", name: "Product B", price: 200 },
            ],
        });
        expect(productRepository.findAll).toHaveBeenCalled();
    });
});