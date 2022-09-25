import { DataTypes } from 'sequelize';
import database from '../config/db';

const Meeting = database.define(
  'meeting',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
    },
    allow_comments: {
      type: DataTypes.BOOLEAN,
    },
    allow_screen_sharing: {
      type: DataTypes.BOOLEAN,
    },
    allow_microphone: {
      type: DataTypes.BOOLEAN,
    },
    allow_video: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default Meeting;
