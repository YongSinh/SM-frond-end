
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { message, Table, Tag, Popconfirm, Button, Space, Input, Row, Col} from 'antd';
import { request } from '../../../util/api'
import { RollbackOutlined, DeleteFilled } from "@ant-design/icons";
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

const ViewExamResults = () => {
    const params = useParams()
    const [items, setItems] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [stud, setstud] = useState([])
    const singleUserApiUrl = `${params.id}`
    const onClickBtnRight = () => {
        setVisibleModal(true)
    }

    useEffect(() => {
        getList()
        getListstud()
    }, []);



    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1);
    }

    const getList = () => {
        setLoading(true)
        request("get", "examResult/getExamResultByStudId/"+singleUserApiUrl, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                setList(data.data)
                console.log(data.data)
            }
        })
    }

    const getListstud = () => {
        setLoading(true)
        request("get", "student/getStudentById/"+singleUserApiUrl, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                setstud(data.data)
                //console.log(data.data)
            }
        })
    }



    const columns = [
        {
            title: 'Exam',
            dataIndex: 'examId',
            key: 'examId',
        },
        {
            title: 'Course',
            dataIndex: 'courseId',
            key: 'courseId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'marks',
            dataIndex: 'marks',
            key: 'marks',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'date of Exam',
            dataIndex: 'date_of_Exam',
            key: 'date_of_Exam',
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
                    <Input value={stud.lastname+" "+ stud.firstname} prefix={<UserOutlined />} />
                    </Col>
                    <Col span={4}>
                    <Input value={stud.customID} prefix={<UserOutlined />} />
                    </Col>
                </Row>
            </div>

                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
  
        </>
    )
}

export default ViewExamResults;