<template>
  <view class="skill-point-List">
    <block v-for="(item, index) in list" :key="index">
      <view class="d-d-item" @click="goToDetail(item, item.actId)">
        <view class="d-d-left">
          <view class="d-d-i-title">{{item.title}}</view>
          <view class="d-d-i-content">{{item.content || '无'}}</view>
          <view class="d-d-i-time">{{item.creationTime}}</view>
        </view>
        <view class="d-d-right">
          <image
            :src="item.picUrl || 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'"
            mode="aspectFit"
            @error="errorImg(index)">
          </image>
        </view>
      </view>
    </block>
    <scrollLoading v-if="isLoading" :isScrollIng="true"></scrollLoading>
    <!-- 无数据 -->
    <view class="nodata" v-if="list.length === 0 && !isLoading">
      <image src="http://cdn.haofang.net/static/xfldDeveloper/customer/no_customer.png"></image>
      <view>暂无数据</view>
    </view>
  </view>
</template>

<script>
import { GetTalkSkills, GetBuildSellingPointDetailsList } from '@/net/BuildNet.js'
import { Const } from "@/utils/Const.js"
import { buildModel } from '@/model/buildModel.js'

export default {
  data () {
    return {
      buildId: '',
      type: '',
      list: [],
      isLoading: true
    }
  },
  onLoad (params = {}) {
    this.buildId = params.buildId
    this.type = params.type
    if (params.type === 'skill') {
      // 设置title
      uni.setNavigationBarTitle({
        title: '拓客技巧'
      })
      // 获取数据
      this.initSkillData()
    }
    if (params.type === 'point') {
      // 设置title
      uni.setNavigationBarTitle({
        title: '楼盘卖点'
      })
      // 获取数据
      this.initPointData()
    }
  },
  methods: {
    // 拓客技巧
    initSkillData () {
      this.isLoading = true
      new GetTalkSkills({
        buildId: this.buildId
      }).send().then(res => {
        console.log(res)
        this.isLoading = false
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          this.list = res.data.list || []
        }
      })
    },
    // 楼盘卖点
    initPointData () {
      this.isLoading = true
      new GetBuildSellingPointDetailsList({
        buildId: this.buildId
      }).send().then(res => {
        console.log(res)
        this.isLoading = false
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          this.list = res.data.list || []
        }
      })
    },
    // 查看详情
    goToDetail (item, actId) {
      // 存储数据
      new buildModel().setModel(item, 'saveSkillPointDetail');
      uni.navigateTo({
        url: '/pagesBuild/buildDetail/skillPointDetail?actId=' + actId + '&type=' + this.type
      })
    },
    // 图片错误处理
    errorImg (index) {
      this.list[index].photoAddr = 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'
    }
  }
}
</script>

<style>
page {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.skill-point-List {
  width: 100%;
  height: 100%;
  padding: 0 40upx;
  box-sizing: border-box;
  .d-d-item {
    width: 100%;
    height: auto;
    padding: 28upx 0;
    box-sizing: border-box;
    background-color: #ffffff;
    border-bottom: solid 2upx #ebebeb;
    display: flex;
    &>.d-d-left {
      flex: 0 0 420upx;
      width: 420upx;
      margin-right: 40upx;
      &>.d-d-i-title {
        width: 100%;
        height: auto;
        font-family: PingFang-SC-Bold;
        color: #191f25;
        font-size: 32upx;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &>.d-d-i-content {
        width: 100%;
        height: 70upx;
        margin-top: 30upx;
        font-family: PingFang-SC-Medium;
        color: #7d8184;
        font-size: 24upx;
        max-height: 125upx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      &>.d-d-i-time {
        width: 100%;
        height: auto;
        margin-top: 28upx;
        font-family: PingFang-SC-Medium;
        color: #a3a5a8;
        font-size: 24upx;
      }
    }
    &>.d-d-right {
      flex: 0 0 210upx;
      width: 210upx;
      height: 170upx;
      &>image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}


.nodata {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.nodata>image {
  width: 561upx;
  height: 264upx;
  display: block;
}
.nodata>view {
  width: 100%;
  height: 80upx;
  line-height: 80upx;
  text-align: center;
  color: #999;
  font-size: 24upx;
}

.post-btn {
  position: fixed;
  bottom: 136upx;
  right: 46upx;
  width: 94upx;
	height: 94upx;
  z-index: 9999;
}
.post-btn>image {
  width: 94upx;
	height: 94upx;
  display: block;
}
</style>
