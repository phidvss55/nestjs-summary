import { InjectRepository } from '@nestjs/typeorm';
import Option from '../entities/option.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from '../dto/createOption.dto';
import Question from '../entities/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async creatOption(option: CreateOptionDto, question: Question) {
    const newOption = await this.optionRepository.save({
      text: option.text,
      isCorrect: option.isCorrect,
    });

    question.options = [...question.options, newOption];
    await question.save();

    return newOption;
  }
}
