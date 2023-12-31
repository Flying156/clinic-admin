import '@/styles/index.less';

import * as Icons from '@ant-design/icons-vue'
import Antd from "ant-design-vue"
import {createApp} from 'vue';

import App from './App.vue';
import router from './router'
import store from './store'

const app = createApp(App);

app.use(store);

app.use(Antd);

app.use(router);

app.mount('#app');

const icons: any = Icons
for (const i in icons)
{
    app.component(i, icons[i])
}
