/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

let user: any = {};

/* ##################################################################################### */

//user signup request schema
user.commanReq = {
  body: {
    type: 'object',
    properties: {
      trans_id: { type: 'string' },
      db_name: { type: 'string', enum: ['XGREGISTAR', 'unifiedring_pbx'] },
      db_operation: {
        type: 'string',
        enum: ['READ', 'WRITE', 'UPDATE', 'DELETE', 'EXECUTE'],
      },
      table_name: { type: 'string' },
      sp_name: {
        type: 'string', enum: ['sip_do_user_registration',
          'sip_authenticate_user_registration',
          'sip_get_user_password',
          'sip_update_registered_status',
          'sip_delete_user_registration',
          'sip_get_Registered_user_info']
      },
      input: {
        type: 'object',
        properties: {
          Call_id: { type: 'string' },
          domain_name: { type: 'string' },
          Contact_address: { type: 'string' },
          Ipaddress: { type: 'string' },
          IpAddress_type: { type: 'number' },
          Username: { type: 'string' },
          Password: { type: 'string' },
          AAA: { type: 'number' },
          expires: { type: 'number' },
          Request_cseq: { type: 'number' },
          status: { type: 'number' },
          proxy_username: { type: 'string' },
          device_type: { type: 'string' },
          mac_address: { type: 'string' },
          user_id: { type: 'string' }
        },
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
      db_name: { type: 'string', enum: ['XGREGISTAR', 'unifiedring_pbx'] },
      db_operation: {
        type: 'string',
        enum: ['READ', 'WRITE', 'UPDATE', 'DELETE', 'EXECUTE'],
      },
      table_name: { type: 'string' },
      sp_name: {
        type: 'string', enum: ['sip_do_user_registration',
          'sip_authenticate_user_registration',
          'sip_get_user_password',
          'sip_update_registered_status',
          'sip_delete_user_registration',
          'sip_get_Registered_user_info']
      },
      input: {
        type: 'object',
        properties: {
          Call_id: { type: 'string' },
          domain_name: { type: 'string' },
          Contact_address: { type: 'string' },
          Ipaddress: { type: 'string' },
          IpAddress_type: { type: 'number' },
          Username: { type: 'string' },
          Password: { type: 'string' },
          AAA: { type: 'number' },
          expires: { type: 'number' },
          Request_cseq: { type: 'number' },
          status: { type: 'number' },
          proxy_username: { type: 'string' },
          device_type: { type: 'string' },
          mac_address: { type: 'string' },
          user_id: { type: 'string' }
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

/*sip_authenticate_user_registration */
/* mand_fields : call_id,domain_name,contact_address,username*/
user.sip_reg_auth = {
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        Call_id: { type: 'string' },
        domain_name: { type: 'string' },
        Contact_address: { type: 'string' },
        Username: { type: 'string' }
      },
      required: ['Call_id', 'domain_name', 'Contact_address', 'Username'],
    },
  },
};

/* sip_get_user_password*/
/* o   mand_fields : domain_name,mobileno/username*/

user.sip_get_password = {
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        domain_name: { type: 'string' }
      },
      required: ['user_id', 'domain_name'],
    },
  },
};

/* @Call_idvarchar(50),
@Domain_namevarchar(150),
@Username varchar(100),
@status int
*/
/* sip_update_registered_status*/
user.sip_update_status = {
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        Call_id: { type: 'string' },
        domain_name: { type: 'string' },
        Username: { type: 'string' },
        status: { type: 'number' }

      },
      required: ['Call_id', 'domain_name', 'Username', 'status'],
    },
  },
};

/* sip_delete_user_registration */
/* @caller_idvarchar(50),
@Domain_namevarchar(150),
@Contact_addressvarchar(100),
@Username varchar(100)
*/

user.sip_delete_user = {
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        Call_id: { type: 'string' },
        domain_name: { type: 'string' },
        Username: { type: 'string' },
        Contact_address: { type: 'string' }
      },
      required: ['Call_id', 'domain_name', 'Username', 'Contact_address'],
    },
  },
};

/* sip_get_Registered_user_info  */

user.sip_get_user = {
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        domain_name: { type: 'string' },
        Username: { type: 'string' }
      },
      required: ['domain_name', 'Username'],
    },
  },
};
/*sip_do_user_registration*/
/*"Call_id": "121d5332-408f-1238-f1b4-83897910f890",
        "domain_name": "vectoneapp.webrtc.mundio.com",
        "Contact_address": "79.11.57.202",
        "Ipaddress": "79.11.57.204",
        "IpAddress_type": "0",
        "Password": "243536546",
        "AAA": "1",
        "expires": "3600",
        "Request_cseq": "8743909",
        "status": "1",
        "proxy_username": "",
        "device_type": "",
        "mac_address": "" */
/* o   mand_fields : call_id,domain_name,contact_address,ipaddress,ipaddress_type,username,

      password,aaa,expires,request_cseq,proxy_username,device_type

o   opt fields       :  status,mac_address*/
user.sip_do_reg = {
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        Call_id: { type: 'string' },
        domain_name: { type: 'string' },
        Contact_address: { type: 'string' },
        Ipaddress: { type: 'string' },
        IpAddress_type: { type: 'number' },
        Username: { type: 'string' },
        Password: { type: 'string' },
        AAA: { type: 'number' },
        expires: { type: 'number' },
        Request_cseq: { type: 'number' },
        status: { type: 'number' },
        proxy_username: { type: 'string' },
        device_type: { type: 'string' },
        mac_address: { type: 'string' },
      },
      required: [
        'Call_id',
        'domain_name',
        'Contact_address',
        'Ipaddress',
        'IpAddress_type',
        'Username',
        'Password',
        'AAA',
        'expires',
        'Request_cseq',
        'proxy_username',
        'device_type',
      ],
    },
  },
};

/* ############################################################################################################## */

export const userSchema: any = user;
