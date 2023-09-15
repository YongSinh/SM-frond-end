
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
import { isEmptyOrNull } from "../../util/service";

const PageExamResult = () => {

    const [items, setItems] = useState(null)
    const [student, setStudent] = useState([]);
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [course, setCourse] = useState([]);
    const [exam, setExam] = useState([]);
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
        getListStudent()
        getListCourse()
        getListExam()
    }, []);

    const onClickEditBtn = (param) => {
        setItems(param)
        setVisibleModal(true)
    }

    const onClickDeleteBtn = (id) => {
        setLoading(true)
        request("delete", "examResult/deleteExamResult/" + id, {}).then(res => {
            setLoading(false)
            if (res.status == 200) {
                message.success("User Have Been Delete")
                getList()
            }
        })
    }


    const getListExam = () => {
        setLoading(true)
        request("get", "exam/getExam", {}).then(res => {
          setLoading(false)
          if (res.status == 200) {
            var data = res.data
            var arrTmp = []
            data.data.map((exam, _) => {
              arrTmp.push(
                {
                  label: exam.name,
                  value: exam.id
                }
              )
            }
            )
            setExam(arrTmp)
          }
        })
      }

    const getListCourse = () => {
        setLoading(true)
        request("get", "course/getCourse", {}).then(res => {
          setLoading(false)
          if (res.status == 200) {
            var data = res.data
            var arrTmp = []
            data.data.map((course, _) => {
              arrTmp.push(
                {
                  label: course.name,
                  value: course.id
                }
              )
            }
            )
            setCourse(arrTmp)
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

    const getList = () => {
        setLoading(true)
        request("get", "examResult/getExamResult", {}).then(res => {
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
            "examId": item.examId,
            "studentId": item.studentId,
            "courseId": item.courseId,
            "marks": item.marks
        }
        console.log(param)
        var method = "post"
        var url = "examResult/addExamResult"
        if (items != null) {
            method = "put"
            url = "examResult/editExamResult/" + items.id

        }
        request(method, url, param).then(res => {
            if (res.status == 200) {
                message.success(res.data.message)
                setItems(null)
                getList()
            }
        })

    }
    console.log(list)
    const onFilterDate = (text) => {
        setLoading(true);
        console.log(dayjs(text).format('YYYY-MM'))
        var param = "";
        if (!isEmptyOrNull(text)) {
            request("get", "examResult/getExamResult", {})
            .then(res => {
                setLoading(false);
                if (res.status == 200) {
                    setLoading(false);
                    var data = res.data;
                    const filtered = data.data.filter(item => {
                        return dayjs(item.studId).format('YYYY-MM') == dayjs(text).format('YYYY-MM')
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
            request("get", "examResult/getExamResult" , {})
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

    const onSearch = (text) => {
        setLoading(true);
        var param = "";
        if (!isEmptyOrNull(text)) {
            request("get", "examResult/getExamResult", {})
            .then(res => {
                setLoading(false);
                if (res.status == 200) {
                    setLoading(false);
                    var data = res.data;
                    const filtered = data.data.filter(item => {
                        return item.studId == text
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
            request("get", "examResult/getExamResult" , {})
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
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Student ID',
            dataIndex: 'studId',
            key: 'studId',
        },
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: 'Course',
            dataIndex: 'courseId',
            key: 'courseId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Exam',
            dataIndex: 'examId',
            key: 'examId',
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
                pageTitle='ExamResult'
                btnRight="New ExamResult"
                date={true}
                onFilterDate={onFilterDate}
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "ExamResult",
                    allowClear: true
                }}
                onSearch={onSearch}
            >
                <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
                <ModalForm
                    items={items}
                    open={visibleModal}
                    title={items != null ? "Update ExamResult" : "New ExamResult"}
                    onCancel={onCloseModalForm}
                    onFinish={onFinish}
                    student={student}
                    course={course}
                    exam={exam}
                />
            </PageContainer>
        </>
    )
}

export default PageExamResult;