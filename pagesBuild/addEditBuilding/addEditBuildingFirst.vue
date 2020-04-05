<template>
  <view class="add-edit-building">
    <!-- 第一步 楼盘资料 -->
    <view class="top-title">楼盘资料</view>
    <!-- 行政区 -->
    <view class="item-select red-dot">
      <view>
        <view>行 政 区</view>
        <view>
          <picker mode="selector" :range="regList" range-key="regName" :value="regIndex" @change="regChangePicker">
            <view class="uni-input" :class="{'active': regName ? true : false}">{{regName || '请选择'}}</view>
          </picker>
        </view>
      </view>
      <view>
        <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
      </view>
    </view>
    <!-- 板块 -->
    <view class="item-select">
      <view>
        <view>板 块</view>
        <view>
          <picker mode="selector" :range="sectionList" range-key="sectionName" :value="sectionIndex" @change="sectionChangePicker" :disabled="sectionDisabled">
            <view class="uni-input" :class="{'active': sectionName ? true : false}">{{sectionName || '请选择'}}</view>
          </picker>
        </view>
      </view>
      <view>
        <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
      </view>
    </view>
    <!-- 楼盘名称 -->
    <view class="item-normal red-dot">
      <view>楼盘名称</view>
      <view>
        <input type="text" v-model="paramsObj.buildingName" maxlength="25" placeholder="请输入" placeholder-style="color: #c0c1c3;">
      </view>
    </view>
    <!-- 物业类型 -->
    <view class="item-select red-dot">
      <view>
        <view>物业类型</view>
        <view>
          <picker mode="selector" :range="wuYeTypeList" range-key="value" :value="wuYeIndex" @change="wuYeChangePicker">
            <view class="uni-input" :class="{'active': paramsObj.propertyType ? true : false}">{{paramsObj.propertyType || '请选择'}}</view>
          </picker>
        </view>
      </view>
      <view>
        <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
      </view>
    </view>
    <!-- 楼盘地址 -->
    <view class="item-normal red-dot">
      <view>楼盘地址</view>
      <view>
        <input type="text" v-model="paramsObj.buildingAddr" maxlength="50" placeholder="请输入" placeholder-style="color: #c0c1c3;">
      </view>
    </view>
    <!-- 售楼地址 -->
    <view class="item-normal">
      <view>售楼地址</view>
      <view>
        <input type="text" v-model="paramsObj.salesAddr" maxlength="50" placeholder="请输入" placeholder-style="color: #c0c1c3;">
      </view>
    </view>
    <!-- 建筑类型 -->
    <view class="item-select red-dot">
      <view>
        <view>建筑类型</view>
        <view>
          <picker mode="selector" :range="buildingTypeList" range-key="text" :value="buildingIndex" @change="buildingTypeChangePicker">
            <scroll-view class="uni-box" scroll-x="true">
              <view class="uni-box_">
                <block v-for="(m, n) in selectBuildingTypeList" :key="n">
                  <view class="u-b-item">
                    <view>{{houseTypeObj[m] || m}}</view>
                    <view @click.stop="deletBuildingType(n)"></view>
                  </view>
                </block>
                <view class="u-b-nodata" v-if="selectBuildingTypeList.length === 0">请选择</view>
              </view>
            </scroll-view>
          </picker>
        </view>
      </view>
      <view>
        <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
      </view>
    </view>
    <!-- 物管公司 -->
    <view class="item-normal">
      <view>物管公司</view>
      <view>
        <input type="text" v-model="paramsObj.propertyCompany" maxlength="50" placeholder="请输入" placeholder-style="color: #c0c1c3;">
      </view>
    </view>
    <!-- 分销类型 -->
    <view class="item-select red-dot">
      <view>
        <view>分销类型</view>
        <view>
          <picker mode="selector" :range="fxTypeList" range-key="value" :value="fxIndex" @change="fxTypeChangePicker">
            <view class="uni-input" :class="{'active': fxName ? true : false}">{{fxName || '请选择'}}</view>
          </picker>
        </view>
      </view>
      <view>
        <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
      </view>
    </view>
    <!-- 分销电话 -->
    <view class="item-normal">
      <view>分销电话</view>
      <view>
        <input type="text" v-model="paramsObj.erpTelephone" maxlength="12" placeholder="经纪公司可通过此电话联系咨询" placeholder-style="color: #c0c1c3;">
      </view>
    </view>
    <!-- 外网电话 -->
    <view class="item-normal">
      <view>外网电话</view>
      <view>
        <input type="text" v-model="paramsObj.uuTelephone" maxlength="12" placeholder="用于C端平台展示的售楼部电话" placeholder-style="color: #c0c1c3;">
      </view>
    </view>
    <!-- 占位 -->
    <view class="bottom-view"></view>
    <!-- 下一步 -->
    <view class="next-btn">
      <view @click="goToNext()">下一步</view>
    </view>
  </view>
</template>

<script>
import { GetBaseInfoModel } from "@/model/BaseInfoModel.js";
import { compare } from "@/utils/common.js";
import { buildModel } from '@/model/buildModel.js';
import { GetBuildingInfo } from '@/net/BuildNet.js';
import { Const } from "@/utils/Const.js";

export default {
  data () {
    return {
      type: '',
      allParamsObj: {},
      paramsObj: {
        buildId: '',
        district: null, // 行政区
        area: null, // 板块
        buildingName: '', // 楼盘名称
        propertyType: '', // 物业类型
        buildingAddr: '', // 楼盘地址
        salesAddr: '', // 售楼地址
        buildingType: '', // 建筑类型
        propertyCompany: '', // 物管公司
        distributionType: null, // 分销类型
        erpTelephone: '', // 分销电话
        uuTelephone: '' // 外网电话
      },
      // 物业类型
      wuYeTypeList: [
        { value: "住宅" },
        { value: "别墅" },
        { value: "公寓" },
        { value: "商铺" },
        { value: "写字楼" },
        { value: "厂房" },
        { value: "仓库" },
        { value: "车库" },
        { value: "其他" }
      ],
      wuYeIndex: null,
      // 行政区
      regList: [],
      regIndex: null,
      regName: '',
      // 板块
      sectionList: [],
      sectionIndex: null,
      sectionName: '',
      sectionDisabled: '',
      // 建筑类型
      buildingTypeList: Const.houseTypeList,
      buildingIndex: null,
      selectBuildingTypeList: [],
      houseTypeObj: {},
      // 分销类型
      fxTypeList: [
        { value: "城市楼盘", id: 0 },
        { value: "旅游地产", id: 1 }
      ],
      fxIndex: null,
      fxName: ''
    }
  },
  onLoad (params = {}) {
    // 18991911991
    this.type = params.type
    this.getHouseTypeObj()
    if (params.type === "add") {
      uni.setNavigationBarTitle({
        title: "添加楼盘"
      });
      this.getRegList();
    } else {
      uni.setNavigationBarTitle({
        title: "编辑楼盘"
      });
      this.getBuildDetail(params.buildId);
    }
  },
  methods: {
    // 编辑进来获取楼盘信息
    getBuildDetail (id) {
      new GetBuildingInfo({
        buildId: id
      }).send().then(res => {
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg);
        } else {
          let data = res.data || {};
          if (!data) return;
          this.allParamsObj = data;
          for (let key in this.paramsObj) {
            this.paramsObj[key] = data[key] || '';
          }
          // 行政区处理
          this.getRegList(true);
          // 板块处理
          if (data.area) {
            this.getSectionList(data.district, true);
          } else {
            this.getSectionList(data.district);
          }
          // 物业类型处理
          this.wuYeTypeList.forEach((item, index) => {
            if (data.propertyType === item.value) {
              this.wuYeIndex = index;
            }
          })
          // 建筑类型处理
          let selectBuildingTypeList = this.paramsObj.buildingType ? this.paramsObj.buildingType.split(',') : [];
          this.selectBuildingTypeList = []
          for (let item of selectBuildingTypeList) {
            if (isNaN(item)) { // 兼容处理错误数据 为数字过来的时候
              this.selectBuildingTypeList.push(item)
            }
          }
          // 分销类型处理
          this.fxTypeList.forEach((item, index) => {
            if (data.distributionType === item.id) {
              this.fxName = item.value;
            }
          });
        }
      })
    },
    // 物业类型改变
    wuYeChangePicker (e) {
      this.wuYeIndex = e.target.value;
      this.paramsObj.propertyType = this.wuYeTypeList[e.target.value].value;
    },
    // 行政区改变
    regChangePicker (e) {
      this.regIndex = e.target.value;
      let regId = this.regList[e.target.value].regId;
      this.regName = this.regList[e.target.value].regName;
      this.paramsObj.district = regId;
      this.getSectionList(regId);
    },
    // 初始化行政区列表
    getRegList (bool) {
      let regList = GetBaseInfoModel.regList() || [];
      let newRegList = [];
      for (let info of regList) {
        if (!info.regName) continue;

        info.value = info.regName;
        newRegList.push(info);
      }
      newRegList = newRegList.sort(new compare("seqNo").minToMax());
      this.regList = newRegList;
      console.log("regList", this.regList);
      if (bool) {
        this.regList.forEach((item, index) => {
          if (this.paramsObj.district === item.regId) {
            console.log('2342424242', item)
            this.regIndex = index;
            this.regName = item.regName;
          }
        });
      }
    },
    // 初始化板块列表
    getSectionList (regId, bool) {
      this.sectionName = "";
      this.sectionIndex = "";
      let sectionList = [];
      for (let item of GetBaseInfoModel.sectionList(regId || "") || []) {
        if (!item.sectionName) continue;

        item.value = item.sectionName;
        sectionList.push(item);
      }
      this.sectionList = sectionList || [];
      this.sectionDisabled = this.sectionList.length === 0;
      console.log("sectionList", this.sectionList, this.sectionList.length);
      if (bool) {
        this.sectionList.forEach((item, index) => {
          if (Number(this.paramsObj.area) === Number(item.sectionId)) {
            this.sectionIndex = index;
            this.sectionName = item.sectionName;
          }
        });
      }
    },
    // 板块改变
    sectionChangePicker (e) {
      this.sectionIndex = e.target.value;
      this.sectionName = this.sectionList[e.target.value].sectionName;
      let area = this.sectionList[e.target.value].sectionId;
      this.paramsObj.area = area;
    },
    // 初始化建筑类型
    getHouseTypeObj () {
      let houseTypeList = Const.houseTypeList || [];
      for (let item of houseTypeList) {
        this.houseTypeObj[item.value] = item.text
      }
      console.log(this.houseTypeObj, 'houseTypeObj')
    },
    // 建筑类型改变
    buildingTypeChangePicker (e) {
      this.buildingIndex = e.target.value;
      let value = this.buildingTypeList[e.target.value].value;
      if (this.selectBuildingTypeList.indexOf(value) > -1) return;
      this.selectBuildingTypeList.push(value);
    },
    // 删除一个建筑类型
    deletBuildingType (n) {
      this.selectBuildingTypeList.splice(n ,1);
    },
    // 分销类型改变
    fxTypeChangePicker (e) {
      this.fxIndex = e.target.value;
      this.fxName = this.fxTypeList[e.target.value].value;
      this.paramsObj.distributionType = this.fxTypeList[e.target.value].id;
    },
    // 下一步
    goToNext () {
      console.log(this.paramsObj, 'paramsObj');
      if (!this.regName) {
        this.DifferenceApi.showToast('请选择行政区');
        return;
      }
      if (!this.paramsObj.buildingName) {
        this.DifferenceApi.showToast('请输入楼盘名称');
        return;
      }
      if (!this.paramsObj.propertyType) {
        this.DifferenceApi.showToast('请选择物业类型');
        return;
      }
      if (!this.paramsObj.buildingAddr) {
        this.DifferenceApi.showToast('请输入楼盘地址');
        return;
      }
      if (this.selectBuildingTypeList.length === 0) {
        this.DifferenceApi.showToast('请选择建筑类型');
        return;
      }
      if (!this.fxName) {
        this.DifferenceApi.showToast('请选择分销类型');
        return;
      }
      // 建筑类型处理
      this.paramsObj.buildingType = this.selectBuildingTypeList.join(',');
      // 存储数据
      new buildModel().setModel(this.paramsObj, 'saveParamsFirst');
      new buildModel().setModel(this.allParamsObj, 'saveParams');
      uni.navigateTo({
        url: "/pagesBuild/addEditBuilding/addEditBuildingSecond?type=" + this.type
      });
    }
  }
};
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
  width: 100%;
  height: 100%;
  padding: 40upx;
  box-sizing: border-box;
  // overflow: hidden;
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
      font-size: 28upx;
      color: red;
      box-sizing: border-box;
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
                font-size: 30upx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &.active {
                  color: #191f25;
                }
              }
              .uni-box {
                width: 100%;
                height: $commonHeight;
                .uni-box_ {
                  width: 100%;
                  display: flex;
                  height: $commonHeight;
                  align-items: center;
                  .u-b-item {
                    position: relative;
                    flex: 0 0 auto;
                    padding-right: 10upx;
                    box-sizing: border-box;
                    margin-right: 10upx;
                    text-align: center;
                    &>view {
                      margin-right: 10upx;
                      &:nth-child(1) {
                        color: #191f25;
                        font-family: PingFang-SC-Medium;
                        font-size: 30upx;
                      }
                      &:nth-child(2) {
                        position: absolute;
                        top: -8upx;
                        right: -8upx;
                        width: 24upx;
                        height: 24upx;
                        background-image: url('http://cdn.haofang.net/static/xfldDeveloper/build/type-delet.png?t=12131');
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                      }
                    }
                  }
                  &>.u-b-nodata {
                    flex: 0 0 auto;
                    color: #c0c1c3;
                    font-family: PingFang-SC-Medium;
                    font-size: 30upx;
                  }
                }
              }
            }
          }
        }
      }
      &:nth-child(2) {
        flex: 0 0 14upx;
        height: 28upx;
        margin-top: 4upx;
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
  &>.bottom-view {
    width: 100%;
    height: 190upx;
  }
  &>.next-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 190upx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    z-index: 9;
    &>view {
      width: 670upx;
      height: 98upx;
      background-color: #0084ff;
      box-shadow: 0px 7px 15px 1px rgba(0, 0, 0, 0.05);
      border-radius: 10upx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      font-size: 32upx;
    }
  }
}
</style>
