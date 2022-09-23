const { usage } = require('yargs');
const { ShellString } = require('shelljs');

const options = usage('Usage: -n <name>').option('n', {
  alias: 'name',
  describe: '',
  type: 'string',
  demandOption: true,
}).argv;

const routeString = (name) => `
import express from 'express';
import { init } from '../controllers/${name}.controller';

const router = express.Router();

router.get('/', init);

export default router;
`;

const controllerString = (name) => `
export const init = async (req, res) => {
  res.send({
    message: 'Hello from ${name} controller.'
  });
};
`;

const generateFile = (fileName, path, content) => {
  new ShellString(content).to(`./src/${path}s/${fileName}.${path}.js`);
};

generateFile(options.name, 'route', routeString(options.name));
generateFile(options.name, 'controller', controllerString(options.name));
