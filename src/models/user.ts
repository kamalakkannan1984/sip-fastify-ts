/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

export const userModel: any = {};

/**
 * @param {String} userName - where condition to fetch data
 * @description - Find the user name
 */
userModel.findUserByUsername = (userName: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {String} domain_name - Domain name
 * @param {any} domainColl - Sip_domain collection
 * @description - Check the domain collection is the domain is available or not
 */
userModel.getDomains = (domainColl: any, domain_name: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await domainColl.findOne({ domain_name: domain_name, active: 1 }, { _id: 0, domain_id: 1 });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {String} domain_name - Domain name
 * @param {any} dirDomainColl - dir_domains collection
 * @description - Check the dir domains collection is the domain available or not
 */
userModel.getDirDomains = (dirDomainColl: any, domain_name: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await dirDomainColl.findOne({ domain_name: domain_name }, { _id: 0, domain_id: 1 });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {any} data - data object 
 * @param {any} sipRegColl - Sip_Register collection
 * @description - Save the user information to sip register table 
 */
userModel.saveRegister = (sipRegColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('registration data');
      const res = sipRegColl.insertOne(data);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {any} data - data object 
 * @param {any} sipRegColl - Sip_Register collection 
 * @description - Delete many registered user
 */
userModel.deleteRegister = (sipRegColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('delete register');
      const deleteItem = sipRegColl.deleteMany({
        Username: data.Username,
        Domain_id: data.Domain_id,
        device_type: data.device_type,
      });
      resolve(deleteItem);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {any} data - data object 
 * @param {any} sipRegColl - Sip_Register collection 
 * @description - Authendicate the registered user
 */
userModel.authendicate = (sipRegColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('authendicate');
      const res = await sipRegColl.findOne({
        Call_id: data.Call_id, Domain_id: data.Domain_id,
        Username: data.Username, Contact_address: data.Contact_address
      });

      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {any} data - data object 
 * @param {any} dirUsersColl - dir_users collection 
 * @description - checkPassword for registered user
 */
userModel.checkPassword = (dirUsersColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('checkPassword');
      const res = await dirUsersColl.findOne({
        user_id: data.user_id, domain_id: data.Domain_id
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {any} data - data object 
 * @param {any} sipRegColl - Sip_Register collection 
 * @description - update status for registered user
 */
userModel.updateStatus = (sipRegColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('updateStatus');
      const res = await sipRegColl.updateOne({
        Call_id: data.Call_id,
        Username: data.Username,
        Domain_id: data.Domain_id
      }, { $set: { status: data.status } });

      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {any} data - data object 
 * @param {any} sipRegColl - Sip_Register collection 
 * @description - deleteUser for registered user
 */
userModel.deleteUser = (sipRegColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('deleteUser');
      const deleteItem = await sipRegColl.deleteMany({
        Call_id: data.Call_id,
        Domain_id: data.Domain_id,
        Username: data.Username,
        Contact_address: data.Contact_address
      });
      resolve(deleteItem);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {any} data - data object 
 * @param {any} sipRegColl - Sip_Register collection 
 * @description - Get user information for registered user
 */
userModel.getUser = (sipRegColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('getUser');
      sipRegColl
        .find({
          Domain_id: data.Domain_id,
          Username: data.Username
        })
        .project({ _id: 0, Contact_address: 1, proxy_username: 1, status: 1, device_type: 1, Ipaddress: 1, prev_proxy_username: 1 })
        .toArray()
        .then((user: any) => {
          resolve(user);
        })
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param {any} data - data object 
 * @param {any} transLogColl - transaction_log collection 
 * @description - save log for every transaction 
 */
userModel.saveLog = (data: any, transLogColl: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('save log data');
      let dataArray: any = {};
      dataArray = data;
      dataArray.dateTime = new Date().toLocaleString();
      const res = await transLogColl.insertOne(data);
      resolve(res);
    } catch (err) {
      reject(err);
    }

  });
};
