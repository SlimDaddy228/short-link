import { makeAutoObservable } from "mobx";

export class UserStore {
    _isAuth: boolean
    _data: any

    constructor() {
        this._isAuth = false;
        this._data = {};
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }

    setData(data: any) {
        this._data = data;
    }

    unLogin() {
        this._data = {};
        this._isAuth = false;
    }

    get isAuth(): boolean {
        return this._isAuth;
    }

    get data(): any {
        return this._data;
    }
}