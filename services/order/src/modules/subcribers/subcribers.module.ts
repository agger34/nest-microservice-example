import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SubcribersController } from './subcribers.controller';

@Module({
    imports: [CqrsModule],
    controllers: [SubcribersController]
})

export class SubcribersModule { }