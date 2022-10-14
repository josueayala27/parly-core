import { DataTypes } from 'sequelize';
import database from '../config/db';

const FriendshipState = database.define(
  'friendship_state',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true }
);

export default FriendshipState;
