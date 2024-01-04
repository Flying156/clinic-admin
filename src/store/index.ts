import {createPinia} from 'pinia';
import {watchEffect} from 'vue';

// const storedState = localStorage.getItem('piniaState');
// const piniaState = storedState ? JSON.parse(storedState) : {};

const store = createPinia();
// store.state.value = piniaState;
// pinia 状态改变时，将数据存储在 localStorage
// watchEffect(() => {
//     localStorage.setItem('piniaState', JSON.stringify(store.state.value));
// });

export default store;
