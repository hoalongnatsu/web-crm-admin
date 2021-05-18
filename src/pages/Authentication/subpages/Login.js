import { Alert, Button, Form, Input } from "antd";
import React, { useContext, useState } from "react";

import ResourceContext from "@Contexts/Resource";
import auth from "@Helpers/auth";
import authApi from "@Pages/Authentication/services/auth";
import { set_admin_info } from "@Store/actions/admin";
import { useHistory } from "react-router-dom";
import useTranslate from "@Core/hooks/useTranslate";

const Login = () => {
  const t = useTranslate();
  const history = useHistory();
  const [form] = Form.useForm();
  const { setResourceContext } = useContext(ResourceContext);

  /* State */
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const onFinish = (values) => {
    setLoading(true);

    authApi
      .adminLogin(values)
      .then(({ info, token }) => {
        setLoading(false);
        set_admin_info(info, token);
        auth.setAuthInfo(info, token);
        setResourceContext().then(() => {
          history.push("/users");
        });
      })
      .catch((e) => {
        setLoading(false);

        if (e.response && e.response.data) {
          setError(e.response.data.message);
        }
      });
  };

  const onClose = () => {
    setError("");
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">Login</div>
        {error && (
          <div className="login__validation">
            <Alert
              message={error}
              type="error"
              showIcon={true}
              closable={true}
              onClose={onClose}
            />
          </div>
        )}
        <Form
          className="login__form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label={t("common:username")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("common:password")}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block={true}
              loading={loading}
            >
              {t("common:submit")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
