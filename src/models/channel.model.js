import { DataTypes } from 'sequelize';
import database from '../config/db';
import Message from './message.model';

const Channel = database.define(
  'channel',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_group: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    message_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Message, key: 'id' },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default Channel;
