export const SET_ADMIN_INFO = "SET_ADMIN_INFO";
export const CLEAR_ADMIN_INFO = "CLEAR_ADMIN_INFO";

export function set_admin_info(info, permission) {
  return {
    type: SET_ADMIN_INFO,
    payload: { info, permission }
  }
}

export function clear_admin_info() {
  return {
    type: CLEAR_ADMIN_INFO,
  }
}
