<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	import uCharts from '@/utils/u-charts';
  var canvaLineA=null;
  var _self;
	export default {
    props:['chart'], 
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
			}
		},
		watch: {
			chart () {
				if (canvaLineA&&canvaLineA.updateData) {
					console.log ('折线', this.chart)
					canvaLineA.updateData({
						series: this.chart.series, 
						categories: this.chart.categories,
						yAxis: {
            data:[
              {
                axisLine: false, 
                gridType:'dash',
                min:0,
                max: this.chart.max[0],
								calibration:false,
								position:'left',
                format:(val)=>{return val.toFixed(0)}//如不写此方法，Y轴刻度默认保留两位小数
              }, 
              {
                axisLine: false, 
                min:0 ,
                max: this.chart.max[1] ,
                calibration:false,
                position:'right',
                format:(val)=>{return val.toFixed(0)}
              }
            ], 
            gridType:'dash',
						dashLength:4,
						splitNumber:5
						
					},
					})
					return
				}
				this.showLineA('canvaLineA', this.chart)
			}
		}, 
		created () {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(630);
      this.cHeight=uni.upx2px(307);
      this.chart.series[1].index=1;
      this.chart.series[0].index=0;
      this.showLineA('canvasLineA',this.chart)
			
		},
		methods: {
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'mix',
					fontSize:uni.upx2px(24),
					dataPointShape:true,
					enableScroll: true,//开启图表拖拽功能
					legend:{
						show:false,
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,	
					dataLabel:false,
					xAxis: {
						disableGrid:true,
						type:'grid',
						gridType:'dash',
            axisLine: false,
						itemCount:7,
						scrollShow:false,
            scrollAlign:'left', 
					},
					yAxis: {
            data:[
              {
                axisLine: false, 
                gridType:'dash',
                min:0,
                max: chartData.max[0],
								calibration:false,
								position:'left',
                format:(val)=>{return val.toFixed(0)}//如不写此方法，Y轴刻度默认保留两位小数
              }, 
              {
                axisLine: false, 
                min:0 ,
                max: chartData.max[1] ,
                calibration:false,
                position:'right',
                format:(val)=>{return val.toFixed(0)}
              }
            ], 
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
							xAxisLabel:true,
							yAxisLabel:true,
							labelBgColor:'#DFE8FF',
							labelBgOpacity:0.95,
							labelAlign:'left',
							labelFontColor:'#666666'
						}
					},
				});
				
			},
			touchLineA(e){
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return item.name + ':' + item.data 
					}
				});
			},
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 630upx;
		height: 307upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 630upx;
		height: 307upx;
		background-color: #FFFFFF;
	}
</style>
