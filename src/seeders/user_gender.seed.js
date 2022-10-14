import chalk from 'chalk';
import UserGender from '../models/user_gender.model';

const createUserGenders = async (...genders) => {
  const mapGenders = genders.map((gender) => ({ gender }));
  const seed = await UserGender.bulkCreate(mapGenders);
  console.log(
    `${chalk.green('•')} Added ${seed.length} columns for user_genders table.`
  );
};

createUserGenders('Masculine', 'Feminine');
