import { DataTypes } from 'sequelize';
import database from '../config/db';

const PersonalAccessToken = database.define(
  'personal_access_token',
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
    auth_provider_id: {
      type: DataTypes.UUID,
    },
  },
  { timestamps: true, underscored: true }
);

export default PersonalAccessToken;
