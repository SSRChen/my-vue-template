const storeKey: string = 'AUTH_TOKEN';

export default {
    state: {
        token: window.sessionStorage.getItem(storeKey) || ''
    },
    setToken(token: string) {
        window.sessionStorage.setItem(storeKey, token);
        this.state.token = token;
    },
    getToken(): string {
        return this.state.token;
    },
    removeToken() {
        window.sessionStorage.removeItem(storeKey);
        this.state.token = '';
    }
};