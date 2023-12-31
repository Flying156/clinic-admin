import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins : [ vue(), vueJsx() ],

    resolve : {
        alias : {
            '@' : '/src'
        }
    },
    server : {
        port : 8000,
        host : '127.0.0.1',
        cors : true,
        open : true,
        proxy : {
            '/api' : {
                target : 'http://127.0.0.1:8088',
                changeOrigin : true,
                rewrite : (path) => path.replace(/^\/api/, "")

            },
        }
    },

})
