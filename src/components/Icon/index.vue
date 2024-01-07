<template>
  <icon-font :style="iconStyle" :class="iconClass" :type="iconType" />
</template>
<script lang="ts">
  import { createFromIconfontCN } from '@ant-design/icons-vue'; 
import { defineComponent, computed } from 'vue';
const ICONFONTURL = '//at.alicdn.com/t/font_3004192_9jmc1z9neiw.js';

  const IconFont = createFromIconfontCN({
    scriptUrl: ICONFONTURL,
  });

  export default defineComponent({
    components: {
      IconFont,
    },
    props: {
      type: {
        type: String,
        required: true,
      },
      className: {
        type: String,
        default: '',
      },
      align: {
        type: String,
        default: '',
      },
      size: {
        type: String,
        default: '18px',
      },
    },
    setup(props) {
      return {
        iconType: computed(() => `icon-a-SimpleChainlianmenglianjichubantubiao_${props.type}`),
        iconClass: computed(() => (props.className ? `my-icon ${props.className}` : 'my-icon')),
        iconStyle: computed(() => {
          const style = {};
          if (props.align) style['vertical-align'] = props.align;
          if (props.size) style['font-size'] = props.size;
          return style;
        }),
      };
    },
  });
</script>
<style scoped>
  .my-icon {
    font-size: 18px;
    vertical-align: middle;
    fill: currentColor;
  }
</style>
