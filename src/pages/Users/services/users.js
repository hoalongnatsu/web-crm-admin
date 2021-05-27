import BaseService from '@Core/class/BaseService';

class UserService extends BaseService {

  getList = (params) => {
    return this.get("/", params);
  }

  blockUsers = (ids) => {
    return this.patch("/block-users", { ids });
  }

}

export default new UserService().init("/authority/api/admin/users");
