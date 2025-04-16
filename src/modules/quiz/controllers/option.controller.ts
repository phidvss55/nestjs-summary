import { Body, ValidationPipe, Controller } from '@nestjs/common';
import { Post, UsePipes } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateOptionDto } from '../dto/createOption.dto';
import Option from '../entities/option.entity';

@Injectable()
@ApiTags('Options')
@Controller('options')
export class OptionController {
  constructor(private optionService: OptionService, private questionService: QuestionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'The option that got created',
    type: Option,
  })
  async saveOptionToQuestion(@Body() createOption: CreateOptionDto) {
    const question = await this.questionService.findQuestionById(createOption.questionId);
    const option = await this.optionService.creatOption(createOption, question);
    return { question, createOption, option };
  }
}
