import { ColumnsType } from 'antd/lib/table';

export const originColumns: ColumnsType<object> = [
    {dataIndex: 'project_name', title: '项目名称'},
    {dataIndex: 'project_no', title: '项目编号'},
    {dataIndex: 'custom_name', title: '客户'},
    {dataIndex: 'budget', title: '预算'},
    {dataIndex: 'price_id', title: '成本价'},
    {dataIndex: 'department', title: '部门'},
    {dataIndex: 'status', title: '状态'},
    {dataIndex: 'updated_at', title: '更新时间'}
]
