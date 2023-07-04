import { AuthProviderTable } from './auth_provider.model';
import { PersonalAccessTokenTable } from './personal_access_token';
import { UserTable } from './user.model';

export interface Database {
  users: UserTable;
  auth_providers: AuthProviderTable;
  personal_access_tokens: PersonalAccessTokenTable;
}
