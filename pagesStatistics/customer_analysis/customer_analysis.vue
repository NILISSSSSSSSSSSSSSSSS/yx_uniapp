<template>
  <view class="customs_analysis">
    <view class="header">
      <view class="tabs">
        <view class="tabs_title f_r_b">
          <view :class="{'tabs_title_active':swiper.currentIndex==0 }" @click="swiperTo(0)">个人</view>
          <view :class="{'tabs_title_active':swiper.currentIndex==1 }" @click="swiperTo(1)">楼盘</view>
        </view>
        <view class="tabs_dots_list f_r_b">
          <view class="tabs_dots" :class="{dot_active:swiper.currentIndex==0}"></view>
          <view class="tabs_dots" :class="{dot_active:swiper.currentIndex==1}"></view>
        </view>
      </view>
    </view>
    <view class="main">
			<view v-if="swiper.currentIndex==0?true:false">
          <content :chart_data="personal_content" v-if="personal_content!=undefined?true:false"  />
			</view>
			<view v-if="swiper.currentIndex==1?true:false">
          <content :chart_data="build_content" v-if="build_content!=undefined?true:false" />
      </view>
    </view>
  </view>
</template>

<script>
import content from './content/content'
import {change_data_tools} from './content/change_data/change_data'
import {CommissionDealTrend, CustDataInfo, SellProportion} from '@/net/StatisticsNet.js'
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
      swiper: {
				currentIndex: 0,
      },
    }
  }, 
  methods: {
    StatisticsTimeChange(name, info) {
      this.request_time=`${moment(info.dayStartTime).format('YYYY-M-D')} - ${moment(info.dayEndTime).format('YYYY-M-D')}` 
      if (info.source === 'personal') {
        this.request()
      } else if (info.source === 'build') {
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
      this.request_time= `${moment(d-518400000).format('YYYY-M-D')} - ${moment(d).format('YYYY-M-D')}`
      this.buildId= GetLoginModel.getBuildId ()
      this.sellId= GetLoginModel.getUserId()
    }, 
    request (buildId) {
      let data= {
        trend: null ,
        percentage: null, 
        layout: null,
        type:'' 
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
        new CustDataInfo(params).send(), 
        new SellProportion(params).send()
      ]).then (res => {
        if (res[0].errCode === 200)// 交易走势
					data.trend=change_data_tools.changeAllDealTrends(res[0].data);
				if (res[1].errCode=== 200)//客户转化率
					data.percentage= change_data_tools.custStatisticInfo(res[1].data);
					//data.compare= changeCustDataInfo()
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
  onLoad () {
    new Notification().addObserver(this, "StatisticsTimeChange", Notify.StatisticsTimeChange.Name);
    //动态设置标题
		uni.setNavigationBarTitle({
				title:'统计分析', 
    });
    // 请求个人数据
    this.init ()
    this.request()
    this.request(this.buildId)
  }
}
</script>

<style lang="less">
  .customs_analysis {
    .header {
      border-bottom:solid 1upx #ebebeb; 
      .tabs {
        width: 316upx; margin: 0 auto 31upx; 
        .tabs_title {
          font-family: PingFang-SC-Medium; font-size: 32upx; color: #7d8184; vertical-align: center; 
          margin-bottom: 19upx;
          .tabs_title_active {
            font-family: PingFang-SC-Bold; font-size: 34upx; color: #191f25;
          }
        }
        .tabs_dots_list {
          width: 90%; margin:0 auto; 
          .tabs_dots {
            	width: 43upx; height: 5upx;border-radius: 3upx;
          }
          .dot_active {
            background-color: #0084ff; 
          }
        }
      }
    }
  }

</style>