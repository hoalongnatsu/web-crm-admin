import React from "react";
import Table from "@CoreComponents/Table";
import { users as identity } from "@Pages/Users/config/constants";
import userApi from "@Pages/Users/services/users";

const Users = () => {
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  return <Table columns={columns} api={userApi} identity={identity} />;
};

export default Users;
