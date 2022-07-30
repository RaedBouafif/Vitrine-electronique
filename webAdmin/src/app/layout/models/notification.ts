import { NotificationTypeConverter } from '@app/core/mapper/converters/NotificationTypeConverter';
import { NotificationPriorityConverter } from '@app/core/mapper/converters/NotificationPriorityConverter';

export class Notification {
  description: string;
  time: string;

  @NotificationTypeConverter()
  type: string;

  @NotificationPriorityConverter()
  priority: string;

  constructor() {}
}
