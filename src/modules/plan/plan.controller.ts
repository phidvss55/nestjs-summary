import { Controller, Get } from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get('/')
  getList() {
    return this.planService.getPlans().then((plans) => plans.map((p) => p.toJson()));
  }
}
