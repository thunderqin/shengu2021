import React, { useEffect, useState } from "react";
import {creatOrder, editOrder, deleteOrder, getOrderList, getOrderDetail} from '../../serve/order';


export const useGetOrderTableList = (no:string, name:string)=>{
    const [loading, setIsLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const xhrOrderData = async ()=>{
        setIsLoading(true);
        const result = await getOrderList({
            project_no: no,
            project_name: name
        })
        setDataSource(result.data.data)
        setIsLoading(false);
        console.log('result', result);
    }
    useEffect(()=>{
        xhrOrderData();
    }, [])

    return [loading, dataSource, xhrOrderData]

}

export const createOrder = ()=>{
    
}