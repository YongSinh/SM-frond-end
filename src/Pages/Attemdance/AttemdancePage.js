
import { useEffect, useState } from "react";
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space, Modal } from 'antd';
import { request } from '../../util/api'
import { formatDateForServer } from "../../util/service";
import PageContainer from "../Container/PageContainer";
import ModalForm from "./ModalForm";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import dayjs from "dayjs";
const AttemdancePage = () => {

    const [items, setItems] = useState(null)

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [student, setStudent] = useState([]);

    

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
    }, []);

    const onClickEditBtn = (param) => {
        setItems(param)
        setVisibleModal(true)
    }


    const onClickDeleteBtn = (studentId) => {
        setLoading(true)
        console.log(studentId)
        request("delete", "attendance/deleteAttendance/" + studentId, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                message.success("User Have Been Delete")
                getList()
            }
        })
    }
    const getList = () => {
        setLoading(true)
        request("get", "attendance/getAttendance", {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                console.log(data)
                setList(data.data)
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
              label: student.firstname +" "+student.lastname,
              value: student.id
            }
          )
        }
        )
        setStudent(arrTmp)
      }
    })
  }
    const onFinish = (item) => {
        setVisibleModal(false)
        setLoading(true)

        var param ={
            "studentId": item.studentId,
            "date": item.date,
            "status":item.status,
            "remark": item.remark
          }
        console.log(param)
        var method = "post"
        var url = "attendance/addAttendance"
        if (items != null) {
            method = "put"
            url = "attendance/editAttendance/" + items.studentId

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
            title: 'Student Name',
            dataIndex: 'studName',
            key: 'studName',
        },
        {
            title: 'remark',
            dataIndex: 'remark',
            key: 'remark',
            render: (text) => <a>{text}</a>,
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
            title: 'Date',
            dataIndex: 'date',
            key: 'date', 
            render: (date) => dayjs(date).format("YYYY-MM-DD") 
    
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
                            onConfirm={() => onClickDeleteBtn(items.studentId)}
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
                pageTitle='Attendance'
                btnRight="New Attendance"
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "Attendance",
                    allowClear: true
                }}
            >
                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
                <ModalForm
                    items={items}
                    open={visibleModal}
                    title={items != null ? "Update Attendance" : "New Attendance"}
                    onCancel={onCloseModalForm}
                    onFinish={onFinish}
                    student={student}
                />
            </PageContainer>
        </>
    )
}

export default AttemdancePage;