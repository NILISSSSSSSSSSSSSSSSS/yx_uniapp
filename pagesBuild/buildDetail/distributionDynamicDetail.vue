<template>
  <view class="distribution-dynamic-detail">
    <view class="d-d-d-title">{{infoData.title}}</view>
    <view class="d-d-d-time">{{infoData.time}}</view>
    <block v-for="(item, index) in infoData.picUrlList" :key="index">
      <view class="d-d-d-img">
        <image :src="item" mode="aspectFill"></image>
      </view>
    </block>
    <view class="d-d-d-content">{{infoData.content}}</view>
  </view>
</template>

<script>
import {
  GetBuildDynamicDetails
} from '@/net/BuildNet.js'

import {
  Const
} from "@/utils/Const.js"

export default {
  data () {
    return {
      actId: '',
      infoData: {}
    }
  },
  onLoad (params = {}) {
    this.actId = params.actId
    this.initData()
  },
  methods: {
    initData () {
      new GetBuildDynamicDetails({
        actId: this.actId
      }).send().then(res => {
        console.log(res)
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          this.infoData = res.data || {}
        }
      })
    }
  },
}
</script>

<style scoped>
.distribution-dynamic-detail {
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
