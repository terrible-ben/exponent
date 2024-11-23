
import APIClient from '../core/client';

export class ConfigAPI {
  constructor(private client: APIClient) {}

  getConfig(configId: string) {
    return this.client.request('GET', `/configs/${configId}`);
  }

  listConfigs() {
    return this.client.request('GET', '/configs');
  }

  createConfig(configData: any) {
    return this.client.request('POST', '/configs', configData)
  }

  updateConfig(configData: any, configId: string ) {
    return this.client.request('PUT', `/configs/${configId}`, configData)
  }

  deleteConfig(configId: string) {
    return this.client.request('DELETE', `/configs/${configId}`)
  }
}
