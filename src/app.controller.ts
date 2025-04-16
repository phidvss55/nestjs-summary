import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Default')
export class AppController {
  constructor(
    private readonly appService: AppService, // @Inject(CACHE_MANAGER) // private readonly cacheManager: Cache,
  ) {}

  @Get('')
  async sayHello() {
    /*await this.cacheManager.set('cached_item', { value: 'ola' });
    const item = this.cacheManager.get('cached_item');
    console.log('item', item);*/ 

    return this.appService.getHello();
  }
}
