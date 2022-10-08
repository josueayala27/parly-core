import { DataTypes } from 'sequelize';
import database from '../config/db';

const Message = database.define(
  'message',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referenced_message: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default Message;
