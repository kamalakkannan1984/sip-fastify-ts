/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

let user: any = {};

/* ##################################################################################### */
/**
 * {
    "trans_id": "123456789",
    "db_type": 1,
    "db_operation": "EXECUTE",
    "db_name": "unifiedring_pbx",
    "table_name": "PBX_CDR_TEMP",
    "sp_name": "PBX_CDR_Info",
    "input": {
        "Uid": "590weact-qwert-qwert",
        "Calling_No": "590",
        "Called_No": "380",
        "Call_DateTime": "2020-04-15T19:20:41.052Z",
        "Connected_Time": "2020-04-15T19:20:41.052Z",
        "Disconnected_Time": "2020-04-15T19:20:41.052Z",
        "Call_Duration": "0:0:0",
        "Domain_Name": "6367.UR.mundio.com",
        "Domain_ID": 1674,
        "CallFeature": "INTERNAL",
        "PBXIP": "10.22.7.141",
        "PBXID": 1,
        "MGIP": "10.22.7.118",
        "MGID": 1,
        "bundleID": 0,
        "operatorIP": "",
        "calling_codec": "G711",
        "called_coded": "G711",
        "calltype": "INBOUND",
        "holdDuration": "0:0:0",
        "callforwarded": false,
        "callforward_No": "",
        "Disconnect_Reason": "NORMAL",
        "DTMF_Pressed": "",
        "call_recording": false,
        "recordingtype": 0,
        "CallTransfer": false,
        "Transfer_No": "",
        "Conference_Type": "",
        "Conf_joiner_type": 0,
        "Conference_Number": "",
        "Conference_Ext": ""
    }
}
 */
user.commanReq = {
    body: {
        type: 'object',
        properties: {
            trans_id: { type: 'string' },
            db_type: { type: 'number' },
            db_name: { type: 'string', enum: ['XGREGISTAR', 'unifiedring_pbx'] },
            db_operation: {
                type: 'string',
                enum: ['READ', 'WRITE', 'UPDATE', 'DELETE', 'EXECUTE'],
            },
            table_name: { type: 'string' },
            sp_name: {
                type: 'string', enum: ['PBX_CDR_Info']
            },
            input: {
                type: 'object',
                properties: {
                    Uid: { type: 'string' },
                    Calling_No: { type: "string" },
                    Called_No: { type: "string" },
                    Call_DateTime: { type: "string" },
                    Connected_Time: { type: "string" },
                    Disconnected_Time: { type: "string" },
                    Call_Duration: { type: "string" },
                    Domain_Name: { type: "string" },
                    Domain_ID: { type: "number" },
                    CallFeature: { type: "string" },
                    PBXIP: { type: "string" },
                    PBXID: { type: "string" },
                    MGIP: { type: "string" },
                    MGID: { type: "string" },
                    bundleID: { type: "string" },
                    operatorIP: { type: "string" },
                    calling_codec: { type: "string" },
                    calltype: { type: "string" },
                    holdDuration: { type: "string" },
                    callforwarded: { type: "boolean" },
                    callforward_No: { type: "string" },
                    Disconnect_Reason: { type: "string" },
                    DTMF_Pressed: { type: "string" },
                    call_recording: { type: "boolean" },
                    recordingtype: { type: "number" },
                    CallTransfer: { type: "boolean" },
                    Transfer_No: { type: "string" },
                    Conference_Type: { type: "string" },
                    Conf_joiner_type: { type: "number" },
                    Conference_Number: { type: "string" },
                    Conference_Ext: { type: "string" }
                },
                required: ['Uid'],
            },
        },
        required: ['trans_id', 'db_name', 'db_operation', 'table_name', 'sp_name', 'input'],
    },
};
//user signup request schema
/*user.commanReq = {
    body: {
        type: 'object',
        properties: {
            Uid: { type: 'string' },
            Calling_No: { type: "string" },
            Called_No: { type: "string" },
            Call_DateTime: { type: "string" },
            Connected_Time: { type: "string" },
            Disconnected_Time: { type: "string" },
            Call_Duration: { type: "string" },
            Domain_Name: { type: "string" },
            Domain_ID: { type: "number" },
            CallFeature: { type: "string" },
            PBXIP: { type: "string" },
            PBXID: { type: "string" },
            MGIP: { type: "string" },
            MGID: { type: "string" },
            bundleID: { type: "string" },
            operatorIP: { type: "string" },
            calling_codec: { type: "string" },
            calltype: { type: "string" },
            holdDuration: { type: "string" },
            callforwarded: { type: "boolean" },
            callforward_No: { type: "string" },
            Disconnect_Reason: { type: "string" },
            DTMF_Pressed: { type: "string" },
            call_recording: { type: "boolean" },
            recordingtype: { type: "number" },
            CallTransfer: { type: "boolean" },
            Transfer_No: { type: "string" },
            Conference_Type: { type: "string" },
            Conf_joiner_type: { type: "number" },
            Conference_Number: { type: "string" },
            Conference_Ext: { type: "string" }

        },
        required: ['Uid'],
    },
}; */

/*user.commanRes = {
    200: {
        type: 'object',
        properties: {
            status_code: { type: "number" },
            error: { type: "number" },
            message: { type: "string" }
        },
    },
};*/

user.commanRes = {
    200: {
        type: 'object',
        properties: {
            trans_id: { type: 'string' },
            db_type: { type: 'number' },
            db_name: { type: 'string', enum: ['XGREGISTAR', 'unifiedring_pbx'] },
            db_operation: {
                type: 'string',
                enum: ['READ', 'WRITE', 'UPDATE', 'DELETE', 'EXECUTE'],
            },
            table_name: { type: 'string' },
            sp_name: {
                type: 'string', enum: ['PBX_CDR_Info']
            },
            input: {
                type: 'object',
                properties: {
                    Uid: { type: 'string' },
                    Calling_No: { type: "string" },
                    Called_No: { type: "string" },
                    Call_DateTime: { type: "string" },
                    Connected_Time: { type: "string" },
                    Disconnected_Time: { type: "string" },
                    Call_Duration: { type: "string" },
                    Domain_Name: { type: "string" },
                    Domain_ID: { type: "number" },
                    CallFeature: { type: "string" },
                    PBXIP: { type: "string" },
                    PBXID: { type: "string" },
                    MGIP: { type: "string" },
                    MGID: { type: "string" },
                    bundleID: { type: "string" },
                    operatorIP: { type: "string" },
                    calling_codec: { type: "string" },
                    calltype: { type: "string" },
                    holdDuration: { type: "string" },
                    callforwarded: { type: "boolean" },
                    callforward_No: { type: "string" },
                    Disconnect_Reason: { type: "string" },
                    DTMF_Pressed: { type: "string" },
                    call_recording: { type: "boolean" },
                    recordingtype: { type: "number" },
                    CallTransfer: { type: "boolean" },
                    Transfer_No: { type: "string" },
                    Conference_Type: { type: "string" },
                    Conf_joiner_type: { type: "number" },
                    Conference_Number: { type: "string" },
                    Conference_Ext: { type: "string" }
                },
            },
            output: {},
            msg: {
                type: 'object',
                properties: {
                    affected_rows: { type: 'number' },
                    status_code: { type: 'number' },
                    err_code: { type: 'number' },
                    message: { type: 'string' },
                    error: {}
                },
            },
        },
    },
};

export const pbxcdrInfoSchema: any = user;