import User from './user.model';
import PersonalAccessToken from './personal_access_token.model';
import UserGender from './user_gender.model';

User.hasMany(PersonalAccessToken, { foreignKey: 'id' });
PersonalAccessToken.belongsTo(User, { foreignKey: 'user_id' });

User.belongsTo(UserGender, { foreignKey: 'user_gender_id' });
