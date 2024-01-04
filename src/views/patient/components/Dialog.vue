<template>
    <a-modal
        title="病人"
        :ok-text="componentDisabled ? '确定' : '提交'"
        @ok="commit"
        @cancel="close"
        :visible="!componentDisabled">

        <a-form
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            layout="horizontal"
            v-model:value="data"
            style="max-width: 600px"
        >
            <a-form-item label="姓名">
                <a-input v-model:value="data.name" />
            </a-form-item>
               <a-form-item label="年龄">
                <a-input-number
                    v-model:value="data.age" 
                    min="0"
                    max="130"                
                />
            </a-form-item>

            <a-form-item label="性别">
                <a-radio-group v-model:value="data.gender">
                    <a-radio value="男">男</a-radio>
                    <a-radio value="女">女</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="症状" name="disease">
                <a-textarea :rows="4" v-model:value="data.disease"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">

import { defineProps, ref, defineEmits } from 'vue';
import { Patient } from '@/interface/patient';
import { put, post } from '@/utils/request';
import {message as AntMessage} from 'ant-design-vue';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

// 上层传递数据
const props = defineProps<{
    record: Patient;
    isPost: boolean;
}>();
const componentDisabled = ref(false);
const data = ref(props.record);
const show = ref(true);

// 定义传递上层组件事件
const emit = defineEmits(['child-click']);

// 取消按钮
const close = () => {
    show.value = false;
    emit('child-click', show.value);
};
// 提交数据
const commit = async () => {
    if (props.isPost) {
        const res = await post<string>('/api/updatePatient', data.value);
        if (res.flag) {
            AntMessage.success("修改成功");
            close();
        }
    } else {
        const res = await put('/api/addPatient', data.value);
        if (res.flag) {
            AntMessage.success("添加成功");
            close();
        }
    }
};

</script>

<style lang="less" scoped>

</style>