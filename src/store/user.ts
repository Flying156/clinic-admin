import router from '@/router';
import {defineStore} from 'pinia';

interface UserState {
    username: string;
    token: string;
    auths: string[];
}

export const useUserStore = defineStore({
    id : 'user',
    state : () : UserState => ({
        username : '',
        token : '',
        auths : [],

    }),
    getters : {
        getToken() : string {
            return this.token;
        },
        getUsername() : string {
            return this.username;
        },
    },
    persist : true,
    actions : {
        setToken(info: string) {
            this.token = info ?? '';
        },
        resetState() {
            this.username = '';
            this.token = '';
            this.auths = [];
        },
        setUsername(username: string) {
            this.username = username ?? '';
        },

        /**
         * @description logout
         */
        async logout() {
            this.resetState();
            router.replace('/login');
            // 路由表重置
        },

    },

});
