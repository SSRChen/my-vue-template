import { BaseService } from './base.service';
import store from '@/store';

export interface Member {
    name: string;
    username: string;
    num: string;
    qrcode: string;
    status: string;
    status_detail: string;
    category: string;
    category_detail: string;
    bank_holder: string;
    bank_account: string;
    bank_name: string;
}

class MemberService extends BaseService<Member>{

    protected baseUrl = 'member';
    private loginUrl = `${this.baseUrl}/login`;
    private logoutUrl = `${this.baseUrl}/logout`;
    private detailUrl = `${this.baseUrl}/detail`;
    private updateUrl = `${this.baseUrl}/update`;
    private teamUrl = `${this.baseUrl}/team`;

    public login(username: string, password: string): Promise<string> {
        const data = {
            username,
            password
        };
        return this.post(this.loginUrl, data).then(ret => {
            const token = ret.token;
            store.auth.setToken(token);
            return token;
        });
    }

    public logout(): Promise<any> {
        return this.get(this.logoutUrl).then(ret => {
            store.auth.removeToken();
            store.user.removeUser();
            return ret;
        });
    }

    public isLogin() {
        return !!this.getToken();
    }

    public isInit() {
        return !!this.getUserInfo();
    }

    public getUserInfo() {
        return store.user.getUser();
    }

    public updateUserInfo(): Promise<Member> {
        return this.get(this.detailUrl).then(ret => {
            store.user.setUser(ret);
            return ret;
        });
    }

    public update(data: any): Promise<Member> {
        return this.put(this.updateUrl, data).then(ret => {
            store.user.setUser(ret);
            return ret;
        });
    }

    public getToken() {
        return store.auth.getToken();
    }

    public team(page: number) {
        return this.list(page, null, this.teamUrl);
    }

}

export const memberService = new MemberService();