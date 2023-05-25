import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from './entities/inventory.entity';
import { Model } from 'mongoose';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<Inventory>,
  ) {}

  async create(invenDTO: CreateInventoryDto, user: Inventory) {
    const inventoryData = Object.assign(invenDTO, { user: user._id });
    const newStudent = new this.inventoryModel(inventoryData);

    return newStudent.save();
  }

  async findAll(query: any) {
    const data = await this.inventoryModel.find().populate('user');

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
