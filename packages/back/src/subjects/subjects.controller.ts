import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
} from "@nestjs/common";
import { SubjectsService } from "./subjects.service";
import { moveSubjectDto, SubjectDto } from "./subjects.dto";

@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectService: SubjectsService) {}

  @UsePipes(new ValidationPipe())
  @Put("move/:id")
  @HttpCode(200)
  async move(@Param("id") id: string, @Body() dto: moveSubjectDto) {
    return this.subjectService.move(dto, id);
  }

  @Delete(":id")
  @HttpCode(200)
  async delete(@Param("id") id: string) {
    return this.subjectService.delete(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  async create(@Body() dto: SubjectDto) {
    return this.subjectService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(":id")
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() dto: SubjectDto) {
    return this.subjectService.update(dto, id);
  }
}
