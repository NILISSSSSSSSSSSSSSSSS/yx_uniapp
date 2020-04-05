<template>
  <view class="build-detail">
    <scroll-view scroll-y="true" @scroll="viewPagesScroll" :scroll-top="scrollTop.num" class="scroll-view" id="scrollView" :class="{'is-show-box': isShowBox}">
      <!-- 轮播图 -->
      <view class="b-d-swiper">
        <houseSwiper :list="swiperList" :buildId="buildId"></houseSwiper>
      </view>
      <!-- 基本信息 -->
      <view class="b-d-information">
        <view>
          <view>{{information.buildName || '- -'}}</view>
          <view>{{information.averagePrice ? information.averagePrice + '元/㎡' : '暂无报价'}}</view>
        </view>
        <view>
          <view>{{information.buildAddr || '- -'}}</view>
          <view>
            <view>
              <image src="http://cdn.haofang.net/static/xfldDeveloper/build/arrow-right.png"></image>
            </view>
            <view @click="goToInformation()">详情</view>
          </view>
        </view>
        <view class="num-box">
          <view>
            <view>{{information.reportCount || 0}}</view>
            <view>已报备(组)</view>
          </view>
          <view>
            <view>{{information.bandCount || 0}}</view>
            <view>已带看(组)</view>
          </view>
          <view>
            <view>{{information.subscription || 0}}</view>
            <view>已签约(组)</view>
          </view>
        </view>
      </view>
      <view class="gray-view"></view>
      <!-- 选择组合 -->
      <scroll-view scroll-x="true" class="select-box_" v-show="isShowBox">
        <view class="select-box">
          <block v-for="(item, index) in selectBoxList" :key="index">
            <view :class="{'active': selectBoxValue === item.value}" @click="changeSelectBox(item.value)">{{item.name}}</view>
          </block>
        </view>
      </scroll-view>
      <!-- 合作规则 -->
      <view id="hzgz" class="box-common">
        <view class="b-c-top" @click="goToLookOrEditHYZ('hzgz')">
          <view>合作规则</view>
          <!-- <image class="c-t-icon-1" src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" v-if="accountSource === 1"></image> -->
          <image class="c-t-icon-2" src="http://cdn.haofang.net/static/xfldDeveloper/build/house-detail-edit.png" v-if="accountSource === 2"></image>
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
          <image class="c-t-icon-1" src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" v-if="accountSource === 1"></image>
          <image class="c-t-icon-2" src="http://cdn.haofang.net/static/xfldDeveloper/build/house-detail-edit.png" v-if="accountSource === 2"></image>
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
          <image class="c-t-icon-1" src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" v-if="accountSource === 1"></image>
          <image class="c-t-icon-2" src="http://cdn.haofang.net/static/xfldDeveloper/build/house-detail-edit.png" v-if="accountSource === 2"></image>
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
      <!-- 分销户型 -->
      <view id="fxhx" class="box-common_">
        <view class="common-title" @click="goToDistributionType()">
          <collectFormId></collectFormId>
          <view class="c-t-name">分销户型</view>
          <image class="c-t-icon" src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png"></image>
        </view>
        <scroll-view class="f-x-box" scroll-x="true" v-if="layoutLists.length !== 0">
          <view class="f-x-box_">
            <block v-for="(item, index) in layoutLists" :key="index">
              <view class="f-x-b-item">
                <view class="top">
                  <view class="t-left">
                    <view class="t-l-name" v-if="item.layoutNo">{{item.layoutNo}}</view>
                    <image :src="item.layoutPic1 || 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'" mode="aspectFit"></image>
                  </view>
                  <view class="t-right">
                    <view class="t-r-1">
                      <view class="t-r-1-1" :class="{'active': item.houseUseage}">{{setLayout(item.rooms, item.halls, item.weis, item.yangs)}}</view>
                      <view class="t-r-1-2" v-if="item.houseUseage">{{item.houseUseage || '--'}}</view>
                      <view class="t-r-1-3" :style="{'color': buildTypeObj[item.layoutStatus].color, 'background-color': buildTypeObj[item.layoutStatus].bgColor}">{{buildTypeObj[item.layoutStatus].value}}</view>
                    </view>
                    <view class="t-r-2" v-if="item.buildArea || item.orientation">{{item.buildArea ? '建面' + item.buildArea + '㎡' : ''}} {{item.orientation ? item.orientation : ''}}</view>
                    <view class="t-r-3" v-if="item.tagIdsShow.length !== 0">
                      <block v-for="(m, n) in item.tagIdsShow" :key="n">
                        <view>{{m}}</view>
                      </block>
                    </view>
                    <view class="t-r-4" v-if="item.price">约{{item.price}}万/套</view>
                  </view>
                </view>
                <view class="bottom">
                  <view>{{item.charact || '无'}}</view>
                </view>
              </view>
            </block>
          </view>
        </scroll-view>
        <view class="f-x-nodata" v-if="layoutLists.length === 0">暂无内容</view>
      </view>
      <!-- 拓客技巧 -->
      <view id="tkjq" class="box-common_">
        <view class="common-title" @click="goToSkillPointDetail('skill')">
          <view class="c-t-name">拓客技巧</view>
          <image class="c-t-icon" src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png"></image>
        </view>
        <view class="e-t-box-b-s-p">
          <view class="e-t-box-b-s-p-left" v-if="extensionTechnique.picUrl"></view>
          <view class="e-t-box-b-s-p-right">
            {{extensionTechnique.content || '暂无内容'}}
          </view>
        </view>
      </view>
      <!-- 楼盘卖点 -->
      <view id="lpmd" class="box-common_">
        <view class="common-title" @click="goToSkillPointDetail('point')">
          <view class="c-t-name">楼盘卖点</view>
          <image class="c-t-icon" src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png"></image>
        </view>
        <view class="e-t-box-b-s-p">
          <view class="e-t-box-b-s-p-left" v-if="buildSellingPoint.picUrl"></view>
          <view class="e-t-box-b-s-p-right">
            {{buildSellingPoint.content || '暂无内容'}}
          </view>
        </view>
      </view>
      <!-- 楼盘动态 -->
      <view id="lpdt" class="box-common_" style="padding-bottom: 60upx;">
        <view class="common-title" @click="goToDistributionDynamic()">
          <collectFormId></collectFormId>
          <view class="c-t-name">楼盘动态</view>
          <view class="c-t-title"><text>{{buildDynamic.newDynamicCount || 0}}</text><text>条新动态</text></view>
          <image class="c-t-icon" src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="aspectFit"></image>
        </view>
        <view class="b-d-box" v-if="isShowDynamic">
          <view class="b-d-b-left">
            <view class="b-d-b-l-title">{{buildDynamic.dynamicTitle}}</view>
            <view class="b-d-b-l-desc">{{buildDynamic.dynamicDesc}}</view>
            <view class="b-d-b-l-time">{{buildDynamic.creationTime}}</view>
          </view>
          <view class="b-d-b-right">
            <image :src="buildDynamic.photoUrl || 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'" mode="aspectFill" @error="errorImg"></image>
          </view>
        </view>
        <view class="e-t-box-b-s-p" v-if="!isShowDynamic">
          <view class="e-t-box-b-s-p-right">暂无内容</view>
        </view>
      </view>
    </scroll-view>
    <!-- 发布 -->
    <view class="post-btn" @click="postBtn()" v-if="accountSource === 2">
      <collectFormId></collectFormId>
      <image src="http://cdn.haofang.net/static/xfldDeveloper/build/send.png"></image>
    </view>
  </view>
</template>

<script>
import { GetNewBuildDetail } from '@/net/BuildNet.js'
import { GetLoginModel } from '@/model/LoginSuccessModel'
import { Const } from "@/utils/Const.js"
import houseSwiper from '@/components/houseDetail/houseSwiper.vue'
import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"
import { buildModel } from '@/model/buildModel.js'

class PrivateData {
  static saveScrollTop = 0
  static scrollHeight = 0
}

export default {
  data () {
    return {
      accountSource: null, // 1 置业顾问端  2 开发商端
      buildId: '',
      swiperList: [], // swiper列表
      information: { // 基本信息
        averagePrice: null,
        buildName: '',
        buildAddr: '',
        reportCount: null, // 报备
        bandCount: null, // 带看
        subscription: null // 认购数
      },
      isShowBox: false,
      selectBoxValue: '', // 选择组合值
      selectBoxList: [
        // '合作规则', '分销户型', '拓客技巧', '楼盘卖点', '楼盘动态'
        { name: '合作规则', value: 'hzgz' },
        { name: '分销户型', value: 'fxhx' },
        { name: '拓客技巧', value: 'tkjq' },
        { name: '楼盘卖点', value: 'lpmd' },
        { name: '楼盘动态', value: 'lpdt' },
      ],
      cooperationRule: {}, // 合作规则
      commisonRule: {}, // 佣金规则
      distributionRule: {}, // 注意事项
      layoutLists: [], // 分销户型
      buildTypeObj: Const.buildTypeObj, // 楼盘状态
      extensionTechnique: {}, // 拓客技巧
      buildSellingPoint: {}, // 楼盘卖点
      isShowDynamic: false,
      buildDynamic: {}, // 楼盘动态
      // 记录top值
      scrollTopObj: {
        'hzgz': {
          num: 0,
          compareNum: 0
        },
        'fxhx': {
          num: 0,
          compareNum: 0
        },
        'tkjq': {
          num: 0,
          compareNum: 0
        },
        'lpmd': {
          num: 0,
          compareNum: 0
        },
        'lpdt': {
          num: 0,
          compareNum: 0
        }
      },
      scrollTop: {
        num: 0,
        height: 0,
        max: 0,
        isFirst: true
      },
      viewTimeScroll: null
    }
  },
  components: {
    houseSwiper
  },
  onLoad (params = {}) {
    this.buildId = params.buildId;
    this.initData();
    // 监听动态发布成功
    new Notification().addObserver(this, "updateData", Notify.CreateActivityChange.Name);
    // 监听相册
    new Notification().addObserver(this, "updateData", Notify.PhotoChange.Name);
    // 监听分销户型
    new Notification().addObserver(this, "updateData", Notify.DistributionChange.Name);
    // 监听分销户型 - 删除
    new Notification().addObserver(this, "updateData", Notify.DistributionDelChange.Name);
    // 监听规则
    new Notification().addObserver(this, "updateData", Notify.RuleChange.Name);
  },
  onShow () {
    this.accountSource = GetLoginModel.getAccountSource()
  },
  methods: {
    // 获取节点信息
    getNodeInfo () {
      const query = uni.createSelectorQuery().in(this);
      query.select('#hzgz').boundingClientRect(data => {
        this.scrollTopObj['hzgz'].compareNum = data.top - 50;
        this.scrollTopObj['hzgz'].num = data.top - 50;
      }).select('#fxhx').boundingClientRect(data => {
        this.scrollTopObj['fxhx'].compareNum = data.top - 50;
        this.scrollTopObj['fxhx'].num = data.top - 50;
      }).select('#tkjq').boundingClientRect(data => {
        this.scrollTopObj['tkjq'].compareNum = data.top - 50;
        this.scrollTopObj['tkjq'].num = data.top - 50;
      }).select('#lpmd').boundingClientRect(data => {
        this.scrollTopObj['lpmd'].compareNum = data.top - 50;
        this.scrollTopObj['lpmd'].num = data.top - 50;
      }).select('#lpdt').boundingClientRect(data => {
        this.scrollTopObj['lpdt'].compareNum = data.top - 50;
        this.scrollTopObj['lpdt'].num = data.top - 50;
      }).select('#scrollView').fields({
        scrollOffset: true,
        size: true
      }, (res) => {
        this.scrollTop.max = PrivateData.scrollHeight - res.height
        for (let key in this.scrollTopObj) {
          if (this.scrollTopObj[key].num > this.scrollTop.max) {
            this.scrollTopObj[key].num = this.scrollTop.max
          }
        }
      }).exec();
    },
    // 更新数据回调
    updateData () {
      this.initData();
    },
    initData () {
      new GetNewBuildDetail({
        buildId: this.buildId
      }).send().then(res => {
        console.log(res)
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
          return
        }
        let data = res.data
        // 设置title
        uni.setNavigationBarTitle({
          title: data.buildName
        })
        // swiper - list
        let swiperList = []
        let vrList = data.vrList || [] // vr
        let imgList = data.photoList || [] // img
        for (let item of vrList) {
          swiperList.push({
            url: item.photoAddr,
            type: "vr", // vr img
            sourceUrl: item.panoramaPlayUrl  // 资源路径
          })
        }
        for (let item of imgList) {
          swiperList.push({
            url: item,
            type: "img", // vr img
            sourceUrl: item  // 资源路径
          })
        }
        this.swiperList = swiperList

        // information
        this.information.averagePrice = data.averagePrice || ''
        this.information.buildName = data.buildName || ''
        this.information.buildAddr = data.buildAddr || ''
        this.information.reportCount = data.reportCount || ''
        this.information.bandCount = data.bandCount || ''
        this.information.subscription = data.subscription || ''

        // 合作规则
        this.cooperationRule.cooperationTime = data.distributionRule.cooperationTime || ''
        this.cooperationRule.exclusiveDiscount = data.exclusiveDiscount || ''
        this.cooperationRule.groupPurchaseDiscount = data.groupPurchaseDiscount || ''

        // 佣金规则
        this.commisonRule = data.commisonRule || {}

        // 联动规则
        this.distributionRule = data.distributionRule || {}

        // 分销户型
        let layoutLists = data.layoutLists || []
        for (let item of layoutLists) {
          if (item.tagIds) {
            item.tagIdsShow = item.tagIds.split('|')
            if (item.tagIdsShow.length > 2) {
              item.tagIdsShow = item.tagIdsShow.splice(0, 2)
            }
          } else {
            item.tagIdsShow = []
          }
        }
        if (layoutLists.length > 3) {
          this.layoutLists = layoutLists.splice(0, 3)
        } else {
          this.layoutLists = layoutLists || []
        }

        // 拓客技巧
        this.extensionTechnique = data.extensionTechnique || {}
        
        // 楼盘卖点
        this.buildSellingPoint = data.buildSellingPoint || {}

        // 楼盘动态
        this.isShowDynamic = false
        this.buildDynamic = data.buildDynamic || {}
        if (data.buildDynamic) {
          this.isShowDynamic = true
        }
        this.$nextTick(() => {
          this.scrollTop.num = 1
        });
      })
    },
    // 页面滚动
    viewPagesScroll (e) {
      let scrollTop = e.detail.scrollTop
      if (this.scrollTop.isFirst) {
        PrivateData.scrollHeight = e.detail.scrollHeight
        this.getNodeInfo()
        this.scrollTop.isFirst = false
        return
      }
      PrivateData.saveScrollTop = scrollTop
      if (this.scrollTop.max === scrollTop) {
        return
      }
      if (scrollTop < (this.scrollTopObj['hzgz'].compareNum)) {
        this.isShowBox = false
      }
      if (scrollTop >= (this.scrollTopObj['hzgz'].compareNum) && scrollTop < (this.scrollTopObj['fxhx'].compareNum)) {
        this.selectBoxValue = 'hzgz'
        this.isShowBox = true
      }
      if (scrollTop >= (this.scrollTopObj['fxhx'].compareNum) && scrollTop < (this.scrollTopObj['tkjq'].compareNum)) {
        this.selectBoxValue = 'fxhx'
        this.isShowBox = true
      }
      if (scrollTop >= (this.scrollTopObj['tkjq'].compareNum) && scrollTop < (this.scrollTopObj['lpmd'].compareNum)) {
        this.selectBoxValue = 'tkjq'
        this.isShowBox = true
      }
      if (scrollTop >= (this.scrollTopObj['lpmd'].compareNum) && scrollTop < (this.scrollTopObj['lpdt'].compareNum)) {
        this.selectBoxValue = 'lpmd'
        this.isShowBox = true
      }
      if (scrollTop >= (this.scrollTopObj['lpdt'].compareNum)) {
        this.selectBoxValue = 'lpdt'
        this.isShowBox = true
      }
    },
    // 跳转information
    goToInformation () {
      uni.navigateTo ({
        url: '/pagesBuild/buildDetail/information?buildId=' + this.buildId
      })
    },
    // 选择组
    changeSelectBox (value) {
      clearTimeout(this.viewTimeScroll)
      if (this.scrollTop.num !== PrivateData.saveScrollTop) {
        this.scrollTop.num = PrivateData.saveScrollTop
      }
      this.selectBoxValue = value
      this.viewTimeScroll = setTimeout(() => {
        // this.selectBoxValue = value
        if (this.scrollTopObj[value].num !== 0) {
          if (this.scrollTopObj[value].num < this.scrollTop.max) {
            this.scrollTop.num = this.scrollTopObj[value].num
          } else {
            this.scrollTop.num = this.scrollTop.max
          }
        }
      }, 100)
    },
    // 跳转分销户型
    goToDistributionType () {
      uni.navigateTo({
        url: '/pagesBuild/buildDetail/distributionType?buildId=' + this.buildId
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
    // 跳转楼盘动态
    goToDistributionDynamic () {
      uni.navigateTo({
        url: '/pagesBuild/buildDetail/distributionDynamic?buildId=' + this.buildId
      })
    },
    // 跳转 拓客技巧 楼盘卖点
    goToSkillPointDetail (type) {
      uni.navigateTo({
        url: '/pagesBuild/buildDetail/skillPointList?type=' + type + '&buildId=' + this.buildId
      })
    },
    // 发布动态
    postBtn () {
      uni.navigateTo({
        url: '/pagesBuild/buildDetail/releaseTheStory?buildId=' + this.buildId
      })
    },
    // 跳转合作规则 佣金规则 注意事项
    goToLookOrEditHYZ (type) {
      if (this.accountSource === 1) {
        if (type === 'hzgz') return
        // 存储数据
        let obj = {
          cooperationRule: this.cooperationRule || {},
          commisonRule: this.commisonRule || {},
          distributionRule: this.distributionRule || {}
        }
        new buildModel().setModel(obj, 'savepageRulesData')
        uni.navigateTo({
          url: '/pagesBuild/buildDetail/pageRules?buildId=' + this.buildId
        })
      } else {
        // 编辑合作规则
        if (type === 'hzgz') {
          uni.navigateTo({
            url: '/pagesBuild/buildDetail/rulesCooperationEdit?buildId=' + this.buildId
          })
        }
        // 编辑佣金规则
        if (type === 'yjgz') {
          uni.navigateTo({
            url: '/pagesBuild/buildDetail/commissionRuleEdit?buildId=' + this.buildId
          })
        }
        // 编辑注意事项
        if (type === 'zysx') {
          uni.navigateTo({
            url: '/pagesBuild/buildDetail/precautionEdit?buildId=' + this.buildId
          })
        }
      }
    },
    // 错误图片处理
    errorImg () {
      this.buildDynamic.photoUrl = 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'
    }
  },
  onUnload() {
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
.uni-page-head-btn {
  background-color: none;
}

.build-detail {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  overflow: hidden;
  .scroll-view {
    height: 100%;
    box-sizing: border-box;
  }
  .b-d-swiper {
    width: 100%;
    height: 510upx;
    background-image: url('http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .b-d-information {
    width: 100%;
    height: auto;
    background-color: #ffffff;
    padding: 0 40upx 60upx 40upx;
    box-sizing: border-box;
    overflow: hidden;
    &>view {
      width: 100%;
      display: flex;
      &:nth-child(1) {
        height: 120upx;
        align-items: center;
        margin-top: 20upx;
        &>view {
          line-height: 1;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-child(1) {
            flex: 0 0 60%;
            font-size: 50upx;
            color: #191f25;
          }
          &:nth-child(2) {
            flex: 0 0 40%;
            font-size: 36upx;
            color: #fa5741;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
      &:nth-child(2) {
        height: 80upx;
        &>view {
          &:nth-child(1) {
            flex: 0 0 60%;
            font-size: 26upx;
            color: #7d8184;
            line-height: 1;
            font-family: PingFang-SC-Medium;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:nth-child(2) {
            flex: 0 0 40%;
            display: flex;
            flex-direction: row-reverse;
            &>view:nth-child(1) {
              width: 12upx;
              height: 22upx;
              margin-top: 2upx;
              &>image {
                width: 12upx;
                height: 22upx;
                display: block;
              }
            }
            &>view:nth-child(2) {
              font-size: 26upx;
              color: #7d8184;
              line-height: 1;
              font-family: PingFang-SC-Medium;
              margin-right: 10upx;
            }
          }
        }
      }
      &.num-box {
        width: 670upx;
        height: 180upx;
        margin: 0 auto;
        background-color: #ffffff;
        box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.08);
        border-radius: 12upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>view {
          flex: 1;
          height: 86upx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &>view {
            width: 100%;
            line-height: 1;
            padding-left: 48upx;
            box-sizing: border-box;
            &:nth-child(1) {
              color: #191f25;
              font-size: 50upx;
              font-weight: bold;
            }
            &:nth-child(2) {
              color: #a3a5a8;
              font-size: 24upx;
            }
          }
          &:nth-child(2) {
            border-left: 2upx solid #ebebeb;
            border-right: 2upx solid #ebebeb;
          }
        }
      }
    }
  }
  .select-box_ {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90upx;
    background-color: #ffffff;
    z-index: 99;
    .select-box {
      width: 100%;
      height: 88upx;
      border-bottom: 2upx solid #ebebeb;
      display: flex;
      &>view {
        flex: 0 0 170upx;
        width: 170upx;
        height: 88upx;
        line-height: 88upx;
        text-align: center;
        color: #191f25;
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        &.active {
          position: relative;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          font-size: 32upx;
          &::after {
            content: '';
            position: absolute;
            bottom: 4upx;
            left: 50%;
            margin-left: -15upx;
            width: 30upx;
            height: 5upx;
            background-color: #0084ff;
            border-radius: 3upx;
          }
        }
      }
    }
  }
  .gray-view {
    width: 100%;
    height: 20upx;
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
      &>.c-t-icon-1 {
        width: 15upx;
        height: 28upx;
        display: block;
      }
      &>.c-t-icon-2 {
        width: 32upx;
        height: 34upx;
        display: block;
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
        height: 60upx;
        line-height: 1;
        display: flex;
        align-items: center;
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
            line-height: 30upx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .common-title {
    width: 100%;
    height: 96upx;
    display: flex;
    align-items: center;
    &>.c-t-name {
      flex: 1 1 auto;
      height: 100%;
      display: flex;
      align-items: center;
      color: #333333;
      font-size: 38upx;
      font-weight: bold;
    }
    &>.c-t-icon {
      flex: 0 0 15upx;
      width: 15upx;
      height: 28upx;
      display: block;
    }
    &>.c-t-title {
      flex: 0 0 200upx;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 24upx;
      margin-right: 10upx;
      &>text {
        &:nth-child(1) {
          color: #f25542;
          margin-top: 2upx;
        }
        &:nth-child(2) {
          color: #999999;
        }
      }
    }
  }
  .box-common_ {
    width: 100%;
    height: auto;
    padding: 0 40upx;
    box-sizing: border-box;
    background-color: #ffffff;
    margin-top: 20upx;
    &>.f-x-box {
      width: 100%;
      height: auto;
      padding: 20upx 0 60upx 0;
      box-sizing: border-box;
      .f-x-box_ {
        width: 100%;
        height: auto;
        display: flex;
        .f-x-b-item {
          flex: 0 0 508upx;
          margin-right: 50upx;
          &>.top {
            width: 100%;
            height: auto;
            display: flex;
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
              &>view {
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
                      font-weight: bold;
                      font-size: 30upx;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      &.active {
                        max-width: 150upx;
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
                &.t-r-3 {
                  display: flex;
                  overflow: hidden;
                  &>view {
                    // min-width: 45%;
                    width: auto;
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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:last-child {
                      margin-right: 0;
                    }
                  }
                }
                &.t-r-4 {
                  color: #fa5741;
                  font-family: PingFang-SC-Bold;
                  font-weight: bold;
                  font-size: 28upx;
                }
              }
            }
          }
          &>.bottom {
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
    }
    &>.f-x-nodata {
      width: 100%;
      height: auto;
      line-height: 1;
      padding: 20upx 0 60upx 0;
      color: #666666;
      font-size: 24upx;
    }
    .e-t-box-b-s-p {
      width: 100%;
      height: auto;
      max-height: 222upx;
      display: flex;
      padding: 24upx 0;
      &>.e-t-box-b-s-p-left {
        flex: 0 0 195upx;
        height: 149upx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 26upx;
        &>image {
          width: 195upx;
          height: 149upx;
          background-color: #dedede;
          border-radius: 4upx;
        }
      }
      &>.e-t-box-b-s-p-right {
        flex: 1 1 auto;
        height: auto;
        max-height: 134upx;
        color: #666666;
        font-size: 24upx;
        overflow: hidden;
      }
    }
    .b-d-box {
      width: 100%;
      height: auto;
      background-color: #ffffff;
      display: flex;
      padding-top: 20upx;
      box-sizing: border-box;
      &>.b-d-b-left {
        flex: 0 0 420upx;
        width: 420upx;
        margin-right: 40upx;
        &>.b-d-b-l-title {
          width: 100%;
          height: auto;
          line-height: 1;
          font-family: PingFang-SC-Bold;
          color: #191f25;
          font-size: 32upx;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &>.b-d-b-l-desc {
          width: 100%;
          height: 70upx;
          margin-top: 26upx;
          font-family: PingFang-SC-Medium;
          color: #7d8184;
          font-size: 24upx;
          max-height: 125upx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        &>.b-d-b-l-time {
          width: 100%;
          height: auto;
          line-height: 1;
          margin-top: 26upx;
          font-family: PingFang-SC-Medium;
          color: #a3a5a8;
          font-size: 24upx;
        }
      }
      &>.b-d-b-right {
        flex: 0 0 210upx;
        width: 210upx;
        height: 180upx;
        &>image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
  .post-btn {
    position: fixed;
    bottom: 136upx;
    right: 46upx;
    width: 94upx;
    height: 94upx;
    z-index: 99;
    &>image {
      width: 94upx;
      height: 94upx;
      display: block;
    }
  }
}
</style>
