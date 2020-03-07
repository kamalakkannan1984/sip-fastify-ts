/**
 *
 */

export const userModel: any = {};

/**
 * @param {String} userName - where codition to fetch data
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

userModel.getDomains = (domainColl: any, domain_name: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await domainColl.findOne({ domain_name: domain_name, active: 1 }, { _id: 0, domain_id: 1 });

      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};


userModel.getDirDomains = (domainColl: any, domain_name: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await domainColl.findOne({ domain_name: domain_name }, { _id: 0, domain_id: 1 });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

userModel.saveRegister = (regColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('registration data');
      //console.log(data);
      const res = regColl.insertOne(data);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

userModel.deleteRegister = (regColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('delete register');
      const deleteItem = regColl.deleteMany({
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


userModel.authendicate = (regColl: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('authendicate');
      /*regColl
        .find({
          Call_id: data.Call_id, Domain_id: data.Domain_id,
          Username: data.Username, Contact_address: data.Contact_address
        })
        .toArray()
        .then((user: any) => {
          console.log("user", user);
          resolve(user);
        }).catch((err: any) => {
          console.log(err);
        }); */
      const res = await regColl.findOne({
        Call_id: data.Call_id, Domain_id: data.Domain_id,
        Username: data.Username, Contact_address: data.Contact_address
      });

      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

//checkPassword
userModel.checkPassword = (dirUsers: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('checkPassword');
      const res = await dirUsers.find({
        user_id: data.user_id, domain_id: data.Domain_id
      }).count();
      console.log(res);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

//module.exports = userModel;
