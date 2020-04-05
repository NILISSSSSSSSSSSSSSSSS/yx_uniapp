<template>
  <view class="commission-rule-edit">
    <scroll-view scroll-y="true" class="common-box">
      <view class="top-warning">
        <image src="http://cdn.haofang.net/static/xfldDeveloper/build/waring.png"></image>
        <view>带看、成交奖励不限组数可不填写，限制几组则填写具体组数</view>
      </view>
      <view class="common-box_">
        <!-- 佣金方案 -->
        <view class="item-normal" style="border-bottom: none;">
          <view>佣金方案</view>
          <view>
            <input type="text" v-model="paramsObj.commissionDesc" placeholder="请输入" maxlength="50" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
      </view>
      <view class="gray-view"></view>
      <view class="common-box_">
        <!-- 带看奖励 -->
        <view class="top-title">带看奖励</view>
        <!-- 金额 -->
        <view class="item-normal-another">
          <view>
            <view>金 额</view>
            <view>
              <input type="number" v-model="paramsObj.visitReward" placeholder="请输入" maxlength="5" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>元</view>
        </view>
        <!-- 组数限制 -->
        <view class="item-normal">
          <view>组数限制</view>
          <view>
            <input type="number" v-model="paramsObj.visitRewardLimit" placeholder="请输入" maxlength="2" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
        <!-- 结算延后时间 -->
        <view class="item-select">
          <view>
            <view>结算延后时间</view>
            <view>
              <picker mode="selector" :range="balanceTimeList" range-key="text" :value="balanceTimeVisitIndex" @change="balanceTimeVisitChange">
                <view class="uni-input" :class="{'active': balanceTimeList[balanceTimeVisitIndex].text ? true : false}">{{balanceTimeList[balanceTimeVisitIndex].text || '请选择'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 提现延后日 -->
        <view class="item-normal-another" style="border-bottom: none;">
          <view>
            <view>提现延后日</view>
            <view>
              <input type="number" v-model="paramsObj.visitRewardCustomerDelayDay" maxlength="2" @input="inputDateD" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>号</view>
        </view>
      </view>
      <view class="gray-view"></view>
      <view class="common-box_">
        <!-- 成交奖励 -->
        <view class="top-title">成交奖励</view>
        <!-- 金额 -->
        <view class="item-normal-another">
          <view>
            <view>金 额</view>
            <view>
              <input type="number" v-model="paramsObj.dealReward" placeholder="请输入" maxlength="5" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>元</view>
        </view>
        <!-- 组数限制 -->
        <view class="item-normal">
          <view>组数限制</view>
          <view>
            <input type="number" v-model="paramsObj.dealRewardLimit" maxlength="2" placeholder="请输入" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
        <!-- 结算延后时间 -->
        <view class="item-select">
          <view>
            <view>结算延后时间</view>
            <view>
              <picker mode="selector" :range="balanceTimeList" range-key="text" :value="balanceTimeDealIndex" @change="balanceTimeDealChange">
                <view class="uni-input" :class="{'active': balanceTimeList[balanceTimeDealIndex].text ? true : false}">{{balanceTimeList[balanceTimeDealIndex].text || '请选择'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 提现延后日 -->
        <view class="item-normal-another" style="border-bottom: none;">
          <view>
            <view>提现延后日</view>
            <view>
              <input type="number" v-model="paramsObj.dealRewardCustomerDelayDay" maxlength="2" @input="inputDateC" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>号</view>
        </view>
      </view>
      <view class="gray-view"></view>
      <view class="common-box_">
        <!-- 结算规则 -->
        <view class="item-textarea" style="padding-bottom: 40upx;">
          <view>结算规则</view>
          <view>
            <textarea v-model="paramsObj.settleRuleDesc" placeholder="请输入结算规则" maxlength="50" placeholder-style="color: #bbbbbb;" />
            <view>{{paramsObj.settleRuleDesc.length}}/50</view>
          </view>
        </view>
      </view>
      <view class="gray-view"></view>
      <view class="common-box_">
        <!-- 结佣方式 -->
        <view class="top-title">结佣方式</view>
        <!-- 结算延后时间 -->
        <view class="item-select">
          <view>
            <view>结算延后时间</view>
            <view>
              <picker mode="selector" :range="balanceTimeList" range-key="text" :value="balanceTimeCommissionIndex" @change="balanceTimeCommissionChange">
                <view class="uni-input" :class="{'active': balanceTimeList[balanceTimeCommissionIndex].text ? true : false}">{{balanceTimeList[balanceTimeCommissionIndex].text || '请选择'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 提现延后时间 -->
        <view class="item-normal-another">
          <view>
            <view>提现延后时间</view>
            <view>
              <input type="number" v-model="paramsObj.settleCommissionCustomerDelayDay" maxlength="2" @input="inputDateY" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>号</view>
        </view>
      </view>
    </scroll-view>
    <!-- 保存 -->
    <!-- #ifndef APP-PLUS -->
    <cover-view class="save-btn">
      <cover-view @click="save()" class="view-btn">保存</cover-view>
    </cover-view>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <view class="save-btn">
      <view @click="save()" class="view-btn">保存</view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import { GetCooperationRule, SaveCooperationRule } from '@/net/BuildNet.js'
import { Const } from "@/utils/Const.js"
import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"

export default {
  data () {
    return {
      buildId: '',
      paramsObj: {
        buildId: '',
        cooperationBeginDate: '',
        cooperationEndDate: '',
        commissionDesc: '', // 佣金描述
        visitReward: null, // 带看奖励
        visitRewardCustomerDelayDay: null, // 带看奖励自定义延迟天数
        visitRewardLimit: null, // 带看组数限制
        visitRewardDistributeDelayType: null, // 带看奖励发放推迟时间
        dealReward: null, // 成交奖励
        dealRewardLimit: null, // 成交组数限制
        dealRewardDistributeDelayType: null, // 成交奖励发放推迟时间
        dealRewardCustomerDelayDay: null, // 成交奖励自定义延迟天数
        settleCommissionCustomerDelayDay: null, // 佣金自定义延迟天池天数
        settleCommissionDelayType: null,// 佣金推迟发放时间
        settleRuleDesc: '' // 结算规则描述
      },
      // 结算时间
      balanceTimeList: [
        { text: '自然月', value: 1 },
        { text: '自然周', value: 2 },
        { text: '自定义', value: 3 }
      ],
      balanceTimeVisitIndex: null,
      balanceTimeDealIndex: null,
      balanceTimeCommissionIndex: null,
      timeD: null,
      timeC: null,
      timeY: null
    }
  },
  onLoad (params = {}) {
    this.buildId = params.buildId
    this.initData()
  },
  methods: {
    initData () {
      new GetCooperationRule({
        buildId: this.buildId
      }).send().then(res => {
        console.log(res)
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          let data = res.data || {}
          for (let key in this.paramsObj) {
            this.paramsObj[key] = data[key] || ''
          }
          this.paramsObj.buildId = this.buildId
          // 时间处理
          this.balanceTimeList.forEach((item, index) => {
            if (data.visitRewardDistributeDelayType && Number(data.visitRewardDistributeDelayType) === Number(item.value)) {
              this.balanceTimeVisitIndex = index
            }
            if (data.dealRewardDistributeDelayType && Number(data.dealRewardDistributeDelayType) === Number(item.value)) {
              this.balanceTimeDealIndex = index
            }
            if (data.settleCommissionDelayType && Number(data.settleCommissionDelayType) === Number(item.value)) {
              this.balanceTimeCommissionIndex = index
            }
          })
        }
      })
    },
    // 带看奖励时间
    balanceTimeVisitChange (e) {
      this.balanceTimeVisitIndex = e.detail.value
      this.paramsObj.visitRewardDistributeDelayType = this.balanceTimeList[e.detail.value].value
    },
    // 成交奖励时间
    balanceTimeDealChange (e) {
      this.balanceTimeDealIndex = e.detail.value
      this.paramsObj.dealRewardDistributeDelayType = this.balanceTimeList[e.detail.value].value
    },
    // 结算佣金时间
    balanceTimeCommissionChange (e) {
      this.balanceTimeCommissionIndex = e.detail.value
      this.paramsObj.settleCommissionDelayType = this.balanceTimeList[e.detail.value].value
    },
    inputDateD (e) {
      clearTimeout(this.timeD)
      if (e.detail.value !== '' && Number(e.detail.value) > 31) {
        this.timeD = setTimeout(() => {
          this.paramsObj.visitRewardCustomerDelayDay = 31
        }, 10)
      }
    },
    inputDateC (e) {
      clearTimeout(this.timeC)
      if (e.detail.value !== '' && Number(e.detail.value) > 31) {
        this.timeC = setTimeout(() => {
          this.paramsObj.dealRewardCustomerDelayDay = 31
        }, 10)
      }
    },
    inputDateY (e) {
      clearTimeout(this.timeY)
      if (e.detail.value !== '' && Number(e.detail.value) > 31) {
        this.timeY = setTimeout(() => {
          this.paramsObj.settleCommissionCustomerDelayDay = 31
        }, 10)
      }
    },
    // 保存
    save () {
      new SaveCooperationRule(this.paramsObj).send().then(res => {
        console.log(res)
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          this.DifferenceApi.showToast('保存成功')
          new Notification().postNotification(Notify.RuleChange.Name)
          uni.navigateBack({
            delta: 1
          })
        }
      })
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
$commonHeight: 120upx;

.commission-rule-edit {
  position: relative;
  width: 100%;
  height: 100%;
  &>.common-box {
    width: 100%;
    height: 100%;
    padding-bottom: 190upx;
    box-sizing: border-box;
    .top-warning {
      width: 100%;
      height: 60upx;
      background-color: rgba(255, 177, 9, 0.1);
      display: flex;
      align-items: center;
      padding: 0 20upx;
      box-sizing: border-box;
      &>image {
        width: 28upx;
        height: 28upx;
        display: block;
      }
      &>view {
        flex: 1 1 auto;
        line-height: 1;
        color: #ffb109;
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        padding-left: 14upx;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .common-box_ {
      width: 100%;
      height: auto;
      padding: 0 40upx;
      box-sizing: border-box;
      &>.top-title {
        width: 100%;
        line-height: 120upx;
        color: #191f25;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        font-size: 38upx;
      }
      &>.item-normal {
        width: 100%;
        height: $commonHeight;
        display: flex;
        align-items: center;
        border-bottom: 2upx solid #ebebeb;
        &>view {
          height: 100%;
          display: flex;
          align-items: center;
          font-size: 30upx;
          &:nth-child(1) {
            flex: 0 0 190upx;
            color: #191f25;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
          }
          &:nth-child(2) {
            flex: 1 1 auto;
            &>input {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      &>.item-normal-another {
        width: 100%;
        height: $commonHeight;
        display: flex;
        align-items: center;
        border-bottom: 2upx solid #ebebeb;
        &>view {
          display: flex;
          &:nth-child(1) {
            flex: 1 1 auto;
            height: 100%;
            &>view {
              display: flex;
              align-items: center;
              font-size: 30upx;
              &:nth-child(1) {
                flex: 0 0 190upx;
                height: 100%;
                color: #191f25;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
              }
              &:nth-child(2) {
                flex: 1 1 auto;
                height: 100%;
                color: #191f25;
                font-family: PingFang-SC-Medium;
              }
            }
          }
          &:nth-child(2) {
            flex: 0 0 160upx;
            height: 100%;
            color: #a3a5a8;
            font-family: PingFang-SC-Medium;
            font-size: 30upx;
            align-items: center;
            justify-content: flex-end;
          }
        }
      }
      &>.item-textarea {
        width: 100%;
        height: auto;
        margin-top: 20upx;
        box-sizing: border-box;
        &>view {
          &:nth-child(1) {
            width: 100%;
            height: 120upx;
            line-height: 120upx;
            color: #191f25;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            font-size: 38upx;
          }
          &:nth-child(2) {
            position: relative;
            width: 100%;
            height: 260upx;
            background-color: #f6f6f6;
            border-radius: 10upx;
            &>textarea {
              width: 100%;
              height: 100%;
              padding: 20upx 20upx 50upx;
              font-family: PingFang-SC-Medium;
              font-size: 32upx;
              box-sizing: border-box;
              color: #191f25;
            }
            &>view {
              position: absolute;
              bottom: 16upx;
              right: 24upx;
              width: 100upx;
              line-height: 1;
              text-align: center;
              font-family: PingFang-SC-Medium;
              font-size: 28upx;
              color: #bbbbbb;
            }
          }
        }
      }
      &>.item-select {
        width: 100%;
        height: $commonHeight;
        display: flex;
        align-items: center;
        border-bottom: 2upx solid #ebebeb;
        &>view {
          &:nth-child(1) {
            flex: 1 1 auto;
            height: 100%;
            display: flex;
            &>view {
              display: flex;
              align-items: center;
              font-size: 30upx;
              &:nth-child(1) {
                flex: 0 0 190upx;
                height: 100%;
                color: #191f25;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
              }
              &:nth-child(2) {
                flex: 1 1 auto;
                height: 100%;
                &>picker {
                  width: 100%;
                  height: 100%;
                  .uni-input {
                    width: 100%;
                    height: $commonHeight;
                    display: flex;
                    align-items: center;
                    color: #c0c1c3;
                    font-family: PingFang-SC-Medium;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &.active {
                      color: #191f25;
                    }
                  }
                }
              }
            }
          }
          &:nth-child(2) {
            flex: 0 0 14upx;
            height: 28upx;
            &>image {
              width: 14upx;
              height: 28upx;
              display: block;
            }
          }
        }
      }
    }
    .gray-view {
      width: 100%;
      height: 20upx;
      background-color: #f8f8f8;
    }
  }
  &>.save-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 190upx;
    background-color: #ffffff;
    z-index: 9;
    overflow: hidden;
    .view-btn {
      width: 670upx;
      height: 98upx;
      line-height: 98upx;
      text-align: center;
      margin: 46upx auto 0;
      background-color: #0084ff;
      box-shadow: 0px 7px 15px 1px rgba(0, 0, 0, 0.05);
      border-radius: 10upx;
      color: #ffffff;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      font-size: 32upx;
    }
  }
}
</style>
