import { DataTypes } from 'sequelize';
import database from '../config/db';
import Message from './message.model';
import User from './user.model';

const MessageReaction = database.define(
  'message_reaction',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    reaction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Message, key: 'id' },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: 'id' },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default MessageReaction;
