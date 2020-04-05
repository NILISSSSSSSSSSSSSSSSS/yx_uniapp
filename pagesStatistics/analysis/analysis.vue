<template>
	<view class="tabs">
		<!-- 时间 -->
		<!-- #ifdef MP-WEIXIN -->
		<cover-view class="empty_box"></cover-view>
		<cover-view class="header margin-c">
			<cover-view class="title">
				<cover-view class='d_inline' :class="{title_active:swiper.currentIndex==0}" @click="swiperTo(0)">周数据</cover-view>
				<cover-view class='d_inline' :class="{title_active:swiper.currentIndex==1}" @click="swiperTo(1)">月数据</cover-view>
				<cover-view class='d_inline' :class="{title_active:swiper.currentIndex==2}" @click="swiperTo(2)">总数据</cover-view>
			</cover-view>
			<!-- 指示点 -->
			<cover-view class="dots-list">
				<cover-view class="dot" :class="{dot_active:swiper.currentIndex==0}"></cover-view>
				<cover-view class="dot mr" :class="{dot_active:swiper.currentIndex==1}"></cover-view>
				<cover-view class="dot" :class="{dot_active:swiper.currentIndex==2}"></cover-view>
			</cover-view>
			<cover-view class="border_bottom"></cover-view>
		</cover-view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS||APP-PLUS-NVUE -->
		<view class="header">
			<view class="title">
				<view class='d_inline' :class="{title_active:swiper.currentIndex==0}" @click="swiperTo(0)">周数据</view>
				<view class='d_inline' :class="{title_active:swiper.currentIndex==1}" @click="swiperTo(1)">月数据</view>
				<view class='d_inline' :class="{title_active:swiper.currentIndex==2}" @click="swiperTo(2)">总数据</view>
			</view>
			<view class="dots-list">
				<view class="dot" :class="{dot_active:swiper.currentIndex==0}"></view>
				<view class="dot mr" :class="{dot_active:swiper.currentIndex==1}"></view>
				<view class="dot" :class="{dot_active:swiper.currentIndex==2}"></view>
			</view>
			<view class="border_bottom"></view>
		</view>	
		<!-- #endif -->
		<!-- 滑动 -->
		<view class="main">
			<view v-if="swiper.currentIndex==0?true:false">
					<content 
					:content_data="weekData" 
					calender_type="week" 
					:calender_start="calender.week_calender_start" 
					:calender_end="calender.week_calender_end"  
					:init_time='init_time'
					v-if="weekData?true:false"></content>
			</view>
			<view v-if="swiper.currentIndex==1?true:false">
					<content 
					:content_data="monthData" 
					calender_type="month" 
					:calender_start="calender.month_calender_start" 
					:calender_end="calender.month_calender_end"  
					:init_time='init_time'
					v-if="monthData?true:false"></content>
			</view>
			<view v-if="swiper.currentIndex==2?true:false">
					<content 
					:content_data="allData"
					calender_type="all" 
					:calender_start="calender.all_calender_start" 
					:calender_end="calender.all_calender_end"  
					:init_time='init_time'
					v-if="allData?true:false"></content>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入内容组件
	import content from "./components/content"; 
	// 引入请求组件
	import {CommissionDealTrend ,CustStatisticInfo, GetDptsCustRanking, SellProportion, CustDataInfo, CustReportSmallTime} from "@/net/StatisticsNet.js"
	// 引入数据处理组件
	import { week_month_data_change} from "./components/changeData.js"
	// 引入页面title
  import {GetLoginModel} from "../../model/LoginSuccessModel.js"
	import moment from '@/utils/moment.js'
	
	import {Notification} from '@/utils/Notification'
	import {Notify} from '@/utils/Notify'
	export default {
	components: {
		content, 
	}, 
	data() {
		return {   
			title: GetLoginModel.getBuildName(),
			swiper: {
				currentIndex: 0,
			},
			weekData: null, // 周数据
			monthData: null, // 月数据
      allData: null, // 总数据
			init_time:'', 
			time_str: '', 
			calender: {
				week_calender_start: '', 
				week_calender_end: '', 
				month_calender_start: '', 
				month_calender_end: '', 
				all_calender_start: '', 
				all_calender_end: '', 
			}, 
		}
	},
	methods: {
    StatisticsTimeChange(name, info) {
			if (info.type === 'chooseWeek') {
				//获取更新时间
				this.calender.week_calender_start= `${moment(info.weekStartTimeStr).format('YYYY/MM/DD')}`
				this.calender.week_calender_end= `${moment(info.weekEndTimeStr).format('YYYY/MM/DD')}`
				this.time_str= `${moment(info.weekStartTimeStr).format('YYYY-MM-DD')} - ${moment(info.weekEndTimeStr).format('YYYY-MM-DD')}`
				this.requestWeekData (this.time_str); 
				
			}
			else if (info.type === 'chooseYear') {
				//获取更新时间
				this.calender.month_calender_start= `${moment(info.monthStart).format('YYYY/MM/DD')}`
				this.calender.month_calender_end= `${moment(info.monthEnd).format('YYYY/MM/DD')}`
				this.time_str= `${moment(info.monthStart).format('YYYY-MM-DD')} - ${moment(info.monthEnd).format('YYYY-MM-DD')}`
				this.requestMonthData(this.time_str);
			}else if (info.type === 'chooseDay') {
				this.calender.all_calender_start= `${moment(info.dayStartTime).format('YYYY/MM/DD')}`
				this.calender.all_calender_end= `${moment(info.dayEndTime).format('YYYY/MM/DD')}`
				this.time_str= `${moment(info.dayStartTime).format('YYYY-MM-DD')} - ${moment(info.dayEndTime).format('YYYY-MM-DD')}`
				this.requestAllData (this.time_str, this.time_str, 1)
			}
		},

		changeSwiper(e) {
			this.swiper.currentIndex = e.detail.current;
		}, 
		swiperTo (num) {
			this.swiper.currentIndex =num;
		}, 
		
		//首次进页面获取时间段
		getTime(param, isFirst= true) {
      if (param === 'week') {
				this.calender.week_calender_start=  `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate() - new Date().getDay() - 6}`
				this.calender.week_calender_end= `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()-new Date().getDay()}`
				return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - new Date().getDay() - 6} - ${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()-new Date().getDay()}`
			}
      if (param === 'month') {
				let d = new Date(); 
				let now_d = `${d.getFullYear()}-${d.getMonth()+1}-1`
				let now_d_str= d.getTime(); 
				let last_month_last_date_str= now_d_str - d.getDate()*24*60*60*1000
				let next_month_first_str= ''
				if (d.getMonth()<11){
					next_month_first_str= `${d.getFullYear()}/${d.getMonth()+2}/1`
				}else if(d.getMonth()==11) {
					next_month_first_str= `${d.getFullYear()+1}/1/1`
				}
				let now_month_last_date_str= new Date(next_month_first_str).getTime() - 24*60*60*1000
				if (isFirst) {
					this.calender.month_calender_start=last_month_last_date_str
					this.calender.month_calender_end=last_month_last_date_str
					return `${d.getFullYear()}-${d.getMonth()}-1 - ${d.getFullYear()}-${d.getMonth()}-${new Date(last_month_last_date_str).getDate()}` 
				} else {
					this.calender.month_calender_start=now_d_str
					this.calender.month_calender_end=now_d_str
					return `${d.getFullYear()}-${d.getMonth()+1}-1 - ${d.getFullYear()}-${d.getMonth()+1}-${new Date(now_month_last_date_str).getDate()}` 
				}
			}
    }, 
		
		// 发送周请求
		requestWeekData (chooseWeek) {
			let data_str= chooseWeek||this.getTime('week')
			let params= {
				date:data_str || "2019-11-01 - 2019-11-05", 
			}
			let layoutDate= {
				type: 1, 
				date: data_str || "2019-11-01 - 2019-11-05", 
			}
			let storeDate= {
				type: 2, 
				date: data_str || "2019-11-01 - 2019-11-05", 
			}
			Promise.all([
				new CommissionDealTrend(params).send(), // 交易走势
				new CustDataInfo(params).send(), //客户转化对比
				new CustStatisticInfo(params).send(), // 客户转化率
				new SellProportion(layoutDate).send(), //户型销售占比
				new SellProportion(storeDate).send(), //门店销售占比
				new GetDptsCustRanking(params).send(), // 分销门店排行
			])
			.then(res => {
				let data = {
					trend: null, compare: null, layout: null, shop:null, percentage: null, timer_picker:'week', dataList:null
				}
				if (res[0].errCode === 200)// 交易走势
					data.trend=week_month_data_change.changeAllDealTrends(res[0].data);
				if (res[1].errCode=== 200)//客户转化对比
					data.compare= week_month_data_change.changeCustDataInfo(res[1].data);
					//data.compare= changeCustDataInfo()
				if (res[2].errCode=== 200)//客户转化率
					data.percentage= week_month_data_change.custStatisticInfo(res[2].data);
				if (res[3].errCode === 200)//户型销售对比
					data.layout=week_month_data_change.changeSellProportionLayout(res[3].data);
				if (res[4].errCode === 200)//门店销售对比
					data.shop=week_month_data_change.changeSellProportionLayout(res[4].data);
				if (res[5].errCode === 200)//门店销售对比
					data.dataList=res[5].data.dataList;
				this.weekData = data
			})
		}, 	
		
		// 发送月请求
		requestMonthData (chooseMonth, isFirst) {
			let data_str= chooseMonth||this.getTime('month', isFirst)			; 
			let params= {
				date:data_str || "2019-11-01 - 2019-11-05", 
			}
			let layoutDate= {
				type: 1, 
				date: data_str || "2019-11-01 - 2019-11-05", 
			}
			let storeDate= {
				type: 2, 
				date: data_str || "2019-11-01 - 2019-11-05", 
			}
			Promise.all([
				new CommissionDealTrend(params).send(), // 交易走势
				new CustDataInfo(params).send(), //客户转化对比
				new CustStatisticInfo(params).send(), // 客户转化率
				new SellProportion(layoutDate).send(), //户型销售占比
				new SellProportion(storeDate).send(), //门店销售占比
				new GetDptsCustRanking(params).send(), // 分销门店排行
			])
			.then(res => {
				let data = {
					trend: null, compare: null, layout: null, shop:null, percentage: null, timer_picker:'month', dataList:null
				}
				if (res[0].errCode === 200)// 交易走势
					data.trend=week_month_data_change.changeAllDealTrends(res[0].data);
				if (res[1].errCode=== 200)//客户转化对比
					data.compare= week_month_data_change.changeCustDataInfo(res[1].data);
				if (res[2].errCode=== 200)//客户转化率
					data.percentage= week_month_data_change.custStatisticInfo(res[2].data);
				if (res[3].errCode === 200)//户型销售对比
					data.layout=week_month_data_change.changeSellProportionLayout(res[3].data);
				if (res[4].errCode === 200)//门店销售对比
					data.shop=week_month_data_change.changeSellProportionLayout(res[4].data);
				if (res[5].errCode === 200)//门店销售对比
					data.dataList=res[5].data.dataList;
				this.monthData = data
			})
		}, 	
		

		//总数据请求
		requestAllData (initDays, chooseDays, compare_type) {
			let trend= {}
			let compare= {}
			if (chooseDays) {
				trend ={date:chooseDays}
				compare= {
					date: chooseDays, 
					type: 1
				}
			}else if (!chooseDays) {
				trend ={source:0}
				compare= {
					type: 0
				}
			}
			let params= {
				date:chooseDays||initDays
			}; 
			let layoutDate= {
				type: 1, 
				date: chooseDays||initDays
			}; 
			let storeDate= {
				type: 2, 
				date: chooseDays||initDays
			}; 
			Promise.all([
				new CommissionDealTrend(trend).send(), //首次请求
				new CustDataInfo(compare).send(), //客户转化对比
				new CustStatisticInfo(params).send(), // 客户转化率
				new SellProportion(layoutDate).send(), //户型销售占比
				new SellProportion(storeDate).send(), //门店销售占比
				new GetDptsCustRanking(params).send(), // 分销门店排行
			])
			.then(res => {
				let data = {
          trend: null, compare: null, layout: null, shop:null, percentage: null, timer_picker:'year', dataList:null
				}

				if (res[0].errCode=== 200)//交易走势
					data.trend= week_month_data_change.changeAllDealTrends(res[0].data);
				if (res[1].errCode=== 200)//客户转化对比
					data.compare= week_month_data_change.changeCustDataInfo(res[1].data);
				if (res[2].errCode=== 200)//客户转化率
					data.percentage= week_month_data_change.custStatisticInfo(res[2].data);
				if (res[3].errCode === 200)//户型销售对比
					data.layout=week_month_data_change.changeSellProportionLayout(res[3].data);
				if (res[4].errCode === 200)//门店销售对比
					data.shop=week_month_data_change.changeSellProportionLayout(res[4].data);
				if (res[5].errCode === 200)//门店销售排行
					data.dataList=res[5].data.dataList;
					this.allData= data; 
				})
		}, 
	
		// 初始化总请求
		initRequestAll () {
				new CustReportSmallTime().send()
				.then (res =>{
					this.requestWeekData (); 
					let d= new Date
					let start_time= ''; 
					if (res.data.samllTime != undefined) {
						let samllTime = res.data.samllTime.split(' ')[0].replace(/-/g, "/") 
						start_time= res.data.samllTime.split(' ')[0]
						this.init_time = new Date(samllTime).getTime()
						this.calender.all_calender_start= samllTime
						this.requestMonthData('', false);
					} else {
						this.init_time= new Date().getTime()- (new Date().getDate()-1)*24*60*60*1000; 
						start_time= `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
						this.calender.all_calender_start=  `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`
						this.requestMonthData();
					}
					this.calender.all_calender_end= `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
					let now_d= `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
					let choose= `${start_time} - ${now_d}`
					this.requestAllData (choose); 
				})
		}
	}, 
	onLoad() {
		//动态设置标题
		uni.setNavigationBarTitle({
				title:this.title
		});
		// 发送请求
		this.initRequestAll();

		// 监听
		new Notification().addObserver(this, "StatisticsTimeChange", Notify.StatisticsTimeChange.Name);
	}
}
</script>

<style lang="less">
	.empty_box{
		width: 100%;
		height: 20upx;
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500
	}
	.margin-c{
		margin-top: 10upx;
	}
	.tabs {
		.header {
			position:fixed; width: 100%;background-color: #fff; top:0; z-index:500;
			.title {
				width:512upx; margin:0 auto 19upx ;  height: 39upx; font-family: PingFang-SC-Bold; font-size: 34upx; color: #191f25;
				.mr{
					margin: 0 100upx; 
				}
				.d_inline {
					display: inline-block; width: 170upx; text-align: center;
				}
				.title_active {
					font-weight: bold;
				}
			}
			.dots-list {
				width: 386upx; margin: 0 auto; margin-bottom: 27upx; height: 6upx; 
				.dot {
          width: 43upx; height: 5upx; border-radius: 3upx;-display: inline-block; float:left;
				}
			}
			.border_bottom {
				height:1upx; width: 100%; background-color: #ebebeb; 
			}
			.mr{
					margin-left:129upx;  margin-right:130upx; 
				}
		}
		
	}
	.dot_active {
		background-color: #0084ff;
	}
</style>
