import User from './user.model';
import Identity from './identity.model';
import Meeting from './meeting.model';

User.hasMany(Identity, { foreignKey: 'id' });
Identity.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Meeting, { foreignKey: 'id' });
Meeting.belongsTo(User, { foreignKey: 'user_id' });
