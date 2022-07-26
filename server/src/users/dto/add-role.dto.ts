import {IsString} from "class-validator";

export class AddRoleDto {
    @IsString({message: "Должно быть строков"})
    readonly value: string;

    readonly userId: number;
}