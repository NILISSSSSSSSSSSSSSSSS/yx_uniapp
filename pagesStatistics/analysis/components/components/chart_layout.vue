<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
		</view>
		<!-- 图例大于2 -->
		<view class="legend_left" v-if="layout.legend.length>2">
			<view v-for="(v, i) in layout.legend" :key=i class="layout-box">
				<view class="layout">
					<view class="iconPoint" :style='{background:v.color}'></view>
					{{v.name}}
				</view>
				<view class="detail"><text class="percentage">{{v.percent}}</text><text>{{v.sellNum}}</text></view>
			</view>
		</view>
		<!-- 图例小于3 -->
		<view class="legend_center f_r_c" v-if="layout.legend.length<3">
			<view v-for="(v, i) in layout.legend" :key=i class="layout-box">
				<view class="layout">
					<view class="iconPoint" :style='{background:v.color}'></view>
					{{v.name}}
				</view>
				<view class="detail"><text class="percentage">{{v.percent}}</text><text>{{v.sellNum}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/utils/u-charts.js';
	var _self;
	var canvaRing=null;
   
	export default {
		props:['layout'], 
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
			}
		},
		created() {
			_self = this;
			this.cWidth=uni.upx2px(660);
			this.cHeight=uni.upx2px(428);
			this.showRing ('canvasRing', this.layout)
		},
		watch: {
			layout() {
				if(canvaRing && canvaRing.updateData) {
					canvaRing.updateData({
						series: this.layout.series,
						categories: this.layout.categories, 
						title: {
							name: this.layout.title,
							color: '#191f25',
							fontSize: uni.upx2px(54)*_self.pixelRatio,
							offsetY:uni.upx2px(-20)*_self.pixelRatio,
						},
					});
					return;
				}
      this.showMix("canvaRing",this.layout);
			}
		}, 
		methods: {
			showRing(canvasId,chartData){
				canvaRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'ring',
					fontSize:uni.upx2px(11),
					animation: false, 
					legend:{
						show: false
					}, 
					title: {
						name: chartData.title, 
						color: '#191f25',
						fontSize: uni.upx2px(54)*_self.pixelRatio,
						offsetY:uni.upx2px(-20)*_self.pixelRatio,
					},
					subtitle: {
						name: '户型销售',
						color: '#a3a5a8',
						fontSize: uni.upx2px(28)*_self.pixelRatio,
						//offsetY:uni.upx2px(0)*_self.pixelRatio,
					},
					extra: {
						pie: {
						  offsetAngle: 0,
						  ringWidth: uni.upx2px(30)*_self.pixelRatio,
						  layoutWidth:uni.upx2px(15)
						}
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
				});
			},
		}
	}
</script>

<style scoped lang="less">
.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 660upx; height:428upx;background-color: #FFFFFF; margin-bottom: 91upx;}
.charts{width: 660upx; height:428upx;background-color: #FFFFFF;}
.bg0084ff {
	background-color:#0084ff
}
.bg13c2c2 {
	background-color:#13c2c2
}
.bg0084ff {
	background-color:#0084ff
}
.bg0084ff {
	background-color:#0084ff
}
.bg0084ff {
	background-color:#0084ff
}
.legend_left {
	width: 600upx; margin: 0 auto;			
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	.layout-box {
		padding-left:31upx; width: 169upx;position: relative; margin-bottom: 60upx; text-indent: 34upx;
		.layout {
			font-size: 24upx; color: #7d8184; font-family: PingFang-SC-Medium; margin-bottom: 24upx; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
			.iconPoint {
				width:13upx; height:13upx ;position:absolute; left:0;top: 50%; transform: translateY(-50%);  border-radius: 50%;
			}
		}
		.detail {
			font-family: 1234567890-Regular;
			font-size: 38upx;
			color: #191f25;
			.percentage {
				margin-right: 22upx
			}
		}
	}
}
.legend_center {
	width: 600upx;margin: 0 auto; 			
	align-content: flex-start;
	.layout-box {
		padding-left:31upx; width: 169upx;position: relative; margin-bottom: 60upx;text-indent: 34upx; 
		.layout {
				font-size: 24upx; color: #7d8184; font-family: PingFang-SC-Medium; margin-bottom: 24upx; margin-bottom: 24upx; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
			.iconPoint {
				width:13upx; height:13upx ;position:absolute; transform: translateY(-50%); left:0;top: 50%;border-radius: 50%;
			}
		}
		.detail {
			font-family: 1234567890-Regular;font-size: 38upx;color: #191f25;
			.percentage {
				margin-right: 22upx
			}
		}
	}
}
</style>
