class ModelMap {
	static map = new Map();

	static setMap(key, val) {
		this.map.set(key, val);
	}

	static getMap(key) {
		if (!this.map.has(key)) return null;

		return this.map.get(key);
	}
}

export class DefaultModel {
	key = "";
	isLocal = false; // 是否是保存到本地

	constructor() {
		this.key = this.getKey();
		this.isLocal = this.getIsLocal();
	}

	setModel(val, id) {
		let Obj = ModelMap.getMap(this.key) || {};
		if (this.isLocal) {
            // #ifdef MP-ALIPAY
            Obj = my.getStorageSync({ key: this.key }) || {};
            Obj = Obj.data|| Obj.APDataStorage || {};
            // #endif
            // #ifndef MP-ALIPAY
            Obj = uni.getStorageSync(this.key) || {};
            // #endif
		}
		if (id !== undefined) {
			Obj[id] = val;
		} else {
			Obj = val;
		}
		if(this.isLocal) {
            // #ifdef MP-ALIPAY
            my.setStorageSync({
              key: this.key,
              data: Obj
            });
            // #endif
            // #ifndef MP-ALIPAY
            uni.setStorageSync(this.key, Obj);
            // #endif
		}
		ModelMap.setMap(this.key, Obj);
	}

	getModel(id) {
        let obj = {};
        // #ifdef MP-ALIPAY
        obj = my.getStorageSync({ key: this.key }) || {};
        obj = obj.data || obj.APDataStorage || {};
        // #endif
        // #ifndef MP-ALIPAY
        obj = uni.getStorageSync(this.key) || {};
        // #endif
		if (!this.isLocal) {
			obj = ModelMap.getMap(this.key) || {};
		}
		let val = obj[id] || null;
		if (id === undefined) {
			val = Object.keys(obj).length > 0 ? obj : null;
		}
		return val;
	}

	removeModel(key = "") {
	    if (key) {
            // #ifdef MP-ALIPAY
            my.removeStorageSync({
                key: key,
            });
            // #endif

            // #ifndef MP-ALIPAY
            uni.removeStorageSync(key);
            // #endif
	       return;
        }

		if(this.isLocal) {
            // #ifdef MP-ALIPAY
            my.removeStorageSync({
                key: this.key,
            });
            // #endif

            // #ifndef MP-ALIPAY
            uni.removeStorageSync(this.key);
            // #endif
		}
	}

	clearModel() {
        uni.clearStorageSync();
    }

	getKey() {
		return "";
	}

	getIsLocal() {
		return false;
	}
}
