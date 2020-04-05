import {Notify} from "./Notify";


class NotificationMethod {
  /**
   * 注册通知
   * @param {object}observer
   * @param {string}callback --- function(name, userInfo)
   * @param {string}name
   */
  static addObserver(observer, callback, name) {
    uni.$on(name,(info) => {
      if (typeof observer[callback] !== "undefined") {
        observer[name](name, info);
      }
    });
  }

  // 移除view的指定通知
  static removeObserver(observer, name) {
    if (typeof observer[name] !== "undefined") {
      uni.$off(name);
    }
  }

  // 移除当前view的所有通知
  static removeObserverAllNotification(observer) {
    for (let key in Notify) {
      if (typeof observer[Notify[key].Name] !== "undefined") {
        NotificationMethod.removeObserver(observer, Notify[key].Name);
      }
    }
  }

  // 发送通知
  // 参数类型：
  // name：通知名称
  // info：传递的信息
  static postNotification(name, info) {
    uni.$emit(name, info);
  }
}

export class Notification {
  addObserver(observer, callback, name) {
    NotificationMethod.addObserver(observer, callback, name);
  }

  removeObserver(observer, name) {
    NotificationMethod.removeObserver(oobserver, name);
  }

  removeObserverAllNotification(observer) {
    NotificationMethod.removeObserverAllNotification(observer);
  }

  postNotification(name, userInfo) {
    NotificationMethod.postNotification(name, userInfo);
  }
}


