<template>
  <div class="centered-form">
    <a-form v-model:value="form">
      <a-form-item label="旧密码" name="oldPassword" rules="required">
        <a-input type="password" v-model:value="form.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword" rules="required|min:6">
        <a-input type="password" v-model:value="form.newPassword" />
      </a-form-item>
      <a-form-item label="确认新密码" name="confirmPassword" rules="required|same:newPassword">
        <a-input type="password" v-model:value="form.confirmPassword" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="editPassword">确认修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { post } from '@/utils/request';
import { message as AntMessage } from 'ant-design-vue';
import router from '@/router';
import { useUserStore } from '@/store/user';

const form = ref({
  oldPassword: '',
  newPassword: '',
    confirmPassword: '',
  username:'',
});
const store = useUserStore();

const editPassword = async () => {
    console.log(form.value);
    if (form.value.newPassword === form.value.confirmPassword) {
        form.value.username = store.getUsername;
      const res = await post("/api/editPassword", form.value);
        if (res.flag) {
        AntMessage.success("修改成功");
        router.push("/login");
        }
  }
   else {
        AntMessage.error("两次输入的密码不一致");
  }
};
</script>

<style scoped>
/* Add your styles if needed */
.centered-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* 限制表单宽度 */
a-form {
  width: 300px; /* 根据需要调整宽度 */
}
</style>
