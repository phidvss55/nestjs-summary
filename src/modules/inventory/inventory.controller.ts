import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Inventory } from './entities/inventory.entity';
import { JwtAuthGuard } from '../authenticate/guards/jwtAuth.guard';

@Controller('inventories')
@ApiTags('Inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: Inventory, isArray: true })
  create(@Body() reqDto: CreateInventoryDto, @Req() req): Promise<Inventory> {
    return this.inventoryService.create(reqDto, req.user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Get listing of inventories', type: Inventory, isArray: true })
  async findAll(@Query() query): Promise<Inventory[]> {
    return await this.inventoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
