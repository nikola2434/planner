import { IsArray, IsHexColor, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class DisciplineDto {
	@IsString()
	@IsOptional()
	name: string

	@IsOptional()
    @IsHexColor()
	color?: string

	@IsNumber()
	@IsOptional()
	@Min(1)
	columns?: number

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	subject?: string[]
}
