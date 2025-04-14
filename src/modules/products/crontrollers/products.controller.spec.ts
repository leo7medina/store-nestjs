import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from 'src/modules/products/services/products.service';

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductsService],
        }).compile();

        //parseIntLPipe = module.get(ParseIntLPipe);
        controller = module.get(ProductsController);
        service = module.get(ProductsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        //expect(service).toBeDefined();
    });

    // it('should return a product by id', () => {
    //     const result = controller.getProduct(1); // ← le pasás el número directo
    //     expect(service.findOne).toHaveBeenCalledWith(1);
    // });
});
