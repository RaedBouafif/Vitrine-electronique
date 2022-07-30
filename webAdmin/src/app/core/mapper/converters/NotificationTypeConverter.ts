import { Logger } from '@app/core/logger.service';
const logger = new Logger('NotificationIconConverter');

/**
 * Uses a decorator for mapping an attribute, this is useful when you want to change the incoming values from the response
 * an use customized values, since the ones in the response are not useful.0
 *
 * For example:
 * @NotificationTypeConverter()
 * type: string;
 *
 * In tis particular case we want to change the values coming from the response which have no meaning for displaying them
 * We want to place our own values which in this case will map to specific 'icon names' we'll display accordingly the type of the notification
 */
export function NotificationTypeConverter() {
  return function(target: any, key: string) {
    const setter = function(newValue: string) {
      logger.debug(` ==> Setter`, target);
      this.__type = newValue;
      logger.debug(`This:`, this);
    };

    const getter = function() {
      logger.debug(` ==> Getter`, target);
      let newVal = this.__type;

      switch (this.__type) {
        case 'notification':
          newVal = 'volume-2';
          break;
        case 'achievement':
          newVal = 'award';
          break;
        case 'general':
          newVal = 'arrow-right-circle';
          break;
        case 'comment':
          newVal = 'message-circle';
          break;
        case 'support':
          newVal = 'life-buoy';
          break;
        case 'new':
          newVal = 'file-text';
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
