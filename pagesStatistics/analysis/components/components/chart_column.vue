<template>
  <view calss="chart_column">
    <canvas 
    canvas-id="chart_column" 
    id="chart_column" 
    class="chart_column"
    :style="{'width':chartsData.cWidth*chartsData.pixelRatio+'px','height':chartsData.cHeight*chartsData.pixelRatio+'px'}"
		@touchstart="touchMix" @touchmove="moveMix"
		 @touchend="touchEndMix"></canvas>
		<view class="legend f_r_b">
			<view class="legend_box f_r_b"><view class="icon blue"></view><view>报备数</view></view>
			<view class="legend_box f_r_b"><view class="icon oriange"></view><view>带看数</view></view>
			<view class="legend_box f_r_b"><view class="icon green"></view><view>签约数</view></view>
		</view>
  </view>
</template>

<script>
import uCharts from '@/utils/u-charts'
let chart_column= null; 
let _self
export default {
	props:['compare'], 
  data() {
    return {
      chartsData: {
        cWidth:'',
				cHeight:'',
        pixelRatio:1,
      }
    }
  }, 
  watch:{
    compare () {
      if(chart_column && chart_column.updateData) {
        chart_column.updateData({
          series: this.compare.series,
          categories: this.compare.categories, 
          yAxis: {
					gridType: 'dash', 
					gridColor: '#ebebeb', 
          splitNumber: 4,
          data: [{
            min: 0, 
            max: this.compare.max,
            format:(val)=>{return val.toFixed(0)}, 
            axisLine: false,
            fontSize: uni.upx2px(24),
          }], 
        },

        });
        return;
      }
      this.showMix("chart_column",this.compare);
    }
  }, 
  methods: {
		touchMix(e){
			chart_column.scrollStart(e);
		},
		moveMix(e) {
      chart_column.scroll(e);
		},
		touchEndMix(e) {
			chart_column.scrollEnd(e);
			//下面是toolTip事件，如果滚动后不需要显示，可不填写
			chart_column.touchLegend(e);
			chart_column.showToolTip(e, {
			  format: function (item, category) {
			    return category + ' ' + item.name + ':' + item.data 
			  }
			});
		
		},
    showChart(canvasId, chartsData) {
      chart_column= new uCharts({
        $this:_self, 
        // 通用
        canvasId, 
        pixelRatio:1,
        type: 'column', 
        categories:chartsData.categories,
        series: chartsData.series,
        width: _self.chartsData.cWidth*_self.chartsData.pixelRatio,
        height: _self.chartsData.cHeight*_self.chartsData.pixelRatio,
        dataLabel:false,
        enableScroll: true, 
        animation: false, 
        //柱子大小
        extra: {
          column: {
            width: uni.upx2px(10),
          }, 
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
        // 图例
        legend :{
          show: false, 
        }, 
        // x轴 
        xAxis: {
          fontColor:'#a3a5a8', 
          disableGrid:true,
          axisLine: false, 
					itemCount:5,//x轴单屏显示数据的数量，默认为5个
					scrollBackgroundColor:'#F7F7FF',//默认为 #EFEBEF
          scrollColor:'#DEE7F7',//默认为 #A6A6A6
          scrollShow: false, 
          fontSize: uni.upx2px(24),
        },
        // y轴
        yAxis: {
          fontColor:'#a3a5a8', 
					gridType: 'dash', 
					gridColor: '#ebebeb', 
          splitNumber: 5,
          data: [{
            min: 0, 
            max: chartsData.max,
            format:(val)=>{return val.toFixed(0)}, 
            axisLine: false,
            fontSize: uni.upx2px(24),
            fontColor:'#a3a5a8',
          }], 
        },
      })
    }

  }, 
  created() {
    _self= this; 
    this.chartsData.cWidth=uni.upx2px(660);
    this.chartsData.cHeight=uni.upx2px(428);
    this.showChart('chart_column', this.compare)
  }, 

}
</script>

<style lang="less">
	canvas {
		margin-bottom: 50upx; 
	}
	
	.legend {
		width: 400upx; margin-left: 60upx; 
		.legend_box {
			width:99upx;  font-family: PingFang-SC-Medium;font-size: 24upx; color: #191f25;
			.icon {
				margin: auto 0; border-radius: 50%; width:13upx; height: 13upx;
			}
			.icon.blue {
				background-color: #0586ff; 
			}
			.icon.oriange {
				background-color: #f95742; 
			}
			.icon.green {
				background-color: #43bc6d; 
			}
		}
	}
.chart_column {
  width: 660upx;
  height: 428upx;
}
</style>