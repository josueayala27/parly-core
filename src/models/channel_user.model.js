import { DataTypes } from 'sequelize';
import database from '../config/db';

const ChannelUser = database.define(
  'channel_user',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    channel_id: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default ChannelUser;
