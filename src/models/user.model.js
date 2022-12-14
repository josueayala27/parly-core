import { DataTypes } from 'sequelize';
import database from '../config/db';

const User = database.define(
  'user',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_confirmed_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    last_sign_in_at: {
      type: DataTypes.TIME,
      defaultValue: new Date(),
    },
    raw_app_meta_data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    user_gender_id: {
      type: DataTypes.UUID,
    },
    created_at: {
      type: DataTypes.TIME,
    },
    updated_at: {
      type: DataTypes.TIME,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: [
          'raw_app_meta_data',
          'user_gender_id',
          'createdAt',
          'updatedAt',
        ],
      },
    },
    timestamps: true,
    underscored: true,
  }
);

export default User;
