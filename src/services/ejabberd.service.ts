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
        return await axios.post(this.bassUrl + '/get_presence', {
            "user": user,
            "server": server
        })
            .then((response) => {
                const res = response.data;
                if (res.status_code === 200) {
                    if (res.result.show === 'available') {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
}

export default Ejabberd;