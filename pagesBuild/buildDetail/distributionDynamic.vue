<template>
  <view class="distribution-dynamic">
    <block v-for="(item, index) in list" :key="index">
      <view class="d-d-item" @click="goToDetail(item.promotionId)">
        <view class="d-d-left">
          <view class="d-d-i-title">{{item.title}}</view>
          <view class="d-d-i-content">{{item.actContent || '无'}}</view>
          <view class="d-d-i-time">{{item.date}}</view>
        </view>
        <view class="d-d-right">
          <image
            :src="item.photoAddr || 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'"
            mode="aspectFit"
            @error="errorImg(index)">
          </image>
        </view>
      </view>
    </block>
    <scrollLoading v-if="isLoading && isMore" :isScrollIng="true"></scrollLoading>
    <!-- 无数据 -->
    <view class="nodata" v-if="list.length === 0 && !isLoading">
      <image src="http://cdn.haofang.net/static/xffx-uniapp/commission/empty.png"></image>
      <view>暂无数据</view>
    </view>
    <!-- 发布 -->
    <view class="post-btn" @click="postBtn()" v-if="accountSource === 2">
      <image src="http://cdn.haofang.net/static/xfldDeveloper/build/send.png"></image>
    </view>
  </view>
</template>

<script>
import { GetActivityList } from '@/net/BuildNet.js'
import { GetLoginModel } from '@/model/LoginSuccessModel'
import { Const } from "@/utils/Const.js"
import scrollLoading from "@/components/scrollLoading.vue"

import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"

export default {
  data () {
    return {
      accountSource: null, // 1 置业顾问端  2 开发商端
      paramsObj: {
        pageRows: 20,
        pageOffset: 1,
        buildId: ''
      },
      list: [],
      isLoading: true,
      isMore: false
    }
  },
  components: {
    scrollLoading
  },
  onLoad (params = {}) {
    this.paramsObj.buildId = params.buildId
    this.initData()
    // 监听动态发布成功
    new Notification().addObserver(this, "CreateActivityChangeMethod", Notify.CreateActivityChange.Name)
  },
  onShow () {
    this.accountSource = GetLoginModel.getAccountSource()
  },
  onReachBottom () {
    console.log('到底啦')
    if (!this.isLoading && this.isMore) {
      this.paramsObj.pageOffset++
      this.initData()
    }
  },
  methods: {
    // 发布动态成功回调
    CreateActivityChangeMethod () {
      this.paramsObj.pageOffset = 1
      this.list = []
      this.initData()
    },
    initData () {
      this.isLoading = true
      new GetActivityList(this.paramsObj).send().then(res => {
        console.log(res)
        this.isLoading = false
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          if (res.data.list < 20) {
            this.isMore = false
          }
          this.list = this.list.concat(res.data.actList || []) || []
        }
      })
    },
    // 查看详情
    goToDetail (actId) {
      uni.navigateTo({
        url: '/pagesBuild/buildDetail/distributionDynamicDetail?actId=' + actId
      })
    },
    // 发布动态
    postBtn () {
      uni.navigateTo({
        url: '/pagesBuild/buildDetail/releaseTheStory?buildId=' + this.paramsObj.buildId
      })
    },
    // 图片错误处理
    errorImg (index) {
      this.list[index].photoAddr = 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'
    }
  },
  onUnload() {
    // 反注册通知
    new Notification().removeObserverAllNotification(this)
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
.distribution-dynamic {
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
        line-height: 1;
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
        margin-top: 26upx;
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
        line-height: 1;
        margin-top: 26upx;
        font-family: PingFang-SC-Medium;
        color: #a3a5a8;
        font-size: 24upx;
      }
    }
    &>.d-d-right {
      flex: 0 0 210upx;
      width: 210upx;
      height: 180upx;
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
  width: 220upx;
  height: 188upx;
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
