
import { useEffect, useState } from "react";
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space } from 'antd';
import { request } from '../../util/api'
import { formatDateForServer,isEmptyOrNull } from "../../util/service";
import PageContainer from "../Container/PageContainer";
import ModalForm from "./ModalForm";
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'antd-button-color/dist/css/style.css'; // or 'antd-button-color/dist/css/style.less'
import 'antd-button-color'
import { Link } from "react-router-dom";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PageStudent = () => {

    const [items, setItems] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
  

    const handleOpen = () => setVisibleModal(true);
    const handleClose = () => setVisibleModal(false);

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

    const onClickDeleteBtn = (id) => {
        setLoading(true)
        request("delete", "student/deleteStudent/" + id, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                message.success("User Have Been Delete")
                getList()
            }
        })
    }

    const getList = () => {
        setLoading(true)
        request("get", "student/getStudent", {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                setList(data.data)
                console.log(data)
            }
        })
    }

    const onSearch = (text) => {
        setLoading(true)
        var param = ""
        if(!isEmptyOrNull(text)){
            param = "/getStudentById/"+text // query parameter
            request("get","student"+param,{}).then(res=>{
                setLoading(false)
                if(res.status == 200){
                    var data = res.data 
                    setList([data.data])
                }
            })
        }
        else{
            param = "/getStudent"
            request("get","student"+param,{}).then(res=>{
                setLoading(false)
                if(res.status == 200){
                    var data = res.data 
                    setList(data.data)
                  
                }
            })
        }
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
            "password": item.password,
            "date_of_join": item.date_of_join,
            "status": item.status,
            "parents": item.parents
        }
        console.log(items.id)
        var method = "post"
        var url = "student/addStudent"
        if (items != null) {
            method = "put"
            url = "student/editStudent/" + items.id

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
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Student Id',
            dataIndex: 'customID',
            key: 'customID',
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
        ,
        {
            title: 'Parents',
            dataIndex: 'parents',
            key: 'parents',
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
            title: 'Classroom',
            key: 'classrooms',
            render: (item, items, index) => {
                return (
                    <Link to={`/ViewClassroom/${items.id}`}>
                    <Button
                        type="success"
                        size='small'
                ><EyeFilled/>Classroom</Button>
                </Link>
                )
            }
 
        },
        {
            title: 'Attendances',
            dataIndex: 'attendances',
            key: 'attendances',
            width: 10,
            render: (item, items, index) => {
                return (
                    <Link to={`/attendances/${items.id}`}>
                    <Button
                        type="info"
                        size='small'
                ><EyeFilled/>attendances</Button>
                </Link>
                )
            }

        },
        {
            title: 'examResults',
            key: 'examResults',
            render: (item, items, index) => {
                return (
                    <Link to={`/ViewExamResults/${items.id}`}>
                    <Button
                        type="primary"
                        size='small'
                ><EyeFilled/>Results</Button>
                </Link>
                )
            }
        },
        {
            title: "Action",
            key: "Action",
            fixed: 'right',
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
                pageTitle='Sudent'
                btnRight="New Student"
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "Student",
                    allowClear: true
                }}
                onSearch={onSearch}
            >
                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
                <ModalForm
                    items={items}
                    open={visibleModal}
                    title={items != null ? "Update Teacher" : "New Student"}
                    onCancel={onCloseModalForm}
                    onFinish={onFinish}
                />
            </PageContainer>
        </>
    )
}

export default PageStudent;