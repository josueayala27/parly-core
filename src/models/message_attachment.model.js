import { DataTypes } from 'sequelize';
import database from '../config/db';
import Message from './message.model';

const MessageAttachment = database.define(
  'message_attachment',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    content_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message_id: {
      type: DataTypes.UUID,
      references: { model: Message, key: 'id' },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default MessageAttachment;
