
import { useEffect, useState } from "react";
import React from "react";
import { message, Table, Tag,Popconfirm,Button, Space } from 'antd';
import { request } from '../../util/api'
import { formatDateForServer } from "../../util/service";
import PageContainer from "../Container/PageContainer";
import ModalForm from "./ModalForm";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
const TeacherPage = () => {

  const [items, setItems] = useState(null)
  const [visibleModal, setVisibleModal] = useState(false)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)


  const onClickBtnRight = () => {
      setVisibleModal(true)
  }
  const onCloseModalForm = () => {
      setVisibleModal(false)
      setItems(null)
  }


  useEffect(() => {
    getList()
  }, []);

  const onClickEditBtn = (param) => {
    setItems(param)
    setVisibleModal(true)
}

const onClickDeleteBtn  = (id) => {
    setLoading(true)
    request("delete","teacher/deleteTeacher/"+id,{}).then(res=>{
        setLoading(false)
        if(res.status == 200){
            message.success("User Have Been Delete")
            getList()
        }
    })
}

  const getList = () => {
    setLoading(true)
    request("get", "teacher/getTeacher", {}).then(res => {
      setLoading(false)
      if (res.status == 200) {
        var data = res.data
        const filtered = data.data.filter(item => {
          return item.firstname == 'Grace'
        });
        setList(data.data)
      }
    })
  }

  const onFinish = (item) => {
    setVisibleModal(false)
    setLoading(true)
    var param = {
      "firstname": item.firstname,
      "lastname": item.lastname,
      "email": item.email,
      "phone": item.phone,
      "dob": item.dob,
      "password":item.password,
      "date_of_join":item.date_of_join,
      "status":item.status
    }

    var method = "post"
    var url = "teacher/addTeacher"
    if (items != null) {
        method = "put"
        url = "teacher/editTeacher/" + items.id

    }
    request(method, url, param).then(res => {
        if (res.status == 200) {
            message.success(res.data.message)
            setItems(null)
            getList()
        }
    })

}  

  const columns = [
    {
      title: "No",
      render: (item, items, index) => (index + 1),
      key: "No"
    },
    {
      title: 'Teacher ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Dob',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Passoword',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'date of join',
      dataIndex: 'date_of_join',
      key: 'date_of_join',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (item) => {
        let color = item == true ? 'geekblue' : 'red';
        let value = item == true ? 'true' : 'false';
        return (
          <Tag color={color} key={value}>
            {value.toUpperCase()}
          </Tag>
        )

      }
    },
    {
      title: 'Classrooms',
      dataIndex: 'classrooms',
      key: 'classrooms',
    },
    {
      title : "Action",
      key : "Action",
      render : (item,items,index) => {
          return (
              <Space>
                <Popconfirm
                  placement="topLeft"
                  title={"Delete"}
                  description={"Are sure to romove!"}
                  onConfirm={()=>onClickDeleteBtn(items.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size='small' danger><DeleteFilled/></Button>
                </Popconfirm>
                  <Button onClick={()=>onClickEditBtn(items)} size='small' type="primary" ><EditFilled/></Button>
              </Space>
          )
      }
  },
  ];


  return (
    <>
      <PageContainer
        pageTitle='Teacher'
        btnRight="New Teacher"
        loading={loading}
        onClickBtnRight={onClickBtnRight}
        search={{
            title: "Teacher",
            allowClear: true
        }}
      >
      <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
      <ModalForm
                items={items}
                open={visibleModal}
                title={items != null ? "Update Teacher" : "New Teacher"}
                onCancel={onCloseModalForm}
                onFinish={onFinish}
            />
      </PageContainer>
    </>
  )
}

export default TeacherPage;