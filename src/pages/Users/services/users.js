import BaseService from '@Core/class/BaseService';

class UserService extends BaseService {

  getList = (params) => {
    return this.get("/", params);
  }

}

export default new UserService().init("/authority/api/admin/users");
