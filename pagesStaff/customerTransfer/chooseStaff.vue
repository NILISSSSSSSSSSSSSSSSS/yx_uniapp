
<template>
    <view>
        <view class="authority_cont">
            <radio-group @change="checkedUserChange">
                <block v-for="(item, index) in userList" :key="index">
                    <label class="f_c_s authority_label">
                        <view class="f_r_s authority_label_info">
                            <image class="authority_icon" :src="checkedCustId==item.userId?checkedImgSrc:checkImgSrc"></image>
                            <radio style="display: none;" :value="item.userId" :checked="checkedCustId==item.userId" />

                            <view class="f_r_s cust_view">
                                <image class="broker_avatar" mode="aspectFill" :src="item.userPhoto?item.userPhoto:default_avatar"></image>
                                <view class="f_c_s">
                                    <text class="name">{{item.userName||''}}</text>
                                    <text class="phone">{{item.userMobile||''}}</text>
                                </view>
                            </view>
                        </view>
                    </label>
                </block>
            </radio-group>

            <!-- 下一步 -->
            <view class="next-btn">
                <view @click="confirmBtn()">确认</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {Const} from "../../utils/Const";
    import staffCustomer from "../components/staffCustomer";
    import {GetAllUserList} from "../../net/MsgNet";
    import {TransferCust} from "../../net/Staff";

    class PrivateData{
        static custIds = "";// custIds
        static brokerId = null; // sourceUserId
    }

    export default {
        components :{
            staffCustomer
        },

        data(){
            return{
                userList : null, //  员工列表
                checkImgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/yg_check.png",
                checkedImgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/yg_checked.png",
                checkedCustId: null,
                default_avatar: '',
            }
        },

        onShow(){
            this.initData();
        },

        onLoad(option){
            PrivateData.custIds = option.custIds;
            PrivateData.brokerId = option.brokerId;
        },

        methods : {
            // 获取客户列表数据  GetAllUserList
            initData(){
                new GetAllUserList().send()
                    .then((res)=>{
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        if (res.data.userList && res.data.userList.length<0){
                            this.userList = [];
                            return ;
                        }

                        //去掉与brokerId 相等的员工信息(去掉自己)
                        let list = [];
                        for (let item of res.data.userList){
                            if (item.userId == PrivateData.brokerId) continue;
                            list.push(item);
                        }
                        this.userList = list;
                        // 默认选中第一个
                        this.checkedCustId = this.userList[0].userId;
                        // 默认头像
                        this.default_avatar = Const.imDefaultHeadImg;

                        console.log(this.userList,'--this.userList--');
                    })
                    .catch((res)=>{
                        console.log(res);
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差啦!请稍后再试");
                    })
            },

            checkedUserChange(e) {
                console.log(e.detail.value,'-------e');
                this.checkedCustId = e.detail.value;
            },

            confirmBtn(){
                // {"sourceUserId":"11748","targetUserId":"11760","custIds":"15315,15308,15307"}
                let param = {
                    "sourceUserId":PrivateData.brokerId,
                    "targetUserId":this.checkedCustId,
                    "custIds":PrivateData.custIds,
                };
                console.log(param,'--确认移交--');
                uni.showLoading({title: "移交中...", mask: true});
                new TransferCust(param).send()
                .then((res)=>{
                    if (res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }
                    uni.hideLoading();
                    uni.navigateBack({
                        delta: 2
                    });
                    this.DifferenceApi.showToast("移交成功");
                })
                .catch((res)=>{
                    console.log(res);
                    this.DifferenceApi.showToast(res.errMsg || "服务器开小差啦!请稍后再试");
                })
            }
        },

    }
</script>

<style>
    .authority_cont{
        padding: 50upx 0 200upx 50upx;
        box-sizing: border-box;
        width: 100%;
    }
    .authority_label{
        margin-bottom: 36upx;
    }
    .authority_label_info{
        align-items: center;
    }
    .authority_icon{
        width: 40upx;
        height: 40upx;
        margin: 30upx 40upx auto 0;
        flex-shrink: 0;
    }
    .cust_view{
        flex: 1;
        padding-bottom: 40upx;
        border-bottom: solid 1px #ebebeb;;
    }
    /*底部按钮*/
    .next-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 190upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        z-index: 9;
    }
    .next-btn>view{
        width: 670upx;
        height: 98upx;
        background-color: #0084ff;
        box-shadow: 0px 7px 15px 1px rgba(0, 0, 0, 0.05);
        border-radius: 10upx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-family: PingFang-SC-Bold;
        font-size: 32upx;
    }

    .broker_avatar{
        width: 94upx;
        height: 94upx;
        margin: auto 35upx auto 0;
        border-radius: 100%;
    }
    .name{
        font-family: PingFang-SC-Bold;
        font-size: 32upx;
        line-height: 32upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        flex-shrink:0;
        margin: auto 30upx 15upx 0;
    }
    .phone{
        font-family: PingFang-SC-Bold;
        font-size: 28upx;
        line-height: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #a3a5a8;
        flex-shrink:0;
        margin: auto 30upx auto 0;
    }
</style>
