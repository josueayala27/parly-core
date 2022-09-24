import User from './user.model';
import Identity from './identity.model';

User.hasMany(Identity);
Identity.belongsTo(User);
