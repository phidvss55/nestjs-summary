import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrderModule } from './order/order.module';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
// import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    TransactionModule, 
    OrderModule, 
    ArticleModule, 
    MenuModule, 
    CategoryModule
  ],
  controllers: []
})
export class FrontendModule {}
