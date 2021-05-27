import * as actions from "@Store/actions/table";

export const get_action_table = (identity, origin) => `${identity}_${origin}`;

const table = (identity) => {
  const initialState = {
    dataSource: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 50,
      pageSizeOptions: ["10", "20", "50", "100"],
      showSizeChanger: true,
    },
    filters: {}
  };

  return function (state = initialState, action) {
    switch (action.type) {
      case get_action_table(
        identity,
        actions.GET_IDENTITY_TABLE_DATA_SOURCE_SUCCESS
      ): {
        const { dataSource, pagination } = action.payload;

        return {
          ...state,
          dataSource,
          pagination: { ...state.pagination, ...pagination },
        };
      }
      default:
        return state;
    }
  };
};

export default table;
