import { ClassConstructor, plainToInstance } from 'class-transformer';

export function Convertor<T, U>(
  clsModel: ClassConstructor<T>,
  clsConvert: ClassConstructor<U>,
): ClassDecorator {
  return function (constructor: Function) {
    constructor.prototype.toModel = function () {
      return plainToInstance(clsModel, this);
    };

    constructor.prototype.fromModel = function (plain: Partial<T>) {
      Object.assign(this, plainToInstance(clsConvert, plain));
      return this;
    };
  };
}

export class ModelConverter<T> {
  toModel: () => T;
  fromModel: (model: T) => this;
}
