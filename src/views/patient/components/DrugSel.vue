<template>
    <a-modal 
    width="1000px" 
    title="开药"
    @cancel="closeModal"
    @ok="commitSelect"
    :open="visiable" >
        <a-transfer
        v-model:target-keys="targetKeys"
        :data-source="drugList.filterData"
        :disabled="disabled"
        :show-search="showSearch"
        :filter-option="(inputValue:string, item:Drug) => item.name.indexOf(inputValue) !== -1"
        :show-select-all="false"
        >
            <template
                #children="{
                direction,
                filteredItems,
                selectedKeys,
                disabled: listDisabled,
                onItemSelectAll,
                onItemSelect,
                }"
            >
                <a-table
                :row-selection="
                    getRowSelection({
                    disabled: listDisabled,
                    selectedKeys,
                    onItemSelectAll,
                    onItemSelect,
                    })
                "
                :columns="direction === 'left' ? leftColumns : rightColumns"
                :data-source="filteredItems"
                size="small"
                :style="{ pointerEvents: listDisabled ? 'none' : null }"
                :custom-row="
                    ({ key, disabled: itemDisabled }) => ({
                    onClick: () => {
                        if (itemDisabled || listDisabled) return;
                        onItemSelect(key, !selectedKeys.includes(key));
                    },
                    })
                "
                />
            </template>
        </a-transfer>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted,defineEmits, defineProps } from 'vue';
import { get, post, put } from '@/utils/request';
import { Page } from '@/interface/page';
import { message as AntMessage } from 'ant-design-vue';
import { Patient } from '@/interface/patient';
import { useUserStore } from '@/store/user';

const router = useUserStore();
type tableColumn = Record<string, string>;
const visiable = ref(true);
const drugList: { filterData: Array<Drug> } = reactive({
    filterData: []
});
// 为 Drug 增加 key,方便选择
interface Drug{
    id: number;
    quantity: number;
    price: number;
    effect: string;
    manufacturer: string;
    key: string;
    name: string;
    disabled: boolean;
};
// 获取药品数据
const getListData = async () => {
    const res = await get<Page<Drug>>("/api/getAllDrug", {
        current: 1,
        size: 100,
        name: ''
    });
    drugList.filterData = res.data.recordList;
    // 为数据添加 key
    drugList.filterData.forEach((drug, index) => {
        drugList.filterData[index].key = `${drug.id}`;
        drugList.filterData[index].disabled = (drug.quantity === 0);
    });
};
// 定义子组件事件
const emit = defineEmits(['close-click']);

const props = defineProps<{
    record: Patient;
}>();

const originTargetKeys = drugList.filterData.filter(item => +item.id % 3 > 1).map(item => item.id);

const leftTableColumns = [
  {
    dataIndex: 'name',
    title: '药品名称',
  },
  {
    dataIndex: 'effect',
    title: '药效',
    },
    {
        dataIndex: 'quantity',
    title: '数量'
  }
];
const rightTableColumns = [
  {
    dataIndex: 'name',
    title: '药品名称',
    },
    {
    dataIndex: 'effect',
    title: '药效',
    },
];
// 关闭开药框
const closeModal = () => {
    visiable.value = false;
    emit('close-click', visiable.value);
}
// 提交开药结果
const commitSelect = async() => {
    const res = await post("/api/updateCount", targetKeys.value);
    if (res.flag) {
        // 提交开药记录
        const ans = await put("/api/saveRecord", {
            patientID: props.record.id,
            drugIDList: targetKeys.value,
            username: router.getUsername,
        });
        if (ans.flag) {
            AntMessage.success("开药成功");
        }
    }
    closeModal();
}

const targetKeys = ref<number[]>(originTargetKeys);
const disabled = ref<boolean>(false);
const showSearch = ref<boolean>(true);
const leftColumns = ref<tableColumn[]>(leftTableColumns);
const rightColumns = ref<tableColumn[]>(rightTableColumns);

const getRowSelection = ({
  disabled,
  selectedKeys,
  onItemSelectAll,
  onItemSelect,
}: Record<string, any>) => {
  return {
    getCheckboxProps: (item: Record<string, string | boolean>) => ({
      disabled: disabled || item.disabled,
    }),
    onSelectAll(selected: boolean, selectedRows: Record<string, string | boolean>[]) {
      const treeSelectedKeys = selectedRows.filter(item => !item.disabled).map(({ key }) => key);
      onItemSelectAll(treeSelectedKeys, selected);
    },
    onSelect({ key }: Record<string, string>, selected: boolean) {
      onItemSelect(key, selected);
    },
    selectedRowKeys: selectedKeys,
  };
};

onMounted(() => {
    getListData();
});
</script>

