
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

const PageExam = () => {

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
        getListExamType()
    }, []);

    const onClickEditBtn = (param) => {
        setItems(param)
        setVisibleModal(true)
    }

    const onClickDeleteBtn = (id) => {
        setLoading(true)
        request("delete", "exam/deleteExam/" + id, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                message.success("User Have Been Delete")
                getList()
            }
        })
    }
    const getList = () => {
        setLoading(true)
        request("get", "exam/getExam", {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                var data = res.data
                console.log(data)
                setList(data.data)
            }
        })
    }

    const getListExamType = () => {
        setLoading(true)
        request("get", "examType/getExamType", {}).then(res => {
          setLoading(false)
          if (res.status == 200) {
            var data = res.data
            var arrTmp = []
            data.data.map((examType, _) => {
              arrTmp.push(
                {
                  label: examType.name,
                  value: examType.id
                }
              )
            }
            )
            setexamType(arrTmp)
          }
        })
      }
      
    
    const onFinish = (item) => {
        setVisibleModal(false)
        setLoading(true)

        var param = {
            "name": item.name,
            "examType": item.examType,
            "startDate": item.startDate
        }
        console.log(param)
        var method = "post"
        var url = "exam/addExam"
        if (items != null) {
            method = "put"
            url = "exam/editExam/" + items.id

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
            title: 'Exam Type',
            dataIndex: 'examType',
            key: 'examType',
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
                           {examResults.map((classroom, index) => {
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
            title: 'startDate',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (startDate) => dayjs(startDate).format("YYYY-MM-DD") 
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
                pageTitle='Exam'
                btnRight="New Exam"
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "Exam",
                    allowClear: true
                }}
            >
                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
                <ModalForm
                    items={items}
                    open={visibleModal}
                    title={items != null ? "Update Exam" : "New Exam"}
                    onCancel={onCloseModalForm}
                    onFinish={onFinish}
                    examType={examType}
                />
            </PageContainer>
        </>
    )
}

export default PageExam;