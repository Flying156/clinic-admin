<template>
    <div class="calender-card">
        <div class="text">
            <div class="title">eee</div>
            <div class="today">ssss</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'CalendarCard',
  })
</script>

<style lang="less" scoped>
.calendar-card {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% / 3 - 40px);
    border-radius: 10px;
    margin: 20px;
    padding: 20px;

    .icon {
      color: #d1b390;
      margin-right: 20px;

      i {
        cursor: default;
      }
    }

    .text {
      margin-top: 20px;

      .today {
        margin-top: 10px;
        font-weight: bolder;
        font-size: 30px;
        white-space: nowrap;
      }
    }
  }

</style>