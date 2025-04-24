import CreateProductUseCase from "./create.product.usecase";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

const MockProductRepository = (): ProductRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    };
};

describe("Unit Test CreateProductUseCase", () => {
    it("should create a product", async () => {
        const productRepository = MockProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product A",
            price: 100,
        };

        const result = await createProductUseCase.execute(input);

        expect(result).toEqual({
            id: expect.any(String),
            name: "Product A",
            price: 100,
        });
        expect(productRepository.create).toHaveBeenCalled();
    });
});