import { DataTypes } from 'sequelize';
import database from '../config/db';
import AuthProvider from './auth_provider.model';
import User from './user.model';

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
      references: { model: User, key: 'id' },
    },
    auth_provider_id: {
      type: DataTypes.UUID,
      references: { model: AuthProvider, key: 'id' },
    },
  },
  { timestamps: true, underscored: true }
);

export default PersonalAccessToken;
