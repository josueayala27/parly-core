import { DataTypes } from 'sequelize';
import database from '../config/db';

const Attachment = database.define(
  'attachment',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default Attachment;
