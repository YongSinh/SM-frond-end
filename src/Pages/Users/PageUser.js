
import { useEffect, useState } from "react";
import React from "react";
import { Space, Table, Tag, message, Button, Popconfirm } from 'antd';
import { request } from '../../util/api'
import PageContainer from "../Container/PageContainer";
import ModalForm from "./ModalForm";
import { DeleteFilled, EditFilled } from '@ant-design/icons'
const arrayNumbersToStrings = (arrayNumbers) => {
    return arrayNumbers.map((number) => {
        return String(number);
    });
};

const UserPage = () => {
    const [items, setItems] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)
    const [rolse, setrolse] = useState([])
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    const [userInfor, setUserInfor] = useState([])

    const onClickBtnRight = () => {
        setVisibleModal(true)
    }
    const onCloseModalForm = () => {
        setVisibleModal(false)
        setItems(null)
    }
    useEffect(() => {
        getList()
        getListRole()
        getUserInfo()
    }, []);

    const getList = () => {
        request("get", "user/getAll", {}).then(res => {
            if (res.status == 200) {
                var data = res.data
                setList(data.data)  
            }
        })
    }

    const getUserInfo = () => {
        request("get", "user/getUserInfo", {}).then(res => {
            if (res.status == 200) {
                var data = res.data
                console.log(data)
            }
        })
    }
    
 
    const getListRole = () => {
        request("get", "role/getRoles", {}).then(res => {
            if (res.status == 200) {
                var data = res.data
                var arrTmp = []
                data.data.map((item, _) => {
                    arrTmp.push({
                        label: item.name,
                        value: item.id
                    })
                })
                setrolse(arrTmp)
            }
        })
    }

    const onClickEditBtn = (param) => {
        setItems(param)
        setVisibleModal(true)
    }

    const onClickDeleteBtn  = (id) => {
        setLoading(true)
        request("delete","user/delete/"+id,{}).then(res=>{
            setLoading(false)
            if(res.status == 200){
                message.success("User Have Been Delete")
                getList()
            }
        })
    }



    const onFinish = (item) => {
        setVisibleModal(false)
        setLoading(true)
        const arrayNumbers = item.roles;
        const arrayStrings = arrayNumbersToStrings(arrayNumbers);
        var param = {
            "username": item.username,
            "password": item.password,
            "roles": arrayStrings,
            "email": item.email
        }

        var method = "post"
        var url = "user/add"
        if (items != null) {
            method = "put"
            url = "user/edit/" + items.id

        }
        request(method, url, param).then(res => {
            setLoading(false)
            if (res.status == 200) {
                message.success(res.data.message)
                setItems(null)
                getList()
            }
        })

    }   

    const columns = [
        {
            title: "No",
            render: (item, items, index) => (index + 1),
            key: "No"
        },
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (_, { roles }) => (
                <>
                  {roles.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'STUDENT') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag}
                      </Tag>
                    );
                  })}
                </>
              ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title : "Action",
            key : "Action",
            render : (item,items,index) => {
                return (
                    <Space>
                      <Popconfirm
                        placement="topLeft"
                        title={"Delete"}
                        description={"Are sure to romove!"}
                        onConfirm={()=>onClickDeleteBtn(items.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button size='small' danger><DeleteFilled/></Button>
                      </Popconfirm>
                        <Button onClick={()=>onClickEditBtn(items)} size='small' type="primary" ><EditFilled/></Button>
                    </Space>
                )
            }
        },
    ];



    return (
        <>
            <PageContainer
                pageTitle='User'
                btnRight="New User"
                loading={loading}
                onClickBtnRight={onClickBtnRight}
                search={{
                    title: "User Id",
                    allowClear: true
                }}
            >

            <Table columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
            <ModalForm
                items={items}
                open={visibleModal}
                title={items != null ? "Update User" : "New User"}
                onCancel={onCloseModalForm}
                ListRole={rolse}
                onFinish={onFinish}
            />
            </PageContainer>
        </>

    )
}

export default UserPage;