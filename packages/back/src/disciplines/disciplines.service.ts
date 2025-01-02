import { Injectable, NotFoundException } from '@nestjs/common';
import { DisciplineDto } from './discipline.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DisciplinesService {
	constructor(private prisma: PrismaService) {}

	async create(data: DisciplineDto) {
		await this.updateCoord(null, data.subject);
		return this.prisma.discipline.create({
			data: {
				...data,
				subject: {
					connect: data.subject.map((id) => ({ id }))
				}
			},
			include: {
				subject: true
			}
		});
	}

	async getAll() {
		return this.prisma.discipline.findMany({ include: { subject: true } });
	}

	async update(data: DisciplineDto, id: string) {
		await this.updateCoord(id, data.subject);
		return this.prisma.discipline.update({
			where: { id: id },
			data: {
				...data,
				subject: { set: data.subject.map((item) => ({ id: item })) }
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

	async updateCoord(disciplineId: string | null, subject: string[]) {
		const subjects = await this.prisma.subject.findMany({ where: { id: { in: subject } } });

		const maxX = await this.getMaxXbyY(disciplineId, 0);

		let currentMaxX = maxX._max.x;
		if (currentMaxX !== 0) currentMaxX++;
		const updates = [];
		for (let i = 0; i < subjects.length; i++) {
			if (subjects[i].disciplineId !== disciplineId || disciplineId === null) {
				updates.push(this.prisma.subject.update({ where: { id: subjects[i].id }, data: { y: 0, x: currentMaxX } }));
				currentMaxX++;
			}
		}

		return this.prisma.$transaction(updates);
	}

	async getMaxXbyY(disciplineId: string, y: number = 0) {
		return this.prisma.subject.aggregate({ _max: { x: true }, where: { y, disciplineId } });
	}
}
