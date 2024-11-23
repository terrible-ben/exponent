
import { Config, SDKConfig } from './core/config';
import APIClient from './core/client';
import { UserAPI } from './api/user';
import { ConfigAPI } from './api/config';
import { DocsAPI } from './api/docs';
import { TableAPI } from './api/table';
import {AuthAPI} from './api/auth';

class API2 {
  user: UserAPI;
  configuration: ConfigAPI;
  docs: DocsAPI;
  table: TableAPI;
  auth: AuthAPI;

  constructor(config: SDKConfig) {
    Config.initialize(config);
    const client = new APIClient();
    this.user = new UserAPI(client);
    this.configuration = new ConfigAPI(client);
    this.docs = new DocsAPI(client);
    this.table = new TableAPI(client);
    this.auth = new AuthAPI(client);
  }
}

export default API2;
