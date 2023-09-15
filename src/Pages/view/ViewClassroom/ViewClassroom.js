
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space } from 'antd';
import { request } from '../../../util/api'
import { formatDateForServer } from "../../../util/service";
import PageContainer from "../../Container/PageContainer";
import { RollbackOutlined, DeleteFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import dayjs from "dayjs";

const ViewClassroom = () => {
    const params = useParams()
    const [items, setItems] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
  
    const singleUserApiUrl = `${params.id}`
    const onClickBtnRight = () => {
        setVisibleModal(true)
    }

    useEffect(() => {
        getList()
    }, []);



    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1);
    }

    const getList = () => {
        setLoading(true)
        request("get", "student/getStudentById/"+singleUserApiUrl, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                setList([data.data])
                console.log(data)
            }
        })
    }


    const columns = [
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
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'classrooms',
            dataIndex: 'classrooms',
            key: 'classrooms',
            render: (_, { classrooms }) => (
                <>
                    {classrooms.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];


    return (
        <>
         <div style={{
                marginBottom: 20
            }}>
                <Button onClick={onClick} type="primary"><RollbackOutlined />Back</Button>
            </div>
            <PageContainer
                pageTitle='Sudent'
                btnRight="New Student"
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "Teacher",
                    allowClear: true
                }}
            >
                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
            </PageContainer>
        </>
    )
}

export default ViewClassroom;