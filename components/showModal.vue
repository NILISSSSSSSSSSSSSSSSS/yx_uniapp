

<template>
    <view class="module_mask f_c_c" @click="hide" v-if="visible"
          @touchmove.stop.prevent=""
          :class="{'show_mark' : visible}">
        <view class="module" :class="{'show' : visible}">
            <view class="title" v-if="obj.title">{{ obj.title }}</view>
            <view :class="[!obj.title ? 'content_new':'']" class="content" v-if="obj.content">{{ obj.content }}</view>

            <view class="f_r_c modal_view">
                <view v-if="obj.showCancel" class="cancelText " @click.stop="cancel" :style="{color: obj.cancelColor}"><collectFormId></collectFormId>{{ obj.cancelText || "取消" }}</view>
                <view class="confirmText " @click.stop="confirm" :style="{color: obj.confirmColor}"><collectFormId></collectFormId>{{ obj.confirmText || "确定" }}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                visible: false,
                obj: {
                    title: 'modal title',
                    content: "modal content",
                    confirmText: "确定",
                    cancelColor: "rgba(0,0,0,0.6)",
                    confirmColor: "#3396fb",
                    cancelText: "取消",
                    showCancel : true,
                }
            }
        },

        watch: {
            modal() {
                this.initModal();
            }
        },

        mounted() {
            this.initModal();
        },

        props: {
            modal: {
                type: Object,
                default() {
                    return {
                        title: 'modal title',
                        content: "modal content",
                        confirmText: "确定",
                        cancelColor: "rgba(0,0,0,0.6)",
                        confirmColor: "#3396fb",
                        cancelText: "取消",
                        showCancel : true,
                    }
                }
            }
        },

        methods: {
            initModal() {
                let obj = this.obj;
                for (let k in this.modal) {
                    if (this.modal[k] === undefined) continue;

                    obj[k] = this.modal[k];
                }
                this.obj = obj;
            },

            show() {
                setTimeout(() => {
                    this.visible = true
                }, 100);
            },

            hide() {
                setTimeout(() => {
                    this.visible = false
                }, 100);
            },

            cancel() {
                this.hide();
                this.$emit("onModalChanged", false)
            },

            confirm() {
                this.hide();
                this.$emit("onModalChanged", true)
            }
        }
    }
</script>

<style>
    .module_mask{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        z-index: 1000;
        padding: 0 95upx;
        box-sizing: border-box;
    }
    .module{
        width: 100%;
        background: #ffffff;
        border-radius: 16upx;
        box-sizing: border-box;
        overflow: hidden;
        padding-top: 50upx;
        z-index: 2000;
    }
    .title{
        font-size: 36upx;
        color: #191f25;
        text-align: center;
        line-height: 42upx;
    }
    .module .content_new{
        margin-top: 18upx;
    }
    .content{
        font-size: 36upx;
        color: #191f25;
        text-align: center;
        line-height: 42upx;
        margin-top: 60upx;
        padding: 0 30upx;
        box-sizing: border-box;
    }
    .modal_view{
        margin-top: 50upx;
        width: 100%;
        border-radius: 0 0 16upx 16upx;
        box-sizing: border-box;
        text-align: center;
        font-size: 34upx;
        border-top: 1px solid #f5f5f5;
    }
    .cancelText{
        width: 100%;
        height: 100upx;
        line-height: 100upx;
        border-right: 1px solid #f5f5f5;
        box-sizing: border-box;
    }
    .confirmText{
        width: 100%;
        height: 100upx;
        line-height: 100upx;
    }
    @keyframes show{
        0%{opacity: 0}
        100%{opacity: 1;}
    }
    @keyframes showMark{
        0%{transform: scale(1); background: rgba(0,0,0,0.1);}
        100%{transform: scale(1); background: rgba(0,0,0,0.6);}
    }
    .show{
        animation: show .15s ease-in-out forwards;
    }
    .show_mark{
        animation: showMark .15s ease-in-out forwards;
    }
    .ripple {
        position: relative;
        /*隐藏溢出的径向渐变背景*/
        overflow: hidden;
    }
    .ripple:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        /*设置径向渐变*/
        background-image: radial-gradient(circle, rgba(0,0,0,0.4) 10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform .3s, opacity .5s;
    }

    .ripple:active:after {
        transform: scale(0, 0);
        opacity: .3;
        transition: 0s;
    }
</style>
