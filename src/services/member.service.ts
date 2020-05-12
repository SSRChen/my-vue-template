import { BaseService } from './base.service';
import store from '@/store';

export interface Member {
    name: string;
    username: string;
    // num: string;
    // qrcode: string;
    // status: string;
    // status_detail: string;
    // category: string;
    // category_detail: string;
    // bank_holder: string;
    // bank_account: string;
    // bank_name: string;
}

class MemberService extends BaseService<Member>{

    protected baseUrl = 'member';
    private loginUrl = `${this.baseUrl}/login`;
    private detailUrl = `${this.baseUrl}/detail`;

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

    public isLogin() {
        return !!this.getToken();
    }

    public isInit(){
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

    public getToken() {
        return store.auth.getToken();
    }

}

export const memberService = new MemberService();