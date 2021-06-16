import { get, post } from "../utils/requireHttp";

type RangeType<T extends string> = {
    [p in T]: string
}

type IOrderKey = 'custom_name'| 'project_name' | 'project_node' | 'budget' | 'charge_person' | 'department' | 'project_time' | 'remark' | 'price_id'

type ICreatOrder = {
    [p in IOrderKey]: string
}

interface IEditOrder extends ICreatOrder{
    id: string
}

type IFilter = RangeType<'project_no'| 'project_name'>

const creatOrderApi = '/api/order/create';
const editOrderApi = '/api/order/edit';
const deleteOrderApi = '/api/order/del';
const getOrderPriceApi = '/api/order/list'
const getOrderDetailApi = '/api/order/detail'


// 创建
export const creatOrder = (params: ICreatOrder) => post(creatOrderApi, params)
export const editOrder = (params: IEditOrder) => post(editOrderApi, params)
export const deleteOrder = (params: {id: string}) => post(deleteOrderApi, params)
export const getOrderList = (params: IFilter)=> get(getOrderPriceApi, params)
export const getOrderDetail = (params: {id: string}) => get(getOrderDetailApi, params)