
import { useEffect, useState } from "react";
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space, Modal } from 'antd';
import { request } from '../../util/api'
import { formatDateForServer } from "../../util/service";
import PageContainer from "../Container/PageContainer";
import { EyeFilled, DeleteFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
const arrayNumbersToStrings = (arrayNumbers) => {
  return arrayNumbers.map((number) => {
    return String(number);
  });
};

const TeacherClassroomPage = () => {

  const [items, setItems] = useState(null)
  
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setVisibleModal(false)
  };
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


  const getList = () => {
    setLoading(true)
    request("get", "classroom/getTeacherInClass", {}).then(res => {
      setLoading(false)
      if (res.status == 200) {
        var data = res.data
        setList(data.data)
      }
    })
  }


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'section',
      dataIndex: 'section',
      key: 'section',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'year',
      dataIndex: 'year',
      key: 'year',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'students',
      dataIndex: 'students',
      key: 'students',
      render: (item, items, index) => {
        return (
            <Link to={`/studentInClass/${items.id}`}>
            <Button
                type="success"
                size='small'
        ><EyeFilled/>Classroom</Button>
        </Link>
        )
    }
    },
    {
      title: 'teacher',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'grade',
      dataIndex: 'grade',
      key: 'grade',
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
      title: 'remark',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];


  return (
    <>
      <PageContainer
        pageTitle='Classroom'
        // btnRight="New Classroom"
        loading={loading}
        onClickBtnRight={onClickBtnRight}
        search={{
          title: "Classroom",
          allowClear: true
        }}
      >
        <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
      </PageContainer>
    </>
  )
}

export default TeacherClassroomPage;