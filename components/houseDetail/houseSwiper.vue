<template>
  <view class="house-swiper">
    <view class="swiper-view">
      <swiper @change="swiperChange" class="swiper-box" :current="swiperIndex" v-if="list.length > 0">
        <block v-for="(item, index) in list" :key="index">
          <swiper-item class="swiper-item">
            <button hover-class="none" form-type="submit" class="swiper-cont">
              <image mode="aspectFill" class="swiper-img" :src="item.url"></image>
              <!-- vr -->
              <view v-if="item.type === 'vr'" class="swiper-vr" @click.stop="goToVr(item.sourceUrl)">
                <image class="vr-img" mode="aspectFill" src="http://uuweb.haofang.net/Public/wxApp/images/detail/720/1.png"></image>
              </view>
            </button>
          </swiper-item>
        </block>
      </swiper>
       <!-- 查看更多 -->
       <view class="look-more" @click="lookMore()">
         <collectFormId></collectFormId>
         <text>{{list.length ? ('+' + list.length) : 0}}</text>
         <text>查看更多</text>
       </view>
      <!-- desc -->
      <view class="swiper-desc" v-if="false">
        <view>
          <view>{{desc.exclusiveDiscount}}</view>
          <view>{{desc.groupPurchaseDiscount}}</view>
        </view>
        <view>
          <view>{{(swiperIndex + 1) + '/' + list.length}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { buildModel } from "@/model/buildModel.js"

export default {
  data () {
    return {
      swiperIndex: 0
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    desc: {
      type: Object,
      default: {}
    },
    buildId: {
      type: String,
      default: ''
    }
  },
  methods: {
    // swiper change
    swiperChange (e) {
      if (e.detail.source) {
        this.swiperIndex = e.detail.current
      }
    },
    // 点击item
    swiperDetailBtn () {
      uni.navigateTo ({
        url: '/pagesBuild/buildDetail/photoList'
      })
    },
    goToVr (path) {
      new buildModel().setModel(path, 'path')
      uni.navigateTo ({
        url: '/pagesBuild/buildDetail/vrPage'
      })
    },
    // 查看更多
    lookMore () {
      uni.navigateTo ({
        url: '/pagesBuild/buildDetail/photoList?buildId=' + this.buildId
      })
    }
  }
}
</script>

<style scoped>
.house-swiper {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.swiper-view {
  position: relative;
  width: 100%;
  height: 510upx;
  background-image: url('http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.swiper-box, .swiper-item, .swiper-cont, .swiper-img {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

button.swiper-cont {
  border-radius: 0;
  position: relative;
}
button.swiper-cont::after {
  border-radius: 0;
}

.swiper-vr {
  position: absolute;
  width: 116upx;
  height: 116upx;
  border-radius: 100%;
  background: rgba(0,0,0,0.35);
  top: 50%;
  left: 50%;
  margin-top: -58upx;
  margin-left: -58upx;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-vr>.vr-img {
  width: 100upx;
  height: 64upx;
}

.swiper-desc {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 102upx;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 0 30upx;
  box-sizing: border-box;
}
.swiper-desc>view:nth-child(1) {
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.swiper-desc>view:nth-child(1)>view {
  width: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 24upx;
  line-height: 1;
}
.swiper-desc>view:nth-child(2) {
  flex: 0 0 100upx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.swiper-desc>view:nth-child(2)>view {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #ffffff;
  font-size: 20upx;
}

.look-more {
  position: absolute;
  right: 28upx;
  bottom: 24upx;
  width: 136upx;
	height: 104upx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
	background-color: rgba(255, 255, 255, 0.73);
	border-radius: 8upx;
  color: #191f25;
  font-family: PingFang-SC-Medium;
	font-size: 22upx;
}

</style>
