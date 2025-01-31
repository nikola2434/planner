import { Module } from '@nestjs/common'
import { DisciplinesModule } from './disciplines/disciplines.module'
import { SubjectsModule } from './subjects/subjects.module'
import { TabsModule } from './tabs/tabs.module';

@Module({
	imports: [DisciplinesModule, SubjectsModule, TabsModule]
})
export class AppModule {}
