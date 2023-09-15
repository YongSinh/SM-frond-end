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
}) => {
    const [form] = Form.useForm() // 
    const today = new Date();
    const dateFormat = 'YYYY/MM/DD';
    React.useEffect(() => {
        if (items != null) {
            form.setFieldsValue({
                firstname: items.firstname,
                lastname: items.lastname,
                email: items.email,
                phone: items.phone,
                dob: dayjs(items.dob),
                password:items.password,
                date_of_join:dayjs(items.date_of_join),
                status:items.status,
                parents:items.parents

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
                name="Form Teacher"
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
                            label={"First Name"}
                            name={"firstname"}
                            rules={[{
                                required: true, message: 'Please input Frist Name!'
                            }]}
                        >
                            <Input
                                placeholder="First Name"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Last Name"}
                            name={"lastname"}
                            rules={[{
                                required: true, message: 'Please input Last Name!'
                            }]}
                        >
                            <Input
                                placeholder="Last Name"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                
                <Row gutter={5}>
                    <Col span={12}>
                        <Form.Item
                            label={"Dob"}
                            name={"dob"}
                            rules={[{
                                required: true, message: 'Please input Dob!'
                            }]}
                        >
                            <DatePicker style={{
                                width: '100%',
                            }} onChange={onChange}
                                format={dateFormat} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Email"}
                            name={"email"}
                            rules={[{
                                required: true, message: 'Please input Email!'
                            }]}
                        >
                            <Input
                                placeholder="Email"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col span={12}>
                        <Form.Item
                            label={"Phone"}
                            name={"phone"}
                            rules={[{
                                required: true, message: 'Please input phone!'
                            }]}
                        >
                            <Input
                                placeholder="Phone Number"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Password"}
                            name={"password"}
                            rules={[{
                                required: true, message: 'Please input password!'
                            }]}
                        >
                            <Input
                                placeholder="Password"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col span={12}>
                        <Form.Item
                            label={"date of join"}
                            name={"date_of_join"}
                            rules={[{
                                required: true, message: 'Please input date of join!'
                            }]}
                        >
                            <DatePicker style={{
                                width: '100%',
                            }} onChange={onChange}
                                format={dateFormat} />
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
                    <Col span={24}>
                        <Form.Item
                            label={"Parents"}
                            name={"parents"}
                        >
                            <Input
                                placeholder="parents"
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