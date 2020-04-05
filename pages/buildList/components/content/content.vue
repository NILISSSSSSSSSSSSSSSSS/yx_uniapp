<template>
  <view class="content">
    <view class="calender f_r_b" @click="chooseDate()">
      <collectFormId />
      <view class="calender_detail f_c_c">
        <view class="year_month">{{moment(time_end).format('YYYY')}}</view>
        <view class="weeks">{{moment(time_start).format('M.D')}} - {{moment(time_end).format('M.D')}}</view>
      </view>
      <view class="calender_icon f_c_c">
        <view class="icon_image"></view>
      </view>
    </view>
    <!-- 交易走势 -->
    <view class="trend chart_box">
      <view class="chart_title">交易走势</view>
      <view class="chart_amount f_r_b">
        <view class="trend_box see"> 
          <view class="amount_title">带看数(组)</view>
          <view class="amount_num">{{ allDealTrends.allBandNum || 0}}</view>
        </view>
        <view class="trend_box deal"> 
          <view class="amount_title">签约数(组)</view>
          <view class="amount_num">{{ allDealTrends.allDealNum||0}}</view>
        </view>
        <view class="trend_box pay"> 
          <view class="amount_title">结佣数(组)</view>
          <view class="amount_num">{{ allDealTrends.allCommissionNum||0}}</view>
        </view>
      </view>
      <view class="chart_content">
        <trend_line :chart="trend" />
      </view>
      <view class="legend f_r_b">
        <view class="legend_box f_r_b">
          <view class="legend_icon blue"></view>
          <view class="legend_name">带看</view>
        </view>
        <view class="legend_box f_r_b">
          <view class="legend_icon oriange"></view>
          <view class="legend_name">签约</view>
        </view>
      </view>
      <view class="separator"></view>
    </view>
    <!-- 客户转化率 -->
    <view class="cust_statistic_info chart_box">
      <view class="chart_title">客户转化率</view>
      <view class="chart_content f_r_b">
        <cust_statistic_info_arcbar_bandRate :chart="percentage.bandRate" />
        <cust_statistic_info_arcbar_signRate :chart="percentage.signRate" />
      </view>
      <view class="chart_name_box f_r_b">
        <view class="chart_name">带看率</view>
        <view class="chart_name">签约率</view>
      </view>
      <view class="separator"></view>
    </view>
    <!-- 户型销售占比 -->
    <view class="sell_proportion chart_box">
      <view class="chart_title">户型销售占比</view>
      <view class="chart_content">
        <sell_proportion_pie  :chart="layout" />
      </view>
      <!-- 当户型不满3个时 -->
      <view class="legend_left f_r_c" v-if="layout.legend.length<3">
        <view class="legend_box" v-for="(v,i) in layout.legend" :key="i">
          <view class="legend_top f_r_s">
            <view class="legend_icon" :style="{backgroundColor:layout.legend[i].color}"></view>
            <view class="legend_name">{{ layout.legend[i].name}}</view>
          </view>
          <view class="legend_bottom f_r_s">
            <view class="legend_icon"></view>
            <view class="legend_num">
              <text class="allNum">{{ layout.legend[i].sellNum}}</text>
              <text class="allNum">{{ layout.legend[i].percent}}</text>
            </view>
          </view>
        </view>
      </view>


      <!-- 当户型达到3个及3个以上 -->
      <view class="legend_center" v-if="layout.legend.length>2">
        <view class="legend_box" v-for="(v,i) in layout.legend" :key="i">
          <view class="legend_top f_r_s">
            <view class="legend_icon" :style="{backgroundColor:layout.legend[i].color}"></view>
            <view class="legend_name">{{ layout.legend[i].name}}</view>
          </view>
          <view class="legend_bottom f_r_s">
            <view class="legend_icon"></view>
            <view class="legend_num">
              <text class="allNum">{{ layout.legend[i].sellNum}}</text>
              <text class="allNum">{{ layout.legend[i].percent}}</text>
            </view>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
//引入图表
import trend_line from './charts/trend_line'
import cust_statistic_info_arcbar_bandRate from './charts/cust_statistic_info_arcbar_bandRate'
import cust_statistic_info_arcbar_signRate from './charts/cust_statistic_info_arcbar_signRate'
import sell_proportion_pie from './charts/sell_proportion_pie'
//引入时间处理工具
import moment from '@/utils/moment.js'
import {Notification} from '@/utils/Notification'
import {Notify} from '@/utils/Notify'
import {CustReportSmallTime} from "@/net/StatisticsNet.js"

import collectFormId from '@/components/collectFormId'

export default {
  components: {
    trend_line, sell_proportion_pie, cust_statistic_info_arcbar_bandRate, cust_statistic_info_arcbar_signRate
  } ,
  props: [
    'chart_data', 'request_end_time', 'request_start_time', 'init_time'
  ], 
  data (){
    return {
      trend: null,  
      cust_statistic_info: null, 
      sell_proportion: null, 
      percentage: null, 
      layout: null,  
      time_start:'', 
      time_end:'' ,
      
    }
  },  
  watch: {
    chart_data() {
      this.getData(); 
    }, 
    request_end_time() {
      this.time_start= this.request_start_time
    }, 
    request_end_time() {
      this.time_end= this.request_end_time
    }, 
  }, 
  methods: {
    StatisticsTimeChange(name, info) {
        this.time_start= info.dayStartTime.replace(/-/g, "/") ; 
        this.time_end= info.dayEndTime.replace(/-/g, "/") ;    
    }, 
    chooseDate () {
      let base_url= '/pagesTool/chooseDate/chooseDay'; 
      let choose_start_srt= `dayStartTime=${moment(this.time_start).format('YYYY/MM/DD')}`
      let choose_end_srt= `dayEndTime=${moment(this.time_end).format('YYYY/MM/DD')}`
      let init_time= `initTime=${new Date (this.init_time).getTime()}`
      let source= `source=${this.chart_data.type}`
      let url_str= `${base_url}?${choose_start_srt}&${choose_end_srt}&${init_time}&${source}`
      uni.navigateTo({
        url:url_str
      })
    }, 
    moment (v) {
      return moment(v)
    }, 
    getData () {
      this.trend = {series: this.chart_data.trend.series ,max: this.chart_data.trend.max, allDealTrends:this.chart_data.trend.allDealTrends, categories:this.chart_data.trend.categories };
      this.layout = {series: this.chart_data.layout.series, title:this.chart_data.layout.title, legend: this.chart_data.layout.legend };
      this.percentage = {
        bandRate:  this.chart_data.percentage.bandRate, 
        signRate:  this.chart_data.percentage.signRate,
      };
    }


  }, 
  computed: {
    allDealTrends () {
      return this.trend.allDealTrends
    },
  }, 
  created () {
    new Notification().addObserver(this, "StatisticsTimeChange", Notify.StatisticsTimeChange.Name);
    // 获取交易走势数据
    this.time_start= this.request_start_time
    this.time_end= this.request_end_time
    this.getData ()
  }

}
</script>

<style lang='less'>
  .content {
    padding-top: 79upx;
    .calender {
		  margin: 0 auto 58upx; width: 272upx; height: 94upx; background-color: #f7f7f7; border-radius: 10upx;
      .calender_detail {
        width: 193upx;
        .year_month {
          font-family: PingFang-SC-Medium; font-size: 30upx; color: #191f25;text-align:center;
        }
        .weeks {
					font-family: PingFang-SC-Medium; font-size: 22upx; color: #7d8184; margin:0 auto; text-align:center;
        }
      }
      .calender_icon {
				height: 66upx; width:79upx;border-left: 1px solid #e9e9e9;margin-top: 14upx ;
        .icon_image {
          background-image: url(http://cdn.haofang.net/static/xfldDeveloper/statistics_img/calender.jpg);background-repeat: no-repeat;
          background-size: contain; height: 28upx; width: 30upx;  margin-left:auto; margin-right: auto ;  
        }
      }
    }
    .trend {
      .chart_amount {
        width: 497upx; margin:0 auto 84upx; 
          .amount_title {
            color: #a3a5a8;font-size: 26upx;font-family: PingFang-SC-Medium;margin-bottom: 31upx;
          }
          .amount_num {
            font-family: 1234567890-Regular; font-size: 50upx; color: #191f25; font-size: bold;
          }
      }
      .trend_box {
        width: 181upx;
      }
      .deal {
        .amount_title {
          color: #a3a5a8;font-size: 26upx;font-family: PingFang-SC-Medium;
        }
        .amount_num {
          font-family: 1234567890-Regular; font-size: 50upx; color: #191f25;
        }
      }
      .pay {
        .amount_title {
          color: #a3a5a8;font-size: 26upx;font-family: PingFang-SC-Medium;
        }
        .amount_num {
          font-family: 1234567890-Regular; font-size: 50upx; color: #191f25;
        }
      }
      .legend {
        margin: 49upx 0 68upx 83upx; width: 174upx;
        .legend_box {
          font-family: PingFang-SC-Medium;font-size: 24upx; color: #191f25; width: 74upx;  
          .legend_icon {
            margin:auto 0; border-radius: 50%; width:13upx; height: 13upx;
          }
          .legend_icon.blue {
            background-color: #0586ff; 
          }
          .legend_icon.oriange {
            background-color: #f95742; 
          }
            }
          }

    }
    .cust_statistic_info {
      .chart_title {
        margin-bottom: 70upx; 
      }
      .chart_content {
        width: 490upx; margin:0 auto 68px; margin-bottom: 29upx; 
      }
      .chart_name_box {
        width:61%; margin: 0 auto 68upx;
        .chart_name { 
          font-family: PingFang-SC-Medium; font-size: 28upx; color: #191f25;
        }
      }
    }
    .sell_proportion {
      .chart_title {
        margin-bottom: 82upx; 
      }
      .chart_content {
        height:360upx; width: 400upx; margin:0 auto 91upx;
      }
      .legend_left {
        margin-bottom: 112upx;
        .legend_box {
          position: relative; font-family: PingFang-SC-Medium;font-size: 24upx; color: #191f25; padding-left: 26upx; width:29%;
          .legend_top {
            margin-bottom: 20upx;
            .legend_name {
              font-family: PingFang-SC-Medium; font-size: 24upx; color: #7d8184;
            }
            .legend_icon {
              margin: auto 0; border-radius: 50%; width:13upx; height: 13upx; margin-right: 20upx
            }
          }
          .legend_bottom {
            margin-bottom: 61upx;
            .legend_icon {
              margin: auto 0; border-radius: 50%; width:13upx; height: 13upx; margin-right: 20upx
            }
            .legend_num {
              font-family: 1234567890-Regular;font-size: 38upx;color: #191f25;
              .allNum {
                display: inline-block;margin-right: 22upx; 
              }
            }
          }
        }
      }
      .legend_center {
        display: flex; flex-wrap: wrap; margin-bottom: 112upx;
        .legend_box {
          font-family: PingFang-SC-Medium;font-size: 24upx; color: #191f25; padding-left: 26upx; width:29%;
          .legend_top {
             margin-bottom: 20upx;
            .legend_name {
              font-family: PingFang-SC-Medium; font-size: 24upx; color: #7d8184; 
            }
            .legend_icon {
              margin: auto 0; border-radius: 50%; width:13upx; height: 13upx; margin-right: 20upx
            }
          }
          .legend_bottom {
            margin-bottom: 61upx;
            .legend_num {
              font-family: 1234567890-Regular;font-size: 38upx;color: #191f25;
              .allNum {
                display: inline-block;margin-right: 22upx; 
              }
            }
            .legend_icon {
              margin: auto 0; border-radius: 50%; width:13upx; height: 13upx; margin-right: 20upx
            }
          }
          .legend_icon.blue {
            background-color: #0084ff; 
          }
          .legend_icon.green {
            background-color: #13c2c2; 
          }
          .legend_icon.oriange {
            background-color: #ffb109; 
          }
          .legend_icon.purple {
            background-color: #9083f8; 
          }
          .legend_icon.o_oriange {
            background-color: #ff625b; 
          }
        }
      }
    }
  }
  // 图表公共样式
  .chart_box {
    width: 660upx; margin: 0 auto 60upx;  
  }
  .chart_title {
    	font-family: PingFang-SC-Bold; font-size: 42upx; color: #191f25;margin-bottom: 54upx; font-weight: bold; 
  } 
  .chart_content {
    width: 630upx; 
  }
  .separator {
    width: 106%; height: 3upx; background-color :#ebebeb; 
  }
</style>