const storeKey: string = 'USER';

function getUserFromStore() {
    const user = window.sessionStorage.getItem(storeKey);
    return user ? JSON.parse(user) : null;
}

export default {
    state: {
        user: getUserFromStore()
    },
    setUser(user: any) {
        this.state.user = user;
        window.sessionStorage.setItem(storeKey, JSON.stringify(user));
    },
    getUser() {
        return this.state.user;
    },
    removeUser() {
        this.state.user = null;
        window.sessionStorage.removeItem(storeKey);
    }
};