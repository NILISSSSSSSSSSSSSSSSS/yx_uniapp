<template>
<view class="customer-registration">
  <view class="common-box_">
    <view class="common-box c-r-box">客户信息</view>
  </view>
  <!-- 姓名 -->
  <view class="common-box_">
    <view class="common-box c-r-input">
      <view class="c-r-i-left">
        <!-- <text class="iconfont iconuser"></text> -->
        <text>姓名</text>
      </view>
      <input type="text" class="c-r-i-middle" placeholder="请输入客户姓名" v-model="paramsObj.custName" placeholder-style="color: #c0c1c3;">
      <view class="c-r-i-right">
        <view @click="changeSex()">
          <view :class="{'c-r-i-r-avtive': paramsObj.custSex === 1}">男士</view>
          <view :class="{'c-r-i-r-avtive': paramsObj.custSex === 0}">女士</view>
        </view>
      </view>
    </view>
  </view>
  <!-- 手机号 -->
  <view class="common-box_">
    <view class="common-box c-r-input" style="border: none;">
      <view class="c-r-i-left">
        <!-- <text class="iconfont iconmobile"></text> -->
        <text>手机号</text>
      </view>
      <input type="number" class="c-r-i-middle" placeholder="请输入手机号" v-model="paramsObj.custMobile" maxlength="11" placeholder-style="color: #c0c1c3;">
    </view>
  </view>
  <!-- 购房意向 -->
  <view class="common-box_" style="margin-top: 30upx;">
    <view class="common-box c-r-box" style="border: none;">购房意向</view>
    <view class="movable-box">
      <view class="movable-box-area_">
        <view class="m-b-a">
          <view></view>
          <view :style="{'width': (biliWidth + 4) + '%'}"></view>
          <view>
            <view>80万</view>
            <view>120万</view>
            <view>180万</view>
            <view>240万</view>
            <view>300万</view>
            <view>480万</view>
          </view>
        </view>
      </view>
      <movable-area class="movable-box-area" ref="mbArea">
        <movable-view class="movable-box-view" :x="movable.x" :y="movable.y" direction="all" @change="onChange" :animation="isAnimation">
          <view class="m-b-v-1">{{movable.text}}</view>
          <view class="m-b-v-2"></view>
        </movable-view>
      </movable-area>
    </view>
  </view>
  <!-- 意向户型 -->
  <view class="common-box_">
    <view class="common-box c-r-box" style="border: none;">意向户型</view>
    <view class="layout-box">
      <view v-for="(item, index) in layoutObj.list" :key="index" @click="changeLayout(item.value, index)" :class="{'l-b-active': item.isShow}">
        {{item.name}}
      </view>
    </view>
  </view>
  <!-- 付款方式 -->
  <view class="common-box_">
    <view class="common-box c-r-box" style="border: none;">付款方式</view>
    <view class="pay-way-box">
      <view v-for="(item, index) in payWayList" :key="index" @click="changePayWay(item.value)" :class="{'p-w-active': item.value === paramsObj.payWay}">
        {{item.name}}
      </view>
    </view>
  </view>
  <!-- 其他要求 -->
  <view class="common-box_" style="padding-bottom: 40upx;">
    <view class="common-box c-r-box" style="border: none;">其他要求</view>
    <view class="other-text-area">
      <textarea placeholder="请填写客户描述" maxlength="50" @input="changeTextArea" placeholder-style="color: #bbbbbb" />
      <view class="p-w-num">{{requireNum}} / 50</view>
    </view>
  </view>
  <view class="save-btn" @click="saveData()">保存</view>
</view>
</template>

<script>
import {
  AddDirectCustomer
} from '@/net/CustomerNet.js'

import {
  GetLoginModel
} from '@/model/LoginSuccessModel'

import {
  Const
} from "@/utils/Const.js"

class PrivateData {
  static isSubmit = false;  // 是否在提交
}

export default {
  data () {
    return {
      paramsObj: {
        // buildId: null,
        custMobile: '', // 报备用户电话
        custName: '', // 报备用户名称
        custSex: 1, // 客户性别: 1 男 0 女
        intentionLayoutMax: null, // 最大意向户型
        intentionLayoutMin: null, // 最小意向户型
        otherRequirement: '', // 其他要求
        payWay: 3, // 付款方式: 1 均可 2 一次性 3 按揭
        purchaseBudgetMax: null, // 最大购房预算
        purchaseBudgetMin: null // 最小购房预算
      },
      movable: {
        x: 0,
        y: 0,
        all: 288,
        text: '80万以下'
      },
      priceList: [],
      layoutObj: { // 户型
        isLBActive: 0,
        selectNum: 0,
        list: [{
          name: '不限',
          isShow: true,
          value: 0
        }, {
          name: '一室',
          isShow: false,
          value: 1
        }, {
          name: '二室',
          isShow: false,
          value: 2
        }, {
          name: '三室',
          isShow: false,
          value: 3
        }, {
          name: '四室',
          isShow: false,
          value: 4
        }, {
          name: '五室以上',
          isShow: false,
          value: 5
        }]
      },
      payWayList: [{
        name: '一次性',
        value: 2
      }, {
        name: '按揭',
        value: 3
      }, {
        name: '均可',
        value: 1
      }],
      isAnimation: false, // 是否使用动画
      requireNum: 0,
      biliWidth: 0 // 宽度
    }
  },
  onLoad () {
    // this.paramsObj.buildId = GetLoginModel.getBuildId()
    let _this = this
    this.priceList.push({
      min: 0,
      max: 2/24,
      text: '80万以下',
      minNum: null,
      maxNum: 80
    })
    function addObj (min, max, minText, maxText, num, bili, allMax) {
      let min_ = min
      let max_ = max
      let minText_ = minText
      let maxText_ = maxText
      for (let i = 0; i < num; i++) {
        _this.priceList.push({
          min: min_,
          max: max_,
          minNum: minText_,
          maxNum: maxText_,
          text: minText_ + '-' + maxText_ + '万'
        })
        min_ = min_ + bili
        max_ = max_ + bili
        minText_ = minText_ + 10
        maxText_ = maxText_ + 10
        if (maxText_ >= allMax) {
          maxText_ = allMax
        }
      }
    }
    addObj(2/24, 3/24, 80, 100, 4, 1/24, 120)
    addObj(9/36, 10/36, 120, 140, 6, 1/36, 180)
    addObj(15/36, 16/36, 180, 200, 6, 1/36, 240)
    addObj(21/36, 22/36, 240, 260, 6, 1/36, 300)
    addObj(81/108, 82/108, 300, 360, 18, 1/108, 480)
    this.priceList.push({
      min: 11 / 12,
      max: 1,
      text: '480万以上',
      minNum: 480,
      maxNum: null
    })
    console.log(this.priceList)
  },
  onReady () {
    // 获取节点信息
    let view = uni.createSelectorQuery().in(this).select('.movable-box-area')
    view.fields({
      size: true
    }, data => {
      console.log(data)
      let w = data.width
      this.movable.all = w - 9
      console.log(this.movable.all)
      // 默认设置 240-260万
      let obj = {
        detail: {
          x: 7 / 12 * this.movable.all,
          source: 'touch'
        }
      }
      this.onChange(obj)
      this.movable.x = (7 / 12) * this.movable.all // 滑块默认展示
      this.biliWidth = (7 / 12) * 100 // 滑块默认展示
      // this.isAnimation = true
    }).exec()
  },
  methods: {
    // 性别切换
    changeSex () {
      this.paramsObj.custSex = this.paramsObj.custSex === 1 ? 0 : 1
    },
    // 价格滑动
    onChange (e) {
      if (!e.detail.source) return
      let x = e.detail.x
      let bili = x / this.movable.all
      this.biliWidth = bili * 100
      for (let item of this.priceList) {
        if (bili >= item.min && bili < item.max) {
          this.movable.text = item.text
          this.paramsObj.purchaseBudgetMin = item.minNum
          this.paramsObj.purchaseBudgetMax = item.maxNum
          return
        }
      }
    },
    changeLayoutStatus (index) {
      for (let i = 0; i < this.layoutObj.list.length; i++) {
        this.layoutObj.list[i].isShow = false
        if (i === index) {
          this.layoutObj.list[i].isShow = true
        }
      }
    },
    // 户型切换
    changeLayout (value, index) {
      if (value === 0) {
        this.changeLayoutStatus(index)
        this.paramsObj.intentionLayoutMax = null
        this.paramsObj.intentionLayoutMin = null
        this.layoutObj.selectNum = 0
        return
      }
      if (value === 5) {
        this.changeLayoutStatus(index)
        this.paramsObj.intentionLayoutMax = null
        this.paramsObj.intentionLayoutMin = 5
        this.layoutObj.selectNum = 0
        return
      }
      this.layoutObj.list[0].isShow = false
      this.layoutObj.list[5].isShow = false
      if (this.layoutObj.list[index].isShow) {
        if (this.layoutObj.selectNum <= 1) return
        this.layoutObj.selectNum--
      } else {
        if (this.layoutObj.selectNum >= 2) return
        this.layoutObj.selectNum++
      }
      this.layoutObj.list[index].isShow = !this.layoutObj.list[index].isShow
    },
    // 付款方式切换
    changePayWay (value) {
      this.paramsObj.payWay = value
    },
    changeTextArea (e) {
      this.paramsObj.otherRequirement = e.detail.value
      this.requireNum = e.detail.cursor
    },
    // save
    saveData () {
      if (this.paramsObj.custName === '') {
        this.DifferenceApi.showToast('请输入客户姓名')
        return
      }
      if (this.paramsObj.custMobile === '') {
        this.DifferenceApi.showToast('请输入手机号码')
        return
      }
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.paramsObj.custMobile))) {
        this.DifferenceApi.showToast('请输入正确的手机号码')
        return
      }
      let layoutList = []
      let layoutIndex = false
      this.layoutObj.list.forEach((element, index) => {
        if (element.isShow) {
          layoutList.push(element.value)
          if (index === 0) {
            layoutIndex = true
          }
        }
      })
      if (layoutIndex) {
        this.paramsObj.intentionLayoutMax = null
        this.paramsObj.intentionLayoutMin = null
      } else {
        this.paramsObj.intentionLayoutMin = layoutList[0]
        this.paramsObj.intentionLayoutMax = layoutList[1] || null
      }

      if (PrivateData.isSubmit) return;

      PrivateData.isSubmit = true;
      uni.showLoading({
        title: '保存中...',
        mask: true,
      });
      new AddDirectCustomer(this.paramsObj).send().then(res => {
        if (res.errCode !== Const.success) {
          PrivateData.isSubmit = false;
          return Promise.reject(res);
        }

        this.DifferenceApi.showToast('保存成功');
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          });
          PrivateData.isSubmit = false;
          uni.hideLoading();
        }, 500);
      }).catch((res) => {
        this.DifferenceApi.showToast(res.errMsg);
        PrivateData.isSubmit = false;
      });
    }
  }
}
</script>

<style scoped>
@import '../../static/app-plus/iconFont/iconfont.css';

page {
  width: 100%;
  height: 100%;
}

.customer-registration {
  width: 100%;
  height: auto;
  min-height: 100%;
  background-color: #f6f6f6;
  overflow: hidden;
}

.common-box_ {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding: 0 28upx;
  box-sizing: border-box;
}
.common-box {
  width: 100%;
  height: 110upx;
  border-bottom: 1upx solid #f5f5f5;
}
.c-r-box {
  display: flex;
  align-items: center;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: #333333;
  font-size: 38upx;
}
.c-r-input {
  display: flex;
  align-items: center;
}
.c-r-input>.c-r-i-left {
  flex: 0 0 170upx;
  display: flex;
  align-items: center;
}
.c-r-input>.c-r-i-left>text {
  line-height: 1;
  font-family: PingFang-SC-Bold;
  font-size: 30upx;
  color: #191f25;
}
.c-r-input>.c-r-i-middle {
  flex: 1 1 auto;
  height: 100%;
  font-size: 30upx;
}
.c-r-input>.c-r-i-right {
  flex: 0 0 160upx;
  height: 48upx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1upx solid #f5f5f5;
}
.c-r-input>.c-r-i-right>view {
  width: 160upx;
	height: 48upx;
  border-radius: 25upx;
  display: flex;
  overflow: hidden;
}
.c-r-input>.c-r-i-right>view>view {
  flex: 1;
  height: 100%;
  color: #c0c1c3;
  background-color: #f4f4f4;
  font-size: 26upx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-r-input>.c-r-i-right>view>.c-r-i-r-avtive {
  background-color: #0084ff;
  color: #ffffff;
}

.movable-box {
  position: relative;
  width: 100%;
  height: 150upx;
  background-color: #ffffff;
}
.movable-box-area_ {
  width: calc(100% - 150upx);
  position: absolute;
  top: 65upx;
  left: 75upx;
  height: 75upx;
}
.movable-box-area_>.m-b-a {
  position: relative;
  width: 100%;
  height: 75upx;
}
.movable-box-area {
  position: absolute;
  left: 50upx;
  top: 10upx;
  width: calc(100% - 100upx);
  height: 80upx;
}
.movable-box-area_>.m-b-a>view:nth-child(1) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6upx;
  background-color: #eeeeee;
  border-radius: 3upx;
}
.movable-box-area_>.m-b-a>view:nth-child(2) {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 6upx;
  background-color: #0084ff;
  border-radius: 3upx;
}
.movable-box-area_>.m-b-a>view:nth-child(3) {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60upx;
  display: flex;
}
.movable-box-area_>.m-b-a>view:nth-child(3)>view {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a3a5a8;
  font-size: 24upx;
}
.movable-box-area>.movable-box-view {
  width: 50upx;
	height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.movable-box-area>.movable-box-view>.m-b-v-1 {
  width: 170upx;
  line-height: 1;
  color: #0084ff;
  font-size: 30upx;
  text-align: center;
}
.movable-box-area>.movable-box-view>.m-b-v-2 {
  width: 50upx;
  height: 50upx;
	box-shadow: 0 2upx 2upx 0 rgba(176, 215, 255, 0.85);
  border-radius: 50%;
  background-image: url('http://cdn.haofang.net/static/xfldDeveloper/build/rangeIcon.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.layout-box {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
}
.layout-box>view {
  width: 206upx;
  height: 66upx;
	background-color: #f7f7f7;
  border-radius: 4upx;
  color: #a3a5a8;
  font-size: 28upx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout-box>.l-b-active {
  background-color: #0084ff;
  color: #ffffff;
}
.layout-box>view:nth-child(2), .layout-box>view:nth-child(5) {
  margin: 0 38upx;
}
.layout-box>view:nth-child(n + 4) {
  margin-top: 19upx;
  margin-bottom: 19upx;
}

.pay-way-box {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
}
.pay-way-box>view {
  width: 206upx;
  height: 66upx;
	background-color: #f7f7f7;
  border-radius: 4upx;
  color: #a3a5a8;
  font-size: 28upx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 19upx 0;
}
.pay-way-box>view:nth-child(2) {
  margin-left: 38upx;
  margin-right: 38upx;
}
.pay-way-box>.p-w-active {
  background-color: #0084ff;
  color: #ffffff;
}

.other-text-area {
  position: relative;
  width: 100%;
  height: auto;
  background-color: #ffffff;
}
.other-text-area>textarea {
  width: 100%;
  height: 260upx;
  background-color: #f6f6f6;
  border-radius: 4px;
  font-size: 32upx;
  padding: 30upx;
  box-sizing: border-box;
}
.p-w-num {
  position: absolute;
  right: 0;
  bottom: 16upx;
  width: 100upx;
  text-align: center;
  line-height: 1;
  color: #bbbbbb;
  font-size: 28upx;
}

.save-btn {
  width: 695upx;
	height: 98upx;
	background-color: #0084ff;
  border-radius: 6upx;
  margin: 34upx auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 32upx;
}
</style>
