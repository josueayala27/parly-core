import { DataTypes } from 'sequelize';
import database from '../config/db';

const UserState = database.define('user_state', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserState;
