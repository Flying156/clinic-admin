<template>
  <a-spin :spinning="loading">
    <div class="title font18">用户信息</div>
    <div class="content">
      <div class="content_left">
            <a-avatar :size="100" :src="formDate.avatar" />
      </div>
      <div class="content_right">
        <a-form v-model:value="formDate">
            <a-form-item label="用户名" >
                <a-input class="input" v-model:value="formDate.account"/>
            </a-form-item>
            <a-form-item label="角色">
                <a-tag color="red">{{ formDate.role }}</a-tag>
            </a-form-item>
            <a-form-item label="性别" >
                <a-radio-group v-model:value="formDate.gender">
                    <a-radio value="男">男</a-radio>
                    <a-radio value="女">女</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="账号">
                {{ formDate.username }}
            </a-form-item>
            <a-button type="primary" @click="updateDetail">保存</a-button>
       
        </a-form>
      </div>
    </div>
  </a-spin>
</template>
<script setup lang="ts">
import { User } from '@/interface/user';
import { useUserStore } from '@/store/user';
import { get, post, put } from '@/utils/request';
import { onMounted } from 'vue';
import { ref, reactive } from 'vue';

const loading = ref(false);

const store = useUserStore();

const formDate:User = reactive<User>({
    username: '',
    role: '',
    account: '',
    gender: '',
    avatar: '',
}); 
// 获取用户信息
const getUserDetail = async () => {
    const response = await get<User>("/api/userDetail",
        {
            username: store.getUsername
        });
    formDate.username = response.data.username;
    formDate.account = response.data.account;
    formDate.avatar = response.data.avatar;
    formDate.role = response.data.role;
    formDate.gender = response.data.gender;
};


// 修改用户信息
const updateDetail = async () => {
    await put<string>("/api/updateUser", {
        username: formDate.username,
        avatar: formDate.avatar,
        gender: formDate.gender,
        account: formDate.account,
    });

    getUserDetail();
};

onMounted(() => {
    getUserDetail();
});

</script>
<style lang="less" scoped>
  .title {
    margin-top: -24px;
    height: 105px;
    line-height: 105px;
    padding-left: 29px;
  }
  .content {
    display: flex;
    &_left {
      padding-left: 15px;
      margin-right: 24px;
      // .img {
      //   width: 100px;
      //   height: 100px;
      //   border-radius: 50%;
      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }
    }
    &_right {
      flex: 1;
      padding-bottom: 44px;
      margin-left: 24px;
       flex-direction: column;
    margin-left: 24px; // 调整表单离头像的距离
      .row {
        height: 53px;
        padding-left: 24px;
        line-height: 53px;
        font-size: 14px;
        color: #333333;
        .label-w {
          width: 80px;
        }
        &:nth-child(odd) {
          background-color: #fafafa;
        }
      }
    }
     .a-form {
      margin-bottom: 16px;
    }
    .input{
        width: 200px;
    }
  }
</style>
