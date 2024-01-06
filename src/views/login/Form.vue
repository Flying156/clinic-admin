<template>
    <div class="form_box">
        <a-form :model="formModel" :rules="rules">
        <p class="text">请使用用户名登录</p>
        <a-form-item name="username">
            <a-input
                class="reset-input"
                v-model:value="formModel.username"
            >
                <template #prefix>
                <!-- <user-outlined class="icon" type="user" /> -->
                    <Icon size="24px" type="shoujihaodenglu" class="icon" />
                </template>
            </a-input>
        </a-form-item>
        <p class="text">请输入密码</p>
      <a-form-item name="password">
        <a-input
          class="reset-input"
          v-model:value="formModel.password"
          type="password"
        >
          <template #prefix>
            <!-- <lock-outlined class="icon" /> -->
            <Icon size="24px" type="shurumimadenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="verCode" class="code-container">
        <a-input   class="reset-input"
          v-model:value="formModel.code"/>
        <img alt="验证码" id="codeImg" :src="url.code">
      </a-form-item>
        <a-form-item>
            <a-button html-type="submit" class="btn" :loading="loading" @click="login">立即登录</a-button>
        </a-form-item>
        </a-form>
    </div>
</template>


<script setup lang="ts">

import { ref, reactive, onMounted } from 'vue';
import axiosInstance, { get } from '@/utils/request';
import router from '@/router';
import { useUserStore } from '@/store/user';
import {message as AntMessage} from 'ant-design-vue';

const loading = ref(false);
const url: ImgModel = reactive({
    code: '',
    uuid: ''
});
// 提示信息
const rules = {
    username: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
};

// 表单数据
const formModel = reactive({
    username: '',
    password: '',
    code: ''
});

interface ImgModel{
    code: string;
    uuid: string;
};

const getImgUrl = async () => {
    const response = await get<ImgModel>('/api/captcha');
    url.code = response.data.code;
    url.uuid = response.data.uuid;
}

const userStore = useUserStore();


const login = async () => {
    const data = {
        username: formModel.username,
        password: formModel.password,
        code: formModel.code,
        uuid: url.uuid
    };
    axiosInstance.post('/api/login', data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.data.flag) {
                localStorage.setItem("authorization", response.headers['authorization']);
                userStore.setUsername(data.username);
                router.replace('/app');
                AntMessage.success("登录成功");
            }
        });
};

onMounted(() => {
    getImgUrl();
});


</script>

<style lang="less">
  .form_box {
    margin-top: 30px;
    .btn {
      width: 100%;
      height: 54px;
      background: linear-gradient(90deg, #00c3fd 0%, #3662f4 100%);
      border-radius: 6px;
      color: #ffffff;
      font-size: 20px;
      &:hover {
        opacity: 0.85;
        border: none;
      }
    }
    .icon {
      color: #666666;
    }
    .text {
      font-size: 14px;
      line-height: 20px;
      color: #999999;
      letter-spacing: 1.1px;
      margin-bottom: 10px;
    }
    .gray_text {
      font-size: 12px;
      color: #666666;
    }
    .reset_checkbox {
      .ant-checkbox-inner {
        border-radius: 50%;
      }
      & > span:last-child {
        font-size: 12px;
        color: #666666;
      }
    }
    .reset-input {
      height: 50px;
      line-height: 50px;
      border: 1px solid #707070;
      border-radius: 6px;
    }
    .copyright {
      margin-top: 20px;
      font-size: 12px;
      color: #999999;
      opacity: 0.85;
    }


}
    .code-container {
        display: flex; // 将容器变成内联 Flex 容器
        align-items: center; // 垂直居中
    }
    #codeImg {
        height: 50px; // 根据需要设置高度
    }
</style>