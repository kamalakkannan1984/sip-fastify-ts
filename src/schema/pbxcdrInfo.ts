/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

let user: any = {};

/* ##################################################################################### */
/**
 * {
    
    "Uid" : "1",
    "Calling_No" : "05985566522",
    "Called_No" : "0443808380",
    "Call_DateTime" : ISODate("2020-03-19T21:04:24.780Z"),
    "Connected_Time" : ISODate("2020-03-19T21:04:24.780Z"),
    "Disconnected_Time" : ISODate("2020-03-19T21:04:24.780Z"),
    "Call_Duration" : "634",
    "Domain_Name" : "vectone",
    "Domain_ID" : 2,
    "CallFeature" : "exetension",
    "PBXIP" : "192.168.1.10",
    "PBXID" : "323",
    "MGIP" : "192.168.2.33",
    "MGID" : "485",
    "bundleID" : "48545",
    "operatorIP" : "10.22.13.1",
    "calling_codec" : "192",
    "calltype" : "moc",
    "holdDuration" : "323",
    "callforwarded" : true,
    "callforward_No" : "044380380",
    "Disconnect_Reason" : "0123333",
    "DTMF_Pressed" : "temp",
    "call_recording" : true,
    "recordingtype" : 2,
    "CallTransfer" : true,
    "Transfer_No" : "044380380899",
    "Conference_Type" : "temp",
    "Conf_joiner_type" : 2,
    "Conference_Number" : "temp",
    "Conference_Ext" : "temp"
}
 */
//user signup request schema
user.commanReq = {
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
};

user.commanRes = {
    200: {
        type: 'object',
        properties: {
            status_code: { type: "number" },
            error: { type: "number" },
            message: { type: "string" }
        },
    },
};

export const pbxcdrInfoSchema: any = user;