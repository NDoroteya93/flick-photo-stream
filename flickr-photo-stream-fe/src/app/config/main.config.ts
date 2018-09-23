import { environment } from '../../environments/environment';

const BASE_CONFIG: any = {
  apiEndPoint: '/api/',
};

const configsMap: any = {
  'dev': {
    ...BASE_CONFIG,
    baseUrl: 'https://localhost:3000'

  },
  'prod': {
    ...BASE_CONFIG
  }
};

const CONFIG = configsMap[environment['envName']];
export default CONFIG;
