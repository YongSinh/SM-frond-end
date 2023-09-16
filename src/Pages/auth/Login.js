import React, { useState } from "react";
import { request } from '../../util/api'
import { Button, Form, message, Input, Checkbox, Spin } from "antd";
import "./Login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode"; 
export default function LoginPage() {

  const [loading,setLoading] = useState(false)


  const onFinish = (fields) => {
    var params = {
    email: fields.username,
    password: fields.password,
    };

    console.log(params)
    setLoading(true)
    request("post", "auth/login", params).then((res) => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
      if(res.status === 200){
        if (res.data && res.data) {
            var data = res.data
          localStorage.setItem("is_login", "1"); // is_login = 1
          let token = JSON.stringify(res.data.accessToken)
          const decoded = jwt_decode(token);
          localStorage.setItem("access_token", (res.data.accessToken) );
          localStorage.setItem("profile",decoded.sub);
          localStorage.setItem("role",decoded.scope);
          window.location.href = "/inbox";
        } else {
          message.warning(res.data.message);
        }
      }else{
         message.warning("Can not connect to server!.");
      }
      
    });
  };


  return (
    <div className="loging-form">
      <h1 style={{marginBottom:30}}>ECM-Backend</h1>
      <Form
        name="normal_login"
        size="large"
        className="login-form"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <div className="login-form-forgot">
          <a href="">Forgot password</a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
            style={{backgroundColor:"#000",color:"#FFF"}}
          >
            Log in
          </Button>
          <div>
            Or <a href="">register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );

}
