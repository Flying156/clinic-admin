<template>
  <div>
    <!-- search -->
    <a-divider class="line" />
    <!-- chart -->
    <a-row :gutter="24">
      <a-col :span="12">
        <a-card :bordered="false">
            <DataOverview />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card :bordered="false">
            <TradingOverview
            :loading="loading"/>
        </a-card>
      </a-col>
    </a-row>
    <a-divider class="line"/>
  </div>
</template>
<script setup lang="ts">
import DataOverview from './components/DataOverview.vue';
import TradingOverview from './components/TradingOverview.vue';

import { ref, onMounted, onUnmounted } from 'vue'

const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    loading.value = false;
  });

  onUnmounted(() => {
  });

</script>
<style lang="less" scoped>
  .search {
    & :deep(.ant-input) {
      height: 48px;
    }
  }
</style>
