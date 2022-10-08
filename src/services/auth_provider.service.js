import AuthProvider from '../models/auth_provider.model';

const findAuthProvider = async (provider) =>
  AuthProvider.findOne({ where: { provider } });

export default findAuthProvider;
