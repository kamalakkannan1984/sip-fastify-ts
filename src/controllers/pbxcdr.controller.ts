/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { userModel } from '../models/user';
import { utils } from '../utils/utils';
export const pbxcdrController: any = {};

/**
 *
 * @param {Object} body - request object
 * @param {Object} cdrColl - CDR colletion
 * @description - save PBXCDRINFO function
 */
pbxcdrController.savePBXCDRInfo = async (body: any, cdrColl: any) => {
    try {
        let result = {};
        const data = body;
        //
        const response = await userModel.savePBXCDR(data, cdrColl);
        if (response.result.ok === 1 && response.upsertedId === null) {
            //updated response
            result = {
                output: {},
                msg: { status_code: 200, error: -1, affected_rows: 1, message: "Updated successfully" }
            };

        } else if (response.result.ok === 1 && response.upsertedId !== null) {
            //insert response
            result = {
                output: {},
                msg: { status_code: 200, error: -1, affected_rows: 1, message: "Inserted successfully" }
            };

        } else {
            // update error
            result = {
                output: {},
                msg: { status_code: 404, error: 1, affected_rows: 0, message: "Update error" }
            };
        }
        //        
        return result;
    } catch (err) {
        return { msg: { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' } };
    }
};



