import { Module } from '@nestjs/common';
import { TabsService } from './tabs.service';
import { TabsController } from './tabs.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [TabsController],
	providers: [TabsService, PrismaService]
})
export class TabsModule {}
