<template>
  <view class="skill-point-detail">
    <view class="d-d-d-title">{{infoData.title}}</view>
    <view class="d-d-d-time">{{infoData.creationTime}}</view>
    <view class="d-d-d-img">
      <image :src="infoData.picUrl" mode="aspectFill"></image>
    </view>
    <view class="d-d-d-content">{{infoData.content}}</view>
  </view>
</template>

<script>
import { buildModel } from '@/model/buildModel.js'

export default {
  data () {
    return {
      actId: '',
      infoData: {}
    }
  },
  onLoad (params = {}) {
    if (params.type === 'skill') {
      uni.setNavigationBarTitle({
        title: '拓客技巧详情'
      })
    }
    if (params.type === 'point') {
      uni.setNavigationBarTitle({
        title: '楼盘卖点详情'
      })
    }
    this.actId = params.actId
    this.initData()
  },
  methods: {
    initData () {
      let obj = new buildModel().getModel('saveSkillPointDetail') || {}
      this.infoData = obj
    }
  },
}
</script>

<style scoped>
.skill-point-detail {
  width: 100%;
  height: auto;
  padding: 0 28upx;
  box-sizing: border-box;
  overflow: hidden;
}

.d-d-d-title {
  margin-top: 34upx;
  color: #191f25;
  font-family: PingFang-SC-Bold;
	font-size: 50upx;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.d-d-d-time {
  margin-top: 40upx;
  font-family: PingFang-SC-Medium;
	font-size: 28upx;
  color: #a3a5a8;
  font-size: 24upx;
}
.d-d-d-img {
  margin-top: 60upx;
  width: 100%;
  height: 428upx;
  background-image: url('http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.d-d-d-img>image {
  width: 100%;
  height: 428upx;
  display: block;
}
.d-d-d-content {
  font-family: PingFang-SC-Medium;
  margin-top: 60upx;
  color: #191f25;
  font-size: 32upx;
}
</style>
