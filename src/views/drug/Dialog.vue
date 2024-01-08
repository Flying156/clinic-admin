<template>
    <a-modal
        title="药品信息"
        :ok-text="componentDisabled ? '确定' : '提交'"
        @ok="commit"
        @cancel="close"
        :visible="!componentDisabled">

            <a-form
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                layout="horizontal"
                v-model:value="record"
                :disabled="componentDisabled"
                style="max-width: 600px"
            >
            <a-form-item label="药品名称" name="name">
                <a-input v-model:value="record.name"/>
            </a-form-item>

            <a-form-item label="制造商" name="manufacturer">
                <a-input v-model:value="record.manufacturer"/>
            </a-form-item>

            <a-form-item label="生产日期">
                <a-date-picker
                    format="YYYY-MM-DD"
                    placeholder="请选择时间"
                    v-model:value="record.produceTime"
                    />
            </a-form-item>

            <a-form-item label="过期日期">
                <a-date-picker
                    format="YYYY-MM-DD"
                    placeholder="请选择时间"
                    v-model:value="record.expireTime"
                    />
            </a-form-item>

            <a-form-item label="价格" name="price">
                <a-input-number 
                    v-model:value="record.price" 
                    prefix="￥" 
                    :precision="2"
                    min="0.00"/>
            </a-form-item>

             <a-form-item label="数量" name="quantity">
                <a-input-number 
                    v-model:value="record.quantity"  
                    min="0"/>
            </a-form-item>

            <a-form-item label="药效" name="effect">
                <a-textarea :rows="4" v-model:value="record.effect"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import {Drug} from '@/interface/drug'
import {message as AntMessage} from 'ant-design-vue';
import { post, put } from '@/utils/request';
// 是否可以填充数据
const componentDisabled = ref(false);
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
// 上层组件传递数据
const props = defineProps<{
    record: Drug;
    isPost: boolean;
}>();
// 获取父组件的数据
const record = ref(props.record);
const show = ref(true);
// 传递上层组件
const emit = defineEmits(['child-click']);

// 提交修改
const commit = async () => {
    if (props.isPost) {
        const res = await post('/api/updateDrug', record.value);
        if (res.flag) {
            show.value = false;
            AntMessage.success("修改成功");
        }
        emit('child-click', show.value);
    } else {
        const res = await put('/api/addDrug', record.value);
        if (res.flag) {
            show.value = false;
            AntMessage.success("添加成功");
        }
        emit('child-click', show.value);
    }
};
// 取消按钮
const close = () => {
    show.value = false;
    emit('child-click', show.value);
};

const onChange = (dateString: string)=>{
    const parseDate: Date = new Date(dateString);

}


</script>

<style lang="less" scoped>
.form-container{
    display: flex;
    justify-content: center;
    margin-top: 16px;
}
.card-container{
    height: 450px;
    width: 600px;
}
.btn{
    margin-right: 50px;
}
</style>