import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function NonEmptyStringsArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'nonEmptyStringsArray',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!Array.isArray(value)) return false;
          return value.every(
            (v) => typeof v === 'string' && v.trim().length > 0,
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of non-empty strings`;
        },
      },
    });
  };
}
