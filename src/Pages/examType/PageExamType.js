
import { useEffect, useState } from "react";
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space, Modal } from 'antd';
import { request } from '../../util/api'
import { formatDateForServer } from "../../util/service";
import PageContainer from "../Container/PageContainer";
import ModalForm from "./ModalForm";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';

const PageExamType = () => {

    const [items, setItems] = useState(null)

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [examType, setexamType] = useState([])
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
        request("delete", "examType/deleteExamType/" + id, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                message.success("User Have Been Delete")
                getList()
            }
        })
    }
    const getList = () => {
        setLoading(true)
        request("get", "examType/getExamType", {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                console.log(data)
                setList(data.data)
            }
        })
    }


    const onFinish = (item) => {
        setVisibleModal(false)
        setLoading(true)

        var param = {
            "name": item.name,
            "desc": item.desc
        }
        console.log(param)
        var method = "post"
        var url = "examType/addExamType"
        if (items != null) {
            method = "put"
            url = "examType/editExamType" + items.id

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
            title: 'Exam name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Exam',
            dataIndex: 'exams',
            key: 'exams',
            render: (exams) => {
                let color = 'geekblue';
                return (
                    <>
                        {exams.map((classroom, index) => {
                            return (
                                <Tag color={color} key={classroom}>
                                    {index + 1}. {classroom}
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
                pageTitle='ExamType'
                btnRight="New ExamType"
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "ExamType",
                    allowClear: true
                }}
            >
                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
                <ModalForm
                    items={items}
                    open={visibleModal}
                    title={items != null ? "Update ExamType" : "New ExamType"}
                    onCancel={onCloseModalForm}
                    onFinish={onFinish}
                />
            </PageContainer>
        </>
    )
}

export default PageExamType;