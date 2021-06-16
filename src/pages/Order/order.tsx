import { Button, Table, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import {creatOrder, editOrder, deleteOrder, getOrderList, getOrderDetail} from '../../serve/order';
import CreateOrder from './CreateOrder';
import {useGetOrderTableList} from './hooks'
import {originColumns} from './config';



export default function(){
    const [name, setName] = useState<string>('');
    const [no, setNo] = useState<string>('');
    const [loading, dataSource, xhrOrderData] = useGetOrderTableList(no, name);
    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [addForm] = useForm();


    const option =  {
        dataIndex: 'option', 
        title: '操作',
        render: ()=>{
            return (
                <div>
                    <Button>详情</Button>
                    <Button>修改</Button>
                    <Button>删除</Button>
                </div>
            )
        }
    }
       
    const columns = [...originColumns, option]


    
    return (
        <div id='orderPage'>
            <Button type="primary" onClick={()=>{
                setIsShowAddModal(true);
            }}>新增</Button>
            <Modal
                title="新增订单"
                visible={isShowAddModal}
            >
            <CreateOrder form={addForm} submit={()=>{}}></CreateOrder>
            </Modal>
            <Table loading={loading} columns={columns} dataSource={dataSource}></Table>
        </div>
    )
}