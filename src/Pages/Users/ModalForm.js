import { SaveFilled } from "@ant-design/icons";
import { Button, Col, Divider, Form, Image, Input, InputNumber, Modal, Radio, Row, Select, Space } from "antd"
import React from "react";
import { Config } from "../../util/config";

const ModalForm = ({
    open = false,
    title = null,
    footer = null,
    onCancel,
    onOk,
    onFinish,
    items,
    ListRole
}) => {
    const [form] = Form.useForm() // 

    React.useEffect(() => {
        if (items != null) {
            form.setFieldsValue({
                id: items.id,
                username: items.username,
                roles: items.roles,
                email: items.email,
            })
        }
    }, [items])


    const handleCancel = () => {
        form.resetFields() // clear data in form
        onCancel()
    }


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
                name="form_product"
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
                    label={"Username"}
                    name={"username"}
                    rules={[{
                        required: true, message: 'Please input username!'
                    }]}
                // hasFeedback={<SaveFilled/>}
                // validateStatus="error"
                // help="Username does not exist!"
                >
                    <Input
                        placeholder="Username"
                    />
                </Form.Item>

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

                <Form.Item
                    label={"Roles"}
                    name={"roles"}
                    rules={[{
                        required: true, message: 'Please Select roles!'
                    }]}
                >
                    <Select
                        mode="multiple"
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        //onChange={handleChange}
                        options={ListRole}
                    />
                </Form.Item>



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