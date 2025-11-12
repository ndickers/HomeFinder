import { Module } from '@nestjs/common';
import { PricingTypeService } from './pricing-type.service';
import { PricingTypeController } from './pricing-type.controller';

@Module({
  controllers: [PricingTypeController],
  providers: [PricingTypeService],
})
export class PricingTypeModule {}
