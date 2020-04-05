

<template>
    <view style="margin: auto">
        <canvas :style="{width: cWidth+'px', height: cHeight+'px'}"
                canvas-id="circleProcess" id="circleProcess"></canvas>
    </view>
</template>

<script>
    import uCharts from "@/utils/u-charts.js";

    export default {
        props: {
            globalType: "",
            width: {
                type: Number|String,
                default() {
                    return 148;
                }
            },
            height: {
                type: Number|String,
                default() {
                    return 148;
                }
            },
            // 数据
            seriesData: {
                type: Number|String,
                default() {
                    return 0.5;
                }
            },
            // 文字颜色
            fontColor: {
                type: String,
                default() {
                    return "#191f25";
                }
            },
            // 文字大小
            fontSize: {
                type: Number|String,
                default() {
                    return 32;
                }
            },
            // 进度颜色
            seriesColor: {
                type: String,
                default() {
                    return "#0084ff";
                }
            },
            // 圆环宽度
            arcbarWidth: {
                type: String|Number,
                default() {
                    return 16;
                }
            },
            // 进度背景
            arcbarBgColor: {
                type: String,
                default() {
                    return "#f5f7fb";
                }
            }
        },

        computed: {
            cWidth() {
                return uni.upx2px(Number(this.width))
            },
            cHeight() {
                return uni.upx2px(Number(this.height))
            },
            cArcbarWidth() {
                return uni.upx2px(Number(this.arcbarWidth))
            }
        },

        mounted() {
            this.initCharts();
        },

        watch: {
            seriesData() {
                if (getApp().globalData[this.globalType] && getApp().globalData[this.globalType].updateData) {
                    getApp().globalData[this.globalType].updateData({
                        series: [
                            {
                                name: parseInt(this.seriesData*100)+"%",
                                data: this.seriesData,
                                color: this.seriesColor
                            }
                        ],
                        title: {
                            name: parseInt(this.seriesData*100)+"%",
                            fontSize: uni.upx2px(Number(this.fontSize)),
                            color: this.fontColor
                        }
                    });
                    return;
                }

                this.initCharts();
            }
        },

        methods: {
            initCharts() {
                if (this.seriesData === null) return;

                getApp().globalData[this.globalType] = new uCharts({
                    $this: this,
                    canvasId: "circleProcess",
                    width: this.cWidth,
                    height: this.cHeight,
                    padding: [0,0,0,0],
                    type: 'arcbar',
                    arcbarLineCap: "square",
                    legend: false,
                    fontSize: 11,
                    background: '#FFFFFF',
                    pixelRatio: 1,
                    animation: true,
                    series: [
                        {
                            name: parseInt(this.seriesData*100)+"%",
                            data: this.seriesData,
                            color: this.seriesColor
                        }
                    ],
                    dataLabel: true,
                    title: {
                        name: parseInt(this.seriesData*100)+"%",
                        fontSize: uni.upx2px(Number(this.fontSize)),
                        color: this.fontColor
                    },
                    extra: {
                        arcbar: {
                            type: 'circle', // 整圆类型进度条图
                            width: this.cArcbarWidth, // 圆弧的宽度
                            startAngle: 1.5,
                            radius: this.cWidth/2 - this.cArcbarWidth,
                            backgroundColor: this.arcbarBgColor
                        }
                    }
                })
            },
        }
    }
</script>
