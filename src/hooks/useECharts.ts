import type {EChartsOption} from 'echarts';
import type {Ref} from 'vue';
import {Fn,
    tryOnUnmounted} from '@vueuse/core';
import {unref,
    computed,
    ref} from 'vue';
import echarts from '@/utils/echarts';

export function useECharts(
    elRef: Ref<HTMLDivElement>,
    theme: 'light'|'dark'|'default' = 'default',
)
{
    const getDarkMode = computed(() => {
        return theme;
    });
    let chartInstance: echarts.ECharts|null = null;
    const cacheOptions = ref({}) as Ref<EChartsOption>;
    let removeResizeFn: Fn = () => {};

    function initCharts()
    {
        const el = unref(elRef);
        if (!el || !unref(el)) {
            return;
        }

        chartInstance = echarts.init(el);
    }

    function setOptions(options: EChartsOption)
    {
        cacheOptions.value = options;
    }

    function resize()
    {
        chartInstance?.resize();
    }

    watch(
        () => getDarkMode.value,
        () => {
            if (chartInstance) {
                chartInstance.dispose();
                initCharts();
                setOptions(cacheOptions.value);
            }
        },
    );

    tryOnUnmounted(() => {
        if (!chartInstance)
            return;
        removeResizeFn();
        chartInstance.dispose();
        chartInstance = null;
    });

    function getInstance(): echarts.ECharts|null
    {
        if (!chartInstance) {
            initCharts();
        }
        return chartInstance;
    }

    return {
        setOptions,
        resize,
        echarts,
        getInstance,
    };
}
