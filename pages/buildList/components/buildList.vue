<template>
	<view class="build-list">
		<!-- 顶部title -->
		<view class="title-view"></view>
		<view class="top-title">楼盘</view>
		<!-- 列表 -->
		<view class="build-list-content">
			<block v-for="(item, index) in buildList" :key="index">
				<view class="b-l-item">
					<view class="b-l-t-top" @click="goToDetail(item.buildId)">
						<view class="b-l-t-t-left">
							<view class="now-build" v-show="index === 0">当前楼盘</view>
							<image :src="item.thumbImageUrl || 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'" mode="aspectFill"></image>
						</view>
						<view class="b-l-t-t-right">
              <!-- 名称 状态 类型 -->
							<view>
								<view>
									<view>{{item.buildingName}}</view>
									<view v-if="item.buildingState" :style="{'color': buildTypeObj[item.buildingState].color, 'background-color': buildTypeObj[item.buildingState].bgColor}">{{buildTypeObj[item.buildingState].value}}</view>
								</view>
								<view v-if="item.useageType">{{item.useageType}}</view>
							</view>
              <!-- 价格 -->
							<view>{{item.averagePrice || '--'}}元/㎡</view>
              <!-- 城市、面积 -->
							<view>{{(item.cityName || '--') + '/' + (item.buildingArea || '--')}}</view>
							<!-- 标签 -->
              <view v-if="item.buildingLabels">
								<view v-for="(m, n) in item.buildingLabels" :key="n">{{m}}</view>
							</view>
						</view>
					</view>
					<view class="b-l-t-bottom" @click="goToAnalysis(index)" :style="{'background-image': index === 0 ? 'url(http://cdn.haofang.net/static/xfldDeveloper/build/arrow-right.png)' : 'none' }">
						<view>
							<view>已报备：</view>
							<view>{{item.reportedNum || 0}}</view>
						</view>
						<view>
							<view>已带看：</view>
							<view>{{item.bandNum || 0}}</view>
						</view>
						<view>
							<view>已签约：</view>
							<view>{{item.subscribeNum || 0}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 添加楼盘 -->
		<view class="add-build" @click="addBuilding()">
			<collectFormId></collectFormId>
			<image src="http://cdn.haofang.net/static/xfldDeveloper/build/add.png" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script>
import { GetLoginModel } from "@/model/LoginSuccessModel";
import scrollLoading from "@/components/scrollLoading.vue";
import { Const } from "@/utils/Const.js";
import { ListUserRelativeBuilding } from "@/net/BuildNet.js";
import { Notify } from "@/utils/Notify.js";
import { Notification } from "@/utils/Notification.js";

export default {
  data () {
    return {
      buildId: "", // 当前楼盘ID
      buildList: [], // 楼盘列表
      // 楼盘状态
      buildTypeObj: Const.buildTypeObj
    }
  },
  components: {
    scrollLoading
  },
  mounted () {
	  // 监听页面可见 刷新组件
	  new Notification().addObserver(this, "PageShowChange", Notify.PageShowChange.Name);
    // 监听楼盘添加修改成功
    new Notification().addObserver(this, "initData", Notify.SaveBuildChange.Name);
    this.buildId = GetLoginModel.getBuildId() || '';
	  this.initData();
  },
  methods: {
	  PageShowChange(name, params) {
		  if (params.source === "build") {
			  this.buildId = GetLoginModel.getBuildId() || '';
			  this.initData();
		  }
	  },
    // 初始化数据
    initData () {
      new ListUserRelativeBuilding().send().then(res => {
        if (res.errCode !== Const.success) {
          this.buildList = [];
          this.DifferenceApi.showToast(res.errMsg);
          return;
        }

        this.buildList = res.data.buildingList || [];
        // 标签处理
        this.buildList.forEach((item, index) => {
          if (item["buildingLabels"]) {
            item["buildingLabels"] = item["buildingLabels"].split(",");
            if (item["buildingLabels"].length > 5) {
              item["buildingLabels"].splice(0, 5);
            }
          }
        });
        if (this.buildList.length <= 1) return;

        // 当前楼盘放在第一个
        let obj = [];
        this.buildList.forEach((item, index) => {
          if (item.buildId === this.buildId) {
            obj = this.buildList.splice(index, 1);
          }
        });
        this.buildList.unshift(obj[0]);
      });
    },
    // 添加楼盘
    addBuilding () {
      uni.navigateTo({
        url: "/pagesBuild/addEditBuilding/addEditBuildingFirst?type=add"
      });
    },
    // 跳转详情
    goToDetail (id) {
      uni.navigateTo({
        url: "/pagesBuild/buildDetail/buildDetail?buildId=" + id
      });
    },
    // 跳转统计
    goToAnalysis (index) {
      if (index !== 0) return;
      uni.navigateTo({
        url: "/pagesStatistics/analysis/analysis"
      });
    }
  },
  destroyed () {
    new Notification().removeObserverAllNotification(this);
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
.build-list {
  width: 100%;
  height: 100%;
  padding: 20upx 0;
  box-sizing: border-box;
  // overflow: hidden;
  &>.title-view {
    width: 100%;
  	height: var(--status-bar-height);
    background-color: #ffffff;
  }
  &>.top-title {
	  font-family: PingFang-SC-Bold;
	  font-size: 48upx;
	  font-weight: bold;
	  font-stretch: normal;
	  line-height: 134upx;
	  color: #191f25;
	  padding-left: 40upx;
	  box-sizing: border-box;
  }
  &>.build-list-content {
    width: 100%;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    &>.b-l-item {
      width: 100%;
      height: auto;
      border-bottom: 2upx solid #f5f5f5;
      margin: 0;
      padding: 0;
      &:nth-child(1) {
        border: none;
        box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.06);
        padding: 0 40upx;
        box-sizing: border-box;
      }
      &:nth-child(n + 2) {
        width: calc(100% - 80upx);
        margin: 50upx auto 0;
      }
      &>.b-l-t-top {
        width: 100%;
        height: 160upx;
        display: flex;
        &>.b-l-t-t-left {
          position: relative;
          flex: 0 0 210upx;
          height: 100%;
          border-radius: 4upx;
          overflow: hidden;
          &>.now-build {
            position: absolute;
            top: 0;
            left: 0;
            width: 100upx;
            height: 37upx;
            line-height: 37upx;
            background-color: #ffb109;
            color: #ffffff;
            text-align: center;
            font-family: PingFang-SC-Medium;
            font-size: 22upx;
            z-index: 9;
          }
          &>image {
            width: 210upx;
            height: 100%;
            display: block;
          }
        }
        &>.b-l-t-t-right {
          flex: 1 1 auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 30upx;
          &>view {
            width: 100%;
            height: auto;
            &:nth-child(1) {
              height: 32upx;
              display: flex;
              justify-content: space-between;
              &>view:nth-child(1) {
                flex: 1 1 auto;
                height: 32upx;
                display: flex;
                &>view {
                  &:nth-child(1) {
                    max-width: 220upx;
                    line-height: 1;
                    font-size: 32upx;
                    color: #191f25;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  &:nth-child(2) {
                    width: 52upx;
                    height: 32upx;
                    line-height: 32upx;
                    text-align: center;
                    border-radius: 4upx;
                    font-family: PingFang-SC-Medium;
                    font-size: 22upx;
                    margin-left: 15upx;
                  }
                }
              }
              &>view:nth-child(2) {
                width: auto;
                height: auto;
                line-height: 1;
                padding: 4upx 8upx;
                box-sizing: border-box;
                border-radius: 3upx;
                border: solid 2upx #191f25;
                color: #191f25;
                font-family: PingFang-SC-Medium;
                font-size: 22upx;
              }
            }
            &:nth-child(2) {
              line-height: 1;
              color: #fa5741;
              font-family: PingFang-SC-Bold;
              font-size: 28upx;
              font-weight: bold;
            }
            &:nth-child(3) {
              line-height: 1;
              color: #191f25;
              font-family: PingFang-SC-Medium;
              font-size: 22upx;
            }
            &:nth-child(4) {
              display: flex;
              overflow: hidden;
              &>view {
                width: auto;
                min-width: 60upx;
                height: 30upx;
                line-height: 30upx;
                text-align: center;
                background-color: #f8f8f8;
                border-radius: 4upx;
                color: #7d8184;
                font-family: PingFang-SC-Medium;
                font-size: 22upx;
                margin-right: 10upx;
                padding: 0 4upx;
                box-sizing: border-box;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
      &>.b-l-t-bottom {
        width: 100%;
        height: 80upx;
        background-image: url("http://cdn.haofang.net/static/xfldDeveloper/build/arrow-right.png");
        background-position: right;
        background-repeat: no-repeat;
        background-size: 12upx 22upx;
        display: flex;
        align-items: center;
        &>view {
          display: flex;
          flex: 0 0 auto;
          margin-right: 50upx;
          &:last-child {
            margin-right: 0;
          }
          &>view {
            font-size: 24upx;
            font-family: PingFang-SC-Medium;
            &:nth-child(1) {
              color: #a3a5a8;
            }
            &:nth-child(2) {
              max-width: 80upx;
              color: #191f25;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  &>.add-build {
    position: fixed;
    right: 48upx;
    bottom: 54upx;
    width: 90upx;
    height: 90upx;
    &>image {
      width: 90upx;
      height: 90upx;
      display: block;
    }
  }
}
</style>
