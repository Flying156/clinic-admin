<template>
    <div class="drug">
        <a-card >
            <a-row :gutter="20">
                <a-col :span="7" style="margin-right: -25px;">
                    <a-input
                        v-model:value="data.query"
                        placeholder="请输入用户名查询"
                        style="border-radius: 0"

                    ></a-input>
                </a-col>
                <a-button style="width: 100px; height: 30px" class="search_btn" type="primary" @click="getListData">查询</a-button>
            </a-row>
            <!--表单-->
            <a-table 
                :columns="columns"  
                :scroll="{ x: 1000 }"
                :pagination="pagination"
                :loading="loading"
                :dataSource="data.FilteredData"
                style="margin-top:20px"
                  :class="['ant-table-striped', { border: hasBordered }]"
                :rowClassName="(_, index) => (index % 2 === 1 ? 'table-striped' : '')"
                @change="handleTableChange"

                table-layout="auto" >

                <template #avatar="{text}">
                    <a-avatar :src="text" />

                </template>

                <template #enabled="{ text, record }">
                    <a-switch :checked="!text" @click="updateEnabled(true, record)" />
                </template>

            
                <template #role="{text}">
                    <span>
                        <a-tag  color="gold">
                        {{ text }}
                        </a-tag>
                    </span>
                </template>
                
                <template #name="{record}">
                    <a-button type="primary" class="action-button" @click="updateEnabled(false, record)">编辑</a-button>
                </template>
            </a-table>
        </a-card>

        <a-modal
           title="用户信息"
            :ok-text="componentDisabled ? '确定' : '提交'"
            @ok="commit"
            @cancel="close"
            :visible="!componentDisabled">
                <a-form
                   :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    layout="horizontal"
                v-model:value="currentRecord"
                >
                    <a-form-item label="用户名">
                        {{ currentRecord?.username }}
                    </a-form-item>

                    <a-form-item label="角色">
                        <a-radio-group v-model:value="currentRecord!.role">
                            <a-radio-button value="admin">admin</a-radio-button>
                            <a-radio-button value="doctor">doctor</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-form>
        </a-modal>
    </div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { columns } from './option.ts';
import { Page } from '@/interface/page';
import { QueryForm } from '@/interface/queryForm';
import { User } from '@/interface/user';
import { get, put } from '@/utils/request';
import {message as AntMessage} from 'ant-design-vue';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
const loading = ref(false);
const componentDisabled = ref(true);
const currentRecord = ref<User | null>(null);


const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<User> } = reactive({
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

const getListData = async () => {
    loading.value = true;
    const res = await get<Page<User>>('/api/getAllUser', {
        current: data.queryForm.currentPage,
        limit: data.queryForm.pageSize,
        drugName: data.query
    });
    if (res.flag) {
        data.FilteredData = res.data.recordList;
        data.total = res.data.count;
        loading.value = false;
    }
};

const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    data.queryForm.currentPage = pagination.current;
    data.queryForm.pageSize = pagination.pageSize;
    getListData();
};

const updateEnabled = async (flag: boolean, record: User) => {
    if (flag) {
        const res = await put('/api/enabledUser', {
            userId: record.id,
            enabled: !record.enabled
        });
        if (res.flag) {
            getListData();
            record.enabled = !record.enabled;
            AntMessage.success("操作成功");
        }
    } else {
        currentRecord.value = record;
        componentDisabled.value = false;
    }
};
const commit = async() => {
    const res =  await put('/api/editRole', {
        username: currentRecord.value?.username,
        role: currentRecord.value?.role
    });

    if (res.flag) {
        AntMessage.success("修改成功");
        close();
    }    
}

const close = () => {
    componentDisabled.value = true;
    getListData();
}

onMounted(() => {
    getListData();
});


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
    border-radius: 0; /* 设置为0表示直角 */
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