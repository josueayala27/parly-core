import User from './user.model';
import PersonalAccessToken from './personal_access_token.model';
import UserGender from './user_gender.model';
import './message_attachment.model';
import './auth_provider.model';
import './channel.model';
import './channel_setting.model';
import './channel_user.model';
import './message.model';
import './message_reaction.model';

User.hasMany(PersonalAccessToken);
PersonalAccessToken.belongsTo(User);

User.belongsTo(UserGender);
