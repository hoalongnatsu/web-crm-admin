export const GET_IDENTITY_TABLE_DATA_SOURCE_REQUEST =
  "GET_IDENTITY_TABLE_DATA_SOURCE_REQUEST";
export const GET_IDENTITY_TABLE_DATA_SOURCE_SUCCESS =
  "GET_IDENTITY_TABLE_DATA_SOURCE_SUCCESS";
export const GET_IDENTITY_TABLE_DATA_SOURCE_FAILURE =
  "GET_IDENTITY_TABLE_DATA_SOURCE_FAILURE";

export function get_identity_table_data_source(identity, api, method, pageIndex, pageSize, sorter) {
  return {
    type: GET_IDENTITY_TABLE_DATA_SOURCE_REQUEST,
    payload: {
      identity,
      api,
      method,
      pageIndex,
      pageSize,
      sorter
    },
  };
}
