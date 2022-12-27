import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Res,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/customers.dtos';
import { CustomersService } from "../../services/customers/customers.service"
@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) { };
    @Get(':id')
    getCustomer(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const customer = this.customerService.findCustomerById(id)
        if (customer) {
            res.send(customer)
        } else {
            res.status(400).send({
                message: 'customer not found'
            })
        }
    }
    @Get('search/:name')
    searchCustomerByid(@Param('name') name: string,
        @Res() res: Response
    ) {
        const customer = this.customerService.findCustomerByName(name) // mất 10p để chạy xong 
        if (customer) {
            return customer
        } else {
            throw new HttpException('customer not found', HttpStatus.BAD_REQUEST)
        }
    }
    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto: CreateCustomerDto, @Res() res: Response) {
        this.customerService.creatCustomer(createCustomerDto)
        res.send({
            data: createCustomerDto
        })
    }
    @Get('')
    getAllCustomer() {
        return this.customerService.getAllCustomer()
    }
} 
