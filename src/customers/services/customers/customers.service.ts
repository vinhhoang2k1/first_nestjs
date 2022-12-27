import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/customers.dtos';
import {Customer} from "../../types/customer"
@Injectable()
export class CustomersService {
    private customers: Customer[] = [
        {
            id: 1,
            email: 'nam@gmail.com',
            name: 'nam',            
        },
        {
            id: 2,
            email: 'vinh@gmail.com',
            name: 'vinh',            
        },
        {
            id: 3,
            email: 'hoang@gmail.com',
            name: 'hoang',            
        },
    ]
    findCustomerById(id: number) {
        const result = this.customers.find((item) => item.id === id)
        return result;
    }
    findCustomerByName(name: string) {
        const result = this.customers.find((item) => item.name === name)
        return result;
    }
    
    creatCustomer( customerDto: CreateCustomerDto ) {
        this.customers.push(customerDto)
    }
    getAllCustomer() {
        return this.customers
    }

}
