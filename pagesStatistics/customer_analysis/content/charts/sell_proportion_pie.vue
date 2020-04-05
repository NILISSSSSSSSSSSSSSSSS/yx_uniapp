<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/utils/u-charts.js';
	var _self;
	var canvaRing=null;
   
	export default {
		props:['chart'], 
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
			}
		},
		watch: {
			chart () {
				if (canvasRing&&canvasRing.updateData) {
				console.log ('百分比', this.chart)
					canvasRing.updateData({
						series: this.chart.series, 
						title: {
							name: this.chart.title, 
							color: '#191f25',
							fontSize: uni.upx2px(54)*_self.pixelRatio,
							offsetY:uni.upx2px(-20)*_self.pixelRatio,
						},
					})
					return
				}
				this.showArcbar('canvasRing', this.chart)
			}
		}, 
		created() {
			_self = this;
			this.cWidth=uni.upx2px(400);
			this.cHeight=uni.upx2px(400);
			this.showRing ('canvasRing', this.chart)
		},
		methods: {
			showRing(canvasId,chartData){
				canvaRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'ring',
					fontSize:uni.upx2px(11),
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
						  offsetAngle: uni.upx2px(-45),
						  ringWidth: uni.upx2px(30)*_self.pixelRatio,
						  chartWidth:uni.upx2px(15)
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
.qiun-charts{width: 400upx; height:400upx;background-color: #FFFFFF; margin-bottom: 91upx;}
.charts{width: 400upx; height:400upx;background-color: #FFFFFF;}
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
.legend {
	width: 600upx; 			
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
}
</style>
