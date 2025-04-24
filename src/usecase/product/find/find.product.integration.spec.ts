import { Sequelize } from "sequelize-typescript";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration Test FindProductUseCase", () => {
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
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should find a product by id", async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        };

        const result = await findProductUseCase.execute(input);

        expect(result).toEqual({
            id: "1",
            name: "Product A",
            price: 100,
        });
    });
});