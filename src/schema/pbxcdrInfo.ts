/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

let user: any = {};

/* ##################################################################################### */
//
user.pbxcdrinfoReq = {
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        Uid: { type: 'string' },
        Calling_No: { type: 'string' },
        Called_No: { type: 'string' },
        Call_DateTime: { type: 'string' },
        Connected_Time: { type: 'string' },
        Disconnected_Time: { type: 'string' },
        Call_Duration: { type: 'string' },
        Domain_Name: { type: 'string' },
        Domain_ID: { type: 'number' },
        CallFeature: { type: 'string' },
        PBXIP: { type: 'string' },
        PBXID: { type: 'string' },
        MGIP: { type: 'string' },
        MGID: { type: 'string' },
        bundleID: { type: 'string' },
        operatorIP: { type: 'string' },
        calling_codec: { type: 'string' },
        calltype: { type: 'string' },
        holdDuration: { type: 'string' },
        callforwarded: { type: 'boolean' },
        callforward_No: { type: 'string' },
        Disconnect_Reason: { type: 'string' },
        DTMF_Pressed: { type: 'string' },
        call_recording: { type: 'boolean' },
        recordingtype: { type: 'number' },
        CallTransfer: { type: 'boolean' },
        Transfer_No: { type: 'string' },
        Conference_Type: { type: 'string' },
        Conf_joiner_type: { type: 'number' },
        Conference_Number: { type: 'string' },
        Conference_Ext: { type: 'string' },
      },
      required: ['Uid'],
    },
  },
};

//

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
        type: 'string',
        enum: ['PBX_CDR_Info'],
      },
      input: {
        type: 'object',
        properties: {
          Uid: { type: 'string' },
          Calling_No: { type: 'string' },
          Called_No: { type: 'string' },
          Call_DateTime: { type: 'string' },
          Connected_Time: { type: 'string' },
          Disconnected_Time: { type: 'string' },
          Call_Duration: { type: 'string' },
          Domain_Name: { type: 'string' },
          Domain_ID: { type: 'number' },
          CallFeature: { type: 'string' },
          PBXIP: { type: 'string' },
          PBXID: { type: 'string' },
          MGIP: { type: 'string' },
          MGID: { type: 'string' },
          bundleID: { type: 'string' },
          operatorIP: { type: 'string' },
          calling_codec: { type: 'string' },
          calltype: { type: 'string' },
          holdDuration: { type: 'string' },
          callforwarded: { type: 'boolean' },
          callforward_No: { type: 'string' },
          Disconnect_Reason: { type: 'string' },
          DTMF_Pressed: { type: 'string' },
          call_recording: { type: 'boolean' },
          recordingtype: { type: 'number' },
          CallTransfer: { type: 'boolean' },
          Transfer_No: { type: 'string' },
          Conference_Type: { type: 'string' },
          Conf_joiner_type: { type: 'number' },
          Conference_Number: { type: 'string' },
          Conference_Ext: { type: 'string' },
        },
        required: ['Uid'],
      },
    },
    required: ['trans_id', 'db_name', 'db_operation', 'table_name', 'sp_name', 'input'],
  },
};

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
        type: 'string',
        enum: ['PBX_CDR_Info'],
      },
      input: {
        type: 'object',
        properties: {
          Uid: { type: 'string' },
          Calling_No: { type: 'string' },
          Called_No: { type: 'string' },
          Call_DateTime: { type: 'string' },
          Connected_Time: { type: 'string' },
          Disconnected_Time: { type: 'string' },
          Call_Duration: { type: 'string' },
          Domain_Name: { type: 'string' },
          Domain_ID: { type: 'number' },
          CallFeature: { type: 'string' },
          PBXIP: { type: 'string' },
          PBXID: { type: 'string' },
          MGIP: { type: 'string' },
          MGID: { type: 'string' },
          bundleID: { type: 'string' },
          operatorIP: { type: 'string' },
          calling_codec: { type: 'string' },
          calltype: { type: 'string' },
          holdDuration: { type: 'string' },
          callforwarded: { type: 'boolean' },
          callforward_No: { type: 'string' },
          Disconnect_Reason: { type: 'string' },
          DTMF_Pressed: { type: 'string' },
          call_recording: { type: 'boolean' },
          recordingtype: { type: 'number' },
          CallTransfer: { type: 'boolean' },
          Transfer_No: { type: 'string' },
          Conference_Type: { type: 'string' },
          Conf_joiner_type: { type: 'number' },
          Conference_Number: { type: 'string' },
          Conference_Ext: { type: 'string' },
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
          error: {},
        },
      },
    },
  },
};

export const pbxcdrInfoSchema: any = user;
