import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { SerializeInterceptor } from 'src/common/interceptors/serialize.interceptor';
import { CreateOrderDto, OrderSerializeDto, UpdateOrderDto } from './dto';
import { OrderAccountSerializeDto } from './dto/serialize/order-account-serialize.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseInterceptors(new SerializeInterceptor(OrderSerializeDto))
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query() orderQuery: OrderQuery) {
    return await this.ordersService.findAll(orderQuery);
  }

  @UseInterceptors(new SerializeInterceptor(OrderAccountSerializeDto))
  @Get('accounts')
  async findAllByAccounts(@Query() orderQuery: OrderQuery) {
    return await this.ordersService.findAllByAccounts(orderQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
