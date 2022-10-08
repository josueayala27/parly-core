import { DataTypes } from 'sequelize';
import database from '../config/db';

const AuthProvider = database.define(
  'auth_provider',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default AuthProvider;
