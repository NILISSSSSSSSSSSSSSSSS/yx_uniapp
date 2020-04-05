<template>
  <view class="photo-list-swiper">
    <!-- 占位 -->
    <view class="zhan-wei"></view>
    <!-- 头部 -->
    <view class="nav-bar">
      <view class="n-v-back" @click="back">
        <text class="iconfont iconleft"></text>
      </view>
      <view class="n-v-content">{{nowName + nowNum}}</view>
    </view>
    <!-- swiper -->
    <view class="swiper-view">
      <swiper @change="swiperChange" class="swiper-box" :current="swiperIndex">
        <block v-for="(item, index) in photoList" :key="index">
          <swiper-item class="swiper-item">
            <view>
              <image mode="aspectFill" class="swiper-img" :src="item.photoUrl"></image>
              <view v-if="item.type === 3">
                <view class="type-title">{{item.title}}</view>
                <view class="type-name">推荐理由：</view>
                <view class="type-dec">{{item.dec}}</view>
              </view>
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>
  </view>
</template>

<script>
import { buildModel } from "@/model/buildModel.js"

export default {
  data () {
    return {
      nowName: '', // 什么图    户型图
      nowNum: '', // 当前第几张  2/12
      swiperIndex: 0, // 当前swiper的index
      photoList: [],
      listObj: {},
      photoTypeObj: {
        1: '效果图',
        2: '规划图',
        3: '户型图',
        4: '样板间',
        5: '实景图',
        6: '配套图'
      }
    }
  },
  onLoad (params = {}) {
    // 获取列表
    let list = new buildModel().getModel('photoList')
    console.log(list, 'list-swiper')
    let photoList = []
    for (let item of list) {
      this.listObj[item.photoType] = item.oneList
      let all = item.oneList.length
      let type = item.photoType
      item.oneList.forEach((m, n) => {
        m.all = all
        m.type = type
        m.nowIndex = n
        m.typeName = this.photoTypeObj[type]
        photoList.push(m)
      })
    }
    console.log(photoList)
    this.photoList = photoList
    // 处理顶部名称展示
    this.swiperIndex = params.allIndex
    let item = this.photoList[this.swiperIndex]
    this.nowName = item.typeName
    this.nowNum = '(' + (+item.nowIndex + 1) + '/' + item.all + ')'
  },
  methods: {
    // back
    back () {
      uni.navigateBack({
        delta: 1
      })
    },
    swiperChange (e) {
      if (e.detail.source) {
        this.swiperIndex = e.detail.current
        let item = this.photoList[e.detail.current]
        this.nowName = item.typeName
        this.nowNum = '(' + (+item.nowIndex + 1) + '/' + item.all + ')'
      }
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
<style scoped>
@import '../../static/app-plus/iconFont/iconfont.css';

.photo-list-swiper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.zhan-wei {
  width: 100%;
  height: 40upx;
  background-color: #000000;
}

.nav-bar {
  position: relative;
  width: 100%;
  height: 120upx;
  overflow: hidden;
  background-color: #000000;
}
.nav-bar>.n-v-back {
  position: absolute;
  left: 28upx;
  top: 0;
  width: 50upx;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 99;
}
.nav-bar>.n-v-back>text {
  font-size: 44upx;
  color: #ffffff;
}
.nav-bar>.n-v-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 34upx;
}

.swiper-view {
  position: relative;
  width: 100%;
  height: calc(100% - 160upx);
  background-color: #000000;
}
.swiper-box, .swiper-item {
  width: 100%;
  height: 100%;
}
.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-item>view {
  position: relative;
  width: 100%;
	height: 556upx;
}
.swiper-item>view>image {
  width: 100%;
	height: 556upx;
}
.swiper-item>view>view {
  position: absolute;
  top: 556upx;
  left: 0;
  width: 100%;
  height: auto;
  color: #ffffff;
  padding: 0 30upx;
  box-sizing: border-box;
}
.swiper-item>view>view>.type-title {
  height: 80upx;
  line-height: 80upx;
  font-size: 28upx;
}
.swiper-item>view>view>.type-name {
  line-height: 1;
  font-size: 28upx;
}
.swiper-item>view>view>.type-dec {
  height: auto;
  font-size: 24upx;
  margin-top: 28upx;
  max-height: 156upx;
  overflow: auto;
}
</style>
