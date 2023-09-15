
import { useEffect, useState } from "react";
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space, Modal } from 'antd';
import { request } from '../../util/api'
import { formatDateForServer } from "../../util/service";
import PageContainer from "../Container/PageContainer";
import ModalForm from "./ModalForm";
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

const arrayNumbersToStrings = (arrayNumbers) => {
  return arrayNumbers.map((number) => {
    return String(number);
  });
};

const ClassroomPage = () => {

  const [items, setItems] = useState(null)
  
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [student, setStudent] = useState([])
  const [grade, setGrade] = useState([])
  const [teacher, setTeacher] = useState([])
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
    getListStudent()
    getListTeacher()
    getListGrade()
  }, []);

  const onClickEditBtn = (param) => {
    setItems(param)
    setVisibleModal(true)
  }

  const onClickDeleteBtn = (id) => {
    setLoading(true)
    request("delete", "teacher/deleteTeacher/" + id, {}).then(res => {
      setLoading(false)
      if (res.status == 200) {
        message.success("User Have Been Delete")
        getList()
      }
    })
  }
  const getListGrade = () => {
    setLoading(true)
    request("get", "grade/getGrade", {}).then(res => {
      setLoading(false)
      if (res.status == 200) {
        var data = res.data
        var arrTmp = []
        data.data.map((grade, _) => {
          arrTmp.push(
            {
              label: grade.gradeName,
              value: grade.id
            }
          )
        }
        )
        setGrade(arrTmp)
        console.log(data)
      }
    })
  }

  const getListTeacher = () => {
    setLoading(true)
    request("get", "teacher/getTeacher", {}).then(res => {
      setLoading(false)
      if (res.status == 200) {
        var data = res.data
        var arrTmp = []
        data.data.map((teacher, _) => {
          arrTmp.push(
            {
              label: teacher.firstname,
              value: teacher.id
            }
          )
        }
        )
        setTeacher(arrTmp)
      }
    })
  }


  const getListStudent = () => {
    setLoading(true)
    request("get", "student/getStudent", {}).then(res => {
      setLoading(false)
      if (res.status == 200) {
        var data = res.data
        var arrTmp = []
        data.data.map((student, _) => {
          arrTmp.push(
            {
              label: student.firstname,
              value: student.id
            }
          )
        }
        )
        setStudent(arrTmp)
      }
    })
  }

  const getList = () => {
    setLoading(true)
    request("get", "classroom/getClassroom", {}).then(res => {
      setLoading(false)
      if (res.status == 200) {
        var data = res.data
        setList(data.data)
        console.log(data)
      }
    })
  }

  const onFinish = (item) => {
    setVisibleModal(false)
    setLoading(true)
    const arrayNumbers = item.studentId;
    const arrayStrings = arrayNumbersToStrings(arrayNumbers);
    var param = {
      "year": item.year,
      "section": item.section,
      "status": item.status,
      "remark": item.remark,
      "students": arrayStrings,
      "grade_id": item.gradeid,
      "teacher_id": item.teacherid
    }
    console.log(param)
    var method = "post"
    var url = "classroom/addClassroom"
    if (items != null) {
      method = "put"
      url = "classroom/editClassroom/" + items.id

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
        ><EyeFilled/>Student</Button>
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
    {
      title: "Action",
      key: "Action",
      render: (item, items, index) => {
        return (
          <Space>
            <Popconfirm
              placement="topLeft"
              title={"Delete"}
              description={"Are sure to romove!"}
              onConfirm={() => onClickDeleteBtn(items.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button size='small' danger><DeleteFilled /></Button>
            </Popconfirm>
            <Button onClick={() => onClickEditBtn(items)} size='small' type="primary" ><EditFilled /></Button>
          </Space>
        )
      }
    },
  ];


  return (
    <>
      <PageContainer
        pageTitle='Classroom'
        btnRight="New Classroom"
        loading={loading}
        onClickBtnRight={onClickBtnRight}
        search={{
          title: "Classroom",
          allowClear: true
        }}
      >
        <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
        <ModalForm
          items={items}
          open={visibleModal}
          title={items != null ? "Update Classroom" : "New Classroom"}
          onCancel={onCloseModalForm}
          onFinish={onFinish}
          student={student}
          teacher={teacher}
          grade={grade}
        />
      </PageContainer>
    </>
  )
}

export default ClassroomPage;