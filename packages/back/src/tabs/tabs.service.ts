import { Injectable, NotFoundException } from '@nestjs/common';
import { TabsDto } from './tabs.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TabsService {
	constructor(private prisma: PrismaService) {}

	async create(data: TabsDto) {
		return this.prisma.tab.create({
			data: {
				...data,
				disciplines: { connect: (data.disciplines || []).map((id) => ({ id })) }
			}
		});
	}

	async getAll() {
		return this.prisma.tab.findMany({
			orderBy: {
				updatedAt: 'asc'
			},
			select: {
				id: true,
				name: true
			}
		});
	}

	async update(data: Partial<TabsDto>, id: string) {
		return this.prisma.tab.update({
			where: { id },
			data: { ...data, disciplines: { set: data.disciplines ? data.disciplines.map((id) => ({ id })) : undefined } }
		});
	}

	async delete(id: string) {
		return this.prisma.tab.delete({
			where: { id },
			include: { disciplines: { include: { subject: true } } }
		});
	}

	async getById(id: string) {
		const tab = await this.prisma.tab.findFirst({ where: { id } });
		if (!tab) throw new NotFoundException('Tab not found');
		return tab;
	}
}
