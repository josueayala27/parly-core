import { usage } from 'yargs';
import fs from 'fs';
import chalk from 'chalk';

const options = usage('Usage: -s <seed>').option('s', {
  alias: 'seed',
  describe: '',
  type: 'string',
  demandOption: true,
}).argv;

const init = async () => {
  if (!options.seed) {
    console.log(`${chalk.green('•')} Running all seeders.`);
    fs.readdir(__dirname, (_, files) => {
      const filesFiltered = files.filter((filename) => filename !== 'index.js');
      filesFiltered.forEach((a) => {
        // eslint-disable-next-line
        require(`./${a}`);
      });
    });
  } else {
    console.log(`${chalk.green('•')} Running ${options.seed} seed.`);
    // eslint-disable-next-line
    require(`./${options.seed}.seed.js`);
  }
};

init();
