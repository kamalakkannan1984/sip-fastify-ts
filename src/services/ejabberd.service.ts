/**
 * @createdBy Kamal
 * @createdOn 26th April 2020
 */

import axios from 'axios';

class Ejabberd {
    public bassUrl: string;
    constructor() {
        this.bassUrl = 'http://82.113.74.51:5001/api';
    }

    public async getPresenceStatus() {
        return await axios.post(this.bassUrl + '/get_presence', {
            "user": "1644",
            "server": "im01.unifiedring.co.uk"
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