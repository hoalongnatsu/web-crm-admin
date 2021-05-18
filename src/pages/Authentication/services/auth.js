import BaseService from '@Core/class/BaseService';

class AuthService extends BaseService {

  adminLogin = (body) => {
    return this.post("/admin/login", body);
  }

}

export default new AuthService().init("/api/auth", false);
