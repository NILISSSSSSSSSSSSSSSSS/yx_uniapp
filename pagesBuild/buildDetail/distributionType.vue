<template>
  <view class="distribution-type">
    <view class="f-x-box" v-if="layoutLists.length !== 0">
      <block v-for="(item, index) in layoutLists" :key="index">
        <view class="f-x-b-item">
          <view class="f-x-b-i-left" :class="{'active-zygw': accountSource === 1}">
            <view class="t-left">
              <view class="t-l-name" v-if="item.layoutNo">{{item.layoutNo}}</view>
              <image :src="item.picUrl || 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'" mode="aspectFit"></image>
            </view>
            <view class="t-right">
              <view class="t-r_ t-r-1">
                <view class="t-r-1-1" :class="{'active': item.houseUseage, 'active-zygw': accountSource === 1}">{{setLayout(item.rooms, item.halls, item.weis, item.yangs)}}</view>
                <view class="t-r-1-2" v-if="item.houseUseage">{{item.houseUseage || '--'}}</view>
                <view class="t-r-1-3" :style="{'color': buildTypeObj[item.layoutStatus].color, 'background-color': buildTypeObj[item.layoutStatus].bgColor}">{{buildTypeObj[item.layoutStatus].value}}</view>
              </view>
              <view class="t-r_ t-r-2" v-if="item.buildArea || item.orientation">{{item.buildArea ? '建面' + item.buildArea + '㎡' : ''}} {{item.orientation ? item.orientation : ''}}</view>
              <scroll-view scroll-x="true" class="t-r_ t-r-3" v-if="item.tagIdsShow.length !== 0">
                <view class="t-r-3_">
                  <block v-for="(m, n) in item.tagIdsShow" :key="n">
                    <view>{{m}}</view>
                  </block>
                </view>
              </scroll-view>
              <view class="t-r_ t-r-4" v-if="item.price">约{{item.price}}万/套</view>
            </view>
          </view>
          <view class="f-x-b-i-right" v-if="accountSource === 2">
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/house-detail-edit.png" @click="editIt(item)"></image>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/delet-icon.png" @click="deletIt(item.layoutId, index)"></image>
          </view>
          <view class="f-x-b-i-bottom">
            <view>{{item.charact || '无'}}</view>
          </view>
        </view>
      </block>
    </view>
    <view class="no-data" v-if="layoutLists.length === 0 && !isLoading">
      <view>
        <image class="n-d-1" src="http://cdn.haofang.net/static/xfldDeveloper/build/no-distribution-type.png"></image>
        <view class="n-d-2">暂无分销户型</view>
        <view class="n-d-3" @click="addDistributionType()">添加户型</view>
      </view>
    </view>
    <!-- 添加分销户型 -->
		<view class="add-distribution-type" @click="addDistributionType()" v-if="accountSource === 2">
			<image src="http://cdn.haofang.net/static/xfldDeveloper/build/add.png" mode="scaleToFill"></image>
		</view>
  </view>
</template>

<script>
import { GetLayOutPhotoList, DeleteLayOut } from '@/net/BuildNet.js'
import { GetLoginModel } from '@/model/LoginSuccessModel'
import { Const } from "@/utils/Const.js"
import { buildModel } from '@/model/buildModel.js'

import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"

export default {
  data () {
    return {
      accountSource: null, // 1 置业顾问端  2 开发商端
      buildId: '',
      buildTypeObj: Const.buildTypeObj, // 楼盘状态
      layoutLists: [],
      isLoading: true
    }
  },
  onLoad (params = {}) {
    this.buildId = params.buildId;
    this.initData();

    // 监听户型添加修改成功
    new Notification().addObserver(this, "initData", Notify.DistributionChange.Name);
  },
  onShow() {
    this.accountSource = GetLoginModel.getAccountSource()
  },
  methods: {
    initData () {
      this.isLoading = true
      new GetLayOutPhotoList({
        buildId: this.buildId
      }).send().then(res => {
        console.log(res)
        this.isLoading = false
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          let list = res.data.list || []
          this.layoutLists = list
          // 标签处理
          for (let item of list) {
            if (item.tagIds) {
              item.tagIdsShow = item.tagIds.split('|')
            } else {
              item.tagIdsShow = []
            }
          }
          console.log(list)
          this.layoutLists = list
        }
      })
    },
    // 几室几厅几卫几阳台
    setLayout (room, hall, wei, yang) {
      let roomName = room ? room + '室' : ''
      let hallName = hall ? hall + '厅' : ''
      let weiName = wei ? wei + '卫' : ''
      let yangName = yang ? yang + '阳台' : ''
      return roomName + hallName + weiName + yangName
    },
    // 添加分销户型
    addDistributionType () {
      uni.navigateTo ({
        url: '/pagesBuild/buildDetail/addEditDistributionType?type=add&buildId=' + this.buildId
      })
    },
    // 编辑
    editIt (item) {
      new buildModel().setModel(item, 'distributionItem')
      uni.navigateTo ({
        url: '/pagesBuild/buildDetail/addEditDistributionType?type=edit&buildId=' + this.buildId
      })
    },
    // 删除
    deletIt (id, index) {
      let _this = this
      uni.showModal({
        title: '提示',
        content: '是否确认删除？',
        success: function (res) {
          if (res.confirm) {
            new DeleteLayOut({
              layoutId: id
            }).send().then(res => {
              console.log(res)
              if (res.errCode !== Const.success) {
                _this.DifferenceApi.showToast(res.errMsg)
              } else {
                _this.DifferenceApi.showToast('删除成功')
                // _this.layoutLists.splice(index, 1)
                new Notification().postNotification(Notify.DistributionDelChange.Name)
              }
            })
          }
        }
      })
    }
  },
  onUnload () {
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
.distribution-type {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  &>.f-x-box {
    width: 100%;
    height: auto;
    padding: 0 40upx 40upx;
    box-sizing: border-box;
    &>.f-x-b-item {
      width: 100%;
      height: auto;
      margin-top: 60upx;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      &:nth-child(1) {
        margin-top: 0;;
      }
      &>.f-x-b-i-left {
        flex: 0 0 auto;
        width: calc(100% - 150upx);
        height: auto;
        display: flex;
        margin-right: 80upx;
        &.active-zygw {
          width: 100%;
          margin-right: 0;
        }
        &>.t-left {
          position: relative;
          flex: 0 0 210upx;
          width: 210upx;
          height: 160upx;
          background-color: #ffffff;
          border-radius: 4upx;
          border: solid 2upx #ebebeb;
          margin-right: 30upx;
          &>.t-l-name {
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 32upx;
            line-height: 32upx;
            text-align: center;
            background-image: linear-gradient(#0084ff, #0084ff), linear-gradient(#3072f6, #3072f6);
            border-radius: 4upx 0 4upx 0;
            color: #ffffff;
            font-family: PingFang-SC-Medium;
            font-size: 22upx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            z-index: 9;
          }
          &>image {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        &>.t-right {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &>.t-r_ {
            width: 100%;
            height: auto;
            &.t-r-1 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              &>view {
                &.t-r-1-1 {
                  width: auto;
                  max-width: 200upx;
                  color: #191f25;
                  font-family: PingFang-SC-Bold;
                  font-size: 30upx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  &.active {
                    max-width: 150upx;
                  }
                  &.active-zygw {
                    max-width: 300upx;
                  }
                }
                &.t-r-1-2 {
                  width: 52upx;
                  height: 30upx;
                  line-height: 30upx;
                  text-align: center;
                  background-color: rgba(255, 177, 9, 0.07);
                  border-radius: 4upx;
                  color: #ffb109;
                  font-family: PingFang-SC-Medium;
                  font-size: 22upx;
                }
                &.t-r-1-3 {
                  width: 52upx;
                  height: 30upx;
                  line-height: 30upx;
                  text-align: center;
                  background-color: rgba(0, 132, 255, 0.07);
                  border-radius: 4upx;
                  color: #0084ff;
                  font-family: PingFang-SC-Medium;
                  font-size: 22upx;
                }
              }
            }
            &.t-r-2 {
              line-height: 1;
              color: #a3a5a8;
              font-family: PingFang-SC-Medium;
              font-size: 22upx;
            }
            &.t-r-4 {
              color: #fa5741;
              font-family: PingFang-SC-Bold;
              font-size: 28upx;
            }
          }
          .t-r-3 {
            .t-r-3_ {
              width: auto;
              display: flex;
              &>view {
                // width: auto;
                flex: 0 0 auto;
                height: 32upx;
                line-height: 30upx;
                text-align: center;
                border-radius: 4upx;
                border: solid 1upx rgba(163, 165, 168, 0.5);
                color: #a3a5a8;
                font-family: PingFang-SC-Medium;
                font-size: 20upx;
                margin-right: 5%;
                padding: 0 8upx;
                box-sizing: border-box;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
      &>.f-x-b-i-right {
        flex: 0 0 68upx;
        height: 162upx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-end;
        border-left: 2upx solid #ebebeb;
        &>image {
          height: 34upx;
          display: block;
          &:nth-child(1) {
            width: 32upx;
          }
          &:nth-child(2) {
            width: 34upx;
          }
        }
      }
      &>.f-x-b-i-bottom {
        width: 100%;
        height: 100upx;
        // padding: 20upx;
        background-color: #f8f8f8;
        border-radius: 4upx;
        margin-top: 30upx;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        &>view {
          width: calc(100% - 40upx);
          height: auto;
          max-height: 66upx;
          color: #a3a5a8;
          font-family: PingFang-SC-Medium;
          font-size: 24upx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
  &>.add-distribution-type {
    position: fixed;
    right: 48upx;
    bottom: 54upx;
    width: 90upx;
    height: 90upx;
    z-index: 999;
    &>image {
      width: 90upx;
      height: 90upx;
      display: block;
    }
  }
  &>.no-data {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    &>view {
      width: 100%;
      height: auto;
      &>.n-d-1 {
        width: 374upx;
        height: 174upx;
        display: block;
        margin: 0 auto;
      }
      &>.n-d-2 {
        width: 100%;
        height: auto;
        margin-top: 60upx;
        line-height: 1;
        text-align: center;
        color: #c0c1c3;
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
      }
      &>.n-d-3 {
        width: 280upx;
        height: 90upx;
        line-height: 90upx;
        background-color: #0084ff;
        border-radius: 10upx;
        margin: 60upx auto 0;
        text-align: center;
        color: #ffffff;
        font-family: PingFang-SC-Bold;
        font-size: 32upx;
      }
    }
  }
}
</style>
