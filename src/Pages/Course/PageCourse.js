
import { useEffect, useState } from "react";
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space, Modal } from 'antd';
import { request } from '../../util/api'
import { formatDateForServer } from "../../util/service";
import PageContainer from "../Container/PageContainer";
import ModalForm from "./ModalForm";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';

const PageCourse = () => {

    const [items, setItems] = useState(null)

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [grade, setGrade] = useState([]);

    const onClickBtnRight = () => {
        setVisibleModal(true)
    }
    const onCloseModalForm = () => {
        setVisibleModal(false)
        setItems(null)
    }


    useEffect(() => {
        getList()
        getListGrade()
    }, []);

    const onClickEditBtn = (param) => {
        setItems(param)
        setVisibleModal(true)
    }

    const onClickDeleteBtn = (id) => {
        setLoading(true)
        request("delete", "course/deleteCourse/" + id, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                message.success("User Have Been Delete")
                getList()
            }
        })
    }
    const getList = () => {
        setLoading(true)
        request("get", "course/getCourse", {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                setList(data.data)
            }
        })
    }

    const getListGrade = () => {
        setLoading(true)
        request("get", "grade/getGrade", {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                var arrTmp =[]
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
            }
        })
    }
    const onFinish = (item) => {
        setVisibleModal(false)
        setLoading(true)

        var param = {
            "name": item.name,
            "gradeId": item.gradeId,
            "description": item.description,
        }
        console.log(param)
        var method = "post"
        var url = "course/addCourse"
        if (items != null) {
            method = "put"
            url = "course/editCourse/" + items.id

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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
 
        {
            title: 'grade',
            dataIndex: 'grade',
            key: 'grade',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Exam Results',
            dataIndex: 'examResults',
            key: 'examResults',
            render: ( examResults ) => {
                let color = 'geekblue';
                return (
                    <>
                           {examResults.map((examResult, index) => {
                                    return (
                                        <Tag color={color} key={examResult}>
                                            {index + 1}. {examResult}
                                        </Tag>
                                    )
                                })}
                      
                    </>

                );
            }
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
                pageTitle='Course'
                btnRight="New Course"
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "Course",
                    allowClear: true
                }}
            >
                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
                <ModalForm
                    items={items}
                    open={visibleModal}
                    title={items != null ? "Update Course" : "New Course"}
                    onCancel={onCloseModalForm}
                    onFinish={onFinish}
                    grade={grade}
                />
            </PageContainer>
        </>
    )
}

export default PageCourse;