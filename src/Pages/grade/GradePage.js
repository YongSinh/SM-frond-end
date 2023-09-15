
import { useEffect, useState } from "react";
import React from "react";
import { message, Table, Tag, Popconfirm, Button, Space, Modal } from 'antd';
import { request } from '../../util/api'
import { formatDateForServer } from "../../util/service";
import PageContainer from "../Container/PageContainer";
import ModalForm from "./ModalForm";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';

const GradePage = () => {

    const [items, setItems] = useState(null)

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const showModal1 = () => {
        setIsModalOpen1(true);
    };

    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false)
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

    const onClickEditBtn = (param) => {
        setItems(param)
        setVisibleModal(true)
    }

    const onClickDeleteBtn = (id) => {
        setLoading(true)
        request("delete", "grade/delete/" + id, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                message.success("User Have Been Delete")
                getList()
            }
        })
    }
    const getList = () => {
        setLoading(true)
        request("get", "grade/getGrade", {}).then(res => {
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
            "gradeName": item.gradeName,
            "description": item.description,
        }
        console.log(param)
        var method = "post"
        var url = "grade/addGrade"
        if (items != null) {
            method = "put"
            url = "grade/editGrade/" + items.id

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
            title: 'GradeN ame',
            dataIndex: 'gradeName',
            key: 'gradeName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'classrooms',
            dataIndex: 'classrooms',
            key: 'classrooms',
            render: ( classrooms ) => {
                let color = 'geekblue';
                return (
                    <>
                           {classrooms.map((classroom, index) => {
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
            title: 'courses',
            dataIndex: 'courses',
            key: 'courses',
            render: ( courses ) => {
                let color = 'geekblue';
                return (
                    <>
                           {courses.map((course, index) => {
                                    return (
                                        <Tag color={color} key={course}>
                                            {index + 1}. {course}
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
                pageTitle='Grade'
                btnRight="New Grade"
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "Grade",
                    allowClear: true
                }}
            >
                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
                <ModalForm
                    items={items}
                    open={visibleModal}
                    title={items != null ? "Update Grade" : "New Grade"}
                    onCancel={onCloseModalForm}
                    onFinish={onFinish}
                />
            </PageContainer>
        </>
    )
}

export default GradePage;