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
    :rules="rules"
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
        v-decorator="['time',{rules: [{ required: true, message: '请输入时间!' }]}]"
        placeholder="请选择时间"
      />
    </a-form-item>
    <a-form-item label="过期日期">
    <a-date-picker
        format="YYYY-MM-DD"
        v-decorator="['time',{rules: [{ required: true, message: '请输入时间!' }]}]"
        placeholder="请选择时间"
        @change="onChange"
        />
    </a-form-item>
    <a-form-item label="价格" name="price">
      <a-input-number 
            v-model:value="record.price" 
            prefix="￥" 
            :precision="2"
            min="0.00"/>
    </a-form-item>
    <a-form-item label="药效" name="effect">
      <a-textarea :rows="4" v-model:value="record.effect"/>
    </a-form-item>
  </a-form>
</a-modal>
</template>
<script lang="ts" setup>
import moment from "moment";
import "moment/locale/zh-cn"
import { ref, defineProps, defineEmits } from 'vue';
import {Drug} from '@/interface/drug'
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


const rules = {
    name: [{ required: true, trigger: 'blur', message: '请输入药品名称' }],
    price: [{ required: true, trigger: 'blur', message: '请输入价格' }],
    manufacturer: [{ required: true, trigger: 'blur', message: '请输入制造商' }],
    effect:[{ required: true, trigger: 'blur', message: '请输入药效' }]
};

// 提交修改
const commit = async () => {
    if (props.isPost) {
        const res = await post('/api/updateDrug', record.value);
        if (res.flag) {
            show.value = false;
        }
        emit('child-click', show.value);
    } else {
        const res = await put('/api/addDrug', record.value);
        if (res.flag) {
            show.value = false;
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