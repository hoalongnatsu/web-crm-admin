import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "antd";
import { get_identity_table_data_source } from "@Store/actions/table";
import { loading_by_action } from "@Store/selectors/loading";

const CommonTable = ({
  columns,
  identity,
  api,
  method = "getList",
  rowKey = "id"
}) => {

  /* Redux */
  const dispatch = useDispatch();
  
  /* Selector */
  const loading = useSelector(loading_by_action(`${identity}_GET_IDENTITY_TABLE_DATA_SOURCE`));
  const { dataSource } = useSelector(state => state[identity]);

  useEffect(() => {
    dispatch(get_identity_table_data_source(identity, api, method))
  }, [dispatch, identity, api, method])

  return (
    <div className="admin-table">
      <Table
        rowKey={record => record[rowKey]}
        loading={loading}
        className="table-striped"
        columns={columns}
        dataSource={dataSource}
        bordered={true}
      />
    </div>
  )
}

export default CommonTable
