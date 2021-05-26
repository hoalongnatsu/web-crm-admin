import React, { useCallback, useEffect, useState } from "react";
import { Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Action from "./Action";
import { get_identity_table_data_source } from "@Store/actions/table";
import { loading_by_action } from "@Store/selectors/loading";
import useTranslate from "@Core/hooks/useTranslate";

const RootTable = ({
  rowKey,
  columns,
  dataSource,
  pagination,
  onChangeTable,
  showSelection,
  selectedRowKeys,
  onSelectRowKeys,
  onSelectAllRowKeys
}) => {

  const rowSelection = {
    fixed: true,
    selectedRowKeys,
    onSelect: onSelectRowKeys,
    onSelectAll: onSelectAllRowKeys,
  }

  return (
    <Table
      rowKey={(record) => record[rowKey]}
      className="table-striped"
      columns={columns}
      dataSource={dataSource}
      bordered={true}
      pagination={pagination}
      onChange={onChangeTable}
      rowSelection={showSelection ? rowSelection : null}
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
  defaultSorter,
  showSelection
}) => {
  const t = useTranslate();

  /* Redux */
  const dispatch = useDispatch();

  /* Selector */
  const loading = useSelector(
    loading_by_action(`${identity}_GET_IDENTITY_TABLE_DATA_SOURCE`)
  );
  const { dataSource, pagination } = useSelector((state) => state[identity]);

  /* State */
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

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

  const onSelectRowKeys = (record, selected) => {
    if (selected) {
      const newSelectedRowKeys = [...selectedRowKeys, record[rowKey]];
      setSelectedRowKeys(newSelectedRowKeys);
      return;
    }

    const newSelectedRowKeys = selectedRowKeys.filter((rowKeyValue) => rowKeyValue !== record[rowKey]);
    setSelectedRowKeys(newSelectedRowKeys);
  }

  const onSelectAllRowKeys = (selected, selectedRows) => {
    if (selected) {
      const newSelectedRowKeys = selectedRows.map((record) => record[rowKey]);
      setSelectedRowKeys(newSelectedRowKeys);
      return;
    }

    setSelectedRowKeys([]);
  }

  return (
    <div className="admin-table">
      <Spin
        className="loading"
        spinning={true}
        style={{ display: loading ? "flex" : "none" }}
      />
      <Action
        t={t}
        selectedRowKeys={selectedRowKeys}
      />
      <RootTableMemo
        loading={loading}
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        // Pagination
        pagination={pagination}
        onChangeTable={onChangeTable}
        // Selection
        showSelection={showSelection}
        selectedRowKeys={selectedRowKeys}
        onSelectRowKeys={onSelectRowKeys}
        onSelectAllRowKeys={onSelectAllRowKeys}
      />
    </div>
  );
};

CommonTable.defaultProps = {
  method: "getList",
  rowKey: "id",
  defaultPageSize: 50,
  defaultSorter: ["created_at", "DESC"],
  showSelection: true
}

export default React.memo(CommonTable);
