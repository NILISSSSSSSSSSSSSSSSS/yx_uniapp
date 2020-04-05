

<template>
    <canvas :style="{width: cWidth+'px', height: cHeight+'px'}"
            canvas-id="canvasRing" id="canvasRing"></canvas>
</template>

<script>
    import uCharts from "@/utils/u-charts.js";
    class PrivateData {
        static ringChart = null;
    }

    export default {
        props: {
            width: {
                type: Number|String,
                default() {
                    return 250;
                }
            },
            height: {
                type: Number|String,
                default() {
                    return 250;
                }
            },
            // 数据 [{name: String, data: Number, color: String}]
            seriesData: {
                type: Array,
                default() {
                    return [];
                }
            },
            // 圆环宽度
            arcbarWidth: {
                type: String|Number,
                default() {
                    return 30;
                }
            },
            titleName: {
                type: String|Number,
                default() {
                    return "";
                }
            },
            titleFontSize: {
                type: String|Number,
                default() {
                    return 40;
                }
            },
            titleFontColor: {
                type: String,
                default() {
                    return "#191f25";
                }
            },
            subName: {
                type: String|Number,
                default() {
                    return "";
                }
            },
            subFontSize: {
                type: String|Number,
                default() {
                    return 18;
                }
            },
            subFontColor: {
                type: String,
                default() {
                    return "#7d8184";
                }
            },
            animation: {
                type: Boolean,
                default() {
                    return false
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

        data() {
            return {
                pixelRatio:1,
            }
        },

        mounted() {
            this.showRing();
        },

        watch: {
            seriesData() {
                if (PrivateData.ringChart) {
                    PrivateData.ringChart.updateData({
                        series: this.dealSeries(),
                        title: {
                            name: this.titleName || "0",
                            color: this.titleFontColor,
                            fontSize: uni.upx2px(Number(this.titleFontSize)),
                            offsetY: -3,
                        },
                    });
                    return;
                }

                this.initCharts();
            }
        },

        methods: {
            dealSeries() {
                if (this.seriesData.length === 0) {
                    return [
                        {
                            name: "",
                            color: "#0084ff",
                            data: 1
                        }
                    ];
                }

                let seriesData = [];
                for (let info of this.seriesData) {
                    seriesData.push({
                        name: info.text,
                        color: info.color,
                        data: info.val
                    });
                }
                return seriesData;
            },
            showRing(){
                PrivateData.ringChart = new uCharts({
                    $this: this,
                    canvasId: "canvasRing",
                    type: 'ring',
                    fontSize: 11,
                    legend: {
                        show: false
                    },
                    title: {
                        name: this.titleName || "0",
                        color: this.titleFontColor,
                        fontSize: uni.upx2px(Number(this.titleFontSize)),
                        offsetY: -3,
                    },
                    subtitle: {
                        name: this.subName,
                        color: this.subFontColor,
                        fontSize: uni.upx2px(Number(this.subFontSize)),
                        offsetY: -5,
                    },
                    extra: {
                        pie: {
                            ringWidth: this.cArcbarWidth,
                            labelWidth: 0,
                            activeRadius: 0,
                        }
                    },
                    background:'#FFFFFF',
                    pixelRatio:this.pixelRatio,
                    series: this.dealSeries(),
                    animation: this.animation,
                    width: this.cWidth * this.pixelRatio,
                    height: this.cHeight * this.pixelRatio,
                    disablePieStroke: true,
                    dataLabel: false,
                });
            },
        }
    }
</script>
