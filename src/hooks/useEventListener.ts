import type {Ref} from 'vue';
import {ref,
    watch,
    unref} from 'vue';
import {useThrottleFn,
    useDebounceFn} from '@vueuse/core';

export type RemoveEventFn = () => void;
export interface UseEventParams {
    el?: Element|Ref<Element|undefined>|Window|any;
    name: string,
        listener: EventListener,
        options?: boolean|AddEventListenerOptions;
    autoRemove?: boolean;
    isDebounce?: boolean;
    wait?: number;
}
