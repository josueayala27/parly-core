import { AuthProviderTable } from './auth_provider.model';
import { ChannelTable } from './channel.model';
import { ChannelUserTable } from './channel_user.model';
import { PersonalAccessTokenTable } from './personal_access_token';
import { UserTable } from './user.model';
import { UserChannelSettingsTable } from './user_channel_settings';

export interface Database {
  users: UserTable;
  auth_providers: AuthProviderTable;
  personal_access_tokens: PersonalAccessTokenTable;
  channels: ChannelTable;
  channel_users: ChannelUserTable;
  user_channel_settings: UserChannelSettingsTable;
}
