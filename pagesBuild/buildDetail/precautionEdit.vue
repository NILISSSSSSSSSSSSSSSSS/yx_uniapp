<template>
  <view class="precaution-edit">
    <view class="common-box">
      <view class="common-box_">
        <!-- 提前报备 -->
        <view class="item-normal-another">
          <view>
            <view>提前报备</view>
            <view>
              <input type="number" v-model="paramsObj.advanceRegisterTime" @input="inputNumTQ" maxlength="5" placeholder="报备到带看的最短时间" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>小时</view>
        </view>
        <!-- 报备保护 -->
        <view class="item-normal-another">
          <view>
            <view>报备保护</view>
            <view>
              <input type="number" v-model="paramsObj.approvalProtectTime" @input="inputNumBB" maxlength="3" placeholder="报备到带看的最短时间" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>天</view>
        </view>
        <!-- 成交保护 -->
        <view class="item-normal-another">
          <view>
            <view>成交保护</view>
            <view>
              <input type="number" v-model="paramsObj.dealProtectTime" @input="inputNumCJ" maxlength="3" placeholder="报备到带看的最短时间" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>天</view>
        </view>
        <!-- 报备电话 -->
        <view class="item-select">
          <view>
            <view>报备电话</view>
            <view>
              <picker mode="selector" :range="phoneNumberTypeList" range-key="name" :value="phoneNumberTypeIndex" @change="phoneNumberTypeChange">
                <view class="uni-input" :class="{'active': phoneNumberTypeName ? true : false}">{{phoneNumberTypeName || '请选择'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 补全电话 -->
        <view class="item-select" style="border-bottom: none;">
          <view>
            <view>补全电话</view>
            <view>
              <picker mode="selector" :range="phoneCompleteTypeList" range-key="name" :value="phoneCompleteTypeIndex" @change="phoneCompleteTypeChange">
                <view class="uni-input" :class="{'active': phoneCompleteTypeName ? true : false}">{{phoneCompleteTypeName || '请选择'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
      </view>
      <view class="gray-view"></view>
      <view class="common-box_">
        <!-- 报备禁区 -->
        <view class="item-textarea">
          <view>报备禁区</view>
          <view>
            <textarea v-model="paramsObj.registerForbiddenArea" placeholder="请输入报备禁区" maxlength="50" placeholder-style="color: #bbbbbb;" />
            <view>{{paramsObj.registerForbiddenArea.length}}/50</view>
          </view>
        </view>
      </view>
    </view>
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
        cooperationBeginDate: '',
        cooperationEndDate: '',
        advanceRegisterTime: null, // 提前报备时间，小时
        approvalProtectTime: null, // 保护时间，天
        dealProtectTime: null, // 成交保护时间，天
        registerPhoneNumberType: '', // 报备电话类型
        registerPhoneCompleteType: '', // 补全电话
        registerForbiddenArea: '' // 报备禁区
      },
      // 报备电话
      phoneNumberTypeList: [
        { value: 1, name: '全号码' },
        { value: 2, name: '前3后4位' },
        { value: 3, name: '前9位' },
        { value: 4, name: '前7位' }
      ],
      phoneNumberTypeIndex: null,
      phoneNumberTypeName: '',
      // 补全电话
      phoneCompleteTypeList: [
        { value: 1, name: '扫码带看时' },
        { value: 2, name: '认购签约时' }
      ],
      phoneCompleteTypeIndex: null,
      phoneCompleteTypeName: '',
      timeTQ: null,
      timeBB: null,
      timeCJ: null
    }
  },
  onLoad (params = {}) {
    this.buildId = params.buildId
    this.initData()
  },
  methods: {
    // 获取数据
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
          // 报备电话处理
          if (data.registerPhoneNumberType !== '') {
            this.phoneNumberTypeList.forEach((item, index) => {
              if (Number(data.registerPhoneNumberType) === Number(item.value)) {
                this.phoneNumberTypeIndex = index
                this.phoneNumberTypeName = item.name
              }
            })
          }
          // 补全电话处理
          if (data.registerPhoneCompleteType !== '') {
            this.phoneCompleteTypeList.forEach((item, index) => {
              if (Number(data.registerPhoneCompleteType) === Number(item.value)) {
                this.phoneCompleteTypeIndex = index
                this.phoneCompleteTypeName = item.name
              }
            })
          }
        }
      })
    },
    // 报备电话改变
    phoneNumberTypeChange (e) {
      this.phoneNumberTypeIndex = e.detail.value
      this.phoneNumberTypeName = this.phoneNumberTypeList[e.detail.value].name
      this.paramsObj.registerPhoneNumberType = this.phoneNumberTypeList[e.detail.value].value
    },
    // 补全电话改变
    phoneCompleteTypeChange (e) {
      this.phoneCompleteTypeIndex = e.detail.value
      this.phoneCompleteTypeName = this.phoneCompleteTypeList[e.detail.value].name
      this.paramsObj.registerPhoneCompleteType = this.phoneCompleteTypeList[e.detail.value].value
    },
    inputNumTQ (e) {
      clearTimeout(this.timeTQ)
      if (e.detail.value !== '' && Number(e.detail.value) <= 0) {
        this.timeTQ = setTimeout(() => {
          this.paramsObj.advanceRegisterTime = ''
        }, 10)
      }
    },
    inputNumBB (e) {
      clearTimeout(this.timeBB)
      if (e.detail.value !== '' && Number(e.detail.value) <= 0) {
        this.timeBB = setTimeout(() => {
          this.paramsObj.approvalProtectTime = ''
        }, 10)
      }
    },
    inputNumCJ (e) {
      clearTimeout(this.timeCJ)
      if (e.detail.value !== '' && Number(e.detail.value) <= 0) {
        this.timeCJ = setTimeout(() => {
          this.paramsObj.dealProtectTime = ''
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

.precaution-edit {
  position: relative;
  width: 100%;
  height: 100%;
  &>.common-box {
    width: 100%;
    height: 100%;
    padding-bottom: 190upx;
    box-sizing: border-box;
    overflow: auto;
    &>.common-box_ {
      width: 100%;
      height: auto;
      padding: 0 40upx;
      box-sizing: border-box;
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
    &>.gray-view {
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
