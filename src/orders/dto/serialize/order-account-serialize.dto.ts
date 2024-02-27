import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class OrderAccountSerializeDto {
  @Expose()
  @Transform((params) => params.obj._id.toString())
  readonly _id: ObjectId;

  @Expose()
  @Transform(({ obj }) => {
    const netAmmount = obj.products.reduce((acc: number, product: any) => {
      return acc + product.unitPrice * product.quantity;
    }, 0);
    return netAmmount;
  })
  readonly netAmmount: number;

  @Expose()
  @Transform(({ obj }) => {
    const vatAmmount = obj.products.reduce((acc: number, product: any) => {
      return acc + (product.unitPrice * product.quantity * product.vat) / 100;
    }, 0);
    return vatAmmount;
  })
  readonly vatAmmount: number;

  @Expose()
  @Transform(({ obj }) => {
    const totalAmmount =
      obj.totalBill -
      obj.discount +
      obj.products.reduce((acc: number, product: any) => {
        return acc + (product.unitPrice * product.quantity * product.vat) / 100;
      }, 0);
    return totalAmmount;
  })
  readonly totalAmmount: number;

  @Expose()
  readonly createdAt: Date;
}
