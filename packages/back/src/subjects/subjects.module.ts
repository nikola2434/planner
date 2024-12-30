import { Module } from '@nestjs/common'
import { SubjectsService } from './subjects.service'
import { SubjectsController } from './subjects.controller'
import { PrismaService } from 'src/prisma.service'
import { DisciplinesService } from 'src/disciplines/disciplines.service'

@Module({
	controllers: [SubjectsController],
	providers: [SubjectsService, PrismaService, DisciplinesService]
})
export class SubjectsModule {}
