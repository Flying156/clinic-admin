export const columns = [
    {
        title : '头像',
        dataIndex : 'avatar',
        key : 'avatar',
        slots : {customRender : 'avatar'},
    },

    {
        title : 'ID',
        dataIndex : 'id',
        key : 'id',
    },
    {
        title : '用户名',
        dataIndex : 'username',
        key : 'username',
    },
    {
        title : '性别',
        dataIndex : 'gender',
        key : 'gender',
    },
    {
        title : '角色',
        dataIndex : 'role',
        key : 'role',
        slots : {customRender : 'role'},

    },
    {
        title : '禁用',
        dataIndex : 'enabled',
        key : 'enabled',
        slots : {customRender : 'enabled'},
    },
    {
        title : '账号',
        dataIndex : 'account',
        key : 'account',
    },

    {
        title : "操作",
        key : "操作",
        dataIndex : "key",
        align : "center",
        slots : {customRender : "name"}, //绑定插槽

    },
];