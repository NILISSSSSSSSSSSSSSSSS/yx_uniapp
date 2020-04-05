<template>
    <view class="customs_analysis">
        <!-- #ifdef MP-WEIXIN -->
        <cover-view class="header">
            <cover-view class="title_cover"></cover-view>
            <cover-view class="tabs">
                <cover-view class="tabs_title">
                    <cover-view class="d_inline" :class="{'tabs_title_active':swiper.currentIndex==0 }" @click="swiperTo(0)">个人</cover-view>
                    <cover-view class="d_inline" :class="{'tabs_title_active':swiper.currentIndex==1 }" @click="swiperTo(1)">楼盘</cover-view>
                </cover-view>
                <cover-view class="dots_list clearfix">
                    <cover-view class="tabs_dots_left" :class="{dot_active:swiper.currentIndex==0}"></cover-view>
                    <cover-view class="tabs_dots_right" :class="{dot_active:swiper.currentIndex==1}"></cover-view>
                </cover-view>
            </cover-view>
            <cover-view class="border_borttom"></cover-view>
        </cover-view>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS||APP-PLUS-NVUE -->
        <view class="header">
            <view class="title_cover"></view>
            <view class="tabs">
                <view class="tabs_title">
                    <view class="d_inline" :class="{'tabs_title_active':swiper.currentIndex==0 }" @click="swiperTo(0)">个人</view>
                    <view class="d_inline" :class="{'tabs_title_active':swiper.currentIndex==1 }" @click="swiperTo(1)">楼盘</view>
                </view>
                <view class="dots_list clearfix">
                    <view class="tabs_dots_left" :class="{dot_active:swiper.currentIndex==0}"></view>
                    <view class="tabs_dots_right" :class="{dot_active:swiper.currentIndex==1}"></view>
                </view>   
            </view>
            <view class="border_borttom"></view>
        </view>
        <!-- #endif -->
        <view class="main">
            <view v-if="swiper.currentIndex==0?true:false">
                <content
                :request_start_time="p_request_start_time"
                :request_end_time="p_request_end_time"
                :chart_data="personal_content"
                :init_time= "init_time"
                v-if="personal_content!=undefined?true:false"  />
            </view>
            <view v-if="swiper.currentIndex==1?true:false">
                <content
                :request_start_time="b_request_start_time"
                :request_end_time="b_request_end_time"
                :chart_data="build_content"
                :init_time= "init_time"
                v-if="build_content!=undefined?true:false" />
            </view>
        </view>
    </view>
</template>

<script>
    import content from './content/content'
    import {change_data_tools} from './content/change_data/change_data'
    import {CustReportSmallTime, CommissionDealTrend, CustStatisticInfo, SellProportion} from '@/net/StatisticsNet.js'
    import {GetLoginModel } from '@/model/LoginSuccessModel'
    import moment from '@/utils/moment.js'
    import {Notification} from '@/utils/Notification'
    import {Notify} from '@/utils/Notify'

    export default {
        components: {content},
        data () {
            return {
                personal:'',
                buildId:'',
                sellId:'',
                request_time:'',
                personal_content:null,
                build_content:null,
                p_request_start_time: '',
                p_request_end_time: '',
                b_request_start_time: '',
                b_request_end_time: '',
                init_time:'',
                swiper: {
                    currentIndex: 0,
                },
            }
        },
        methods: {
            PageShowChange(name, params) {
                if (params.source === "build") {
                    // 请求个人数据
                    this.init ();
                    this.request();
                    this.request(this.buildId);
                }
            },

            StatisticsTimeChange(name, info) {
                this.request_time=`${moment(info.dayStartTime).format('YYYY-M-D')} - ${moment(info.dayEndTime).format('YYYY-M-D')}`
                if (info.source === 'personal') {
                    this.p_request_start_time= info.dayStartTime
                    this.p_request_end_time= info.dayEndTime
                    this.request()
                } else if (info.source === 'build') {
                    this.b_request_start_time= info.dayStartTime
                    this.b_request_end_time= info.dayEndTime
                    this.request(this.buildId)
                }
            },
            changeSwiper (e) {
                this.swiper.currentIndex = e.detail.current;
            },
            swiperTo (num) {
                this.swiper.currentIndex =num;
            },

            //首次进页面获取时间段,楼盘id及userId
            init () {
                let d= new Date().getTime();
                this.p_request_end_time= d
                this.p_request_start_time= d-518400000
                this.b_request_end_time= d
                this.b_request_start_time= d-518400000
                this.request_time= `${moment(this.p_request_start_time).format('YYYY-MM-DD')} - ${moment(this.p_request_end_time).format('YYYY-MM-DD')}`
                this.buildId= GetLoginModel.getBuildId ()
                this.sellId= GetLoginModel.getUserId()
            },

            //发送请求
            request (buildId) {
                let data= {
                    trend: null ,
                    percentage: null,
                    layout: null,
                    type:'',
                }
                let params= {}
                if (buildId != undefined) {
                    params= {
                        date: this.request_time,
                        buildId: this.buildId,
                        source:1,
                    }
                } else {
                    params= {
                        date: this.request_time,
                        sellId: this.sellId,
                        source:1,
                    }
                }
                Promise.all([
                    new CommissionDealTrend(params).send(),
                    new CustStatisticInfo(params).send(),
                    new SellProportion(params).send(),
                ]).then (res => {
                    if (res[0].errCode === 200)// 交易走势
                        data.trend=change_data_tools.changeAllDealTrends(res[0].data);
                    if (res[1].errCode=== 200)//客户转化率
                        data.percentage= change_data_tools.custStatisticInfo(res[1].data);
                    if (res[2].errCode=== 200)//户型销售比
                        data.layout= change_data_tools.changeSellProportionLayout(res[2].data);
                    if (buildId != undefined) {
                        data.type= 'build'
                        this.build_content= data;
                    } else {
                        data.type= 'personal'
                        this.personal_content= data;
                    }
                })
            }
        },
        mounted () {
            // 监听页面可见 刷新组件
            new Notification().addObserver(this, "StatisticsTimeChange", Notify.StatisticsTimeChange.Name);
            new Notification().addObserver(this, "PageShowChange", Notify.PageShowChange.Name);
            //动态设置标题
            uni.setNavigationBarTitle({
                title:'统计分析',
            });
            // 请求个人数据
            this.init ();
            new CustReportSmallTime().send()
            .then (res => {
              if (res.data.samllTime) {
                let samllTime= res.data.samllTime.split(' ')[0].replace(/-/g, "/")
                this.init_time= new Date(samllTime)
              } else {
                this.init_time= new Date().getTime()- new Date().getDate()*24*60*60*1000;
              }
              this.request();
              this.request(this.buildId);
            });
        }
    }
</script>

<style lang="less">
    .customs_analysis {
        overflow: hidden;
        .header {
            position: fixed; background-color:#fff; z-index: 100; width:100%; top: 0;
            .title_view{
                height: calc(var(--status-bar-height) + 60upx);
                width: 100%;
                background-color:#fff;
            }
            .tabs {
                width: 236upx; margin: 115upx auto 31upx;
                .tabs_title {
                    font-family: PingFang-SC-Medium; font-size: 36upx; color: #7d8184; vertical-align: center;
                    margin-bottom: 19upx;height: 54upx; line-height: 54upx;
                    .tabs_title_active {
                        font-family: PingFang-SC-Bold; color: #191f25;font-size: 48upx; font-weight:bold;
                    }
                }
                .mr {
                    margin-right: 67upx;
                }
                .d_inline {
                    display: inline-block; height: 60upx;line-height: 60upx;width: 118upx; text-align: center;
                }
                .dots_list {
                    width: 69%; margin:0 auto; height: 5upx;
                    .tabs_dots_left {
                        width: 43upx; height: 5upx; border-radius: 3upx; float:left;
                    }
                    .tabs_dots_right {
                        width: 43upx; height: 5upx; border-radius: 3upx; float: right;
                    }
                    .dot_active {
                        background-color: #0084ff;
                    }
                }
            }
            .border_borttom {
                height: 1upx; width: 100%; position: absolute; bottom: 0;background-color: #ebebeb;
            }
        }
        .main {
            margin-top:210upx;
        }
    }
    .clearfix::after {
        display: block ;content:""; clear: both;
    }

</style>
