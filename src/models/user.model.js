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
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'full_name',
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
    emailConfirmedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'email_confirmed_at',
    },
    lastSignInAt: {
      type: DataTypes.TIME,
      defaultValue: new Date(),
      field: 'last_sign_in_at',
    },
    rawAppMetaData: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: 'raw_app_meta_data',
    },
  },
  {
    defaultScope: {
      attributes: [
        'id',
        'full_name',
        'email',
        'avatar',
        'phone',
        'email_confirmed_at',
        'last_sign_in_at',
      ],
    },
    timestamps: false,
    underscored: true,
  }
);

export default User;
