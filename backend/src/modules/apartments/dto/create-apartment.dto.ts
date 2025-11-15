import {
  IsEnum,
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  MinLength,
  Max,
} from 'class-validator';
import { CityEnum, CountryEnum } from '../entities/apartment.entity';
import { NonEmptyStringsArray } from '../../../decorators/non-empty-strings-array.decorator';

export class CreateApartmentDto {
  @IsString()
  @MinLength(2, { message: 'name must be at least 2 characters' })
  name: string;

  @IsInt()
  @Min(1, { message: 'max_guests must be greater than 0' })
  max_guests: number;

  @IsInt()
  @Min(0, { message: 'bedrooms must be 0 or more' })
  bedrooms: number;

  @IsInt()
  @Min(0, { message: 'bathrooms must be 0 or more' })
  bathrooms: number;

  @IsInt()
  @Min(0, { message: 'beds must be 0 or more' })
  beds: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({}, { message: 'longitude must be a number' })
  @Min(-180, { message: 'longitude must be >= -180' })
  @Max(180, { message: 'longitude must be <= 180' })
  longitude: number;

  @IsNumber({}, { message: 'latitude must be a number' })
  @Min(-90, { message: 'latitude must be >= -90' })
  @Max(90, { message: 'latitude must be <= 90' })
  latitude: number;

  @IsNumber()
  @Min(0.01, { message: 'price must be greater than 0' })
  price: number;

  @IsOptional()
  @IsArray()
  @NonEmptyStringsArray({
    message: 'images must be an array of non-empty strings',
  })
  images?: string[];

  @IsEnum(CityEnum)
  city: CityEnum;

  @IsEnum(CountryEnum)
  country: CountryEnum;
}
