

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
    import {Notify} from "../../utils/Notify";
    import {Notification} from "../../utils/Notification";

    export default {
        components: {developer,adviser},

        data() {
            return {
                accountSource: null
            }
        },

        onShow() {
            this.accountSource = GetLoginModel.getAccountSource();
            // 发送页面可见的通知
            new Notification().postNotification(Notify.PageShowChange.Name, {source: "mine"});
        }
    }
</script>

<style>
    page,.index{
        width: 100%;
        height: 100%;
    }
</style>
