<template>
    <div class="drug">
        <a-card >
            <a-row :gutter="20">
                <a-col :span="7">
                    <a-input
                        v-model:value="data.query"
                        placeholder="请输入用户名查询"
                    ></a-input>
                </a-col>
                <a-button style="width: 100px; height: 30px" class="search_btn" type="primary" @click="getListData">查询</a-button>
                <a-button @click="addPatient" style="width: 100px; height: 30px" class="search_btn" type="primary">新增</a-button>
            </a-row>
            <!--表单-->
             <a-table 
                :columns="columns" 
                :data-source="data.FilteredData" 
                :pagination="pagination"
                :loading="loading"
                :scroll="{ x: 1000 }"
                @change="handleTableChange"
                table-layout="auto" >
                bordered>
                <template #bodyCell="{ column, record}">
                    <template v-if="column.dataIndex==='operation'">
                        <a-button type="primary" class="action-button" @click="updatePatient(record)">编辑</a-button>
                        <a-button type="primary" danger class="action-button"  @click="remove(record)">删除</a-button>
                    </template>
                </template>
            </a-table>
        </a-card>
    </div>

    <Dialog
        v-if="isShow"
        :record="patient!"
        :isPost="flag"
        @child-click="closeDia"
    />

</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { columns } from './option.ts';
import Dialog  from './components/Dialog.vue';
import { Patient } from '@/interface/patient';
import { QueryForm } from '@/interface/queryForm';
import { get, del } from '@/utils/request';
import { Page } from '@/interface/page';
import confirm from 'ant-design-vue/es/modal/confirm';
import {message as AntMessage} from 'ant-design-vue';

const loading = ref(false);
const isShow = ref(false);
const patient = ref<Patient | null>(null);
const flag = ref(false);


const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<Patient> } = reactive({
    queryForm: {
        pageSize: 10,
        currentPage: 1,
    },
    query: '',
    total: 0,
    FilteredData: [],
});


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
    const res = await get<Page<Patient>>("/api/getAllPatient", {
        name: data.query,
        current: data.queryForm.currentPage,
        size: data.queryForm.pageSize
    });
    data.FilteredData = res.data.recordList;
    data.total = res.data.count;
    loading.value = false;

};
// 换页
const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    data.queryForm.currentPage = pagination.current;
    data.queryForm.pageSize = pagination.pageSize;
    getListData();
};
// 更新病人
const updatePatient = (record: Patient) => {
    isShow.value = true;
    patient.value = record;
};
// 新增病人
const addPatient = () => {
    isShow.value = true;
    patient.value = initPatient();
    flag.value = false;
};
// 删除
const remove = async (record: Patient) => {

    confirm({
        title: "确定删除?",
        content: "删除后将无法恢复",
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
            const res = await del('/api/deletePatient', {
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

const closeDia = () => {
    isShow.value = false;
    getListData();
};

const initPatient = ():Patient => {
    return {
        id: 0,
        name: '',
        gender: '',
        disease: '',
        age: 0,
    };
}

onMounted(() => {
    getListData();
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
}
</style>