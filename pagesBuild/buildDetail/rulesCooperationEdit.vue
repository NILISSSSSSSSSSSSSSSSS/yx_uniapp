<template>
  <view class="rules-cooperation-edit">
    <view class="common-box">
      <view class="common-box_">
        <!-- 合作期限 -->
        <view class="item-date" @click="selectDate()">
          <view>
            <view>合作期限</view>
            <view>
              <view>{{paramsObj.cooperationBeginDate || '请选择'}}</view>
              <view>~</view>
              <view>{{paramsObj.cooperationEndDate || '请选择'}}</view>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
      </view>
      <view class="gray-view"></view>
      <view class="common-box_">
        <!-- 独家优惠 -->
        <view class="item-textarea">
          <view>独家优惠</view>
          <view>
            <textarea v-if="!isSHowCopyTextarea" v-model="paramsObj.specialDiscountDesc" placeholder="请输入独家优惠" maxlength="30" placeholder-style="color: #bbbbbb;" />
            <view class="copy-textarea" v-if="isSHowCopyTextarea">
              {{paramsObj.specialDiscountDesc}}
            </view>
            <view class="num-view">{{paramsObj.specialDiscountDesc.length}}/30</view>
          </view>
        </view>
        <!-- 团购优惠 -->
        <view class="item-textarea">
          <view>团购优惠</view>
          <view>
            <textarea v-if="!isSHowCopyTextarea" v-model="paramsObj.groupDiscountDesc" placeholder="请输入团购优惠" maxlength="30" placeholder-style="color: #bbbbbb;" />
            <view class="copy-textarea" v-if="isSHowCopyTextarea">
              {{paramsObj.groupDiscountDesc}}
            </view>
            <view class="num-view">{{paramsObj.groupDiscountDesc.length}}/30</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 保存 -->
    <view class="save-btn" v->
      <view @click="save()" class="view-btn">保存</view>
    </view>
    <ei-calendar
      :visible.sync="isShowDate"
      type="range"
      v-model="customDate"
      format="YYYY-MM-DD"
      @submit="changeDate"
      @close="closeDate">
    </ei-calendar>
  </view>
</template>

<script>
import { GetCooperationRule, SaveCooperationRule } from '@/net/BuildNet.js'
import EiCalendar from '@/components/ei-calendar/ei-calendar.vue'
import { Const } from "@/utils/Const.js"
import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"

export default {
  data () {
    return {
      buildId: '',
      paramsObj: {
        buildId: '',
        cooperationBeginDate: '', // 合作开始日期
        cooperationEndDate: '', // 合作结束日期
        specialDiscountDesc: '', // 独家特惠
        groupDiscountDesc: '' // 团购特惠
      },
      customDate: [],
      isShowDate: false,
      isSHowCopyTextarea: false
    }
  },
  components: {
    EiCalendar 
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
          this.customDate[0] = this.paramsObj.cooperationBeginDate || ''
          this.customDate[1] = this.paramsObj.cooperationEndDate || ''
        }
      })
    },
    // 选择时间
    selectDate () {
      this.isShowDate = true
      this.isSHowCopyTextarea = true
    },
    // 关闭日历
    closeDate () {
      this.isSHowCopyTextarea = false
    },
    // 日期改变
    changeDate (data) {
      console.log(data)
      this.paramsObj.cooperationBeginDate = data[0] || ''
      this.paramsObj.cooperationEndDate = data[1] || ''
    },
    // 保存
    save () {
      if (!this.paramsObj.cooperationBeginDate || !this.paramsObj.cooperationEndDate) {
        this.DifferenceApi.showToast('请填写合作期限')
        return
      }
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

.rules-cooperation-edit {
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
      &>.item-date {
        width: 100%;
        height: $commonHeight;
        display: flex;
        align-items: center;
        &>view {
          &:nth-child(1) {
            flex: 1 1 auto;
            height: 100%;
            display: flex;
            &>view {
              display: flex;
              align-items: center;
              font-family: PingFang-SC-Medium;
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
                display: flex;
                justify-content: space-around;
                align-items: center;
                &>view {
                  flex: 1 1 auto;
                  text-align: center;
                  &:nth-child(2) {
                    flex: 0 0 40upx;
                    color: #a3a5a8;
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
            &>.copy-textarea {
              width: 100%;
              height: 100%;
              padding: 20upx;
              font-family: PingFang-SC-Medium;
              font-size: 32upx;
              box-sizing: border-box;
              color: #191f25;
              background-color: #f6f6f6;
            }
            &>.num-view {
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
