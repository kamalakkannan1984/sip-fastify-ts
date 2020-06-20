/**
 * @createdBy Kamal
 * @createdOn 26th April 2020
 */

import axios from 'axios';
import { config } from '../config/app';

/**
 * Class defined to use Ejabberd server
 */
export default class Ejabberd {
  public bassUrl: string;
  constructor() {
    this.bassUrl = config.ejabberdBaseUrl;
  }

  /**
   * Get presence status from ejabberd server
   * @param user
   * @param server
   */
  public async getPresenceStatus(user: string) {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(this.bassUrl + '/user_sessions_info', {
            userId: user,
          })
          .then((response) => {
            if (response.data.status_code === 200) {
              resolve(response.data.result);
            } else {
              resolve([]);
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
