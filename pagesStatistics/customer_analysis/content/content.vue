<template>
  <view class="content">
    <view class="calender f_r_b">
      <view class="calender_detail f_c_c" @click="chooseDate()">
        <view class="year_month">{{moment(time_end).format('YYYY')}}</view>
        <view class="weeks">{{moment(time_start).format('M-D')}} - {{moment(time_end).format('M-D')}}</view>
      </view>
      <view class="calender_icon f_c_c">
        <view class="icon_image"></view>
      </view>
    </view>
    <!-- 交易走势 -->
    <view class="trend chart_box">
      <view class="chart_title">交易走势</view>
      <view class="chart_amount f_r_b">
        <view class="see"> 
          <view class="amount_title">带看组数(组)</view>
          <view class="amount_num">{{ allDealTrends.allBandNum || 0}}</view>
        </view>
        <view class="deal"> 
          <view class="amount_title">成交数(组)</view>
          <view class="amount_num">{{ allDealTrends.allDealNum||0}}</view>
        </view>
        <view class="pay"> 
          <view class="amount_title">结佣数(组)</view>
          <view class="amount_num">{{ allDealTrends.allCommissionNum||0}}</view>
        </view>
      </view>
      <view class="chart_content">
        <trend_line :chart="trend" />
      </view>
      <view class="legend f_r_b">
        <view class="legend_box">
          <view class="legend_icon blue"></view>
          <view class="legend_name">带看</view>
        </view>
        <view class="legend_box">
          <view class="legend_icon oriange"></view>
          <view class="legend_name">成交</view>
        </view>
      </view>
      <view class="separator"></view>
    </view>
    <!-- 客户转化率 -->
    <view class="cust_statistic_info chart_box">
      <view class="chart_title">客户转化率</view>
      <view class="chart_content f_r_b">
        <cust_statistic_info_arcbar :chart="percentage.bandRate" />
        <cust_statistic_info_arcbar :chart="percentage.signRate" />
      </view>
      <view class="chart_name_box f_r_b">
        <view class="chart_name">带看率</view>
        <view class="chart_name">成交率</view>
      </view>
      <view class="separator"></view>
    </view>
    <!-- 户型销售占比 -->
    <view class="sell_proportion chart_box">
      <view class="chart_title">户型销售占比</view>
      <view class="chart_content">
        <sell_proportion_pie  :chart="layout" />
      </view>
      <view class="legend">
        <view class="legend_box">
          <view class="legend_icon blue"></view>
          <view class="legend_name">{{ layout.legend[0].name||'暂无数据' }}</view>
          <view class="legend_num">
            <text class="allNum">{{ layout.legend[0].sellNum||'0' }}</text>
            <text class="allNum">{{ layout.legend[0].percent || '0' + '%' }}</text>
          </view>
        </view>
        <view class="legend_box">
          <view class="legend_icon green"></view>
          <view class="legend_name">{{ layout.legend[1].name||'暂无数据' }}</view>
          <view class="legend_num">
            <text class="allNum">{{ layout.legend[1].sellNum||'0' }}</text>
            <text class="allNum">{{ layout.legend[1].percent || '0' + '%' }}</text>
          </view>
        </view>
        <view class="legend_box">
          <view class="legend_icon oriange"></view>
          <view class="legend_name">{{ layout.legend[2].name||'暂无数据' }}</view>
          <view class="legend_num">
            <text class="allNum">{{ layout.legend[2].sellNum||'0' }}</text>
            <text class="allNum">{{ layout.legend[2].percent || '0' + '%' }}</text>
          </view>
        </view>
        <view class="legend_box">
          <view class="legend_icon purple"></view>
          <view class="legend_name">{{ layout.legend[3].name||'暂无数据' }}</view>
          <view class="legend_num">
            <text class="allNum">{{ layout.legend[3].sellNum||'0' }}</text>
            <text class="allNum">{{ layout.legend[3].percent || '0' + '%' }}</text>
          </view>
        </view>
        <view class="legend_box">
          <view class="legend_icon o_oriange"></view>
          <view class="legend_name">{{ layout.legend[4].name||'暂无数据' }}</view>
          <view class="legend_num">
            <text class="allNum">{{ layout.legend[4].sellNum||'0' }}</text>
            <text class="allNum">{{ layout.legend[4].percent || '0' + '%' }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
//引入图表
import trend_line from './charts/trend_line'
import cust_statistic_info_arcbar from './charts/cust_statistic_info_arcbar'
import sell_proportion_pie from './charts/sell_proportion_pie'
//引入时间处理工具
import moment from '@/utils/moment.js'
import {Notification} from '@/utils/Notification'
import {Notify} from '@/utils/Notify'
import {CustReportSmallTime} from "@/net/StatisticsNet.js"

export default {
  components: {
    trend_line,cust_statistic_info_arcbar, sell_proportion_pie
  } ,
  props: [
    'chart_data', 
  ], 
  data (){
    return {
      trend: null,  
      cust_statistic_info: null, 
      sell_proportion: null, 
      time_start:'', 
      time_end:'', 
      percentage: null, 
      layout: null, 
      init_time: ''
    }
  },  
  watch: {
    chart_data() {
      this.getData(); 
    }
  }, 
  methods: {
    StatisticsTimeChange(name, info) {
        this.time_start= info.dayStartTime; 
        this.time_end= info.dayEndTime; 
        
    }, 
    chooseDate () {
      let base_url= '/pagesTool/chooseDate/chooseDay'; 
      let choose_start_srt= `dayStartTime=${moment(this.time_start).format('YYYY-MM-DD')}`
      let choose_end_srt= `dayEndTime=${moment(this.time_end).format('YYYY-MM-DD')}`
      let init_time= `initTime=${new Date (this.init_time).getTime()}`
      let source= `source=${this.chart_data.type}`
      let url_str= `${base_url}?${choose_start_srt}&${choose_end_srt}&${init_time}&${source}`
      uni.navigateTo({
        url:url_str
      })
      console.log(url_str)
    }, 
    // 初始日历数据时间戳
    init_calendar () {
      this.time_end= new Date ().getTime(); 
      this.time_start= this.time_end -6*24*60*60*1000; 
    },
    moment (v) {
      return moment(v)
    }, 
    getData () {
      this.trend = null
      this.layout = null
      this.percentage = null
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
    console.log (this.chart_data)
    // 初始化日历
    this.init_calendar ()
    // 获取交易走势数据
    this.getData ()
    new CustReportSmallTime().send()
    .then (res => {
      this.init_time= res.data.samllTime; 
    })
  }

}
</script>

<style lang='less'>
  .content {
    padding-top: 79upx;
    .calender {
		  margin: 0 auto 75upx; width: 270upx; height: 94upx; background-color: #f7f7f7; border-radius: 10upx; padding:20upx 0; 
      .calender_detail {
        width: 70%; border-right:2upx solid #c9c9c9;
        .year_month {
          font-family: PingFang-SC-Medium; font-size: 30upx; color: #191f25;text-align:center;
        }
        .weeks {
					font-family: PingFang-SC-Medium; font-size: 22upx; color: #7d8184; margin:0 auto; text-align:center;
        }
      }
      .calender_icon {
				height: 100%; width:30%;
        .icon_image {
          background-image: url(http://cdn.haofang.net/static/xfldDeveloper/statistics_img/calender.jpg);background-repeat: no-repeat;
          background-size: contain; height:60%; margin-left: 12upx;   
        }
      }
    }
    .trend {
      .chart_amount {
        width: 497upx; margin:0 auto 84upx; 
        .see {
          .amount_title {
            color: #a3a5a8;font-size: 26upx;font-family: PingFang-SC-Medium;
          }
          .amount_num {
            font-family: 1234567890-Regular; font-size: 50upx; color: #191f25;
          }
        }
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
          position: relative; font-family: PingFang-SC-Medium;font-size: 24upx; color: #191f25; padding-left: 26upx; 
          .legend_icon {
            position:absolute; left: 0; top: 25%; border-radius: 50%; width:13upx; height: 13upx;
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
        width: 424upx; margin:0 auto 68px; margin-bottom: 29upx; 
      }
      .chart_name_box {
        width:50%; margin: 0 auto 68upx;
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
      .legend {
        display: flex; flex-wrap: wrap; margin-bottom: 112upx;
        .legend_box {
          position: relative; font-family: PingFang-SC-Medium;font-size: 24upx; color: #191f25; padding-left: 26upx; width:29%;
          .legend_num {
            font-family: 1234567890-Regular;font-size: 38upx;color: #191f25;margin-bottom: 61upx;
            .allNum {
              display: inline-block;margin-right: 22upx; 
            }
          }
          .legend_name {
	          font-family: PingFang-SC-Medium; font-size: 24upx; color: #7d8184; margin-bottom: 24upx; 
          }
          .legend_icon {
            position:absolute; left: 0; top: 6%; border-radius: 50%; width:13upx; height: 13upx;
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
    	font-family: PingFang-SC-Bold; font-size: 42upx; color: #191f25;margin-bottom: 54upx; 
  } 
  .chart_content {
    width: 630upx; 
  }
  .separator {
    width: 150%; height: 1px; background-color :#ebebeb; 
  }
</style>