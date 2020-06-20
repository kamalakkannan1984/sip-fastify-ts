/**
 * @createdBy Kamal
 * @createdOn 26th April 2020
 */

import axios from 'axios';
import { config } from '../config/app';

class Ejabberd {
    public bassUrl: string;
    constructor() {
        this.bassUrl = config.ejabberdBaseUrl;
    }


    public async getPresenceStatus(user: string, server: string) {

        return new Promise(async (resolve, reject) => {
            try {
                return await axios
                    .post(this.bassUrl + '/user_sessions_info', {
                        "user": user
                    })
                    .then((response) => {
                        resolve(response.data);
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

        /*return await axios.post(this.bassUrl + '/user_sessions_info', {
            "user": user
        })
            .then((response) => {
                const res = response.data;
                if (res.status_code === 200) {
                    return res.result;
                } else {
                    return 0;
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }*/
    }

    export default Ejabberd;