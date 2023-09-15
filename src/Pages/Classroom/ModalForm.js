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
    student,
    teacher,
    grade
}) => {
    const [form] = Form.useForm() // 
    const today = new Date();
    const dateFormat = 'YYYY/MM/DD';
    React.useEffect(() => {
        if (items != null) {
            form.setFieldsValue({
                section: items.section,
                lastname: items.lastname,
                year: items.year,
                studentId: items.students,
                teacherid: items.teacher,
                gradeid:items.grade,
                status:items.status,
                remark:items.remark
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
                <Row gutter={5}>
                    <Col span={12}>
                        <Form.Item
                            label={"Section"}
                            name={"section"}
                            rules={[{
                                required: true, message: 'Please input section!'
                            }]}
                        >
                            <Input
                                placeholder="section"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Year"}
                            name={"year"}
                            rules={[{
                                required: true, message: 'Please input year!'
                            }]}
                        >
                            <Input
                                placeholder="Year"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col span={12}>

                        <Form.Item
                            label={"Students"}
                            name={"studentId"}
                            rules={[{
                                required: true, message: 'Please Select Students!'
                            }]}
                        >
                            <Select
                                mode="multiple"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                //onChange={handleChange}
                                options={student}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Teacher"}
                            name={"teacherid"}
                            rules={[{
                                required: true, message: 'Please Select teacher!'
                            }]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                //onChange={handleChange}
                                options={teacher}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col span={12}>
                    <Form.Item
                            label={"Grade"}
                            name={"gradeid"}
                            rules={[{
                                required: true, message: 'Please Select Students!'
                            }]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                //onChange={handleChange}
                                options={grade}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={"Status"}
                            name={"status"}

                        >
                            <Radio.Group>
                                <Radio value={true}>True</Radio>
                                <Radio value={false}>False</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                <Col span={24}>
                        <Form.Item
                            label={"remark"}
                            name={"remark"}
                        >
                            <Input
                                placeholder="remark"
                            />
                        </Form.Item>
                    </Col>
                </Row>


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