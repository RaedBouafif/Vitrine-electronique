import { Logger } from '@app/core/logger.service';
const logger = new Logger('NotificationTypeConverter');

/**
 * Uses a decorator for mapping an attribute, this is useful when you want to change the incoming values from the response
 * an use customized values, since the ones in the response are not useful.0
 *
 * For example:
 * @NotificationPriorityConverter()
 * priority: string;
 *
 * In tis particular case we want to change the values coming from the response which have no meaning for displaying them
 * We want to place our own values which in this case will map to a css classes we'll place to change the color acording to the priority
 */
export function NotificationPriorityConverter() {
  return function NotificationTypeConverter(target: any, key: string) {
    const setter = function(newVal: any) {
      logger.debug(` ==> Setter: ${key} => ${newVal}`);
      this.__priority = newVal;
      logger.debug(`This:`, this);
    };

    const getter = function() {
      logger.debug(` ==> Getter: ${key} => ${this.__priority}`);
      let newVal = this.__priority;

      switch (this.__priority) {
        case 'urgent':
          newVal = 'danger';
          break;
        case 'high':
          newVal = 'warning';
          break;
        case 'normal':
          newVal = 'dark';
          break;
        case 'medium':
          newVal = 'info';
          break;
        case 'low':
          newVal = 'success';
          break;
      }

      return newVal;
    };

    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  };
}
