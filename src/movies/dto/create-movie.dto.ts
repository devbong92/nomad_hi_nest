import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    readonly title: string;
    
    @IsNumber()
    readonly year: number;

    @IsString({ each:true })  // 모든 요소를 하나씩 검사한다는 것.
    readonly genres: string[];
}