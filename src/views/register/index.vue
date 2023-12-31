<template>
        <div class="form_box">
        <a-form :model="formModel" :rules="rules">
        <p class="text">请使用手机号注册</p>
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
        <a-form-item>
            <a-button html-type="submit" class="btn" :loading="loading" @click="register">注册</a-button>
        </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { put } from '@/utils/request';
const loading = ref(false);

const rules = {
    username: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
};
const formModel = reactive({
    username: '',
    password: ''
});

const register = () => {
    put('/api/register', formModel);
}

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
</style>