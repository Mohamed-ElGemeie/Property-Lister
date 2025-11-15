import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CityEnum {
  Cairo = 'Cairo',
  Alexandria = 'Alexandria',
  Giza = 'Giza',
  Luxor = 'Luxor',
  Aswan = 'Aswan',
  PortSaid = 'Port Said',
  Suez = 'Suez',
  ShubraElKheima = 'Shubra El Kheima',
  Tanta = 'Tanta',
  Mansoura = 'Mansoura',
  Hurghada = 'Hurghada',
  SharmElSheikh = 'Sharm El Sheikh',
  Faiyum = 'Faiyum',
  Ismailia = 'Ismailia',
  Minya = 'Minya',
  Damietta = 'Damietta',
  Asyut = 'Asyut',
  BeniSuef = 'Beni Suef',
  Damanhur = 'Damanhur',
  Qena = 'Qena',
  AlMahallahAlKubra = 'Al Mahallah al Kubra',
  ElAlamein = 'El Alamein',
  ShibinAlKawm = 'Shibin al Kawm',
  Siwa = 'Siwa',

  Dubai = 'Dubai',
  AbuDhabi = 'Abu Dhabi',
  Sharjah = 'Sharjah',
  Ajman = 'Ajman',
  RasAlKhaimah = 'Ras Al Khaimah',
  Fujairah = 'Fujairah',
  UmmAlQuwain = 'Umm Al Quwain',
  AlAin = 'Al Ain',
  Kalba = 'Kalba',
  KhorFakkan = 'Khor Fakkan',
  DibbaAlFujairah = 'Dibba Al Fujairah',
  DibbaAlHisn = 'Dibba Al Hisn',
  AlMadam = 'Al Madam',
  AlAwir = 'Al Awir',
  AlManama = 'Al Manama',
}

export enum CountryEnum {
  Egypt = 'Egypt',
  UAE = 'UAE',
}

@Entity('apartment')
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  max_guests: number;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  beds: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude?: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column('text', { array: true, nullable: true })
  images?: string[];

  @Column({ type: 'enum', enum: CityEnum })
  city: CityEnum;

  @Column({ type: 'enum', enum: CountryEnum })
  country: CountryEnum;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedat' })
  updatedAt: Date;
}
