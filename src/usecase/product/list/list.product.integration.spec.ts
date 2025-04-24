import { Sequelize } from "sequelize-typescript";
import ListProductUseCase from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration Test ListProductUseCase", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([ProductModel]);
        
        await sequelize.sync();

        await ProductModel.create({
            id: "1",
            name: "Product A",
            price: 100,
        });

        await ProductModel.create({
            id: "2",
            name: "Product B",
            price: 200,
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        const input = {};

        const result = await listProductUseCase.execute(input);

        expect(result).toEqual({
            products: [
                { id: "1", name: "Product A", price: 100 },
                { id: "2", name: "Product B", price: 200 },
            ],
        });
    });
});