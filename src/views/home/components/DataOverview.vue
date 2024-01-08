<template>
  <div class="dataOverview">
    <div class="font18">实时数据总览</div>
    <section class="dataOverview_row">
      <div
        v-for="item in data"
        :key="item.label"
        :span="12"
        :style="{ background: item.bgColor }"
        class="dataOverview_col"
      >
        <div> <img :src="item.img" alt="" /> </div>
        <div >
          <h2>{{ item.value }}</h2>
          <p>{{ item.label }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
  import img1 from '@/assets/images/Icon_Block.png';
  import img2 from '@/assets/images/Icon_trading.png';
  import img3 from '@/assets/images/Icon_contract.png';
  import img4 from '@/assets/images/Icon_node.png';
import { ref, onMounted } from 'vue';
import { get } from '@/utils/request';

  const data = ref([
    {
      img: img1,
      label:'医生',
      value: 0,
      key: 'hu_num',
      bgColor: 'linear-gradient(90deg, #4394FF 0%, #60BBFD 100%)',
    },
    {
      img: img2,
      label: '药品',
      value: 0,
      key: 'yun_num',
      bgColor: 'linear-gradient(90deg, #49C4D8 0%, #6DD2A2 100%)',
    },
    {
      img: img3,
      label: '病人',
      value: 0,
      key: 'ce_num',
      bgColor: 'linear-gradient(90deg, #F48D6D 0%, #F9AC67 100%)',
    },
    {
      img: img4,
      label: '收入统计',
      value: '0',
      key: 'total',
      bgColor: 'linear-gradient(90deg, #7E8BEC 0%, #C5AFF7 100%)',
    },
  ]);

interface OverStatic{
    doctorCount: number;
    patientCount: number;
    revenue: number;
    drugCount: number;
};
// 获取数据
const getOverData = async () => {
    const res = await get<OverStatic>("/api/overStatic");
    if (res.flag) {
        data.value[0].value = res.data.doctorCount;
        data.value[1].value = res.data.drugCount;
        data.value[2].value = res.data.patientCount;
        data.value[3].value = res.data.revenue;
    }
};
onMounted(() => {
    getOverData();
});

</script>
<style lang="less" scoped>
  .dataOverview {
    &_row {
      margin-top: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 21px;
    }
    &_col {
      display: flex;
      border-radius: 6px;
      height: 90px;
      padding: 15px;
      h2 {
        font-size: 23px;
        font-family: Roboto;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 4px;
        margin-left: 10px;  // Adjust the left margin as needed
        margin-top: 5px;
      }
      p {
        margin: 0;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #ffffff;
        margin-left: 10px;
      }
    }
  }
</style>
