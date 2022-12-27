import { Type } from "class-transformer"
import {
    IsNumber,
    IsNumberString,
    IsEmail,
    IsNotEmpty,
    IsString,
    ValidateNested,
    IsNotEmptyObject,
} from "class-validator"
import { CreateAddressDto } from "./address.dtos"
export class CreateCustomerDto {
    @IsNumberString()
    id: number;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto
}