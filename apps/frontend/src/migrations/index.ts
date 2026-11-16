import * as migration_20261104_223816_init from './20261104_223816_init';
import * as migration_20261116_193657_cms_content from './20261116_193657_cms_content';
import * as migration_20261116_202851_period_timezones from './20261116_202851_period_timezones';

export const migrations = [
  {
    up: migration_20261104_223816_init.up,
    down: migration_20261104_223816_init.down,
    name: '20261104_223816_init',
  },
  {
    up: migration_20261116_193657_cms_content.up,
    down: migration_20261116_193657_cms_content.down,
    name: '20261116_193657_cms_content',
  },
  {
    up: migration_20261116_202851_period_timezones.up,
    down: migration_20261116_202851_period_timezones.down,
    name: '20261116_202851_period_timezones'
  },
];
