import React from "react";
import Table from "@CoreComponents/Table";
import { users as identity } from "@Pages/Users/config/constants";
import userApi from "@Pages/Users/services/users";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true,
  },
];
const defaultWhereAnd = { blocked: { $eq: false } };

const Users = () => {
  return (
    <Table
      columns={columns}
      api={userApi}
      identity={identity}
      methodDelete="blockUsers"
      defaultWhereAnd={defaultWhereAnd}
    />
  );
};

export default Users;
