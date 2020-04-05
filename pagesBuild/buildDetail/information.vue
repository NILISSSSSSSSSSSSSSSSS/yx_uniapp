<template>
  <view class="information-box">
    <!-- 楼盘信息 -->
    <view class="build-detail">
      <view class="common-title">
        <view class="c-t-name">楼盘信息</view>
        <image class="c-t-icon" src="http://cdn.haofang.net/static/xfldDeveloper/build/house-detail-edit.png" @click="goToEditHouse()" v-if="accountSource === 2"></image>
      </view>
      <!-- 一排两个 -->
      <view class="b-d-info">
        <view><text>省 份：</text><text>{{detailInformation.provinceName || '--'}}</text></view>
        <view><text>城 市：</text><text>{{detailInformation.cityName || '--'}}</text></view>
        <view><text>行 政 区：</text><text>{{detailInformation.regName || '--'}}</text></view>
        <view><text>板 块：</text><text>{{detailInformation.sectionName || '--'}}</text></view>
        <view><text>楼盘名称：</text><text>{{detailInformation.buildName || '--'}}</text></view>
        <view><text>楼盘地址：</text><text>{{detailInformation.buildAddr || '--'}}</text></view>
        <view><text>物业类型：</text><text>{{detailInformation.useageType || '--'}}</text></view>
        <view><text>建筑类型：</text><text>{{dealHouseType(detailInformation.buildType)}}</text></view>
        <view><text>开发商：</text><text>{{detailInformation.devloperName || '--'}}</text></view>
        <view><text>售楼电话：</text><text>{{detailInformation.sellTele || '--'}}</text></view>
        <view><text>楼盘状态：</text><text>{{buildTypeObj[detailInformation.buildStatus].value || '--'}}</text></view>
        <view><text>售 价：</text><text>{{detailInformation.priceTotal ? detailInformation.priceTotal : '--'}}</text></view>
        <view><text>开盘时间：</text><text>{{detailInformation.openDate || '--'}}</text></view>
        <view><text>交房日期：</text><text>{{detailInformation.submitDate || '--'}}</text></view>
        <view><text>装修情况：</text><text>{{detailInformation.buildFitment || '--'}}</text></view>
        <view><text>产权年限：</text><text>{{detailInformation.rightYears || '--'}}</text></view>
        <view><text>占地面积：</text><text>{{detailInformation.buildArea ? detailInformation.buildArea + '㎡' : '--'}}</text></view>
        <view><text>建筑面积：</text><text>{{detailInformation.constractArea ? detailInformation.constractArea + '㎡' : '--'}}</text></view>
        <view><text>物 业 费：</text><text>{{detailInformation.costStandard ? detailInformation.costStandard + '元/㎡/月' : '--'}}</text></view>
        <view><text>绿 化 率：</text><text>{{detailInformation.projectGreen ? detailInformation.projectGreen + '%' : '--'}}</text></view>
        <view><text>容 积 率：</text><text>{{detailInformation.projectSpace || '--'}}</text></view>
        <view><text>总 户 数：</text><text>{{detailInformation.projectCover || '--'}}</text></view>
        <view><text>车 位 比：</text><text>{{detailInformation.carsCase || '--'}}</text></view>
      </view>
      <!-- 一排一个 -->
      <view class="b-d-basic">
        <view><text>售楼地址：</text><text>{{detailInformation.sellAddr || '--'}}</text></view>
        <view><text>楼层状况：</text><text>{{detailInformation.floorText || '--'}}</text></view>
      </view>
      <!-- 楼盘简介 -->
      <view class="desc-box">
        <view class="common-title">
          <view class="c-t-name">楼盘简介</view>
          <image class="c-t-icon" src="http://cdn.haofang.net/static/xfldDeveloper/build/house-detail-edit.png" @click="goToEditHouse()" v-if="accountSource === 2"></image>
        </view>
        <view class="d-b-content">
          {{detailInformation.buildDescript || '暂无内容'}}
        </view>
      </view>
      <!-- 周边配套 -->
      <view class="desc-box">
        <view class="common-title">
          <view class="c-t-name">周边配套</view>
          <image class="c-t-icon" src="http://cdn.haofang.net/static/xfldDeveloper/build/house-detail-edit.png" @click="goToEditHouse()" v-if="accountSource === 2"></image>
        </view>
        <view class="d-b-content">
          {{detailInformation.surroundSupporting || '暂无内容'}}
        </view>
      </view>
      <!-- 楼盘位置 -->
      <view class="desc-box">
        <view class="common-title">
          <view class="c-t-name">楼盘位置</view>
        </view>
        <view class="d-b-content-another">
          <view>
            <view>{{detailInformation.buildName}}</view>
            <view>
              <image src="http://cdn.haofang.net/static/xfldDeveloper/build/icon_dinwei.png"></image>
            </view>
          </view>
          <image :src="mapUrl"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { GetBuildDetails } from '@/net/BuildNet.js'
import { GetLoginModel } from '@/model/LoginSuccessModel'
import { Const } from "@/utils/Const.js"
import { Utils } from '@/utils/Utils.js'
import { GpsInfoModel } from "@/model/GpsInfoModel"
import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"

export default {
  data () {
    return {
      accountSource: null, // 1 置业顾问端  2 开发商端
      buildId: '',
      buildTypeObj: Const.buildTypeObj, // 楼盘状态
      detailInformation: {},
      houseTypeObj: {}, // 建筑类型
      mapUrl: '' // 楼盘位置地图
    }
  },
  onLoad (params = {}) {
    this.buildId = params.buildId
    this.getHouseTypeObj()
    this.getDetail()

    // 监听楼盘添加修改成功
    new Notification().addObserver(this, "getDetail", Notify.SaveBuildChange.Name);
  },
  onShow() {
    this.accountSource = GetLoginModel.getAccountSource()
  },
  methods: {
    // 获取详情
    getDetail () {
      new GetBuildDetails({
        buildId: this.buildId
      }).send().then(res => {
        console.log(res)
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          this.detailInformation = res.data
          // 地图
          let gpsInfo = new GpsInfoModel().getModel("gpsInfo") || {};
          this.mapUrl = new Utils().getMapStaticImg(res.data.positionX || gpsInfo.lat, res.data.positionY || gpsInfo.lng, 335, 240);
        }
      })
    },
    // 编辑
    goToEditHouse () {
      uni.navigateTo({
        url: "/pagesBuild/addEditBuilding/addEditBuildingFirst?type=edit&buildId=" + this.buildId
      })
    },
    // 初始化建筑类型
    getHouseTypeObj () {
      let houseTypeList = Const.houseTypeList || [];
      for (let item of houseTypeList) {
        this.houseTypeObj[item.value] = item.text
      }
      console.log(this.houseTypeObj, 'houseTypeObj')
    },
    // 处理建筑类型
    dealHouseType (typeStr) {
      if (typeStr) {
        let typeList = typeStr.split(',')
        typeList.forEach((item, index) => {
          typeList[index] = this.houseTypeObj[item] || item
        })
        return typeList.join(',')
      } else {
        return '- -'
      }
    }
  },
  onUnload () {
    new Notification().removeObserverAllNotification(this);
  }
}
</script>

<style lang="scss" scoped>
.information-box {
  width: 100%;
  height: auto;
  background-color: #f6f6f6;
  overflow: hidden;
  .b-d-basic {
    width: 100%;
    height: auto;
    padding: 0 28upx 28upx;
    background-color: #ffffff;
    box-sizing: border-box;
    &>view {
      width: 100%;
      height: auto;
      min-height: 60upx;
      display: flex;
      align-items: center;
      font-size: 24upx;
      line-height: 1;
      &>text {
        &:nth-child(1) {
          flex: 0 0 144upx;
          width: 144upx;
          color: #999999;
          font-size: 28upx;
        }
        &:nth-child(2) {
          flex: 0 0 calc(100% - 144upx);
          width: calc(100% - 144upx);
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .b-d-info {
    width: 100%;
    height: auto;
    padding: 0 28upx;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    &>view {
      flex: 0 0 50%;
      width: 50%;
      height: 60upx;
      display: flex;
      align-items: center;
      line-height: 1;
      &>text {
        height: auto;
        &:nth-child(1) {
          width: 144upx;
          color: #a3a5a8;
          font-size: 28upx;
        }
        &:nth-child(2) {
          width: calc(100% - 144upx);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #191f25;
          font-size: 24upx;
          line-height: 28upx;
        }
      }
    }
  }
  .desc-box {
    width: 100%;
    height: auto;
    margin-top: 20upx;
    background-color: #ffffff;
    &>.d-b-content {
      width: 100%;
      height: auto;
      color: #7d8184;
      font-size: 28upx;
      padding: 0 28upx 28upx;
      box-sizing: border-box;
    }
    &>.d-b-content-another {
      position: relative;
      width: 100%;
      height: 480upx;
      padding: 0 28upx 28upx;
      box-sizing: border-box;
      &>view {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 280upx;
        height: 152upx;
        margin-left: -140upx;
        margin-top: -76upx;
        z-index: 9;
        &>view {
          &:nth-child(1) {
            width: 100%;
            height: 100upx;
            line-height: 90upx;
            background-image: url('http://cdn.haofang.net/static/xfldDeveloper/build/map-bj.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            color: #191f25;
            font-family: PingFang-SC-Medium;
            font-size: 30upx;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:nth-child(2) {
            width: 52upx;
            height: 52upx;
            margin: 0 auto;
            &>image {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
      &>image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .common-title {
    width: 100%;
    height: 96upx;
    display: flex;
    align-items: center;
    padding: 0 28upx;
    box-sizing: border-box;
    background-color: #ffffff;
    &>.c-t-name {
      flex: 1 1 auto;
      height: 100%;
      display: flex;
      align-items: center;
      color: #191f25;
      font-size: 38upx;
      font-weight: bold;
    }
    &>.c-t-icon {
      flex: 0 0 32upx;
      width: 32upx;
      height: 34upx;
      display: block;
    }
  }
}
</style>
