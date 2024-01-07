<template>
    <div class="drug">
        <a-card >
            <a-row :gutter="20">
                <a-col :span="7"  style="margin-right: -25px; ">
                    <a-input
                        v-model:value="data.query"
                        placeholder="请输入用户名查询"
                         style="border-radius: 0px;"
                    ></a-input>
                </a-col>
                <a-button style="width: 100px; height: 30px" class="search_btn" type="primary" @click="getListData">查询</a-button>
                <a-button style="width: 100px; height: 30px" class="search_btn" type="primary" @click="addRole">添加角色</a-button>
            </a-row>
            <!--表单-->
             <a-table 
                :class="['ant-table-striped', { border: hasBordered }]"
                :rowClassName="(_, index) => (index % 2 === 1 ? 'table-striped' : '')"
                :columns="columns" 
                :data-source="data.FilteredData" 
                :pagination="pagination"
                :loading="loading"   
                style="margin-top:20px"
                :scroll="{ x: 1000 }"
                @change="handleTableChange"
                table-layout="auto" >
                bordered>

                <template #createTime="{text}">
                     {{ formatDate(text) }}
                </template>
                <template #bodyCell="{ column, record}">
                    <template v-if="column.dataIndex==='operation'">
                        <a-button type="link" class="action-button" @click="show(record)">操作权限</a-button>
                        <a-button type="link" danger class="action-button" @click="remove(record)">删除</a-button>
                    </template>
                </template>
            </a-table>
        </a-card>
    </div>
    <a-modal :open="visiable"
        @cancel="closeModal"
        @ok="update"
      width="500px" title="编辑角色" >
        <a-form
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            layout="horizontal"
            v-model:value="role"
            style="max-width: 600px"
        >
            <a-form-item label="角色名">
                <a-input v-model:value="role.roleName" />
            </a-form-item>

            <a-form-item label="角色描述">
                <a-input v-model:value="role.roleDescription"/>
            </a-form-item>

            <a-form-item label="接口权限">
                 <a-tree checkable 
                 v-model:checkedKeys="checkedKeys"
                 :tree-data="permission">
                </a-tree>
            </a-form-item>

        </a-form>

    </a-modal>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { columns } from './options.ts';
import { Role } from '@/interface/role';
import { QueryForm } from '@/interface/queryForm';
import { get, del, post, put } from '@/utils/request';
import { Page } from '@/interface/page';
import confirm from 'ant-design-vue/es/modal/confirm';
import { message as AntMessage } from 'ant-design-vue';
import {formatToDateTime, formatToDate} from '@/utils/dateUtils'

type Key = string | number;


const labelCol = { style: { width: '150px'  } };
const wrapperCol = { span: 12 };
const loading = ref(false);
const visiable = ref(false);
const permission = ref<Array<PermissionRequest> | null>();
const role = ref<Role | null>();
const insert = ref(false);


const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<Role> } = reactive({
    queryForm: {
        pageSize: 10,
        currentPage: 1,
    },
    query: '',
    total: 0,
    FilteredData: [],
});
// 权限实体
interface RequestPath {
  key: string;
  title: string;
};

interface PermissionRequest {
  key: string;
  title: string;
  children: RequestPath[];
};

// 分页器配置
const pagination = computed(() => ({
    total: data.total,
    current: data.queryForm.currentPage,
    pageSize: data.queryForm.pageSize,
    showTotal:  (total:number) =>`总共 ${total} 项`,
    defaultPageSize: 5,
    pageSizeOptions: [ '5', '10', '15'], // 可不设置使用默认
    showSizeChanger:true, // 是否显示pagesize选择
    showQuickJumper: true, // 是否显示跳转窗
}));
// 获取数据
const getListData = async () => {
    loading.value = true;
    const res = await get<Page<Role>>("/api/getRoleList", {
        current: data.queryForm.currentPage,
        size: data.queryForm.pageSize,
        roleName: data.query,
    });
    data.FilteredData = res.data.recordList;
    data.total = res.data.count;
    loading.value = false;

};
// 关闭弹窗
const closeModal = ()=>{
    visiable.value = false;
}

// 格式化日期数据
const formatDate = (val: string, type: 'date' | 'time' = 'date') => {
    const formatFn = type === 'date' ? formatToDate : formatToDateTime;
    return val.length === 10 ? formatFn(Number(val) * 1000) : formatFn(val);
};
// 换页
const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    data.queryForm.currentPage = pagination.current;
    data.queryForm.pageSize = pagination.pageSize;
    getListData();
};
// 展示选择框
const show = async (record: Role) => {
    checkedKeys.value = [];
    visiable.value = true;
    role.value = record;
    const res = await get<Array<PermissionRequest>>("/api/getPermission", {
        roleId: record.id
    });
    res.data.forEach((item: PermissionRequest) => {
        item.children.forEach((child: RequestPath) => {
            checkedKeys.value.push(child.key = item.key + "-" + child.key);
        });
    });
};

const addRole = () => {
    visiable.value = true;
    checkedKeys.value = [];
    role.value = {
        id: 0,
        roleName: '',
        roleDescription: '',
    };
    insert.value = true;
    addRole();
};
// 获取列表
const getPermissionList = async () => {
    const res = await get<Array<PermissionRequest>>("/api/getPermission");
    res.data.forEach((item: PermissionRequest) => {
        item.children.forEach((child: RequestPath) => {
            child.key = item.key + "-" + child.key;
        });
    });

    permission.value = res.data;
};

const checkedKeys = ref<string[]>([]);
// 删除
const remove = async (record: Role) => {

    confirm({
        title: "确定删除?",
        content: "删除后将无法恢复",
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
            const res = await del('/api/deleteRole', {
            id: record.id
            });
            if (res.flag) {
                AntMessage.success("删除成功");
                getListData();
            }
        },
        onCancel() { },
    });

};
// 更新或添加
const update = async () => {

    const keySet = new Set<string>();
    checkedKeys.value.forEach((item: string) => {
        if (typeof item === 'string') {
            keySet.add(item.substring(0, 1));
        }
    });
    const uniqueKeys = Array.from(keySet);
    if (insert.value) {
        const res = await put("/api/addRole", {
            roleName: role.value.roleName,
            description: role.value.roleDescription,
            keyList: uniqueKeys,
        });
        if (res.flag) {
            AntMessage.success("添加成功");
            closeModal();
            getListData();
        }
        insert.value = false;
    }
    else {
        const res = await post("/api/editRole", {
            id: role.value.id,
            roleName: role.value.roleName,
            description: role.value.roleDescription,
            keyList: uniqueKeys,
        });
        if (res.flag) {
            AntMessage.success("修改成功");
            closeModal();
            getListData();

        }
    }

};



// 挂载时调用函数
onMounted(() => {
    getListData();
    getPermissionList();
});

</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.action-button {
  margin-right: 8px; /* 设置右边距离 */
}
.Dia {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search_btn{
    margin-left: 15px;
    border-radius: 0px;
}
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
  .ant-table-striped :deep(.ant-table-pagination.ant-pagination) {
    margin: 30px auto;
    width: 100%;
    text-align: center;
    .ant-pagination-prev,
    .ant-pagination-next {
      .anticon {
        vertical-align: 1.5px;
      }
    }
  }
  .border {
    border: 0.5px solid rgba(210, 210, 210, 0.5);
  }
</style>