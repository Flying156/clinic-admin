// 引入柱状图图表
import {LineChart} from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
} from 'echarts/components';
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 标签自动布局，全局过渡动画等特性
import {UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([ CanvasRenderer, LineChart, GridComponent, TooltipComponent, UniversalTransition ]);
export default echarts;
