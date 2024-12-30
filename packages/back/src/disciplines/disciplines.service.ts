import { Injectable, NotFoundException } from "@nestjs/common";
import { DisciplineDto } from "./discipline.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class DisciplinesService {
  constructor(private prisma: PrismaService) {}

  async create(data: DisciplineDto) {
    return this.prisma.discipline.create({
      data: {
        ...data,
        subject: { connect: data.subject.map((id) => ({ id })) },
      },
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
        subject: { connect: data.subject.map((id) => ({ id })) },
      },
      include: { subject: true },
    });
  }

  async delete(id: string) {
    return this.prisma.discipline.delete({
      where: {
        id,
      },
      include: { subject: true },
    });
  }

  async getById(id: string) {
    return this.prisma.discipline.findFirst({
      where: { id },
      include: { subject: true },
    });
  }

  async removeSubject(
    disciplineId: string,
    subjectId: string,
    prevX: number,
    prevY: number
  ) {
    const discipline = await this.getById(disciplineId);
    if (!discipline) throw new NotFoundException("Discipline not found");

    const updateSubjects: string[] = [];
    let isDeleteColumn = true;

    for (let i = 0; i < discipline.subject.length; i++) {
      const subject = discipline.subject[i];
      if (
        subject.y === prevY &&
        subjectId !== subject.id &&
        subject.x > prevX
      ) {
        updateSubjects.push(subject.id);
      }
      if (subject.x === prevX && subjectId !== subject.id) {
        isDeleteColumn = false;
      }
    }

    if (discipline.columns <= 1) {
      isDeleteColumn = false;
    }

    await this.prisma.subject.updateMany({
      where: { id: { in: updateSubjects } },
      data: { x: { decrement: 1 } },
    });

    return this.prisma.discipline.update({
      where: { id: disciplineId },
      data: {
        subject: { disconnect: { id: subjectId } },
        columns: isDeleteColumn ? discipline.columns - 1 : discipline.columns,
      },
    });
  }

  async addSubject(
    disciplineId: string,
    subjectId: string,
    x: number,
    y: number
  ) {
    const discipline = await this.getById(disciplineId);
    if (!discipline) throw new NotFoundException("Discipline not found");

    const updateSubjects: string[] = [];

    for (let i = 0; i < discipline.subject.length; i++) {
      const subject = discipline.subject[i];
      if (subject.y === y && subjectId !== subject.id && subject.x >= x) {
        updateSubjects.push(subject.id);
      }
    }

    await this.prisma.subject.updateMany({
      where: { id: { in: updateSubjects } },
      data: { x: { increment: 1 } },
    });

    return this.prisma.discipline.update({
      where: { id: disciplineId },
      data: {
        subject: { connect: { id: subjectId } },
        columns: discipline.subject.find((item) => item.id === subjectId)
          ? discipline.columns
          : discipline.columns + 1,
      },
    });
  }
}
