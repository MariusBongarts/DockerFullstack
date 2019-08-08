import { HttpClient } from './httpClient';
import { Entry } from '../models/entry';

export class EntrySercice {

  private httpClient = new HttpClient({baseURL: 'http://localhost:3000/'});

  async getEntries() {
    try {
    const response = await this.httpClient.get('entries');

    const entries = (await response.json()) as Entry[];

    // Parse string dates in correct Date format
    entries.forEach(entry => {
      entry.startDate = new Date(entry.startDate);
      entry.endDate = new Date(entry.endDate);
    });

    return entries;
    } catch (error) {
      console.log(error);
    }
  }
}
