import { IsArray, IsHexColor, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class DisciplineDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsHexColor()
	color?: string;

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	subject?: string[];

	@IsNumber()
	@IsOptional()
	@Min(0)
	order?: number;
}
