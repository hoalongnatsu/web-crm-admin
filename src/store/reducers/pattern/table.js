import * as actions from "@Store/actions/table";

export const get_action_table = (identity, origin) => `${identity}_${origin}`;

const table = (identity) => {
  const initialState = {
    dataSource: [],
  };

  return function (state = initialState, action) {
    switch (action.type) {
      case get_action_table(
        identity,
        actions.GET_IDENTITY_TABLE_DATA_SOURCE_SUCCESS
      ): {
        const { dataSource } = action.payload;

        return { ...state, dataSource };
      }
      default:
        return state;
    }
  };
};

export default table;
