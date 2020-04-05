

<template>
    <view class="index">
        <developer v-if="accountSource == 2"></developer>
        <adviser v-if="accountSource == 1"></adviser>
    </view>
</template>

<script>
    import adviser from "./components/adviser.vue";
    import developer from "./components/developer.vue";
    import {GetLoginModel} from "../../model/LoginSuccessModel";
    import {LoginApp} from "../../utils/common";
    import {Notify} from "../../utils/Notify";
    import {Notification} from "../../utils/Notification";

    export default {
        components: {developer,adviser},

        data() {
            return {
                accountSource: null
            }
        },

        onLoad() {
            new LoginApp().upSetTab();
        },

        onShow() {
            this.accountSource = GetLoginModel.getAccountSource();
            // 发送页面可见的通知
            new Notification().postNotification(Notify.PageShowChange.Name, {source: "index"});
        },

        onHide() {
            // 发送页面隐藏的通知
            new Notification().postNotification(Notify.PageHideChange.Name, {source: "index"});
        }
    }
</script>

<style>
    page,.index{
        width: 100%!important;
        height: 100%!important;
        background-color: #ffffff!important;
    }
</style>
