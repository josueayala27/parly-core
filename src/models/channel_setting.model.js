import { DataTypes } from 'sequelize';
import database from '../config/db';
import Channel from './channel.model';
import User from './user.model';

const ChannelSetting = database.define(
  'channel_setting',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    allow_notifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notification_sound: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channel_id: {
      type: DataTypes.UUID,
      references: { model: Channel, key: 'id' },
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: User, key: 'id' },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default ChannelSetting;
