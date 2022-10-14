import { DataTypes } from 'sequelize';
import database from '../config/db';
import Channel from './channel.model';
import User from './user.model';

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
      references: { model: User, key: 'id' },
    },
    channel_id: {
      type: DataTypes.UUID,
      references: { model: Channel, key: 'id' },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default ChannelUser;
