<template>
    <div class="drug">
        <a-card >
            <a-row :gutter="20" class="input-row">
                <a-col :span="7" class="input-col">
                    <a-input
                        v-model:value="data.query"
                        class="input-box"
                        placeholder="请输入病人姓名名查询"
                    ></a-input>
                </a-col>
                <a-button style="width: 100px; height: 30px" class="search_btn" type="primary" @click="getListData">查询</a-button>
            </a-row>
            <!--表单-->
             <a-table 
                :columns="columns" 
                :data-source="data.FilteredData" 
                :pagination="pagination"
                :loading="loading"
                :scroll="{ x: 1000 }"
                style="margin-top:20px"
                @change="handleTableChange"

                :class="['ant-table-striped', { border: hasBordered }]"
                :rowClassName="(_, index) => (index % 2 === 1 ? 'table-striped' : '')"
                table-layout="auto" >
                bordered>

                <template #createTime="{text}">
                     {{ formatDate(text) }}
                </template>
                <template #bodyCell="{ column, record}">
                    <template v-if="column.dataIndex==='operation'">
                        <a-button type="primary" danger class="action-button" @click="remove(record)" >删除</a-button>
                    </template>
                </template>
            </a-table>
        </a-card>
    </div>


</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { columns } from './option.ts';
import { Record } from '@/interface/record';
import { QueryForm } from '@/interface/queryForm';
import { get, del } from '@/utils/request';
import { Page } from '@/interface/page';
import confirm from 'ant-design-vue/es/modal/confirm';
import { message as AntMessage } from 'ant-design-vue';
import {formatToDateTime, formatToDate} from '@/utils/dateUtils'


const loading = ref(false);



const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<Record> } = reactive({
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
    const res = await get<Page<Record>>("/api/getRecord", {
        patientName: data.query,
        current: data.queryForm.currentPage,
        size: data.queryForm.pageSize
    });
    data.FilteredData = res.data.recordList;
    data.total = res.data.count;
    loading.value = false;

};

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

// 删除
const remove = async (record: Record) => {

    confirm({
        title: "确定删除?",
        content: "删除后将无法恢复",
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
            const res = await del('/api/deleteRecord', {
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
// 挂载时调用函数
onMounted(() => {
    getListData();
});

</script>

<style scoped>
.input-row {
  margin-bottom: 20px; /* 调整输入框和按钮之间的垂直间距 */
}

.input-box {
    border-radius: 0; /* 设置为0表示直角 */
}
.editable-row-operations a {
  margin-right: 8px;
}
.action-button {
border-radius: 0; /* 设置为0表示直角 */
  margin-right: 8px; /* 设置右边距离 */
}
.input-col {
  margin-right: -25px; /* 负的外边距将输入框的右边缘移动到按钮的左边缘 */
}
.Dia {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search_btn{
    margin-left: 15px;
     border-radius: 0;
      width: auto; /* 自动调整按钮宽度以适应内容 */
  padding: 0 15px; /* 可以根据需要调整按钮的内边距 */
  height: 30px;
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