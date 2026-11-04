import * as migration_20261104_223816_init from './20261104_223816_init';

export const migrations = [
  {
    up: migration_20261104_223816_init.up,
    down: migration_20261104_223816_init.down,
    name: '20261104_223816_init'
  },
];
