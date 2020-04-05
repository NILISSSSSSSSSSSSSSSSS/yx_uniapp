<template>
  <view class="page-rule">
    <scroll-view scroll-y="true" class="scroll-view">
      <!-- 合作规则 -->
      <view id="hzgz" class="box-common">
        <view class="b-c-top" @click="goToLookOrEditHYZ('hzgz')">
          <view>合作规则</view>
        </view>
        <view class="b-c-content">
          <view>
            <view>合作期限:</view>
            <view>{{cooperationRule.cooperationTime || '- -'}}</view>
          </view>
          <view>
            <view>独家优惠:</view>
            <view>{{cooperationRule.exclusiveDiscount || '- -'}}</view>
          </view>
          <view>
            <view>团购优惠:</view>
            <view>{{cooperationRule.groupPurchaseDiscount || '- -'}}</view>
          </view>
        </view>
      </view>
      <!-- 佣金规则 -->
      <view class="box-common">
        <view class="b-c-top" @click="goToLookOrEditHYZ('yjgz')">
          <view>佣金规则</view>
        </view>
        <view class="b-c-content">
          <view>
            <view>方 案:</view>
            <view>{{commisonRule.ruleDesc || '- -'}}</view>
          </view>
          <view>
            <view>结算规则:</view>
            <view>{{commisonRule.balance || '- -'}}</view>
          </view>
          <view>
            <view>带看奖励:</view>
            <view>{{commisonRule.seeReward ? commisonRule.seeReward + '元' : '0'}}</view>
          </view>
          <view>
            <view>成交奖励:</view>
            <view>{{commisonRule.dealReward ? commisonRule.dealReward + '元' : '0'}}</view>
          </view>
        </view>
      </view>
      <!-- 注意事项 -->
      <view class="box-common">
        <view class="b-c-top" @click="goToLookOrEditHYZ('zysx')">
          <view>注意事项</view>
        </view>
        <view class="b-c-content">
          <view>
            <view>提前报备:</view>
            <view>{{distributionRule.advancePreparationTime ? distributionRule.advancePreparationTime + '小时' : '- -'}}</view>
          </view>
          <view>
            <view>带看保护:</view>
            <view>{{distributionRule.seeProtectionTime ? distributionRule.seeProtectionTime + '天' : '- -'}}</view>
          </view>
          <view>
            <view>报备保护:</view>
            <view>{{distributionRule.transactionProtectionTime ? distributionRule.transactionProtectionTime + '天' : '- -'}}</view>
          </view>
          <view>
            <view>报备禁区:</view>
            <view>{{distributionRule.findCustForbiddenArea || '- -'}}</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { buildModel } from '@/model/buildModel.js'

export default {
  data () {
    return {
      cooperationRule: {},
      commisonRule: {},
      distributionRule: {}
    }
  },
  onLoad (params = {}) {
    this.buildId = params.buildId
    this.initData()
  },
  methods: {
    initData () {
      if (new buildModel().getModel('savepageRulesData')) {
        let obj = new buildModel().getModel('savepageRulesData') || {}
        this.cooperationRule = obj.cooperationRule
        this.commisonRule = obj.commisonRule
        this.distributionRule = obj.distributionRule
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

<style lang="scss" scoped>
.page-rule {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .scroll-view {
    height: 100%;
    padding-bottom: 60upx;
    box-sizing: border-box;
  }
  .box-common {
    width: 100%;
    height: auto;
    padding: 0 40upx 0;
    box-sizing: border-box;
    background-color: #ffffff;
    &>.b-c-top {
      width: 100%;
      height: 120upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &>view {
        color: #191f25;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        font-size: 38upx;
      }
    }
    &:nth-child(7) {
      padding-bottom: 40upx;
    }
    &>.b-c-content {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      &>view {
        flex: 0 0 100%;
        width: 100%;
        height: auto;
        display: flex;
        margin-bottom: 20upx;
        // align-items: center;
        &>view {
          &:nth-child(1) {
            flex: 0 0 140upx;
            color: #a3a5a8;
            font-family: PingFang-SC-Medium;
            font-size: 28upx;
          }
          &:nth-child(2) {
            flex: 1 1 auto;
            color: #191f25;
            font-family: PingFang-SC-Medium;
            font-size: 28upx;
          }
        }
      }
    }
  }
}
</style>
