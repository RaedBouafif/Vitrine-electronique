import { Logger } from '../logger.service';
const logger = new Logger('ModelMapper');

/**
 * The ModelMapper is useful when you have defined any sort of Decorators for a particular
 * attribute in any model class.
 *
 * The Mapper will take care of using the decorators or property mapping you defined.
 *
 * By using the ApiService it will be done automatically, you just call any method defined on it.
 */
export class ModelMapper<T> {
  _propertyMapping: any;
  _target: any;

  constructor(type: { new (): T }) {
    this._target = new type();
    logger.debug('  Target', this._target);
    this._propertyMapping = this._target.constructor._propertyMap;
    logger.debug('  PropertyMapping', this._propertyMapping);
  }

  // TODO: pass a list of attributes to map: whitelisting
  /**
   * Creates de generic mapping for the type being specified.
   */
  map(source: any) {
    logger.debug('Source', source);
    logger.debug('Keys', Object.keys(this._target));

    Object.keys(this._target).forEach(key => {
      logger.debug('  key', key);
      const mappedKey = this._propertyMapping[key];

      logger.debug('  mappedKey', mappedKey);
      if (mappedKey) {
        this._target[key] = source[mappedKey];
      } else {
        this._target[key] = source[key];
      }
    });

    Object.keys(source).forEach(key => {
      const targetKeys = Object.keys(this._target);

      if (targetKeys.indexOf(key) === -1) {
        logger.debug(` --> target.${key}`, source[key]);
        this._target[key] = source[key];
      }
    });

    return this._target;
  }
}
