import { Injectable, NotFoundException } from '@nestjs/common';
import { moveSubjectDto, SubjectDto } from './subjects.dto';
import { PrismaService } from 'src/prisma.service';
import { DisciplinesService } from 'src/disciplines/disciplines.service';

@Injectable()
export class SubjectsService {
	constructor(
		private prisma: PrismaService,
		private DisciplinesService: DisciplinesService
	) {}

	async create(data: SubjectDto) {
		let x = 0;
		let y = 0;
		if (data.disciplineId) {
			const maxX = await this.DisciplinesService.getMaxXbyY(data.disciplineId, y);
			let currentX = maxX._max.x;
			if (currentX) currentX++;

			x = currentX;
		}
		return this.prisma.subject.create({ data: { ...data, x, y } });
	}

	async update(data: SubjectDto, id: string) {
		let x = 0;
		let y = 0;
		if (data.disciplineId) {
			const maxX = await this.DisciplinesService.getMaxXbyY(data.disciplineId, y);
			let currentX = maxX._max.x;
			if (currentX) currentX++;

			x = currentX;
		}
		return this.prisma.subject.update({ where: { id: id }, data });
	}

	async delete(id: string) {
		return this.prisma.subject.delete({
			where: {
				id
			}
		});
	}

	async getById(id: string) {
		return this.prisma.subject.findFirst({ where: { id } });
	}

	async getAll() {
		return this.prisma.subject.findMany();
	}

	async move(dto: moveSubjectDto, id: string) {
		const { disciplineId, x, y } = dto;

		const prevSubject = await this.getById(id);
		if (!prevSubject) throw new NotFoundException('Subject not found');

		const prevDisciplineId = prevSubject.disciplineId;

		if (disciplineId && prevDisciplineId !== disciplineId) {
			await this.DisciplinesService.removeSubject(prevDisciplineId, id);
		}

		await this.DisciplinesService.addSubject(disciplineId || prevSubject.disciplineId, id);

		return this.prisma.subject.update({
			where: { id },
			data: { disciplineId, x, y }
		});
	}
}
