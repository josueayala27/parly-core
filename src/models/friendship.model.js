import { DataTypes } from 'sequelize';
import database from '../config/db';
import FriendshipState from './friendship_state.model';
import User from './user.model';

const Friendship = database.define(
  'friendship',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    is_readed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: User, key: 'id' },
    },
    friend_id: {
      type: DataTypes.UUID,
      references: { model: User, key: 'id' },
    },
    friendship_state: {
      type: DataTypes.UUID,
      references: { model: FriendshipState, key: 'id' },
    },
  },
  { timestamps: true, underscored: true }
);

export default Friendship;
