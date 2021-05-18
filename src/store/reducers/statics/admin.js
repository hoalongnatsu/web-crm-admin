import { CLEAR_ADMIN_INFO, SET_ADMIN_INFO } from "@Store/actions/admin";

const initialState = {
  info: {},
  permission: 0,
};

export default function admin(state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN_INFO: {
      const { info } = action.payload;

      return { ...state, info };
    }
    case CLEAR_ADMIN_INFO: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
