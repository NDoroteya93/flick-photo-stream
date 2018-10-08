import { environment } from '../../environments/environment';

const BASE_CONFIG: any = {
  apiEndPoint: 'api/',
  photostreamEndPoint: 'api/photostreams',
  authenticateEndPoint: 'api/authenticate', 
  createUserEndPoint: 'api/users'
};

const configsMap: any = {
  'dev': {
    ...BASE_CONFIG,
    baseUrl: 'http://localhost:3000'

  },
  'prod': {
    ...BASE_CONFIG
  }
};

const CONFIG = configsMap[environment['envName']];
export default CONFIG;
