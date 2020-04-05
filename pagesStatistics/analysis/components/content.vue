<template>
  <view class="content">
    <view class="date_picker f_r_b" @click="chooseDate" v-if="timer_picker=='week'?true:false">
			<collectFormId />
			<view class="date_box f_c_c"  >
				<view class="date_year">{{ moment(calender.week.end).format ('YYYY') }}</view>
        <view class="date_week">
          {{ moment(calender.week.start).format('M.DD') }}-{{ moment (calender.week.end).format('	M.DD') }}
      	</view>
			</view>
			<view class="icon_week_month">
				<view class="image"></view>
			</view>
    </view>
		<view class="date_picker f_r_b" @click="chooseDate" v-if="timer_picker=='month'?true:false">
			<collectFormId />
			<view class="date_box f_c_c" >
				<view class="date_month">{{ moment(calender.month).format ('YYYY') }}年{{ moment(calender.month).format('MM') }}月</view>
			</view>
			<view class="icon_week_month">
				<view class="image"></view>
			</view>
		</view>
		<view class="date_picker extended f_r_b" @click="chooseDate" v-if="timer_picker=='year'?true:false">
			<collectFormId />
			<view class="date_box f_c_c " >
				<view class="date_all">{{ moment(calender.all.start).format("YYYY年MM月")}}至{{ moment(calender.all.now).format("YYYY年MM月") }}</view>
			</view>
			<view class="icon_year">
				<view class="image"></view>
			</view>
		</view>
    <!-- 走势 -->
    <view class="trend detail">
      <view class="title">交易走势</view>
      <view class="data_list f_r_b">
				<view class="trend_box"><view class="data_name">签约套数(组)</view><view class="data_value">{{ allDealTrends.allDealNum }}</view></view>
				<view class="trend_box"><view class="data_name">签约金额<text>{{'('+allDealTrends.allDealAmount.unit+')'}}</text></view><view class="data_value">{{ allDealTrends.allDealAmount.num }}</view></view>
				<view class="trend_box"><view class="data_name">单套均价<text>{{'('+allDealTrends.allDealAvg.unit+')'}}</text></view><view class="data_value">{{ allDealTrends.allDealAvg.num }}</view></view>
      </view>
      <view class="chart">
        <chart_line :trend="trend"></chart_line>
      </view>
      <view class="separator"></view>
    </view>
    <!-- 对比 -->
    <view class="compare detail">
      <view class="title">客户转化对比</view>
      <view class="data_list f_r_b">
				<view><view class="data_name">报备数(组)</view><view class="data_value">{{ custCount.reportCount }}</view></view>
				<view><view class="data_name">带看数(组)</view><view class="data_value">{{ custCount.bandCount }}</view></view>
				<view><view class="data_name">签约数(组)</view><view class="data_value">{{ custCount.signCount }}</view></view>
      </view>
      <view class="chart">
        <chart_column :compare="compare" v-if="compare?true:false" />
      </view>
      <view class="separator"></view>
    </view>
    <!-- 转化率 -->
    <view class="percentage detail">
      <view class="title">客户转化率</view>
      <view class="data_list f_r_b">
					<view v-for="(item, index) in percentage.data_list" :key=index class="data_box">
						<view class="data_name">{{item.name}}</view>
						<view class="data_value">{{item.value}}</view>
					</view>
      </view>
      <view class="pies">
        <view class="top f_r_b">
          <view class="pie_chart">
						<view class="pie_box">
							<chart_percentage_report :rate="percentage.reportRate"></chart_percentage_report>
						</view>
            <view class="pie_title">有效报备率</view>
          </view>
          <view class="pie_chart">
						<view class="pie_box">
							<chart_percentage_bandRate :rate="percentage.bandRate"></chart_percentage_bandRate>
						</view>
            <view class="pie_title">带看率</view>
          </view>
        </view>
				<view class="bottom f_r_b">
          <view class="pie_chart">
						<view class="pie_box">
							<chart_percentage_sign :rate="percentage.signRate" v-if="percentage?true:false"></chart_percentage_sign>
						</view>
            <view class="pie_title">签约率</view>
          </view>
          <view class="pie_chart">
						<view class="pie_box">
							<chart_percentage_commission :rate="percentage.commissionRate" v-if="percentage?true:false"></chart_percentage_commission>
							</view>
            <view class="pie_title">结佣率</view>
          </view>
        </view>
      </view>
      <view class="separator"></view>
    </view>
    <!-- 户型销售占比 -->
		<view class="swiper_box detail">
			<view class="title">{{ compare_name }}销售占比</view>
			<!-- 面板指示点 -->
			<view class="swiper_button">
				<view class="switch_title f_r_b">
					<view :class="{title_active:swiper.currentIndex==0}" @click="swiperTo(0)">
						户型销售</view>
					<view :class="{title_active:swiper.currentIndex==1}" @click="swiperTo(1)">
						门店销售</view>
				</view>
				<view class="dots_list f_r_b">
					<view class="dot" :class="{dot_active:swiper.currentIndex==0}"></view>
					<view class="dot" :class="{dot_active:swiper.currentIndex==1}"></view>
				</view>
			</view>
			<!-- 滑动模块 -->
			<view class="chasr_box">
				<view class="layout">
					<view class="layout_ring" v-if="swiper.currentIndex===0?true:false">
						<chart_layout :layout="layout"></chart_layout>
					</view>
				</view>
				<view class="layout">
					<view class="layout_ring" v-if="swiper.currentIndex===1?true:false">
						<chart_shop :shop="shop"></chart_shop>
					</view>
				</view>
			</view>
		<view class="separator"></view>
		</view>
    <!-- 分销门店排行 -->
		<view class="rank">
			<view class="title">分销门店排行</view>
			<view class="choose_sort">
				<view class="sort_title f_r_b">
					<view :class="{'sort_active':sort_active==='validReport'}" @click="sort_by('validReport')">
						<collectFormId />
						报备数
					</view>
					<view :class="{'sort_active':sort_active==='band'}" @click="sort_by('band')">
						<collectFormId />
						带看数
					</view>
					<view :class="{'sort_active':sort_active==='subscription'}" @click="sort_by('subscription')">
						<collectFormId />
						认购数
					</view>
				</view>
				<view class="sort_dots_list f_r_b">
					<view class="sort_dot" :class="{'sort_dot_active':sort_active==='report'}"></view>
					<view class="sort_dot" :class="{'sort_dot_active':sort_active==='band'}"></view>
					<view class="sort_dot" :class="{'sort_dot_active':sort_active==='subscription'}"></view>
				</view>
			</view>
			<view>
				<view class="f_r_b border_bottom" v-if="dataList.length!== 0?true:false">
					<view class="right">
						<view class="t_header">
							<view class="t_title fix">排名</view>
						</view>
						<view class="t_body">
							<view class="rank_list" v-for="(v,i) in dataList" :key="i">
								{{i+1}}
							</view>
						</view>
					</view>
					<view class="left">
						<view class="scroll">
							<view class="t_header">
								<view class="t_title bgc_f8 deptName" v-if="dataList[0].deptName?true:false">门店名称</view>
								<view class="t_title bgc_f8 deptName" v-if="people_rank[0].userName?true:false">人员姓名</view>
								<view class="t_title bgc_f8 ">报备数</view>
								<view class="t_title bgc_f8 ">带看数</view>
								<view class="t_title bgc_f8 ">带看率</view>
								<view class="t_title bgc_f8 ">认购数</view>
								<view class="t_title bgc_f8 ">签约数</view>
								<view class="t_title bgc_f8 ">签约率</view>
								<view class="t_title bgc_f8 ">结佣数</view>
								<view class="t_title bgc_f8 ">已结佣金(万)</view>
							</view>
							<!-- 门店排行 -->
							<view class="t-body" v-if="dataList[0].deptName?true:false">
								<view class="row" v-for="(v,i) in dataList" :key="i" >
									<view class="store_data deptName">{{v.deptName}}</view>
									<view class="store_data">{{v.report.toFixed(0)||0}}</view>
									<view class="store_data">{{v.band.toFixed(0)||0}}</view>
									<view class="store_data">{{v.bandRate*100||0}}%</view>
									<view class="store_data">{{v.subscription.toFixed(0)||0}}</view>
									<view class="store_data">{{v.sign.toFixed(0)||0}}</view>
									<view class="store_data">{{v.signRate*100||0}}%</view>
									<view class="store_data">{{v.commission.toFixed(0)||0}}</view>
									<view class="store_data aa">{{v.commissionAmount|commissionAmount}}</view>
								</view>
							</view>
							<!-- 人员排行 -->
							<view class="t-body" v-if="people_rank[0].userName?true:false">
								<view class="row" v-for="(v,i) in dataList" :key="i" >
									<view class="store_data deptName">{{v.userName}}</view>
									<view class="store_data">{{v.report.toFixed(0)||0}}</view>
									<view class="store_data">{{v.band.toFixed(0)||0}}</view>
									<view class="store_data">{{v.bandRate*100||0}}%</view>
									<view class="store_data">{{v.subscription.toFixed(0)||0}}</view>
									<view class="store_data">{{v.sign.toFixed(0)||0}}</view>
									<view class="store_data">{{v.signRate*100||0}}%</view>
									<view class="store_data">{{v.commission.toFixed(0)||0}}</view>
									<view class="store_data aa">{{v.commissionAmount|commissionAmount}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="footer_block"></view>
			</view>
			<view class="icon" v-if="dataList.length === 0?true:false">
				<view class="img"></view>
				<view class="prompt">暂时没有数据</view>
			</view>

		</view>
  </view>
</template>

<script>
	import chart_line from './components/chart_line'
	import chart_column from './components/chart_column.vue'
	import chart_percentage_bandRate from './components/chart_percentage_bandRate'
	import chart_percentage_sign from './components/chart_percentage_sign'
	import chart_percentage_report from './components/chart_percentage_report'
	import chart_percentage_commission from './components/chart_percentage_commission'
	import chart_layout from './components/chart_layout.vue'
  import chart_shop from './components/chart_shop.vue'
  import moment from '@/utils/moment.js'

	import {Notification} from '@/utils/Notification'
	import {Notify} from '@/utils/Notify'
	import {CustReportSmallTime} from "@/net/StatisticsNet.js"
	import collectFormId from '@/components/collectFormId'

	export default {
		props:['content_data', 'calender_start', 'calender_end', 'calender_type', 'init_time'],
		components: {
			chart_line, chart_column, chart_layout, chart_shop, collectFormId, chart_percentage_bandRate, chart_percentage_sign, chart_percentage_report, chart_percentage_commission
		},
		data () {
			return {
				calender:{
					week:{
						start:'',
						end:'',
					},
					month:'',
					all: {
						start:'',
						end:''
					}
				},
				timer_picker:'',
				//销售占比滑块状态
				swiper:{
					currentIndex: 0,
				},
				// 排行顺序激活样式
				sort_active: 'validReport',
				//排行是否为人员
				isPeople: false,
				people_rank:[],
				//
				trend: null ,
				// 对比
				compare: null,
				// 转化率
				percentage: null,
				// 户型对比
				layout: null,
				shop: null,
				dataList:null, 
				//户型销售占比名字
				compare_name: '户型'
			}
		},
		watch: {
			content_data() {
				this.getData()
			},

		},
		methods: {
			StatisticsTimeChange(name, info) {
        if (this.content_data.timer_picker === 'week') {
          this.calender.week.start= info.weekStartTimeStr
					this.calender.week.end= info.weekEndTimeStr
        }
        else if (this.content_data.timer_picker === 'month') {
					this.calender.month= info.monthStart
        }else if (this.content_data.timer_picker === 'year') {
          this.calender.all.start= info.dayStartTime
					this.calender.all.end= info.dayEndTime
        }
      },

			//swiper滑动事件
			changeSwiper(e) {
				this.swiper.currentIndex = e.detail.current;
			},
			swiperTo (num) {
				this.swiper.currentIndex =num;
				if(num === 0) {
					this.compare_name= '户型'
				} else if (num === 1) {
					this.compare_name= '门店'
				}
			},
			sort_by (v) {
				this.sort_active= v ;
				Array.isArray(this.dataList)&&this.dataList.sort((a, b)=>b[v]- a[v]);
				if (this.isPeople) {
					this.people_rank= this.dataList.slice(0, 5);
				}

			},
			chooseDate () {
				let base_url= ''
				let params= ''
				let initTime= new Date(this.init_time).getTime();
				if (this.content_data.timer_picker ==='week'){
					base_url= '/pagesTool/chooseDate/chooseWeek'
					params= `?weekStartTime=${moment(this.calender.week.start).format('YYYY/MM/DD')}&initTime=${initTime}`
				}else if (this.content_data.timer_picker ==='month'){
					base_url= '/pagesTool/chooseDate/chooseYear'
					params= `?chooseMonthStart=${moment(this.calender.month).format('YYYY/MM')}/01&initTime=${initTime}`
				}else if (this.content_data.timer_picker ==='year'){
					base_url= '/pagesTool/chooseDate/chooseDay'
					let day_start=`${moment(this.calender.all.start).format('YYYY/MM/DD')}`
          let day_end= `${moment(this.calender.all.end).format('YYYY/MM/DD')}`
					params= `?dayStartTime=${day_start}&dayEndTime=${day_end}&initTime=${initTime}`
				}

				uni.navigateTo({
          url: `${base_url}${params}`
        })
      },
      moment (v) {
        return moment(v)
			},

			getData() {
				this.timer_picker= this.content_data.timer_picker
				this.trend = {series: this.content_data.trend.series ,max: this.content_data.trend.max, allDealTrends:this.content_data.trend.allDealTrends, categories:this.content_data.trend.categories };
				this.compare = {series: this.content_data.compare.series ,max: this.content_data.compare.max, custCount: this.content_data.compare.custCount, categories:this.content_data.compare.categories},
				this.layout = {series: this.content_data.layout.series, title:this.content_data.layout.title, legend: this.content_data.layout.legend };
				this.shop = {series: this.content_data.shop.series, title:this.content_data.shop.title, legend: this.content_data.shop.legend };
				this.percentage = {
					content_data_list: this.content_data.percentage.content_data_list,
					bandRate:  this.content_data.percentage.bandRate,
					commissionRate:  this.content_data.percentage.commissionRate,
					reportRate:  this.content_data.percentage.reportRate,
					signRate:  this.content_data.percentage.signRate,
				};
				this.dataList= this.content_data.dataList || [];
				for (let i= 0; i<this.dataList.length; i++) {
					if (this.dataList === 0) 
						break
					this.dataList[i].commissionAmount= this.dataList[i].commissionAmount||0; 
				}

				if (this.content_data.dataList && this.content_data.dataList.length > 0
						&& this.content_data.dataList[0].userName) {
					this.isPeople= true;
				}
				this.sort_by('validReport')
			}
		},
		computed:{
			allDealTrends () {
				return this.trend.allDealTrends || []
			},
			custCount () {
				return this.compare.custCount || {}
			},
		},

		filters: {
			commissionAmount(v) {
				let num= v/10000; 
				return Math.floor(num); 
			}
		}, 
		created () {
			// 监听
			this.getData()
			new Notification().addObserver(this, "StatisticsTimeChange", Notify.StatisticsTimeChange.Name);
			if (this.calender_type=== 'week') {
				this.calender.week.start= this.calender_start;
				this.calender.week.end= this.calender_end;
			} else if (this.calender_type=== 'month') {
				this.calender.month= this.calender_start
			} else if (this.calender_type=== 'all') {
				this.calender.all.start= this.calender_start;
				this.calender.all.end= this.calender_end;
			}
			setTimeout(() => {
				this.getData()
			})
		},

	}
</script>

<style lang="less" scoped>
  .content {
    padding-top: 165upx;
		.date_picker {
		  margin: 0 auto 75upx; width: 270upx; height: 94upx; background-color: #f7f7f7; border-radius: 10upx;
			.date_box {
				width: 70%; border-right:2upx;
				.date_year {
					font-family: PingFang-SC-Medium; font-size: 30upx; color: #191f25;margin: 0 auto;text-align:center;
        }
				.date_week {
					font-family: PingFang-SC-Medium; font-size: 22upx; color: #7d8184; margin:0 auto; text-align:center;
				}
				.date_month {
					font-family: PingFang-SC-Medium; font-size: 29upx; color: #191f25;margin: 0 auto;text-align:center;
				}
			}
			.icon_week_month {
				height: 66upx; width:77upx;position: relative; margin: 14upx 0; border-left: 2upx solid #c9c9c9;
				.image {
					position: absolute;
					background-image: url(http://cdn.haofang.net/static/xfldDeveloper/statistics_img/calender.jpg);
					background-size: contain;
					background-repeat: no-repeat;
					height: 30upx;
					width: 30upx;
					top: 16upx; left: 20upx;
				}
			}
		}
		.date_picker.extended {
				width: 451upx;
				.date_box {
					width: 374upx;
				}
				.date_all {
           font-family: PingFang-SC-Medium; font-size: 29upx; color: #191f25;text-align:center;
				}
				.icon_year {
					height: 66upx; width:77upx;position: relative; margin: 14upx 0; border-left: 2upx solid #c9c9c9;
					.image {
						position: absolute;
						background-image: url(http://cdn.haofang.net/static/xfldDeveloper/statistics_img/calender.jpg);
						background-size: contain;
						background-repeat: no-repeat;
						height: 30upx;
						width: 30upx;
						top: 16upx; left: 20upx;
					}
				}
			}
		.trend {
			.data_list {
				.trend_box {
					width: 181upx;
				}
				.data_name {
						font-family: PingFang-SC-Medium; font-size: 26upx; color: #a3a5a8; margin-bottom: 31upx;
				}
				.data_value {
						font-family: 1234567890-Regular;font-size: 50upx;color: #191f25;
				}
			}
		}
		.compare {
			.data_list {
				.data_name { font-family: PingFang-SC-Medium; font-size: 26upx; color: #a3a5a8; margin-bottom: 31upx;
				}
				.data_value {
						font-family: 1234567890-Regular;
						font-size: 50upx;
						color: #191f25;
				}
			}
		}
		.swiper_box {
			position:relative;
			.swiper_button {
				width:269upx; position:absolute;top:0; right: 39upx;  font-family: PingFang-SC-Medium; font-size: 26upx; color: #7d8184; background-color: #fff;
				z-index: 100;
				.switch_title{
					align-items: baseline;margin-bottom: 24upx;
					.title_active {
						font-weight: bold;
					}
				}
				.dots_list {
					width:200upx; margin:0 auto;
					.dot {
							width: 43upx;height: 6upx;border-radius: 2px;
					}
				}
			}
		}
    .rank {
			margin-top: 59upx; position: relative;
			.title {
				font-family: PingFang-SC-Bold; font-size: 42upx; color: #191f25; padding-left: 54upx;margin-bottom: 72upx; font-weight: bold;
			}
			.icon {
				height: 360upx;
				.img {
					width: 374upx; height: 150upx; margin: 0 auto 59upx;
					background-image: url(http://cdn.haofang.net/static/xfldDeveloper/statistics_img/no_data.png);
					background-repeat: no-repeat;
					background-size: contain;
				}
				.prompt {
						font-family: PingFang-SC-Medium;font-size: 30upx;color: #c0c1c3;text-align: center;
				}
			}
			.choose_sort {
				width: 324upx;  position: absolute; top: 10upx; right: 39upx;
				.sort_title {
						font-family: PingFang-SC-Medium; font-size: 26upx; color: #7d8184; margin-bottom: 24upx; align-items: baseline;
						.sort_active {
							font-weight: bold
						}
				}
				.sort_dots_list {
					width: 90%;  margin:0 auto;
					.sort_dot {
							width: 43upx; height: 5upx; border-radius: 3upx;
					}
				}
			}
			.border_bottom {
				border-bottom: 1px solid #ededed;
			}

			.t_header {
				 background-color: #f8f8f8; color: #c0c1c3;font-family: PingFang-SC-Medium;font-size: 26upx;
				 .t_title {
				 	text-align: center;  width: 129upx;  font-size: 26upx ; color: #c0c1c3;height: 65upx; line-height: 65upx;
				 }
				 .t_title.fix {
					 width:100upx;
				 }
				 .t_title.deptName {
					 text-align: left; text-indent: 39upx; width: 235upx!important;
				 }
			 }
			.right {
				width: 100upx; box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.05);
				.t_body {
					color: #7d8184;font-family: PingFang-SC-Bold;font-size: 28upx;
					.rank_list{
						height: 97upx; line-height: 97upx; text-align: center
					}
			}
			}
			.left {
				overflow-x: scroll; overflow-y: hidden; width: 650upx; white-space:nowrap;
				.scroll {
					.t_title {
						width: 154upx; display: inline-block;
					}
					.t-body {
						font-family: 1234567890-Regular;font-size: 36px;color: #191f25;
						.row {
							height: 97rpx; width: 1467upx;display: flex;
							.store_data {
								font-size: 36upx; text-align: center; width: 154rpx;
								border-bottom: 1px solid #ededed;height: 97upx; line-height: 97upx;
							}
							.store_data.deptName {
								text-align: left; font-size: 28upx; width: 235upx; text-indent: 39upx; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
							}
						}
					}
				}
			}
			.footer_block {
				height: 100upx; width: 100%;
			}
		}
		.detail {
      padding: 0 40upx 75upx;  margin: 0 anto 54upx;
      .title {
        font-family: PingFang-SC-Bold; font-size: 42upx; color: #191f25; margin-bottom: 54upx; font-weight: bold;
      }

      .data_list {
        width: 100%; flex-wrap: wrap; margin-bottom: 45upx; margin:0 auto 84upx;width: 544upx;
				.data_box {
					width: 33%;  margin-bottom: 39upx;text-indent: 32rpx;
					.data_name {
						font-family: PingFang-SC-Medium;
						font-size: 26upx;
						color: #a3a5a8;
						margin-bottom: 31upx;
					}
					.data_value {
						font-family: 1234567890-Regular;
						font-size: 50upx;
						color: #191f25;
					}
				}
      }
      .chart {
        width: 660upx;margin: 0 auto 58upx;
      }
      .pies {
        padding: 0 84upx; margin: 0 auto 58upx;
        .top {
					margin-bottom: 61upx;
          .pie_chart{
						.pie_box{
							width: 178upx; height: 178upx;
							background-color:#041C0C;
							overflow: hidden;
							chart_percentage{
								width: 178upx; height: 178upx;
							}
						}
            .pie_title {
              text-align: center; font-family: PingFang-SC-Medium; font-size: 28upx; color: #191f25;
            }

          }
        }
				.bottom {
          .pie_chart{
						.pie_box{
							width: 178upx; height: 178upx;
							background-color:#041C0C;
							overflow: hidden;
							margin-bottom: 29upx;
							chart_percentage{
								width: 178upx; height: 178upx;
							}
						}
            .pie_title {
              text-align: center; font-family: PingFang-SC-Medium; font-size: 28upx; color: #191f25;
            }

          }
        }
      }
      .layout_ring {
        width: 660upx;
      }
    }
  }
  .data_list.mb39.f_r_b {
    margin-bottom: 39upx;
  }
	.title_active{
			font-family: PingFang-SC-Bold;
			font-size: 30upx;
			color: #191f25;
	}
	.dot_active {
		background-color: #0084ff;;
	}
	.separator {
	  width: 706upx;
	  height: 3upx;
	  background-color: #ebebeb;
	}
	.sort_active {
			font-family: PingFang-SC-Bold; font-size: 30upx; color: #191f25;
	}
	.sort_dot_active {
		background-color: #0084ff
	}
	.bgc_f8 {
		background-color: #f8f8f8;
	}

</style>
