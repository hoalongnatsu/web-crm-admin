import * as React from "react";

export interface Props {
  columns: Array<any>,
  identity: string,
  rowKeys: Array<string>;
  rowKeysChange: (ids: Array<string>) => void;
  modeRowKeys: "radio" | "checkbox";
  mappingRowKey: (record: any) => string | number;
  api: {
    getList: () => Promise<{ list: Array<any>, totalRows: number, extendsData?: any }>, // method name in method.list
    deleteByIds: () => Promise<{ deletedIds: Array<string> }> // // method name in method.delete
  };
  method: string,
  rowKey: string,
  defaultPageSize: numer,
  defaultSorter: string[],
  showSelection: boolean,
  afterDeleteSuccess: (deletedIds: Array<string>) => void;
  scroll: {
    x: number;
    y: numbe;
  };
  scrollToFirstRowOnChange: boolean;
}

export interface State {
  selectedRowKeys: Array<string>;
}

export default class CommonTable extends React.Component<Props, State> {
  static defaultProps: {
    columns: Array<any>,
  };

  state: {
    selectedRowKeys: Array<string>;
  };
}
