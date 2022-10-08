import { DataTypes } from 'sequelize';
import database from '../config/db';

const UserGender = database.define(
  'user_gender',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    timestamps: true,
    underscored: true,
  }
);

export default UserGender;
