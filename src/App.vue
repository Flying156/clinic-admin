<template>
    <ConfigProvider :locale="zhCN">
        <RouterView/>
    </ConfigProvider>

</template>

<script lang="ts" setup>
    import { ConfigProvider } from 'ant-design-vue'
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    dayjs.locale('zh-cn');

</script>