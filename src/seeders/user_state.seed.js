import chalk from 'chalk';
import userState from '../models/user_state.model';

const createUserGenders = async (...states) => {
  const mapStates = states.map((state) => ({ state }));
  const seed = await userState.bulkCreate(mapStates);
  console.log(
    `${chalk.green('•')} Added ${seed.length} columns for user_states table.`
  );
};

createUserGenders('Online', 'Idle', 'Invisible');
