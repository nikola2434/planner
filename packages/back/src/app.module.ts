import { Module } from '@nestjs/common'
import { DisciplinesModule } from './disciplines/disciplines.module'
import { SubjectsModule } from './subjects/subjects.module'

@Module({
	imports: [DisciplinesModule, SubjectsModule]
})
export class AppModule {}
