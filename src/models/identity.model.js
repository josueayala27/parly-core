import { DataTypes } from 'sequelize';
import database from '../config/db';

const Identity = database.define(
  'identity',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    token: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    identity_provider_id: {
      type: DataTypes.UUID,
    },
  },
  { timestamps: false, underscored: true }
);

export default Identity;
