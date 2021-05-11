import BaseService from '@Core/class/BaseService';

class UserService extends BaseService {

  getList = () => {
    return this.get("/");
  }

}

export default new UserService().init("/admin/api/users");
