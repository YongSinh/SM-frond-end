import { SaveFilled } from "@ant-design/icons";
import { Button, Col, Divider, Form, Image, Input, DatePicker, Modal, Radio, Row, Select, Space } from "antd"
import React from "react";
import { Config } from "../../util/config";
import dayjs from "dayjs";

const ModalForm = ({
    open = false,
    title = null,
    footer = null,
    onCancel,
    onOk,
    onFinish,
    items,
    examType
}) => {
    const [form] = Form.useForm() // 
    const today = new Date();
    const dateFormat = 'YYYY/MM/DD';
    React.useEffect(() => {
        if (items != null) {
            form.setFieldsValue({
                name: items.name,
                examType: items.examType,
                startDate:dayjs(items.startDate)
            })
        }
    }, [items])


    const handleCancel = () => {
        form.resetFields() // clear data in form
        onCancel()
    }
    const onChange = (date, dateString) => {
        // console.log(date, dateString);
        console.log(dayjs(date).format("YYYY-MM-DD"))
    };

    return (
        <Modal
            open={open}
            title={title}
            onCancel={handleCancel}
            onOk={onOk}
            footer={footer}
            maskClosable={false}
            width={"40%"}
        >
            <Form
                encType="multipart/form-data"
                form={form}
                name="Form Classroom"
                layout='vertical'
                onFinish={(item) => {
                    form.resetFields()
                    onFinish(item)
                }}
                initialValues={{
                    status: 1
                }}
            >
                <Divider />

                <Form.Item
                    label={"Exam Name"}
                    name={"name"}
                    rules={[{
                        required: true, message: 'Please input grade Name!'
                    }]}
                >
                    <Input
                        placeholder="Exam Name"
                    />
                </Form.Item>
                <Form.Item
                                 label={"Exam Type"}
                                 name={"examType"}
                                 rules={[{
                                     required: true, message: 'Please input Exam Type!'
                                 }]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                options={examType}
                            />
                        </Form.Item>
 
                <Form.Item
                    label={"start Date"}
                    name={"startDate"}
                    rules={[{
                        required: true, message: 'Please input date!'
                    }]}
                >
                    <DatePicker style={{
                        width: '100%',
                    }} onChange={onChange}
                        format={dateFormat} />
                </Form.Item>

                <Form.Item style={{ textAlign: 'right' }}>
                    <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType='submit'><SaveFilled />{items != null ? "Update" : "Save"}</Button>
                    </Space>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ModalForm;