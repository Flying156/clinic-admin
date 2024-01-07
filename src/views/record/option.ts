export const columns = [
    {
        title : 'ID',
        dataIndex : 'id',
        key : 'id',
    },
    {
        title : '病人姓名',
        dataIndex : 'patientName',
        key : 'patientName',
    },
    {
        title : '开药医生',
        dataIndex : 'doctorName',
        key : 'doctorName',
    },
    {
        title : '药品名称',
        dataIndex : 'drugName',
        key : 'drugName',
    },
    {
        title : '金额',
        dataIndex : 'price',
        key : 'price',
    },
    {
        title : '开药时间',
        dataIndex : 'createTime',
        key : 'createTime',
        slots : {customRender : 'createTime'},

    },

    {
        title : "操作",
        key : "操作",
        dataIndex : "operation",
        align : "center",
        width : '10%',
        fixed : 'right',
    },
];