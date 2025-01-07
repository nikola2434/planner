import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Put
} from '@nestjs/common';
import { TabsService } from './tabs.service';
import { TabsDto } from './tabs.dto';

@Controller('tabs')
export class TabsController {
	constructor(private readonly tabsService: TabsService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	async create(@Body() dto: TabsDto) {
		return this.tabsService.create(dto);
	}

	@Get('byId/:id')
	async getById(@Param('id') id: string) {
		return this.tabsService.getById(id);
	}

	@Get()
	async getTabs() {
		return this.tabsService.getAll();
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	async update(@Param('id') id: string, @Body() dto: TabsDto) {
		return this.tabsService.update(dto, id);
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	@HttpCode(200)
	async updatePatch(@Param('id') id: string, @Body() dto: Partial<TabsDto>) {
		return this.tabsService.update(dto, id);
	}

	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.tabsService.delete(id);
	}
}
