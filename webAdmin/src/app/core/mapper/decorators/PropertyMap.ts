import { Logger } from '@app/core/logger.service';
const logger = new Logger('PropertyMap');

/**
 * PropertyMap decorator, is used when you need to name your model attribute in a different wa than the returned json response
 *
 * For example:
 * You have a json response with a 'title' attribute, but your model uses 'name' attribute
 * You should use your model attribute name in your view.
 *
 * @PropertyMap('title')
 * name: string;
 *
 * This will display the value in 'name' attribute which will map to the 'title' from the json
 * {{ model.name }}
 *
 * @param sourceProperty
 */
export function PropertyMap(sourceProperty: string) {
  logger.debug('sourceProperty', sourceProperty);

  return function(target: any, key: string) {
    logger.debug('PM.Target', target, key);

    if (!target.constructor._propertyMap) {
      target.constructor._propertyMap = {};
    }

    target.constructor._propertyMap[key] = sourceProperty;
  };
}
