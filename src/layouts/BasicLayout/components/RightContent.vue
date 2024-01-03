<template>
  <div class="sys-setting">
    <a-dropdown placement="bottom">
      <template #overlay>
        <a-menu class="menu-box">
            <a-menu-item v-for="item in navs" :key="item.path" @click="handleRoute(item?.path)">
                <template #icon>
                    <Icon align="1px" size="20px" :type="item.icon" />
                </template>
                <span>{{ item.name }}</span>
            </a-menu-item>
        </a-menu>
      </template>
      <Space class="wrap" align="baseline" direction="horizontal">
        <Icon align="2px" type="xitongshezhi" />
        <span class="setting">系统设置</span>
        <Icon align="2px" type="xialajiantou" />
      </Space>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Space } from 'ant-design-vue';
import { navs as myNavs } from './constant';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import router from '@/router';

const navs = ref(myNavs);
const store = useUserStore();

const handleRoute = (path?: string) => {
    if (path) return router.push(path);
    // 退出登录
    store.logout();
};
</script>

<style lang="less" scoped>
  .sys-setting {
    height: 100%;
    display: flex;
    justify-content: center;
    padding-right: 16px;
    .wrap {
      height: 55px;

      .setting {
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        margin: 0 8px 0 4px;
      }
    }
    .my-icon {
      font-size: 18px !important;
    }
  }
  .menu-box :deep(.ant-dropdown-menu-item) {
    width: 142px;
    height: 42px;
    line-height: 42px;
    padding: 0 16px;
  }
  .menu-box :deep(.ant-dropdown-menu-item-selected) {
    background: #eaeffe;
    color: #3860f4;
  }
</style>
