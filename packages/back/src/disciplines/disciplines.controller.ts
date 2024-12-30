import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Put
} from '@nestjs/common'
import { DisciplinesService } from './disciplines.service'
import { DisciplineDto } from './discipline.dto'

@Controller('disciplines')
export class DisciplinesController {
	constructor(private readonly disciplinesService: DisciplinesService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	async create(@Body() dto: DisciplineDto) {
		return this.disciplinesService.create(dto)
	}

	@Get()
	async getAll() {
		return this.disciplinesService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	async update(@Param('id') id: string, @Body() dto: DisciplineDto) {
		return this.disciplinesService.update(dto, id)
	}

	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.disciplinesService.delete(id)
	}
}
