import { Button, InputNumber, Modal, message } from "antd";
import React, { useState } from "react";

import { DeleteOutlined } from "@ant-design/icons";

const Action = ({
  t,
  selectedRowKeys,
  customActions,
  modeCustomActions,
  deleteAction,
  resetAfterDeleteSuccess
}) => {
  /* State */
  const [visible, seVisible] = useState(false);
  const [confirmValue, seConfirmValue] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onOpen = () => {
    seVisible(true);
  };

  const onCancel = () => {
    seVisible(false);
  };

  const onOk = async () => {
    setConfirmLoading(true);

    try {
      await deleteAction(selectedRowKeys);

      seVisible(false);
      seConfirmValue();
      setConfirmLoading(false);
      resetAfterDeleteSuccess(selectedRowKeys);
    } catch (error) {
      setConfirmLoading(false);
      message.error(t("table:modal:message:delete_error"));
    }
  };

  const onChangeConfirmValue = (value) => {
    seConfirmValue(value);
  };

  const renderButtonAction = () => {
    const mergeActions = [
      {
        icon: <DeleteOutlined />,
        action: onOpen,
        text: t("common:delete"),
        danger: true,
      },
      ...customActions,
    ];
    const actions =
      modeCustomActions === "merge" ? mergeActions : customActions;

    return actions.map(({ icon, action, text, danger }) => (
      <Button
        type="text"
        icon={icon}
        onClick={(e) => action(e, selectedRowKeys)}
        danger={danger}
        key={text}
      >
        {text}
      </Button>
    ));
  };

  return (
    selectedRowKeys.length > 0 && (
      <div className="actions">
        <div className="text">
          {t("table:action:selected_rows", undefined, {
            number: selectedRowKeys.length,
          })}
        </div>
        {renderButtonAction()}
        <Modal
          visible={visible}
          onCancel={onCancel}
          onOk={onOk}
          title={t("table:modal:title:delete", undefined, {
            number: selectedRowKeys.length,
          })}
          className="modal-delete"
          okText={t("button:ok")}
          cancelText={t("button:cancel")}
          confirmLoading={confirmLoading}
          okButtonProps={{
            disabled: selectedRowKeys.length !== confirmValue,
            loading: confirmLoading,
          }}
        >
          <InputNumber onChange={onChangeConfirmValue} value={confirmValue} />
        </Modal>
      </div>
    )
  );
};

Action.defaultProps = {
  customActions: [],
  modeCustomActions: "merge",
};

export default Action;
