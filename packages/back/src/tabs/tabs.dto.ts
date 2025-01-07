import { IsArray, IsOptional, IsString } from 'class-validator';

export class TabsDto {
	@IsString()
	name: string;

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	disciplines?: string[];
}
