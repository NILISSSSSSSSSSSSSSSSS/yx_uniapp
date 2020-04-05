<template>
    <view class="page_box">

        <!--基本信息-->
        <view class="info_title">基本信息</view>
        <view class="b-d-info">
            <view>客户姓名：<text>{{baseInfoList.custName || '--'}}</text></view>
            <view>联系电话：
                <view class="callPhone" v-if="baseInfoList.isCanCall && baseInfoList.custMobile" @click.stop="goToCallPhoneView(baseInfoList.custMobile)">{{baseInfoList.custMobile}}</view>
                <text v-else>{{baseInfoList.custMobile || '--'}}</text>
            </view>
            <view><view class="f_r_b" style="width: 111upx;"><view>性</view><view>别</view></view>：<text>{{baseInfoList.custSex===1?'男':'女'}}</text></view>
            <view>意向户型：
                <text v-for="(item,index) in baseInfoList.intentionLayout" :key="index" class="intentionLayout_ma">{{item || '--1'}}</text>
            </view>
            <view>付款方式：<text>{{baseInfoList.payWayCn || '--'}}</text></view>
            <view>预算价格：<text>{{baseInfoList.price || '--'}}</text></view>
            <view>意向区域：<text>{{baseInfoList.intentionRegion || '--'}}</text></view>
            <view>购房目的：<text>{{baseInfoList.purchaseMotivation || '--'}}</text></view>
        </view>
        <view class="otherRequirement_view"> 其他需求： <text>{{baseInfoList.otherRequirement || '--'}}</text></view>

        <!--客户状态-->
        <view class="null_view"></view>
        <view class="f_r_b status_box">
            <text class="status_title">客户状态</text>
            <block v-if="showButtonStatus == 201 || showButtonStatus == 202">
                <view class="copywriting f_r_e" v-if="buQuanXinxi">经纪人已补全客户信息,可确认带看</view>
                <view class="copywriting f_r_e" v-else>等待经纪人补全客户电话</view>
            </block>
            <block v-if="showButtonStatus == 203">
                <text class="status_text">可带看剩余时间： </text>
                <text class="status_time">{{KeDaiKanDay||'00'}}：{{KeDaiKanHour||'00'}}：{{KeDaiKanMinute||'00'}}</text>
            </block>
            <block v-if="showButtonStatus == 204 || showButtonStatus == 205">
                <view class="copywriting f_r_e">经纪人已补全客户信息,可确认带看</view>
            </block>
            <block v-if="showButtonStatus == 301 && isShowKeChenJiaoTimeText && detail_info.directCustomer==0">
                <text class="status_text">可成交剩余时间： </text>
                <text class="status_time">{{KeChenJiaoDay||'00'}}：{{KeChenJiaoHour||'00'}}：{{KeChenJiaoMinute||'00'}}</text>
            </block>
            <block v-if="showButtonStatus == 302 && isShowKeChenJiaoTimeText && detail_info.userApply">
                <text class="status_text">可成交剩余时间： </text>
                <text class="status_time">{{KeChenJiaoDay||'00'}}：{{KeChenJiaoHour||'00'}}：{{KeChenJiaoMinute||'00'}}</text>
            </block>
            <block v-if="showButtonStatus == 402">
                <view class="copywriting f_r_e" v-if="detail_info.userApply">申请签约中</view>
            </block>
            <block v-if="showButtonStatus == 502">
                <view class="copywriting f_r_e">申请结佣中</view>
            </block>
        </view>
        <!--进度条-->
        <view class="progress_bar" v-if="!directCustomer"><screenCustomer :custStatus="custStatus" :paidStatus="detail_info.paidStatus"></screenCustomer></view>
        <view class="progress_bar" v-if="directCustomer"><screenCustomerOfDirectCustomer :custStatus="custStatus"></screenCustomerOfDirectCustomer></view>

        <!--成交信息-->
        <view class="deal_info f_r_s" v-if="dealInfo.buildName || dealInfo.houseNo || dealInfo.houseArea || dealInfo.dealAmount">
            <view>成交信息：</view>
            <view class="deal_info_item" v-if="dealInfo.buildName">{{dealInfo.buildName}}</view>
            <view class="deal_info_item" v-if="dealInfo.houseNo">{{dealInfo.houseNo}}</view>
            <view class="deal_info_item" v-if="dealInfo.houseArea">{{dealInfo.houseArea}}㎡</view>
            <view class="deal_info_item" v-if="dealInfo.dealAmount">{{dealInfo.dealAmount}}万</view>
        </view>
        <!--带看确认书-->
        <view class="look_book f_r_s" v-if="detail_info.confirmationPhotoUrl">
            <view>带看确认书：</view>
            <image @click.stop="gotoButtonsView('upDaiKanQueRenShuView')" class="look_img" mode="widthFix" :src="detail_info.confirmationPhotoUrl"></image>
        </view>

        <block v-if="showButtonStatus == 101">
            <view class="buttons f_r_b">
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('invalidCustomerView')">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/wuxiaokehu.png" mode="widthFix"></image>
                    <text>无效报备</text>
                </view>
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('checkReportView')">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                    <text>确认报备</text>
                </view>
            </view>
        </block>
        <block v-if="showButtonStatus == 201">
            <view class="buttons f_r_e">
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('queRenDaiKanView')">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                    <text>确认带看</text>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 202">
            <view class="buttons f_r_e">
                <view class="f_r_b">
                    <view class="progress_button f_r_s" @click.stop="gotoButtonsView('shenQinDaiKanView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                        <text>申请带看</text>
                    </view>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 204">
            <view class="buttons f_r_e">
                <view class="f_r_b">
                    <view class="progress_button f_r_s" @click.stop="gotoButtonsView('queRenDaiKanView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                        <text>确认带看</text>
                    </view>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 205">
            <view class="buttons f_r_e">
                <view class="f_r_b">
                    <view class="progress_button f_r_s" @click.stop="gotoButtonsView('shenQinDaiKanView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                        <text>申请带看</text>
                    </view>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 301">
            <view class="buttons f_r_b">
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('ckeckRenGouView')">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                    <text>确认认购</text>
                </view>

                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('queRenQianYueView')" v-if="hasQueRenQianYue">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                    <text>确认签约</text>
                </view>

                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('shenQinQianYueView')" v-else>
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                    <text>申请签约</text>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 302">
            <view class="buttons f_r_e">
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('applyRenGouView')" v-if="!detail_info.userApply">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/shenqingjieyong.png" mode="widthFix"></image>
                    <text>申请认购</text>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 401">
            <view class="buttons f_r_e">
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('cheXiaoRenGouView')">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/chexiaorengou_icon.png" mode="widthFix"></image>
                    <text>撤销认购</text>
                </view>
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('queRenQianYueView')">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/querenbaobei.png" mode="widthFix"></image>
                    <text>确认签约</text>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 402">
            <view class="buttons f_r_e">
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('cheXiaoRenGouView')">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/chexiaorengou_icon.png" mode="widthFix"></image>
                    <text>撤销认购</text>
                </view>
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('shenQinQianYueView')" v-if="!detail_info.userApply">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/shenqingjieyong.png" mode="widthFix"></image>
                    <text>申请签约</text>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 501">
            <view class="buttons f_r_e">
                <view class="progress_button f_r_s" @click.stop="gotoButtonsView('shenQinJieYongView')">
                    <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/shenqingjieyong.png" mode="widthFix"></image>
                    <text>申请结佣</text>
                </view>
            </view>
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 502">
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>
        <block v-if="showButtonStatus == 701">
            <block v-if="detail_info.directCustomer==0 && accountSource==1 && !shangChuanDaiKanQueRenShu">
                <view class="buttons f_r_e">
                    <view class="look_view_button f_r_s" @click.stop="gotoButtonsView('upDaiKanQueRenShuView')">
                        <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/daikanquerenshu.png" mode="widthFix"></image>
                        <text>上传带看确认书</text>
                    </view>
                </view>
            </block>
        </block>


        <!--跟进记录-->
        <view class="null_view"></view>
        <view class="follow f_r_b">
            <view class="follow_title">跟进记录</view>
            <view class="add_follww f_r_e" @click.stop="goToAddFollowView">
                <image mode="widthFix" class="follow_img" src="http://cdn.haofang.net/static/xfldDeveloper/customer/add_follow.png"></image>
                <text>添加跟进</text>
            </view>
        </view>
        <view class="follow_list"><followList :trackList="trackList"></followList></view>

        <!--底部经纪人信息-->
        <view class="footer_box f_r_b">
            <view class="f_r_s" :class="[isIphoneX==true?'footer_box_up_iphonex':'footer_box_up']" v-if="saleUInfo && saleUInfo.userName">
                <view class="f_r_s">
                    <image class="broker_avatar" mode="aspectFill" v-if="saleUInfo.userPhoto" :src="saleUInfo.userPhoto"></image>
                    <view class="no_broker_avatar" v-else>{{saleFirstName}}</view>
                </view>
                <view class="dept_name_info">
                    <view class="f_r_s">
                        <view class="dept_name">{{saleUInfo.userName||''}}</view>
                        <view class="developer_icon">置业顾问</view>
                    </view>
                    <view class="broker_name">{{saleUInfo.userMobile||''}}</view>
                </view>
            </view>
            <view class="f_r_s" :class="[isIphoneX==true?'footer_box_up_iphonex':'footer_box_up']" v-if="brokerInfo && brokerInfo.brokerName">
                <view class="f_r_s">
                    <image class="broker_avatar" mode="aspectFill" v-if="brokerInfo.brokerAvatarUrl" :src="brokerInfo.brokerAvatarUrl"></image>
                    <view class="no_broker_avatar" v-else>{{brokerFirstName}}</view>
                </view>
                <view class="dept_name_info">
                    <view class="f_r_s">
                        <view class="dept_name">{{brokerInfo.brokerName||''}}</view>
                        <view class="broker_icon">经纪人</view>
                    </view>
                    <view class="broker_name">{{brokerInfo.brokerMobile||''}}</view>
                </view>
            </view>
        </view>

        <!--撤销认购弹窗-->
        <view class="cexiaorengouView_view f_c_e" @click.stop="cancelCeXiao" @touchmove.stop.prevent="" v-if="isShowCheXiaoRenGouView">
            <view class="cexiaorengouView" @click.stop="">
                <view class="cexiaoTitle f_r_b">
                    <view @click.stop="cancelCeXiao" class="quxiao">取消</view>
                    <view class="chedanliyou">撤单理由</view>
                    <view class="quedin" @click.stop="quedinCeXiao">确定</view>
                </view>
                <view class="null_cexiaorengou"></view>
                <view class="other-text-area">
                    <textarea placeholder="请输入撤销原因" placeholder-class="area_size" fixed :show-confirm-bar='false' maxlength="50" cursor-spacing="15" @input="changeTextArea"/>
                </view>
            </view>
        </view>

        <!--弹窗-->
        <showModal :modal='popupText[popupType]' ref="modal" @onModalChanged="onModalChanged"></showModal>

    </view>
</template>

<script>
    import scrollLoading from "@/components/scrollLoading.vue";
    import followList from  "../components/followList.vue";
    import screenCustomer from  "@/components/screenCustomer.vue";
    import screenCustomerOfDirectCustomer from  "@/components/screenCustomerOfDirectCustomer.vue";
    import {
        GetCustDetailInfo,
        UpdateCustStatus,
        ApplyNextStep,
    } from "../../net/CustomerForDevelopersNet";
    import {GetLoginModel} from "../../model/LoginSuccessModel";
    import {Const} from "../../utils/Const";
    import {Config} from "../../config/config";
    import {CancelConfirm, RequestOrSign} from "../../net/CustomerNet";
    import {CustomerModel} from "../../model/CustomerModel";
    import {Notification} from "../../utils/Notification";
    import {Notify} from "../../utils/Notify";
    import {ImSendMessage} from "../../utils/ImChart";

    var c_param = {};// 页面参数 custName custId cityId

    class PrivateData {
        static isRequest = false // 是否在请求接口中...(防止重复提交)
    }

    export default {
        name: "customerDetail",

        components : {
            followList,
            screenCustomer,
            screenCustomerOfDirectCustomer,
            scrollLoading
        },

        onLoad(option){
            new Notification().addObserver(this, "CustomerConfirmMsgChange", Notify.CustomerConfirmMsgChange.Name);
            console.log(option,'---c_param---');
            c_param = {'custId':option.custId, 'cityId':option.cityId, 'custName':option.custName,};
            this.isNew = option.isNew || '0';
            this.source = option.source || '';

            // 传了客户姓名 设置客户姓名为标题
            if (option.custName){
                uni.setNavigationBarTitle({
                    title: option.custName
                });
            }
            if (uni.getSystemInfoSync().model.indexOf("iPhone X") >= 0) {
                this.isIphoneX = true;
            }
        },

        onUnload() {
            new Notification().removeObserverAllNotification(this);
        },

        onShow(){
            // source=remind
            PrivateData.isRequest = false;
            this.iniData();
        },

        data(){
            return{
                source : '', // 判断是否来至于动态提醒
                isIphoneX : false, // 是否是IphoneX
                isLoading : true,// 是否加载完成
                accountSource : 2,// 1 置业顾问端  2 开发商端
                baseInfoList : {}, // 基础信息
                brokerInfo : {}, // 经纪人信息
                brokerFirstName : '',
                saleUInfo : {}, // 置业顾问信息
                saleFirstName : '',
                dealInfo : {}, // 成交信息
                trackList : {}, // 跟进记录
                directCustomer : 0, // 是否是直客 0:否，1:是
                custStatus : -1000,
                showButtonStatus : null,

                popupType : '', //弹窗类型  wuXiao confirm  tel
                popupText : {
                    "yuYinTongHua" : {
                        title: "拨打电话",
                        content: '',
                        confirmText: "呼叫",
                        cancelColor: "rgba(0,0,0,0.6)",
                        confirmColor: "#3396fb",
                    },
                    "wuXiaokehu" : {
                        title: "温馨提示",
                        content: '是否确认为无效客户?',
                        confirmText: "确认",
                        cancelColor: "#3396fb",
                        confirmColor: "#3396fb",
                    },
                    "queRenBaoBei" : {
                        title: "温馨提示",
                        content: '是否确认报备?',
                        confirmText: "确认",
                        cancelColor: "#3396fb",
                        confirmColor: "#3396fb",
                    },
                    "shenQinDaiKan" : {
                        title: "温馨提示",
                        content: '是否申请带看?',
                        confirmText: "确认",
                        cancelColor: "#3396fb",
                        confirmColor: "#3396fb",
                    },
                    "queRenDaiKan" : {
                        title: "温馨提示",
                        content: '是否确认带看?',
                        confirmText: "确认",
                        cancelColor: "#3396fb",
                        confirmColor: "#3396fb",
                    },
                    "queRenQianYue" : {
                        title: "温馨提示",
                        content: '是否确认签约?',
                        confirmText: "确认",
                        cancelColor: "#3396fb",
                        confirmColor: "#3396fb",
                    },
                    "shenQinJieYong" : {
                        title: "温馨提示",
                        content: '是否申请结佣?',
                        confirmText: "确认",
                        cancelColor: "#3396fb",
                        confirmColor: "#3396fb",
                    },
                    "shenQinQianYue" : {
                        title: "温馨提示",
                        content: '是否申请签约?',
                        confirmText: "确认",
                        cancelColor: "#3396fb",
                        confirmColor: "#3396fb",
                    },
                    "boDaDianHua" : {
                        title: "拨打电话",
                        content: '',
                        confirmText: "呼叫",
                        cancelColor: "rgba(0,0,0,0.6)",
                        confirmColor: "#3396fb",
                    },
                    "jingJiRenBuQuanTips" : {
                        title: "温馨提示",
                        content: '请联系经纪人补全客户电话',
                        confirmText: "我知道了",
                        confirmColor: "#3396fb",
                        showCancel: false,
                    },
                    "souceTips" : {
                        title: "温馨提示",
                        content: '该客户尚未进行扫码确认，请先扫码确认再执行后续操作。',
                        confirmText: "我知道了",
                        confirmColor: "#3396fb",
                        showCancel: false,
                    }
                },
                detail_info : {}, // 详情数据

                buQuanXinxi : false, //是否补全信息
                shangChuanDaiKanQueRenShu : false, //是否上传带看确认书
                isShowKeDaiKanTimeText : false, //是否显示 可带看剩余时间:xx天xx小时xx分
                KeDaiKanDay :  '',
                KeDaiKanHour : '',
                KeDaiKanMinute : '',
                isNew : 0, //是否是新页面过来的

                isShowKeChenJiaoTimeText : false,
                KeChenJiaoDay : '',
                KeChenJiaoHour : '',
                KeChenJiaoMinute: '',
                hasQueRenQianYue : false,// 是否有确认签约权限
                isShowCheXiaoRenGouView : false, //是否展示撤销认购页面
                cheXiaoRenGouText : '', // 撤销认购理由
            }
        },

        methods : {
            CustomerConfirmMsgChange() {
                this.iniData();
            },

            // 请求详情数据 GetCustDetailInfo
            iniData(){
                if (!c_param.custId || !c_param.cityId) return;

                this.isLoading = true;
                new GetCustDetailInfo(c_param).send()
                    .then((res)=>{
                        let that = this;
                        console.log(res,'--客户详情res--');
                        if (res.errCode != 200){
                            this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                            return [];
                        }

                        // 设置标题
                        if (res.data.custName){
                            uni.setNavigationBarTitle({
                                title: res.data.custName
                            });
                        }

                        // 基础信息
                        let baseInfoList = {};
                        baseInfoList.custName = res.data.custName || ''; // 姓名
                        baseInfoList.custMobile = res.data.custMobile || ''; // 联系电话
                        baseInfoList.custSex = res.data.custSex || ''; // 性别
                        baseInfoList.intentionLayout = res.data.intentionLayout.split(",") || ''; // 意向户型
                        baseInfoList.payWayCn = res.data.payWayCn || ''; // 付款方式
                        baseInfoList.price = res.data.price || ''; // 预算价格
                        baseInfoList.intentionRegion = res.data.intentionRegion || ''; // 意向区域
                        baseInfoList.purchaseMotivation = res.data.purchaseMotivation || ''; // 购房目的
                        baseInfoList.otherRequirement = res.data.otherRequirement || ''; // 其他需求
                        this.baseInfoList = baseInfoList;

                        // 处理电话号码
                        baseInfoList.isCanCall = true;
                        if (this.VerifyPhone(res.data.custMobile||'')){
                            baseInfoList.isCanCall = false;
                        }

                        //底部信息
                        this.brokerInfo = res.data.brokerInfo||[];
                        this.brokerFirstName = (res.data.brokerInfo && res.data.brokerInfo.brokerName) ? res.data.brokerInfo.brokerName.substring(0, 1) : '';
                        this.saleUInfo = res.data.saleUInfo||[];
                        this.saleFirstName = (res.data.saleUInfo && res.data.saleUInfo.userName) ? res.data.saleUInfo.userName.substring(0, 1) : '';
                        new CustomerModel().setModel(res.data.saleUInfo || {});

                        //跟进信息
                        if (res.data.trackList.length > 0){
                            for (let item of res.data.trackList){
                                let re=/(\n)/g;
                                item.trackContent = item.trackContent.replace(re,"#").split('#');
                            }
                        }
                        this.trackList = res.data.trackList || '';

                        this.directCustomer = res.data.directCustomer;// 是否是直客
                        this.custStatus = res.data.custStatus;// 报备状态

                        // 成交信息
                        let dealInfo = {};
                        dealInfo.houseNo = res.data.houseNo||''; // 房源编号
                        dealInfo.houseArea = res.data.houseArea||''; // 房源面积
                        dealInfo.dealAmount = res.data.dealAmount||''; // 成交金额
                        dealInfo.buildName = res.data.buildName||''; // 意向楼盘
                        this.dealInfo = dealInfo;
                        this.detail_info = res.data;

                        // 处理流程 按钮,文案,icon
                        let UserJurisdiction = GetLoginModel.getUserJurisdiction(); // 权限-开发商端默认全部权限
                        this.accountSource = GetLoginModel.getAccountSource();// 获取账号来源  1 置业顾问端  2 开发商端
                        this.showButtonStatus = null; // 赋值为null(初始状态) 防止没有进if的情况导致按钮显示错误

                        // 判断是否来至于动态提醒
                        if (that.source == 'remind'){
                            if (res.data.custStatus && res.data.custStatus==2){
                                this.showButtonStatus = 203;
                                let dealRemainingTimeOfTwo = res.data.visitRemainingTime;

                                KeDaiKanTime();

                                setInterval(()=>{
                                    KeDaiKanTime();
                                },30000);

                                function KeDaiKanTime() {
                                    let conS = Math.floor((dealRemainingTimeOfTwo)/1000);//获得差值除以1000转为秒
                                    let d = Math.floor(conS/86400)<0?0:Math.floor(conS/86400);// 差值/60/60/24获取天数
                                    if (d < 10){
                                        d = '0' + d;
                                    }
                                    that.KeDaiKanDay = d;
                                    let h = Math.floor(conS%86400/3600)<0?0:Math.floor(conS%86400/3600); //  取余/60/60获取时(取余是获取conS对应位置的小数位)
                                    if (h < 10){
                                        h = '0' + h;
                                    }
                                    that.KeDaiKanHour = h;
                                    let m = Math.floor(conS%86400%3600/60)<0?0:Math.floor(conS%86400%3600/60);// 取余/60获取分
                                    if (m < 10){
                                        m = '0' + m;
                                    }
                                    that.KeDaiKanMinute = m;
                                    dealRemainingTimeOfTwo = dealRemainingTimeOfTwo - 60*1000;
                                }

                                this.popupType = 'souceTips';
                                this.$refs.modal.show();
                                return ;
                                /*this.popupType = 'souceTips';
                                this.$refs.modal.show();
                                setTimeout(()=>{
                                    uni.navigateBack({
                                        delta: 1
                                    });
                                },2000);
                                return ;*/
                            }
                        }
                        if (res.data.custStatus == 1){
                            if (UserJurisdiction.indexOf(1) >=0){
                                // 文案:无  按钮: 无效客户 确认报备
                                this.showButtonStatus = 101;
                            }
                        }
                        if (res.data.custStatus == 2){
                            //判断权限
                            if (UserJurisdiction.indexOf(2) >=0){
                                if (res.data.confirmationQrCodeTime){
                                    this.showButtonStatus = 201;
                                    this.buQuanXinxi = !!res.data.completeCustMobile;
                                    this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                                }else {
                                    this.showButtonStatus = 100;
                                }

                                //判断如果设置为: 签约认购时 补全号码的情况(completeMobileConfig=2) 带看补全号码(completeMobileConfig=1)
                                if (res.data.completeMobileConfig == 2){
                                    // 有权限且是签约时补全号码 按钮:确认带看 文案(下面):经纪人已补全客户信息,可确认带看
                                    this.showButtonStatus = 204;
                                }
                            }else {
                                if (res.data.confirmationQrCodeTime){
                                    this.showButtonStatus = 202;
                                    this.buQuanXinxi = !!res.data.completeCustMobile;
                                    this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                                }else {
                                    this.showButtonStatus = 100;
                                }
                                //
                                if (res.data.completeMobileConfig == 2){
                                    // 无权限 且是签约时补全号码 按钮:申请带看 文案:经纪人已补全客户信息,可申请带看
                                    this.showButtonStatus = 205;
                                }
                            }

                            if (this.isNew == '1'){
                                this.showButtonStatus = 203;
                                let dealRemainingTimeOfTwo = res.data.visitRemainingTime;

                                KeDaiKanTime();

                                setInterval(()=>{
                                    KeDaiKanTime();
                                },30000);

                                function KeDaiKanTime() {
                                    let conS = Math.floor((dealRemainingTimeOfTwo)/1000);//获得差值除以1000转为秒
                                    let d = Math.floor(conS/86400)<0?0:Math.floor(conS/86400);// 差值/60/60/24获取天数
                                    if (d < 10){
                                        d = '0' + d;
                                    }
                                    that.KeDaiKanDay = d;
                                    let h = Math.floor(conS%86400/3600)<0?0:Math.floor(conS%86400/3600); //  取余/60/60获取时(取余是获取conS对应位置的小数位)
                                    if (h < 10){
                                        h = '0' + h;
                                    }
                                    that.KeDaiKanHour = h;
                                    let m = Math.floor(conS%86400%3600/60)<0?0:Math.floor(conS%86400%3600/60);// 取余/60获取分
                                    if (m < 10){
                                        m = '0' + m;
                                    }
                                    that.KeDaiKanMinute = m;
                                    dealRemainingTimeOfTwo = dealRemainingTimeOfTwo - 60*1000;
                                }

                            }
                        }
                        if (res.data.custStatus == 3){
                            //判断是否有4(确认签约权限)
                            if (UserJurisdiction.indexOf(4) >= 0){
                                this.hasQueRenQianYue = true;
                            }

                            if (UserJurisdiction.indexOf(3) >= 0){
                                this.showButtonStatus = 301;
                                this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                            }else {
                                this.showButtonStatus = 302;
                                this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                            }

                            // 是否显示可成交剩余时间:xx天xx小时xx分
                            if (res.data.dealRemainingTime){
                                this.isShowKeChenJiaoTimeText = true;// 显示
                                let dealRemainingTimeOfThree = res.data.dealRemainingTime;

                                KeChenJiaoTime();

                                setInterval(()=>{
                                    KeChenJiaoTime();
                                },30000);

                                function KeChenJiaoTime() {
                                    let conS = Math.floor((dealRemainingTimeOfThree)/1000);//获得差值除以1000转为秒
                                    let d = Math.floor(conS/86400)<0?0:Math.floor(conS/86400);// 差值/60/60/24获取天数
                                    if (d < 10){
                                        d = '0' + d;
                                    }
                                    that.KeChenJiaoDay = d;
                                    let h = Math.floor(conS%86400/3600)<0?0:Math.floor(conS%86400/3600); //  取余/60/60获取时(取余是获取conS对应位置的小数位)
                                    if (h < 10){
                                        h = '0' + h;
                                    }
                                    that.KeChenJiaoHour = h;
                                    let m = Math.floor(conS%86400%3600/60)<0?0:Math.floor(conS%86400%3600/60);// 取余/60获取分
                                    if (m < 10){
                                        m = '0' + m;
                                    }
                                    that.KeChenJiaoMinute = m;
                                    dealRemainingTimeOfThree = dealRemainingTimeOfThree - 60*100;
                                }
                            }
                        }
                        if (res.data.custStatus == 4){
                            if (UserJurisdiction.indexOf(4) >=0){
                                this.showButtonStatus = 401;
                                this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                            }else {
                                this.showButtonStatus = 402;
                                this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                            }
                        }
                        if (res.data.custStatus == 5){
                            if (res.data.userApply == 0){
                                this.showButtonStatus = 501;
                                this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                            }else {
                                this.showButtonStatus = 502;
                                this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                            }
                            if (res.data.directCustomer==1){
                                this.showButtonStatus = 100;
                            }
                        }
                        if (res.data.custStatus == 6){
                            // this.showButtonStatus = 502;
                            this.showButtonStatus = 100;
                            this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                            if (res.data.directCustomer==1){
                                this.showButtonStatus = 100;
                            }
                        }
                        if (res.data.custStatus == 7 || res.data.paidStatus == 1){
                            if (res.data.directCustomer==1){
                                this.showButtonStatus = 100;
                            }
                            this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
                            this.showButtonStatus = 701;
                        }


                        console.log(this.custStatus,'当前用户状态');
                        console.log(this.showButtonStatus,'当前block');
                    })
                    .catch((res)=>{
                        console.log(res);
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                    });
            },
            // 添加跟进
            goToAddFollowView(){
                uni.navigateTo({
                    url: '/pagesCustomer/writeFollow/writeFollow?custId='+c_param.custId+'&cityId='+c_param.cityId
                });
            },
            // 按钮点击事件
            gotoButtonsView(item){
                // 无效客户
                if (item == 'invalidCustomerView'){
                    this.popupType = 'wuXiaokehu';
                    this.$refs.modal.show();
                }
                // 确认报备
                if (item == 'checkReportView'){
                    this.popupType = 'queRenBaoBei';
                    this.$refs.modal.show();
                }
                // 确认带看
                if (item == 'queRenDaiKanView'){
                    //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
                    if (this.detail_info.completeMobileConfig == 1 && this.detail_info.completeCustMobile==0 && this.detail_info.directCustomer==0){
                        this.popupType = 'jingJiRenBuQuanTips';
                        this.$refs.modal.show();
                        return;
                    }

                    this.popupType = 'queRenDaiKan';
                    this.$refs.modal.show();
                }
                // 申请带看
                if (item == 'shenQinDaiKanView'){
                    this.popupType = 'shenQinDaiKan';
                    this.$refs.modal.show();
                }
                // 确认认购
                if (item == 'ckeckRenGouView'){
                    //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
                    if (this.detail_info.completeMobileConfig == 2 && this.detail_info.completeCustMobile==0 && this.detail_info.directCustomer==0){
                        this.popupType = 'jingJiRenBuQuanTips';
                        this.$refs.modal.show();
                        return;
                    }

                    let cityId = this.detail_info.cityId || '';
                    let custId = this.detail_info.custId || '';
                    let custStatus = this.detail_info.custStatus || '';
                    let houseNo = this.detail_info.houseNo || '';
                    let houseArea = this.detail_info.houseArea || '';
                    let dealAmount = this.detail_info.dealAmount || '';
                    let commission = this.detail_info.commission || '';
                    let directCustomer = this.detail_info.directCustomer || 0;
                    let layoutNo = this.detail_info.layoutNo || '';
                    uni.navigateTo({
                        url: "/pagesCustomer/subscriptionInfo/subscriptionInfo?houseNo="+houseNo+
                            '&houseArea='+houseArea+
                            '&dealAmount='+dealAmount +
                            '&commission='+commission +
                            '&cityId='+cityId +
                            '&custId='+custId+
                            '&custStatus='+custStatus+
                            '&directCustomer='+directCustomer+
                            '&layoutNo='+layoutNo
                    });
                }
                // 确认签约
                if (item == 'queRenQianYueView'){
                    //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
                    if (this.detail_info.completeMobileConfig == 2 && this.detail_info.completeCustMobile==0 && this.detail_info.directCustomer==0){
                        this.popupType = 'jingJiRenBuQuanTips';
                        this.$refs.modal.show();
                        return;
                    }

                    if (this.detail_info.houseNo && this.detail_info.houseArea && this.detail_info.dealAmount && this.detail_info.layoutNo){
                        this.popupType = 'queRenQianYue';
                        this.$refs.modal.show();
                    }else {
                        let cityId = this.detail_info.cityId || '';
                        let custId = this.detail_info.custId || '';
                        let custStatus = this.detail_info.custStatus || '';
                        let directCustomer = this.detail_info.directCustomer || 0;

                        uni.navigateTo({
                            url: "/pagesCustomer/signInfo/signInfo?cityId="+cityId+
                                '&custId='+custId+
                                '&custStatus='+custStatus+
                                '&directCustomer='+directCustomer
                        });
                    }
                }
                // 申请认购
                if (item == 'applyRenGouView'){
                    //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
                    if (this.detail_info.completeMobileConfig == 2 && this.detail_info.completeCustMobile==0 && this.detail_info.directCustomer==0){
                        this.popupType = 'jingJiRenBuQuanTips';
                        this.$refs.modal.show();
                        return;
                    }

                    let cityId = this.detail_info.cityId || '';
                    let custId = this.detail_info.custId || '';
                    let custStatus = this.detail_info.custStatus || '';
                    let houseNo = this.detail_info.houseNo || '';
                    let houseArea = this.detail_info.houseArea || '';
                    let dealAmount = this.detail_info.dealAmount || '';
                    let commission = this.detail_info.commission || '';
                    let layoutNo = this.detail_info.layoutNo || '';
                    let directCustomer = this.detail_info.directCustomer || 0;
                    uni.navigateTo({
                        url: "/pagesCustomer/applyRenGou/applyRenGou?houseNo="+ houseNo+
                            '&houseArea='+ houseArea+
                            '&dealAmount='+ dealAmount +
                            '&commission='+ commission +
                            '&cityId='+ cityId +
                            '&custId='+ custId +
                            '&custStatus='+ custStatus +
                            '&directCustomer='+ directCustomer +
                            '&layoutNo='+ layoutNo,
                    });
                }
                //申请签约
                if (item == 'shenQinQianYueView'){
                    //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
                    if (this.detail_info.completeMobileConfig == 2 && this.detail_info.completeCustMobile==0 && this.detail_info.directCustomer==0){
                        this.popupType = 'jingJiRenBuQuanTips';
                        this.$refs.modal.show();
                        return;
                    }

                    if (this.detail_info.houseNo && this.detail_info.houseArea && this.detail_info.dealAmount && this.detail_info.layoutNo){
                        this.popupType = 'shenQinQianYue';
                        this.$refs.modal.show();
                    }else {
                        let cityId = this.detail_info.cityId || '';
                        let custId = this.detail_info.custId || '';
                        let custStatus = this.detail_info.custStatus || '';
                        let layoutNo = this.detail_info.layoutNo || '';
                        let directCustomer = this.detail_info.directCustomer || 0;
                        uni.navigateTo({
                            url: "/pagesCustomer/signInfo/signInfo?cityId="+cityId+
                                '&custId='+custId+
                                '&custStatus='+custStatus+
                                '&directCustomer='+directCustomer+
                                '&layoutNo='+layoutNo,
                        });
                    }
                }
                // 撤销认购
                if (item == 'cheXiaoRenGouView'){
                    this.isShowCheXiaoRenGouView = true;
                    console.log('撤销认购');
                }
                //申请结佣
                if (item == 'shenQinJieYongView'){
                    this.popupType = 'shenQinJieYong';
                    this.$refs.modal.show();
                }
                // 上传带看确认书
                if (item == 'upDaiKanQueRenShuView'){
                    console.log('点击上传带看确认书按钮了');
                    let photoUrl = this.detail_info.confirmationPhotoUrl || '';
                    uni.navigateTo({
                        url: "/pagesCustomer/upDaiKanQueRenShu/upDaiKanQueRenShu?brokerCityId="+
                            this.detail_info.cityId+'&custId='+
                            this.detail_info.custId+'&photoUrl='+photoUrl+
                            '&paidStatus='+this.detail_info.paidStatus+
                            '&custStatus='+this.detail_info.custStatus
                    });
                }
            },
            // 弹窗
            onModalChanged(val) {
                if (!val) return;
                // 无效报备
                if (this.popupType == "wuXiaokehu"){
                    let param = {
                        custId: this.detail_info.custId,
                        cityId: this.detail_info.cityId,
                        custStatus: 0
                    };
                    this.UpdateCustStatus(param);
                }
                // 确认报备
                if (this.popupType == "queRenBaoBei"){
                    let param = {
                        custId: this.detail_info.custId,
                        cityId: this.detail_info.cityId,
                        custStatus: 2
                    };
                    this.UpdateCustStatus(param);
                }
                // 确认带看
                if (this.popupType == "queRenDaiKan"){
                    let sellInfo = new CustomerModel().getModel() || "";
                    if (sellInfo.userId) {
                        new ImSendMessage().sendNotifyMsg("ld_" + sellInfo.userId);
                    }
                    let param = {
                        custId: this.detail_info.custId,
                        cityId: this.detail_info.cityId,
                        custStatus: 3
                    };
                    this.UpdateCustStatus(param);
                }
                // 申请带看
                if (this.popupType == "shenQinDaiKan"){
                    let applyParam = {
                        custId: this.detail_info.custId,
                        cityId: this.detail_info.cityId,
                    };
                    this.ApplyCustomer(applyParam);
                }
                // 申请结佣
                if (this.popupType == 'shenQinJieYong'){
                    let param = {
                        custId: this.detail_info.custId,
                        cityId: this.detail_info.cityId,
                    };
                    this.ApplyCustomer(param);
                }
                // 确认签约
                if (this.popupType == 'queRenQianYue'){
                    if (PrivateData.isRequest) return;// 防止重复提交

                    uni.showLoading({
                        title: '确认中'
                    });
                    let para = {
                        cityId : this.detail_info.cityId,
                        custId : this.detail_info.custId,
                        custStatus : this.detail_info.custStatus,
                        houseNo : this.detail_info.houseNo,
                        houseArea : this.detail_info.houseArea,
                        dealAmount : this.detail_info.dealAmount,
                        layoutNo : this.detail_info.layoutNo||'',
                        commission : this.detail_info.commission||'',
                    };
                    PrivateData.isRequest = true;
                    new RequestOrSign(para).send().then((res)=>{
                        uni.hideLoading();
                        if(res.errCode !== Const.success) {
                            this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                            PrivateData.isRequest = false;
                            return;
                        }
                        PrivateData.isRequest = false;
                        this.iniData();
                    })
                        .catch((res)=>{
                            uni.hideLoading();
                            PrivateData.isRequest = false;
                            this.DifferenceApi.showToast(res.errMsg || "请求失败");
                        });
                }
                // 拨打电话
                if (this.popupType == 'boDaDianHua'){
                    uni.makePhoneCall({
                        phoneNumber: this.detail_info.custMobile,
                    });
                }
                // 申请签约
                if (this.popupType == 'shenQinQianYue'){
                    if (PrivateData.isRequest) return;// 防止重复提交
                    uni.showLoading({
                        title: '申请中'
                    });
                    let para = {
                        cityId : this.detail_info.cityId,
                        custId : this.detail_info.custId,
                        custStatus : this.detail_info.custStatus,
                        houseNo : this.detail_info.houseNo,
                        houseArea : this.detail_info.houseArea,
                        dealAmount : this.detail_info.dealAmount,
                        commission : this.detail_info.commission||'',
                        layoutNo : this.detail_info.layoutNo||'',
                    };
                    PrivateData.isRequest = true;
                    new RequestOrSign(para).send().then((res)=>{
                        uni.hideLoading();
                        if(res.errCode !== Const.success) {
                            this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                            PrivateData.isRequest = false;
                            return;
                        }
                        PrivateData.isRequest = false;
                        this.iniData();
                    })
                    .catch((res)=>{
                        uni.hideLoading();
                        PrivateData.isRequest = false;
                        this.DifferenceApi.showToast(res.errMsg || "请求失败");
                    });
                }
            },

            // 封装修改用户状态接口
            UpdateCustStatus(statuParam){
                if (PrivateData.isRequest) return;// 防止重复提交

                uni.showLoading({
                    title: '操作中'
                });
                PrivateData.isRequest = true;
                new UpdateCustStatus(statuParam).send().then((res)=>{
                    uni.hideLoading();
                    if (res.errCode != 200){
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        PrivateData.isRequest = false;
                        return;
                    }
                    PrivateData.isRequest = false;
                    this.iniData();
                })
                .catch((res)=>{
                    PrivateData.isRequest = false;
                    uni.hideLoading();
                    this.DifferenceApi.showToast(res.errMsg || "请求失败");
                });
            },
            // 封装申请接口
            ApplyCustomer(applyParam){
                if (PrivateData.isRequest) return;// 防止重复提交

                uni.showLoading({
                    title: '操作中'
                });
                PrivateData.isRequest = true;
                new ApplyNextStep(applyParam).send().then((res)=>{
                    uni.hideLoading();
                    if (res.errCode != 200){
                        PrivateData.isRequest = false;
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        return;
                    }
                    PrivateData.isRequest = false;
                    this.iniData();
                })
                .catch((res)=>{
                    PrivateData.isRequest = false;
                    uni.hideLoading();
                    this.DifferenceApi.showToast(res.errMsg || "请求失败");
                });
            },

            // 取消 撤销认购 页面展示
            cancelCeXiao(){
                console.log('取消 撤销认购 页面展示');
                this.isShowCheXiaoRenGouView = false;
            },

            changeTextArea(e){
                this.cheXiaoRenGouText = e.detail.value;
            },

            quedinCeXiao(){
                if (this.cheXiaoRenGouText.length==0){
                    this.DifferenceApi.showToast('请输入撤销原因');
                    return;
                }
                let pa = {
                    cityId:this.detail_info.cityId,
                    custId:this.detail_info.custId,
                    reason:this.cheXiaoRenGouText,
                };
                uni.showLoading({title: '撤销中...', mask: Config.mask});
                new CancelConfirm(pa).send().then((res)=>{
                    uni.hideLoading();
                    if(res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }
                    this.isShowCheXiaoRenGouView = false;
                    this.iniData();
                    this.DifferenceApi.showToast("撤销认购成功");
                })
                    .catch((res)=>{
                        uni.hideLoading();
                        this.DifferenceApi.showToast(res.errMsg || "请求失败");
                    });
            },

            // 验证手机号码
            VerifyPhone(phone){
                if (!phone) return false;

                let reg=/[*]+/;
                return !!(reg.test(phone));
            },

            // 拨打电话
            goToCallPhoneView(phone){
                if (!phone){
                    this.DifferenceApi.showToast('暂无电话');
                    return;
                }

                if (phone.length !== 11){
                    this.DifferenceApi.showToast('电话号码错误');
                    return;
                }

                this.popupType = 'boDaDianHua';
                this.popupText.boDaDianHua.content = phone;
                this.$refs.modal.show();
            },
        },
    }
</script>

<style scoped>
    .status_box{
        margin: 50upx 40upx 0 40upx;
    }
    .status_text{
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin: auto 0 auto 0;
    }
    .status_time{
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #f95742;
        margin: auto 0 auto 0;
    }
    /*基本信息*/
    .info_title{
        font-family: PingFang-SC-Bold;
        font-size: 38upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 42upx;
        letter-spacing: 0upx;
        color: #191f25;
        margin-left: 40upx;
        margin-top: 20upx;
    }
    .b-d-info {
        width: 100%;
        height: auto;
        padding: 40upx 40upx 0 40upx;
        background-color: #ffffff;
        /*margin-top: 20upx;*/
        display: flex;
        flex-wrap: wrap;
        flex-shrink:0;
    }
    .b-d-info>view {
        flex: 0 0 50%;
        width: 50%;
        height: 60upx;
        display: flex;
        align-items: center;
        color: #a3a5a8;
        font-size: 28upx;
        line-height: 1;
        flex-shrink:0;
    }
    .b-d-info>view>text {
        line-height: 38upx;
        flex-shrink:0;
        color: #191f25;
        text-align: left;
        max-width: 220upx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .callPhone{
        flex-shrink:0;
        color: #0084ff;
    }
    .otherRequirement_view{
        font-size: 28upx;
        line-height: 30upx;
        color: #a3a5a8;
        background-color: #ffffff;
        margin: 0 40upx 20upx 40upx;
    }
    .otherRequirement_view>text{
        color: #191f25;
        font-size: 28upx;
        line-height: 2;
        flex-shrink:0;
    }
    .null_view{
        width: 100%;
        height: 20upx;
        background-color: #f8f8f8;
    }

    /*客户状态*/
    .status_title{
        font-family: PingFang-SC-Bold;
        font-size: 38upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        margin: auto auto auto 0;
    }

    /*添加跟进*/
    .follow{
        margin: 50upx 40upx 0 40upx;
    }
    .follow_title{
        font-family: PingFang-SC-Bold;
        font-size: 38upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
    }
    .add_follww{
        align-items: center;
    }
    .add_follww>text{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30upx;
        letter-spacing: 0upx;
        color: #191f25;
        margin: auto;
    }
    .follow_img{
        width: 30upx;
        height: 30upx;
        margin: auto 12upx auto auto;
        display: flex;
    }
    .follow_list{
        margin-top: 40upx;
        margin-bottom: 180upx;
    }

    /*底部信息*/
    .footer_box{
        width: 100%;
        height: 150upx;
        background-color: #ffffff;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 99;
    }
    .footer_box_up{
        width: 50%;
    }
    .footer_box_up_iphonex{
        width: 50%;
        margin-bottom: 25upx;
    }
    .broker_avatar{
        width: 84upx;
        height: 84upx;
        margin: auto 0upx auto 35upx;
        border-radius: 100%;
    }
    .no_broker_avatar{
        width: 84upx;
        height: 84upx;
        margin: auto 0upx auto 35upx;
        border-radius: 100%;
        background: #3396fb;
        overflow: hidden;
        flex-shrink: 0;
        color: #ffffff;
        font-size: 30upx;
        text-align: center;
        line-height: 82upx;
    }
    .dept_name_info{
        margin: auto 0 auto 20upx;
    }
    .dept_name{
        font-size: 30upx;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        margin-bottom: auto auto 8upx auto;
        text-align: left;
        /*max-width: 100%;*/
        max-width: 150upx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .broker_name{
        font-size: 29upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #7d8184;
        line-height: 45upx;
    }
    .developer_icon{
        margin: auto auto auto 10upx;
        /*padding: 5upx 6upx;*/
        padding: 1upx 6upx 5upx 6upx;
        font-family: PingFang-SC-Medium;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #3072f6;
        background-color: #eff4fe;
        width: 95upx;
    }
    .broker_icon{
        margin: auto auto auto 10upx;
        /*padding: 5upx 6upx;*/
        padding: 1upx 6upx 5upx 6upx;
        font-family: PingFang-SC-Medium;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #f95742;
        background-color: #fff2f0;
    }

    /*成交信息*/
    .deal_info{
        flex-wrap:wrap;
        flex-shrink:0;
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin-left: 40upx;
        margin-top: 40upx;
        margin-bottom: 30upx;
    }
    .deal_info>view{
        flex-shrink:0;
    }
    .deal_info_item{
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40upx;
        letter-spacing: 0upx;
        color: #191f25;
        margin: auto 20upx auto 0upx;
    }

    /*附件信息*/
    .look_book{
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 50upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin: 40upx auto 50upx 40upx;
    }
    .look_img{
        width: 91upx;
        height: 91upx;
    }

    /*按钮*/
    .buttons{
        margin: 0 40upx 50upx 40upx;
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #3072f6;
    }
    .buttons>view{
        margin-right: 30upx;
        flex-wrap:wrap;
    }
    .buttons>view:last-child{
        margin-right: 0;
    }
    .copywriting{
        font-size: 26upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 37upx;
        letter-spacing: 0upx;
        color: #666666;
        margin-top: auto;
        margin-bottom: auto;
    }
    .page_box{
        overflow-x: hidden;
    }
    .intentionLayout_ma{
        margin-right: 10upx;
    }
    .cexiaorengouView_view{
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        z-index: 99;
        background: rgba(0,0,0,0.5);
    }
    .cexiaorengouView{
        background: #FFFFFF;
    }
    .cexiaoTitle{
        background-color: #f6f6f6;
        height: 70upx;
    }
    .quxiao{
        font-size: 26upx;
        margin: auto auto auto 50upx;
        color: #999999;
    }
    .chedanliyou{
        opacity: 0.8;
        font-size: 32upx;
        margin: auto;
    }
    .quedin{
        font-size: 26upx;
        color: #3396fb;
        margin: auto 50upx auto auto;
    }
    .other-text-area {
        position: relative;
        width: 93%;
        height: auto;
        background-color: #ffffff;
        margin: auto auto 15upx auto;
    }
    .other-text-area>textarea {
        width: 100%;
        height: 308upx;
        background-color: #f6f6f6;
        border-radius: 4px;
        font-size: 24upx;
        padding: 20upx;
        box-sizing: border-box;
    }
    .area_size{
        font-size: 26upx;
    }

    /*流程按钮样式*/
    .progress_button{
        font-size: 30upx;
        align-items: center;
        background-color: #f2f6ff;
        padding: 30upx 80upx 30upx 80upx;
        border-radius: 10upx;
        flex-shrink:0;
    }
    .progress_button>text{
        flex-shrink:0;
        color: #0084ff;
    }
    .progress_button>image{
        width: 26upx;
        height: 28upx;
        margin-right: 10upx;
    }

    .look_view_button{
        text-align: center;
        height: 60upx;
        border-radius: 10upx;
        margin-right: 40upx;
    }
    .look_view_button>text{
        margin: auto;
        line-height: 60upx;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1upx;
        color: #0084ff;
    }
    .look_view_button>image{
        width: 26upx;
        height: 28upx;
        margin: auto 10upx auto auto;
    }
    .null_cexiaorengou{
        width: 100%;
        height: 15upx;
        background-color: #FFFFFF;
    }
    .progress_bar{
        margin-bottom: 30upx;
    }
</style>
