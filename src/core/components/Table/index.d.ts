import * as React from "react";

export interface Props {
  columns: any[];
  identity: string;
  rowKeys: string[];
  rowKeysChange: (ids: string[]) => void;
  modeRowKeys: "radio" | "checkbox";
  mappingRowKey: (record: any) => string | number;
  api: {
    getList: () => Promise<{ list: Array<any>, totalRows: number, extendsData?: any }>; // method name of methodList
    deleteByIds: (ids: string[]) => Promise<{ deletedIds: string[] }> // // method name of methodDelete
  };
  methodList: string;
  methodDelete: string;
  rowKey: string;
  defaultPageSize: numer;
  defaultSorter: string[];
  showSelection: boolean;
  afterDeleteSuccess: (deletedIds: string[]) => void;
  scroll: {
    x: number;
    y: numbe;
  };
  scrollToFirstRowOnChange: boolean;
}

export interface State {
  selectedRowKeys: string[];
}

export default class CommonTable extends React.Component<Props, State> {
  static defaultProps: {
    columns: Array<any>;
  };

  state: {
    selectedRowKeys: Array<string>;
  };
}
