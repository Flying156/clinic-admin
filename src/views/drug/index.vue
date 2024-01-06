<template>
    <div class="drug">
        <a-card >
            <a-row :gutter="20">
                <a-col :span="7">
                    <a-input
                        v-model:value="data.query"
                        placeholder="请输入药品名查询"
                    ></a-input>
                </a-col>
                <a-button @click="getListData" style="width: 100px; height: 30px" class="search_btn" type="primary">查询</a-button>
                <a-button @click="addDrug" style="width: 100px; height: 30px" class="search_btn" type="primary">新增</a-button>
            </a-row>
            <!--表单-->
            <a-table :dataSource="data.FilteredData" 
                        :columns="columns"  
                        :scroll="{ x: 1000 }"
                        :pagination="pagination"
                        :loading="loading"
                        style="margin-top:20px"
                        @change="handleTableChange"
                        
                        table-layout="auto" >
             <template #produceTime="{ text }">
                    {{ formatDate(text) }}
            </template>
            <template #expireTime="{ text }">
                {{ formatDate(text) }}
            </template>
            <template #createTime="{ text }">
                    {{ formatDate(text) }}
            </template>
            <template #updateTime="{ text }">
                {{ formatDate(text) }}
            </template>
            <template  #name="{ record }">
                <a-button type="primary" class="action-button" @click="updateDrug(record)">编辑</a-button>
                <a-button type="primary" danger class="action-button"  @click="remove(record)">删除</a-button>
            </template>

            </a-table>
        </a-card>
    </div>
    <Dialog v-if="isShow" class="Dia" 
        :record="selectedRecord!"
        :isPost="flag"
        @child-click="closeDia" />

</template>

<script setup lang="ts">
import Dialog from './Dialog.vue';
import confirm from 'ant-design-vue/es/modal/confirm';
import {QueryForm} from '@/interface/queryForm'
import { reactive, onMounted, ref, computed } from 'vue';
import dayjs from 'dayjs';
import { columns } from './option'
import { Drug } from '@/interface/drug';
import {formatToDateTime, formatToDate} from '@/utils/dateUtils'
import {Page} from '@/interface/page'
import { get, del } from '@/utils/request'
const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<Drug> } = reactive({
    queryForm: {
        pageSize: 10,
        currentPage: 1,
    },
    query: '',
    total: 0,
    FilteredData: [],
});

const isShow = ref(false);
const flag = ref(false);
const selectedRecord = ref<Drug | null>(null); 
const loading = ref(false);
// 获取数据
const getListData = async () => {
    loading.value = true;

    const res = await get <Page<Drug>>('/api/getAllDrug', {
        current: data.queryForm.currentPage,
        limit: data.queryForm.pageSize,
        drugName: data.query

    });
    if (res.flag) {
        data.FilteredData = res.data.recordList;
        data.total = res.data.count;
    }
    loading.value = false;

};
// 格式化日期数据
const formatDate = (val: string, type: 'date' | 'time' = 'date') => {
    const formatFn = type === 'date' ? formatToDate : formatToDateTime;
    return val.length === 10 ? formatFn(Number(val) * 1000) : formatFn(val);
};
// 添加药品
const addDrug = () => {
    isShow.value = true;
    selectedRecord.value = createNewDrug();
    flag.value = false;
};

// 开启弹窗，给子组件数据,修改数据
const updateDrug = (record: Drug) => {
    selectedRecord.value = record;
    isShow.value = true;
    flag.value = true;

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

const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    data.queryForm.currentPage = pagination.current;
    data.queryForm.pageSize = pagination.pageSize;
    getListData();
};
// 获取数据，关闭弹窗
const closeDia = (show: boolean) => {
    isShow.value = show;
    getListData();
}

// 删除数据
const remove = (record: Drug) => {
    confirm({
        title: "确定删除?",
        content: "删除后将无法恢复",
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
            await del<string>('/api/deleteById', { id: record.id });
            getListData();
        },
        onCancel() { },
    });

};

onMounted(() => {
    getListData();
});

const createNewDrug = (): Drug => {
    return {
        id: 0,
        quantity: 0,
        price: 0,
        effect: '',
        manufacturer: '',
        createTime: new Date(),
        updateTime: new Date(),
        produceTime: dayjs('0000-00-00', 'yyyy-MM-dd'),
        expireTime: dayjs('0000-00-00', 'yyyy-MM-dd'),
        name: '',
    };
};


</script>

<style scoped>
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
