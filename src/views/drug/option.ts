export const columns = [
    {
        title : 'ID',
        dataIndex : 'id',
        key : 'id',
    },
    {
        title : '药品名称',
        dataIndex : 'name',
        key : 'name',
    },
    {
        title : '制造商',
        dataIndex : 'manufacturer',
        key : 'manufacturer',
    },
    {
        title : '药效',
        dataIndex : 'effect',
        key : 'effect',
    },
    {
        title : '数量',
        dataIndex : 'quantity',
        key : 'quantity',
        sorter : (a: number, b: number) => a.quantity - b.quantity,

    },
    {
        title : '价格',
        dataIndex : 'price',
        key : 'price',
        sorter : (a: number, b: number) => a.price - b.price,

    },
    {
        title : '生产日期',
        dataIndex : 'produceTime',
        key : 'produceTime',
        slots : {customRender : 'produceTime'},
    },
    {
        title : '过期日期',
        dataIndex : 'expireTime',
        key : 'expireTime',
        slots : {customRender : 'expireTime'},
    },
    {
        title : '创建日期',
        dataIndex : 'createTime',
        key : 'createTime',
        slots : {customRender : 'createTime'},
    },
    {
        title : '修改日期',
        dataIndex : 'updateTime',
        key : 'updateTime',
        slots : {customRender : 'updateTime'},
    },

    {
        title : "操作",
        key : "操作",
        dataIndex : "key",
        align : "center",
        slots : {customRender : "name"}, //绑定插槽

    },
];