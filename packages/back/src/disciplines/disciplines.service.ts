import { Injectable, NotFoundException } from '@nestjs/common';
import { DisciplineDto } from './discipline.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DisciplinesService {
	constructor(private prisma: PrismaService) {}

	async create(data: DisciplineDto) {
		return this.prisma.discipline.create({
			data: {
				...data,
				subject: { connect: data.subject.map((id) => ({ id })) }
			}
		});
	}

	async getAll() {
		return this.prisma.discipline.findMany({ include: { subject: true } });
	}

	async update(data: DisciplineDto, id: string) {
		return this.prisma.discipline.update({
			where: { id: id },
			data: {
				...data,
				subject: { connect: data.subject.map((id) => ({ id })) }
			},
			include: { subject: true }
		});
	}

	async delete(id: string) {
		return this.prisma.discipline.delete({
			where: {
				id
			},
			include: { subject: true }
		});
	}

	async getById(id: string) {
		return this.prisma.discipline.findFirst({
			where: { id },
			include: { subject: true }
		});
	}

	async removeSubject(disciplineId: string, subjectId: string) {
		const discipline = await this.getById(disciplineId);
		if (!discipline) throw new NotFoundException('Discipline not found');

		return this.prisma.discipline.update({
			where: { id: disciplineId },
			data: {
				subject: { disconnect: { id: subjectId } }
			}
		});
	}

	async addSubject(disciplineId: string, subjectId: string) {
		const discipline = await this.getById(disciplineId);
		if (!discipline) throw new NotFoundException('Discipline not found');

		return this.prisma.discipline.update({
			where: { id: disciplineId },
			data: {
				subject: { connect: { id: subjectId } }
			}
		});
	}
}
