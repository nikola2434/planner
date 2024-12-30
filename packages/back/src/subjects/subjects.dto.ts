import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

export class SubjectDto {
	@IsString()
	@IsOptional()
	name: string

	@IsNumber()
	@IsOptional()
	@Min(0)
	countLectures?: number

	@IsNumber()
	@IsOptional()
	@Min(0)
	countSeminars?: number

	@IsNumber()
	@IsOptional()
	@Min(0)
	countLaboratory?: number

	@IsNumber()
	@IsOptional()
	@Min(0)
	hoursLaboratory?: number

	@IsNumber()
	@IsOptional()
	@Min(0)
	countSelfWork?: number

	@IsNumber()
	@IsOptional()
	@Min(0)
	countText?: number

	@IsNumber()
	@IsOptional()
	@Min(0)
	countExam?: number

	@IsString()
	@IsOptional()
	disciplineId: string

	@IsNumber()
	@Min(0)
	x: number

	@IsNumber()
	@Min(0)
	@Max(12)
	y: number
}

export class moveSubjectDto {
	@IsNumber()
	@Min(0)
	x: number

	@IsNumber()
	@Min(0)
	@Max(12)
	y: number

	@IsString()
	@IsOptional()
	disciplineId: string
}
