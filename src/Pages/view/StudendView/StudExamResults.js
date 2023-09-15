
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { message, Table, Tag, DatePicker, Button, Space, Input, Row, Col} from 'antd';
import { request } from '../../../util/api'
import { RollbackOutlined, DeleteFilled } from "@ant-design/icons";
import {isEmptyOrNull} from '../../../util/service'
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

const StudExamResults = () => {
    const params = useParams()
    const [info, setinfo] = useState([])
    const [visibleModal, setVisibleModal] = useState(false)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const singleUserApiUrl = `${params.id}`

    const [month, setmonth] = useState();
    const [year, setyear] = useState();
    const [monthyear, setmonthyear] = useState("");
    const [studid, setStudid] = useState("");
    const onClickBtnRight = () => {
        setVisibleModal(true)
    }

    useEffect(() => {
        getinfor()
    }, []);

    const onChange = (date, dateString) => {
        // Parse the date string and create a date object.
        const parsedDate = dayjs(dateString);

        // Format the date object and return the month as a string.
        const month = parsedDate.format("M");
        const year = parsedDate.format("YYYY");
        setmonth(month)
        setyear(year)
        setmonthyear(dateString)
    };


    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1);
    }
    const getinfor = () => {
        setLoading(true)
        request("get", "student/getStudentInfo", {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                setinfo(data.data)
                setStudid(data.data.id)
                request("get", "examResult/getExamResultByStudId/"+data.data.id, {}).then(res => {
                    setLoading(false)
                    if (res.status == 200) {
                        var data = res.data
                        setList(data.data)
                       
                    }
                })
            }
        })
    }


    const onFilterDate = (text) => {
        setLoading(true);
        console.log(dayjs(text).format('YYYY-MM'))
        var param = "";
        if (!isEmptyOrNull(text)) {
            request("get", "examResult/getExamResultByStudId/" + studid, {})
            .then(res => {
                setLoading(false);
                if (res.status == 200) {
                    setLoading(false);
                    var data = res.data;
                    const filtered = data.data.filter(item => {
                        return dayjs(item.date_of_Exam).format('YYYY-MM') == dayjs(text).format('YYYY-MM')
                      });
                    setList(filtered)
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
        else
        {
            request("get", "examResult/getExamResultByStudId/" + studid, {})
            .then(res => {
                setLoading(false);
                if (res.status == 200) {
                    setLoading(false);
                    var data = res.data;
                    setList(data.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
       
    };


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
            title: 'startDate',
            dataIndex: 'date_of_Exam',
            key: 'startDate',
            render: (startDate) => dayjs(startDate).format("YYYY-MM-DD") 
        },
    ];



    return (
        <>
            <div>
                <Row gutter={10}>
                    <Col span={4}>
                    <Input value={info.lastname+" "+ info.firstname} prefix={<UserOutlined />} />
                    </Col>
                    <Col span={4}>
                    <Input value={info.customID} prefix={<UserOutlined />} />
                    </Col>
                    <Col span={4}>
                    <DatePicker  picker="month" onChange={onFilterDate} />
                    </Col>
                </Row>
            </div>

                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
  
        </>
    )
}

export default StudExamResults;