import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly unitPrice: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly vat: number;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly stock: number;
}
