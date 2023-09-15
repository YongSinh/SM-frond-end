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
    student

}) => {
    const [form] = Form.useForm() // 
    const today = new Date();
    const dateFormat = 'YYYY/MM/DD';
    React.useEffect(() => {
        if (items != null) {
            form.setFieldsValue({
                status:items.status,
                studentId: items.studentId,
                date:dayjs(items.date),
                remark: items.remark
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
                            label={"studentId"}
                            name={"studentId"}
                            rules={[{
                                required: true, message: 'Please Select Students!'
                            }]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                showSearch
                                optionFilterProp="children"
                                placeholder="Please select"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                  }
                                options={student}
                            />
                        </Form.Item>

                <Form.Item
                    label={"Date"}
                    name={"date"}
                    rules={[{
                        required: true, message: 'Please input date of join!'
                    }]}
                >
                    <DatePicker style={{
                        width: '100%',
                    }} onChange={onChange}
                        format={dateFormat} />
                </Form.Item>
                <Form.Item
                    label={"Remark"}
                    name={"remark"}
                >
                    <Input
                        placeholder="remark"
                    />
                </Form.Item>
                <Form.Item
                            label={"Status"}
                            name={"status"}

                        >
                            <Radio.Group>
                                <Radio value={true}>True</Radio>
                                <Radio value={false}>False</Radio>
                            </Radio.Group>
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