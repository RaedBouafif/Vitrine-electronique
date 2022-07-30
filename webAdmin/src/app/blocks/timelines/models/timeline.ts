import { ColorScheme } from '@app/core';

export interface TimeLineModel {
  id: number;
  title: string;
  description: string;
  priority: ColorScheme;
  time: TimeModel;
  done?: boolean;
}

export interface TimeModel {
  hour: number;
  minutes: number;
  period: 'am' | 'pm';
}
