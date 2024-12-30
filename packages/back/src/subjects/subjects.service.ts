import { Injectable, NotFoundException } from "@nestjs/common";
import { moveSubjectDto, SubjectDto } from "./subjects.dto";
import { PrismaService } from "src/prisma.service";
import { DisciplinesService } from "src/disciplines/disciplines.service";

@Injectable()
export class SubjectsService {
  constructor(
    private prisma: PrismaService,
    private DisciplinesService: DisciplinesService
  ) {}

  async create(data: SubjectDto) {
    return this.prisma.subject.create({ data });
  }

  async update(data: SubjectDto, id: string) {
    return this.prisma.subject.update({ where: { id: id }, data });
  }

  async delete(id: string) {
    return this.prisma.subject.delete({
      where: {
        id,
      },
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
    if (!prevSubject) throw new NotFoundException("Subject not found");

    const prevDisciplineId = prevSubject.disciplineId;

    if (disciplineId && prevDisciplineId !== disciplineId) {
      await this.DisciplinesService.removeSubject(
        prevDisciplineId,
        id,
        prevSubject.x,
        prevSubject.y
      );
    }

    await this.DisciplinesService.addSubject(
      disciplineId || prevSubject.disciplineId,
      id,
      x,
      y
    );

    return this.prisma.subject.update({
      where: { id },
      data: { disciplineId, x, y },
    });
  }
}
