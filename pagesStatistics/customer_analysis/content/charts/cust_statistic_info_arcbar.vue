<template>
	<view class="qiun-columns">
		<view class="qiun-charts3">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/utils/u-charts.js';
	var _self;
	var canvaArcbar1;
	
	export default {
		props:['chart'], 
		watch: {
			chart () {
				if (canvasArcbar1&&canvasArcbar1	.updateData) {
				console.log ('百分比', this.chart)
					canvaArcbar1.updateData({
						series: this.chart.series, 
					})
					return
				}
				this.showArcbar('canvasArcbar1', this.chart)
			}
		}, 
		data() {
			return {
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
			}
		},
		created() {
			_self = this;
			this.cWidth3=uni.upx2px(178);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(178);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(21);
			this.showArcbar('canvasArcbar1', this.chart)
		},
		methods: {
			showArcbar(canvasId,chartData){
				canvaArcbar1=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:uni.upx2px(11),
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series:chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
						color: '#191f25', 
						fontSize: uni.upx2px(40)*_self.pixelRatio ,
						offsetX: uni.upx2px(0), 
						offsetY: uni.upx2px(-5), 
					},	
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							startAngle:-0.5//整圆类型只需配置起始角度即可
						}
					}
				});
				
			}
		}
	}
</script>

<style scoped>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts3 {
		width: 178upx;
		height: 178upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 178upx;
		height: 178upx;
		background-color: #FFFFFF;
	}
</style>


