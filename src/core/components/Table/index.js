import React, { useCallback, useEffect } from "react";
import { Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { get_identity_table_data_source } from "@Store/actions/table";
import { loading_by_action } from "@Store/selectors/loading";
import useTranslate from "@Core/hooks/useTranslate";

const RootTable = ({
  rowKey,
  columns,
  dataSource,
  pagination,
  onChangeTable
}) => {

  return (
    <Table
      rowKey={(record) => record[rowKey]}
      className="table-striped"
      columns={columns}
      dataSource={dataSource}
      bordered={true}
      pagination={pagination}
      onChange={onChangeTable}
    />
  )
}

const RootTableMemo = React.memo(RootTable);

const CommonTable = ({
  columns,
  identity,
  api,
  method,
  rowKey,
  defaultPageSize,
  defaultSorter
}) => {
  const t = useTranslate();

  /* Redux */
  const dispatch = useDispatch();

  /* Selector */
  const loading = useSelector(
    loading_by_action(`${identity}_GET_IDENTITY_TABLE_DATA_SOURCE`)
  );
  const { dataSource, pagination } = useSelector((state) => state[identity]);

  const get_data = useCallback(
    (pageIndex, pageSize, sorter) => {
      dispatch(
        get_identity_table_data_source(
          identity,
          api,
          method,
          pageIndex,
          pageSize,
          sorter
        )
      );
    },
    [dispatch, identity, api, method]
  );

  useEffect(() => {
    const current = 1,
      pageSize = defaultPageSize;

    get_data(current, pageSize, defaultSorter);
  }, [get_data, defaultPageSize, defaultSorter]);

  pagination.position = ["bottomCenter"];
  pagination.showTotal = (total, range) =>
    t("table:show_of_row", undefined, {
      range_one: range[0],
      range_two: range[1],
      total,
    });

  const onChangeTable = useCallback((nextPagination, _, nextSorter) => {
    const current = nextPagination.current,
      pageSize = nextPagination.pageSize;
    let sorter = defaultSorter;

    if (nextSorter.columnKey && nextSorter.order) {
      sorter = [nextSorter.columnKey, nextSorter.order === "ascend" ? "ASC" : "DESC"]
    }

    get_data(current, pageSize, sorter);
  }, [get_data, defaultSorter])

  return (
    <div className="admin-table">
      <Spin
        className="loading"
        spinning={loading}
        style={{ display: "flex" }}
      />
      <RootTableMemo
        loading={loading}
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChangeTable={onChangeTable}
      />
    </div>
  );
};

CommonTable.defaultProps = {
  method: "getList",
  rowKey: "id",
  defaultPageSize: 50,
  defaultSorter: ["created_at", "DESC"]
}

export default React.memo(CommonTable);
