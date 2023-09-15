
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space, Input, Row, Col } from 'antd';
import { request } from '../../../util/api'
import { formatDateForServer } from "../../../util/service";
import PageContainer from "../../Container/PageContainer";
import { RollbackOutlined, UserOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import dayjs from "dayjs";
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

const Viewattendances = () => {
    const params = useParams()
    const [items, setItems] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [attendance, setattendance] = useState([])
  
    const singleUserApiUrl = `${params.id}`
    const onClickBtnRight = () => {
        setVisibleModal(true)
    }

    useEffect(() => {
        getList()
        getListStudattendances()
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
                setList(data.data)
            }
        })
    }

    const getListStudattendances = () => {
        setLoading(true)
        request("get", "attendance/getAttendanceByStudId/"+singleUserApiUrl, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                setattendance(data.data)
                console.log(data)
            }
        })
    }



    const columns = [

        {
            title: 'Name',
            dataIndex: 'studName',
            key: 'studName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'remark',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => {
                let color = 'geekblue';
                return (
                    <>
                                <Tag color={color}>
                                    {dayjs(date).format("YYYY-MM-DD h:mm A")}
                                </Tag>
                    </>
                );
            }
        },
    ];


    return (
        <>
         <div style={{
                marginBottom: 20
            }}>
                <Button onClick={onClick} type="primary"><RollbackOutlined />Back</Button>
            </div>

            <div>
                <Row gutter={10}>
                    <Col span={4}>
                    <Input value={list.lastname+" "+ list.firstname} prefix={<UserOutlined />} />
                    </Col>
                    <Col span={4}>
                    <Input value={list.customID} prefix={<UserOutlined />} />
                    </Col>
                </Row>
            </div>
                <Table columns={columns} dataSource={attendance} scroll={{ x: 'max-content' }} />
      
        </>
    )
}

export default Viewattendances;