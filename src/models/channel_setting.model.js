import { DataTypes } from 'sequelize';
import database from '../config/db';

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
    },
    user_id: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default ChannelSetting;
