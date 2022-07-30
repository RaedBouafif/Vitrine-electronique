
import { env } from './.env';
import { Env } from './ENV';

export const environment = {
  production: true,
  version: env.npm_package_version,
  serverUrl: Env.getHost(),
};
