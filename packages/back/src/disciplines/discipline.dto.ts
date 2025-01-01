import { IsArray, IsHexColor, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class DisciplineDto {
	@IsString()
	@IsOptional()
	name: string

	@IsOptional()
    @IsHexColor()
	color?: string

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	subject?: string[]
}
