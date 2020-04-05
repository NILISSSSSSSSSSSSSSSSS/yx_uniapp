<template>
  <view class="add-edit-building">
    <scroll-view class="a-e-b" scroll-y="true">
      <view class="common-box">
        <!-- 第二步 详情信息 -->
        <view class="top-title">详情信息</view>
        <!-- 楼盘状态 -->
        <view class="item-select red-dot">
          <view>
            <view>楼盘状态</view>
            <view>
              <picker mode="selector" :range="buildingStatusList" range-key="value" :value="buildingIndex" @change="buildingStatusChangePicker">
                <view class="uni-input" :class="{'active': buildingStatusName ? true : false}">{{buildingStatusName || '请选择'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 总价 -->
        <view class="item-complex">
          <view>
            <view>总 价</view>
            <view>
              <input type="digit" v-model="paramsObj.minTotalPrice" maxlength="6" @input="inputNumMin" @blur="inputNumBlurMin" placeholder="最小值" placeholder-style="color: #c0c1c3;">
            </view>
            <view>~</view>
            <view>
              <input type="digit" v-model="paramsObj.maxTotalPrice" maxlength="6" @input="inputNumMax" @blur="inputNumBlurMax" placeholder="最大值" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>
            <view>
              <picker mode="selector" :range="unitList" range-key="value" :value="unitIndex" @change="unitChangePicker">
                <view class="uni-input" :class="{'active': paramsObj.totalPriceUnit ? true : false}">{{paramsObj.totalPriceUnit || '请选择'}}</view>
              </picker>
            </view>
            <view>
              <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
            </view>
          </view>
        </view>
        <!-- 销售均价 -->
        <view class="item-normal-another">
          <view>
            <view>销售均价</view>
            <view>
              <input type="number" v-model="paramsObj.averagePrice" maxlength="7" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>元/㎡</view>
        </view>
        <!-- 开盘日期 -->
        <view class="item-select">
          <view>
            <view>开盘日期</view>
            <view>
              <picker mode="date" :value="paramsObj.openingDate" @change="openingDateChange">
                <view class="uni-input" :class="{'active': paramsObj.openingDate ? true : false}">{{paramsObj.openingDate || '请选择日期'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 交房时间 -->
        <view class="item-select">
          <view>
            <view>交房时间</view>
            <view>
              <picker mode="date" :value="paramsObj.handoverTime" @change="handoverTimeChange">
                <view class="uni-input" :class="{'active': paramsObj.handoverTime ? true : false}">{{paramsObj.handoverTime || '请选择日期'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 占地面积 -->
        <view class="item-normal-another">
          <view>
            <view>占地面积</view>
            <view>
              <input type="digit" v-model="paramsObj.occupyArea" maxlength="10" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>㎡</view>
        </view>
        <!-- 产权年限 -->
        <view class="item-select">
          <view>
            <view>产权年限</view>
            <view>
              <picker mode="selector" :range="propertyPeriodList" :value="propertyPeriodIndex" @change="propertyPeriodChange">
                <view class="uni-input" :class="{'active': paramsObj.propertyPeriod ? true : false}">{{paramsObj.propertyPeriod ? paramsObj.propertyPeriod + '年' : '请选择'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 物业费 -->
        <view class="item-normal-another">
          <view>
            <view>物业费</view>
            <view>
              <input type="digit" v-model="paramsObj.propertyFee" maxlength="8" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>元/㎡/月</view>
        </view>
        <!-- 建筑面积 -->
        <view class="item-normal-another">
          <view>
            <view>建筑面积</view>
            <view>
              <input type="digit" v-model="paramsObj.buildingArea" maxlength="12" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>㎡</view>
        </view>
        <!-- 容积率 -->
        <view class="item-normal">
          <view>容积率</view>
          <view>
            <input type="digit" v-model="paramsObj.plotRatio" maxlength="8" placeholder="请输入" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
        <!-- 绿化率 -->
        <view class="item-normal-another">
          <view>
            <view>绿化率</view>
            <view>
              <input type="number" v-model="paramsObj.greeningRatio" maxlength="5" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>%</view>
        </view>
        <!-- 车位比 -->
        <view class="item-normal">
          <view>车位比</view>
          <view>
            <input type="digit" v-model="paramsObj.carportRatio" maxlength="12" placeholder="请输入" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
        <!-- 总户数 -->
        <view class="item-normal-another">
          <view>
            <view>总户数</view>
            <view>
              <input type="number" v-model="paramsObj.totalHouseholds" maxlength="10" placeholder="请输入" placeholder-style="color: #c0c1c3;">
            </view>
          </view>
          <view>套</view>
        </view>
        <!-- 装修程度 -->
        <view class="item-select">
          <view>
            <view>装修程度</view>
            <view>
              <picker mode="selector" :range="decorateDegreeList" :value="decorateDegreeIndex" @change="decorateDegreeChange">
                <view class="uni-input" :class="{'active': paramsObj.decorateDegree ? true : false}">{{paramsObj.decorateDegree || '请选择'}}</view>
              </picker>
            </view>
          </view>
          <view>
            <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
          </view>
        </view>
        <!-- 楼层状况 -->
        <view class="item-normal">
          <view>楼层状况</view>
          <view>
            <input type="text" v-model="paramsObj.floorState" maxlength="140" placeholder="请输入" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
        <!-- 预售许可 -->
        <view class="item-normal" style="border: none;">
          <view>预售许可</view>
          <view>
            <input type="text" v-model="paramsObj.presellLicense" maxlength="25" placeholder="请输入" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
      </view>

      <view class="gray-view"></view>

      <view class="common-box">
        <!-- 标签 -->
        <view class="label-box">
          <view class="l-b-title">
            <text>标签</text>
            <text>(最多选择5个)</text>
          </view>
          <view class="l-b-content">
            <block v-for="(item, index) in labelList" :key="index">
              <view class="l-b-c-item" :class="{'active': item.isActive}" @click="changeLabelStatus(index, item.value)">{{item.value}}</view>
            </block>
          </view>
        </view>
        <!-- 楼盘简介 -->
        <view class="item-textarea">
          <view>楼盘简介</view>
          <view>
            <textarea v-model="paramsObj.buildingIntroduction" placeholder="请输入楼盘简介" maxlength="300" placeholder-style="color: #bbbbbb;" />
            <view>{{paramsObj.buildingIntroduction.length}}/300</view>
          </view>
        </view>
        <!-- 周边配套 -->
        <view class="item-textarea">
          <view>周边配套</view>
          <view>
            <textarea v-model="paramsObj.surroundSupporting" placeholder="请输入周边配套" maxlength="300" placeholder-style="color: #bbbbbb;" />
            <view>{{paramsObj.surroundSupporting.length}}/300</view>
          </view>
        </view>
        <!-- 楼盘位置 -->
        <view class="item-map" @click="selecMap()">
          <view>楼盘位置</view>
          <view>
            <view>
              <image src="http://cdn.haofang.net/static/xfldDeveloper/build/search.png"></image>
              <view :class="{'active': mapName ? true : false}">{{mapName ? mapName : '请输入地点或位置'}}</view>
            </view>
            <view>
              <image :src="mapUrl"></image>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 下一步 -->
    <!-- #ifndef APP-PLUS -->
    <cover-view class="save-btn">
      <cover-view @click="save()" class="view-btn">{{type === 'add' ? '创建' : '保存'}}</cover-view>
    </cover-view>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <view class="save-btn">
      <view @click="save()" class="view-btn">{{type === 'add' ? '创建' : '保存'}}</view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import { GetLoginModel } from "@/model/LoginSuccessModel";
import { Utils } from '@/utils/Utils.js';
import { GpsInfoModel } from "@/model/GpsInfoModel";
import { buildModel } from '@/model/buildModel.js';
import { SaveBuildingInfo } from '@/net/BuildNet.js';
import { Const } from "@/utils/Const.js";
import { Notify } from "@/utils/Notify.js";
import { Notification } from "@/utils/Notification.js";

export default {
  data () {
    // const currentDate = this.getDate();
    return {
      type: '',
      allParamsObj: {},
      paramsObj: {
        city: '',
        buildingState: null, // 楼盘状态
        minTotalPrice: null, // 最低价
        maxTotalPrice: null, // 最高价
        totalPriceUnit: '万元', // 总价单位
        averagePrice: null, // 销售均价
        openingDate: '', // 开盘日期
        handoverTime: '', // 交房日期
        occupyArea: '', // 占地面积
        propertyPeriod: '', // 产权年限
        propertyFee: '', // 物业费
        buildingArea: '', // 建筑面积
        plotRatio: null, // 容积率
        greeningRatio: null, // 绿化率
        carportRatio: null, // 车位比
        totalHouseholds: null, // 总户数
        decorateDegree: '', // 装修程度
        floorState: '', // 楼层状况
        presellLicense: '', // 预售许可
        buildingLabels: '', // 标签
        buildingIntroduction: '', // 楼盘简介
        surroundSupporting: '', // 周边配套
        latitude: '', // 纬度
        longitude: '' // 经度
      },
      // 楼盘状态
      buildingStatusList: [
        { value: '待售', id: 1 },
        { value: '在售', id: 2 },
        { value: '售罄', id: 3 },
        { value: '招商', id: 4 },
        { value: '招租', id: 5 }
      ],
      buildingIndex: null,
      buildingStatusName: '',
      // 总价单位
      unitList: [
        { value: "万元" },
        { value: "元/月" },
        { value: "元/平方米/月" }
      ],
      unitIndex: 0,
      // 产权年限
      propertyPeriodList: ['40', '50', '70'],
      propertyPeriodIndex: null,
      // 装修程度
      decorateDegreeList: ['简装', '毛坯', '精装', '豪装'],
      decorateDegreeIndex: null,
      // 标签
      labelList: [
        { value: '住宅', isActive: true },
        { value: '公寓', isActive: false },
        { value: '花园洋房', isActive: false },
        { value: '不限购', isActive: false },
        { value: 'loft', isActive: false },
        { value: '改善', isActive: false },
        { value: '投资', isActive: false },
        { value: '豪华社区', isActive: false },
        { value: '公园', isActive: false },
        { value: '生态宜居', isActive: false },
        { value: '水景', isActive: false },
        { value: '养老', isActive: false },
        { value: '旅游', isActive: false },
        { value: '打折优惠', isActive: false },
        { value: '小户型', isActive: false },
        { value: '低总价', isActive: false },
        { value: '现房', isActive: false },
        { value: '教育', isActive: false },
        { value: '品牌开发商', isActive: false },
        { value: '地铁', isActive: false },
        { value: '刚需', isActive: false },
        { value: '婚房', isActive: false }
      ],
      selectLabelList: ['住宅'],
      // 地图
      mapUrl: '',
      mapName: '',
      // 验证
      timeMin: null,
      timeMax: null
    }
  },
  onLoad (params = {}) {
    // 18991911991
    this.type = params.type
    if (params.type === 'add') {
      uni.setNavigationBarTitle({
        title: "添加楼盘"
      });
      this.getMapUrl();
    } else {
      uni.setNavigationBarTitle({
        title: "编辑楼盘"
      });
      this.editDealObj();
    }
  },
  methods: {
    // 编辑进来拿到数据处理
    editDealObj () {
      if (new buildModel().getModel('saveParams')) {
        let data = new buildModel().getModel('saveParams') || {};
        this.allParamsObj = data;
        for (let key in data) {
          this.paramsObj[key] = data[key] || '';
        }
        // 地图
        this.mapName = data['buildingName'] || '';
        this.getMapUrl();
        // 楼盘状态处理
        this.buildingStatusList.forEach((item, index) => {
          if (data.buildingState && data.buildingState === item.id) {
            this.buildingIndex = index;
            this.buildingStatusName = item.value;
          }
        });
        // 总价单位处理
        this.unitList.forEach((item, index) => {
          if (data.totalPriceUnit && data.totalPriceUnit === item.value) {
            this.unitIndex = index;
          }
        });
        // 产权年限处理
        this.propertyPeriodList.forEach((item, index) => {
          if (data.propertyPeriod && data.propertyPeriod === item) {
            this.propertyPeriodIndex = index;
          }
        });
        // 装修程度处理
        this.decorateDegreeList.forEach((item, index) => {
          if (data.decorateDegree && data.decorateDegree === item) {
            this.decorateDegreeIndex = index;
          }
        })
        // 标签处理
        this.selectLabelList = this.paramsObj.buildingLabels ? this.paramsObj.buildingLabels.split(',') : [];
        this.labelList.forEach((item, index) => {
          for (let m of this.selectLabelList) {
            if (item.value === m) {
              this.labelList[index].isActive = true
            }
          }
        });
      }
    },
    // 楼盘类型改变
    buildingStatusChangePicker (e) {
      this.buildingIndex = e.detail.value;
      this.buildingStatusName = this.buildingStatusList[e.detail.value].value;
      this.paramsObj.buildingState = this.buildingStatusList[e.detail.value].id;
    },
    // 选择单位
    unitChangePicker (e) {
      this.unitIndex = e.detail.value;
      this.paramsObj.totalPriceUnit = this.unitList[e.detail.value].value;
    },
    // 开盘日期改变
    openingDateChange (e) {
      this.paramsObj.openingDate = e.detail.value;
    },
    // 交房日期改变
    handoverTimeChange (e) {
      this.paramsObj.handoverTime = e.detail.value;
    },
    // 产权年限改变
    propertyPeriodChange (e) {
      this.propertyPeriodIndex = e.detail.value;
      this.paramsObj.propertyPeriod = this.propertyPeriodList[e.detail.value];
    },
    // 装修程度改变
    decorateDegreeChange (e) {
      this.decorateDegreeIndex = e.detail.value;
      this.paramsObj.decorateDegree = this.decorateDegreeList[e.detail.value];
    },
    // 改变label状态
    changeLabelStatus (index, value) {
      if (value === '住宅') return;
      if (!this.labelList[index].isActive) {
        if (this.selectLabelList.length >= 5) {
          this.DifferenceApi.showToast('最多选择5个标签');
          return;
        }
        this.labelList[index].isActive = !this.labelList[index].isActive;
        this.selectLabelList.push(value);
      } else {
        this.labelList[index].isActive = !this.labelList[index].isActive;
        let nowIndex = null;
        this.selectLabelList.forEach((m, n) => {
          if (m === value) {
            nowIndex = n;
          }
        });
        this.selectLabelList.splice(nowIndex, 1);
      }
    },
    // 获取地图图片
    getMapUrl () {
      let gpsInfo = new GpsInfoModel().getModel("gpsInfo") || {};
      this.paramsObj.city = gpsInfo.cityId || '';
      // this.paramsObj.latitude = gpsInfo.lat;
      // this.paramsObj.longitude = gpsInfo.lng;
      this.mapUrl = new Utils().getMapStaticImg(this.paramsObj.latitude || gpsInfo.lat, this.paramsObj.longitude || gpsInfo.lng, 335, 240);
    },
    // 选择楼盘位置
    selecMap () {
      let _this = this;
      uni.chooseLocation({
        keyword: _this.mapName || '',
        success: function (res) {
          console.log('位置名称：' + res.name);
          console.log('详细地址：' + res.address);
          console.log('纬度：' + res.latitude);
          console.log('经度：' + res.longitude);
          _this.mapName = res.name;
          _this.mapUrl = new Utils().getMapStaticImg(res.latitude, res.longitude, 335, 240);
          _this.paramsObj.latitude = res.latitude;
          _this.paramsObj.longitude = res.longitude;
        }
      })
    },
    inputNumMin (e) {
      clearTimeout(this.timeMin)
      if (e.detail.value !== '') {
        if (Number(e.detail.value) <= 0) {
          this.timeMin = setTimeout(() => {
            this.paramsObj.minTotalPrice = ''
          }, 10)
        }
      }
    },
    inputNumBlurMin (e) {
      if (e.detail.value !== '') {
        if (this.paramsObj.maxTotalPrice !== null && this.paramsObj.maxTotalPrice !== '' && Number(e.detail.value) >= Number(this.paramsObj.maxTotalPrice)) {
          this.DifferenceApi.showToast('总价最小值应该小于最大值')
        }
      }
    },
    inputNumMax (e) {
      clearTimeout(this.timeMax)
      if (e.detail.value !== '') {
        if (Number(e.detail.value) <= 0) {
          this.timeMax = setTimeout(() => {
            this.paramsObj.maxTotalPrice = ''
          }, 10)
        }
      }
    },
    inputNumBlurMax (e) {
      if (e.detail.value !== '') {
        if (this.paramsObj.minTotalPrice !== null && this.paramsObj.minTotalPrice !== '' && Number(e.detail.value) <= Number(this.paramsObj.minTotalPrice)) {
          this.DifferenceApi.showToast('总价最大值应该大于最小值')
        }
      }
    },
    // 创建
    save () {
      if (!this.buildingStatusName) {
        this.DifferenceApi.showToast('请填写楼盘状态');
        return;
      }
      if (this.paramsObj.minTotalPrice !== '') {
        if (this.paramsObj.maxTotalPrice !== null && this.paramsObj.maxTotalPrice !== '' && Number(this.paramsObj.minTotalPrice) >= Number(this.paramsObj.maxTotalPrice)) {
          this.DifferenceApi.showToast('总价最小值应该小于最大值');
          return;
        }
      }
      if (this.paramsObj.maxTotalPrice !== '') {
        if (this.paramsObj.minTotalPrice !== null && this.paramsObj.minTotalPrice !== '' && Number(this.paramsObj.maxTotalPrice) <= Number(this.paramsObj.minTotalPrice)) {
          this.DifferenceApi.showToast('总价最大值应该大于最小值');
          return;
        }
      }
      let obj = new buildModel().getModel('saveParamsFirst') || {};
      Object.assign(this.paramsObj, obj);
      // 标签处理
      this.paramsObj.buildingLabels = this.selectLabelList.join(',');
      console.log(this.paramsObj, 'paramsObj');
      new SaveBuildingInfo(this.paramsObj).send().then(res => {
        console.log(res, 'save');
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg);
        } else {
          new Notification().postNotification(Notify.SaveBuildChange.Name)
          // uni.switchTab({
          //   url: "/pages/buildList/buildList"
          // });
          uni.navigateBack({
            delta: 2
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

.add-edit-building {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .a-e-b {
    width: 100%;
    height: 100%;
    padding-bottom: 190upx;
    box-sizing: border-box;
    .common-box {
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
      &>.red-dot {
        position: relative;
        &::before {
          position: absolute;
          top: 0;
          left: 130upx;
          content: "*";
          width: 20upx;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 10upx;
          box-sizing: border-box;
          font-size: 28upx;
          color: red;
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
      &>.item-complex {
        width: 100%;
        height: $commonHeight;
        display: flex;
        align-items: center;
        border-bottom: 2upx solid #ebebeb;
        &>view {
          height: 100%;
          display: flex;
          align-items: center;
          &:nth-child(1) {
            flex: 1 1 auto;
            &>view {
              display: flex;
              align-items: center;
              height: 100%;
              font-size: 30upx;
              font-family: PingFang-SC-Medium;
              &:nth-child(1) {
                flex: 0 0 190upx;
                color: #191f25;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
              }
              &:nth-child(2) {
                flex: 0 0 100upx;
                &>input {
                  width: 100%;
                  height: 100%;
                }
              }
              &:nth-child(3) {
                flex: 0 0 80upx;
                justify-content: center;
              }
              &:nth-child(4) {
                flex: 0 0 100upx;
                &>input {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          &:nth-child(2) {
            flex: 0 0 110upx;
            &>view {
              height: 100%;
              &:nth-child(1) {
                flex: 1 1 auto;
                &>picker {
                  width: 100%;
                  height: 100%;
                  .uni-input {
                    width: 100%;
                    height: $commonHeight;
                    display: flex;
                    font-size: 30upx;
                    align-items: center;
                    justify-content: center;
                    color: #a3a5a8;
                    font-family: PingFang-SC-Medium;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
              &:nth-child(2) {
                flex: 0 0 26upx;
                height: 26upx;
                display: flex;
                justify-content: center;
                align-items: center;
                &>image {
                  width: 14upx;
                  height: 26upx;
                  display: block;
                  transform: rotate(90deg);
                }
              }
            }
          }
        }
      }
      &>.label-box {
        width: 100%;
        height: auto;
        &>.l-b-title {
          height: auto;
          padding: 50upx 0 46upx 0;
          box-sizing: border-box;
          display: flex;
          align-items: flex-end;
          &>text {
            line-height: 1;
            &:nth-child(1) {
              color: #191f25;
              font-size: 38upx;
              font-weight: bold;
            }
            &:nth-child(2) {
              color: #a3a5a8;
              font-size: 22upx;
            }
          }
        }
        &>.l-b-content {
          width: 100%;
          height: auto;
          display: flex;
          flex-wrap: wrap;
          &>.l-b-c-item {
            flex: 0 0 152upx;
            height: 66upx;
            line-height: 66upx;
            text-align: center;
            background-color: #f7f7f7;
            color: #a3a5a8;
            border-radius: 4px;
            margin-right: 20upx;
            font-family: PingFang-SC-Medium;
            font-size: 28upx;
            &:nth-child(4n) {
              margin-right: 0;
            }
            &:nth-child(n+5) {
              margin-top: 18upx;
            }
            &.active {
              background-color: #0084ff;
              color: #fefefe;
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
      &>.item-map {
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
            height: 480upx;
            background-color: #f6f6f6;
            &>view {
              &:nth-child(1) {
                position: absolute;
                top: 34upx;
                left: 25upx;
                width: 620upx;
                height: 80upx;
                background-color: #ffffff;
                box-shadow: 1upx 2upx 10upx 0 rgba(0, 0, 0, 0.03);
                border-radius: 6upx;
                display: flex;
                align-items: center;
                z-index: 9;
                &>image {
                  flex: 0 0 36upx;
                  height: 30upx;
                  display: block;
                  margin-left: 30upx;
                }
                &>view {
                  flex: 1 1 auto;
                  height: 100%;
                  line-height: 80upx;
                  padding: 0 20upx;
                  color: #c0c1c3;
                  font-family: PingFang-SC-Medium;
                  font-size: 30upx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  box-sizing: border-box;
                  &.active {
                    color: #191f25;
                  }
                }
              }
              &:nth-child(2) {
                width: 100%;
                height: 100%;
                &>image {
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }
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
    z-index: 9999;
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
