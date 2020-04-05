<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt"></view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix"
			 @touchend="touchEndMix"></canvas>
		</view>
		<view class="legend f_r_b">
			<view class="legend_box f_r_b"><view class="icon blue"></view><view>签约套数</view></view>
			<view class="legend_box f_r_b"><view class="icon oriange"></view><view>签约金额</view></view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/utils/u-charts.js';
	var _self;
	var canvaMix=null;
	export default {
		props:['trend'], 
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:''
			}
		},
		watch: {
			trend (n, o) {
				if(canvaMix && canvaMix.updateData) {
					canvaMix.updateData({
						series: this.trend.series,
						categories: this.trend.categories,
						yAxis: {
						data:[{
							axisLine: false, 
							min:0 ,
							max:this.trend.max[0] ,
						  calibration:false,
							position:'left',
							fontSize: uni.upx2px(24),
						  format:(val)=>{return val.toFixed(0)}
						},
						{
							axisLine: false, 
						  min:0 ,
						  max:this.trend.max[1] ,
						  calibration:false,
						  position:'right',
							fontSize: uni.upx2px(24),
						  format:(val)=>{return val.toFixed(0)}
						}],
						gridType:'dash',
						dashLength:4,
						splitNumber:5
					},
					});
					return;
				}
				this.showMix("canvasMix",this.trend);
			}
		}, 
		created() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(660);
			this.cHeight=uni.upx2px(428);
			this.showMix("canvasMix",this.trend)
		},
		methods: {
			showMix(canvasId,chartData){
				canvaMix=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'mix',
					fontSize:11,
					padding:[5,5,0,5],
					dataPointShape: true, 
					enableScroll: true, 
					animation: false, 
					legend:{
						show:false,
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					dataLabel: false,
					xAxis: {
						fontColor:'#a3a5a8', 
						disableGrid:true,
						fontSize: uni.upx2px(24),
						type:'grid',
						gridType:'dash',
						axisLine: false,
						scrollShow: false, 
						itemCount:5,//x轴单屏显示数据的数量，默认为5个
						scrollBackgroundColor:'#F7F7FF',//默认为 #EFEBEF
						scrollColor:'#DEE7F7',//默认为 #A6A6A6
						scrollAlign:'left', 
					},
					yAxis: {
						data:[{
							axisLine: false, 
							min:0 ,
							max:chartData.max[0] ,
						  calibration:false,
							position:'left',
							fontSize: uni.upx2px(24),
							fontColor:'#a3a5a8',
						  format:(val)=>{return val.toFixed(0)}
						},
						{
							axisLine: false, 
						  min:0 ,
						  max:chartData.max[1] ,
						  calibration:false,
						  position:'right',
							fontSize: uni.upx2px(24),
							fontColor:'#a3a5a8',
						  format:(val)=>{return val.toFixed(0)}
						}], 
						gridType:'dash',
						dashLength:4,
						splitNumber:5
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,

					extra: {
						tooltip:{
							showBox:true,//是否显示半透明黑色的提示区域
							bgColor:'#000000',
							bgOpacity:1,
							gridType:'solid',
							gridColor:'#0586ff',
							fontColor:'#FFFFFF',
							horizentalLine:false,
							xAxisLabel:false,
							yAxisLabel:false,
							labelBgColor:'#DFE8FF',
							labelBgOpacity:0.95,
							labelAlign:'left',
							labelFontColor:'#666666'
						}
					},
				});
			},
			touchMix(e){
				canvaMix.scrollStart(e);
			},
			moveMix(e) {
        canvaMix.scroll(e);
			},
			touchEndMix(e) {
				canvaMix.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaMix.touchLegend(e);
				canvaMix.showToolTip(e, {
					format: function (item, category) {
						if (item.name=== '交易套数') {
							return category + ' ' + item.name + ':' +  item.data
						} else if (item.name=== '交易金额') {
							return category + ' ' + item.name + ':' +  item.data + 'w'
						}
					}
				});
			},
		}
	}
</script>

<style lang="less">
	.legend {
		width: 300upx; margin-left: 60upx; 
		.legend_box {
			width: 123upx;  font-family: PingFang-SC-Medium;font-size: 24upx; color: #191f25; 
			.icon {
				margin: auto 0; border-radius: 50%; width:13upx; height: 13upx;
			}
			.icon.blue {
				background-color: #0586ff; 
			}
			.icon.oriange {
				background-color: #f95742; 
			}
		}
	}
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 660upx;
		height: 428upx;
		background-color: #FFFFFF;
		margin-bottom: 50upx;
	}
	
	.charts {
		width: 660upx;
		height: 428upx;
		background-color: #FFFFFF;
	}
</style>
