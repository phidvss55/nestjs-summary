import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CategoryModule, ArticleModule, MenuModule, TransactionModule, OrderModule, UserModule, ProductModule]
})
export class BackendModule {}
