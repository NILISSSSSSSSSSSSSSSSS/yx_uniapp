<template>
	<view :style="{height: pageHeight}" class="near_info_map">
		<map id="nearMapId" class="map_view" :latitude="latitude" :longitude="longitude" :markers="markers" :scale="scale"></map>
		<view class="map_cont f_c_s">
			<view style="padding-left: 30upx;box-sizing: border-box;">
				<map-btn-view class="map_btn" :currentIndex="currentIndex" @NearInfoMapBtnChanged="NearInfoBtnChanged"></map-btn-view>
			</view>
			<view class="map_near_info_list">
				<view class="f_r_b map_near_info_item" v-for="(item, index) in nearInfoList" :key="index">
					<view class="map_near_info_name">{{ item.name }}</view>
					<view class="map_near_info_address">{{ item.address }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { SetMap, SearchNearMarkerItem } from "../../utils/SetMap.js";
import { Notification } from "../../utils/Notification.js";
import { Notify } from "../../utils/Notify.js";
import { GpsInfoModel } from "../../model/GpsInfoModel.js";
import mapBtnView from "@/components/houseDetail/mapBtnView.vue";
import { getRegeo } from "@/utils/addressGps.js";

export default {
  data() {
    return {
			pageHeight: "100%",
			scale: 15,
			latitude: 0,
			longitude: 0,
			markers: [],
			adcode: "",
			currentIndex: 0,
			keyword: "",
			btnType: "",
			nearInfoList: [],
			mapVal: null
    };
  },

  onShareAppMessage() {},

  components: {
    mapBtnView
  },

  onLoad(params) {
    this.dealParams(params);
    this.getPhoneInfo();
    this.upGpsInfo();
  },

  onShow() {
    // 监听gps变化
    new Notification().addObserver(this, "GpsChanged", Notify.GpsChanged.Name);
    // 监听地图btn事件
    new Notification().addObserver(this, "NearInfoMapBtnChanged", Notify.NearInfoMapBtnChanged.Name);
  },

  onHide() {
    // 反注册通知
    new Notification().removeObserverAllNotification(this);
  },

  onReady() {
    setTimeout(() => {
      this.mapVal = uni.createMapContext("nearMapId", this);
    }, 1000);
  },

  methods: {
    NearInfoBtnChanged(info) {
      this.keyword = info.item.text;
      this.btnType = info.item.type;
      this.upMapData();
    },

    dealParams(params) {
      let that = this;
      this.currentIndex = params.index ? Number(params.index) || 0 : 0;
      this.btnType = params.type || "transit";
      this.keyword = params.text || "公交";
      this.latitude = params.lat || "";
      this.longitude = params.lng || "";
      getRegeo(this.longitude, this.latitude, function(res) {
        that.adcode = res.addressComponent.adcode;
        if (that.btnType == "subway") {
          that.upMapData();
        }
      });
      uni.setNavigationBarTitle({
        title: '位置及周边'
      });
      this.upMapData();
    },

    // 获取设备信息
    getPhoneInfo() {
      let res = uni.getSystemInfoSync();
      this.pageHeight = res.windowHeight + "px";
    },

    // gps change 回调
    GpsChanged(name, item) {
      this.upGpsInfo();
    },

    // 更新定位信息
    upGpsInfo() {
      if (!new GpsInfoModel().getModel("cityInfo")) return;

      let item = new GpsInfoModel().getModel("cityInfo");
      this.adcode = item.adcode || "";
      this.upMapData();
    },

    NearInfoMapBtnChanged(name, info) {
      this.keyword = info.item.text;
      this.btnType = info.item.type;
      this.upMapData();
    },

    upMapData() {
      if (!this.keyword) return;

      let that = this;
      let mapIcon = {
        transit: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/bus-icon.png"
        },
        subway: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/subway-icon.png"
        },
        school: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/school-icon.png"
        },
        hospital: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/hospital-icon.png"
        },
        bank: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/bank-icon.png"
        },
        play: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/leisure-icon.png"
        },
        shop: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/shopping-icon.png"
        },
        eat: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/food-icon.png"
        },
        sport: {
          icon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/sports-icon.png"
        }
      };
      new SetMap()
        .searchNearInfo(
          this.keyword,
          this.adcode,
          this.longitude,
          this.latitude
        )
        .then(tips => {
          this.nearInfoList = tips;
          let markers = [];
          let index = 0;
          for (let val of tips) {
            // #ifndef MP-ALIPAY
            markers.push({
              id: index,
              latitude: val.lat,
              longitude: val.lng,
              iconPath: mapIcon[that.btnType].icon,
              width: 22,
              height: 31
            });
            // #endif

            // #ifdef MP-ALIPAY
            markers.push({
              id: index,
              latitude: parseFloat(val.lat),
              longitude: parseFloat(val.lng),
              iconPath: mapIcon[that.btnType].icon,
              width: 22,
              height: 31
            });
            // #endif
            index++;
          }
          // #ifdef MP-ALIPAY
          markers.push({
            id: index + 1,
            iconPath: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/redmarker_new.png",
            latitude: parseFloat(this.latitude),
            longitude: parseFloat(this.longitude),
            width: 22,
            height: 31
          });
          // #endif
          // #ifndef MP-ALIPAY
          markers.push({
            id: index + 1,
            iconPath: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/map/redmarker_new.png",
            latitude: this.latitude,
            longitude: this.longitude,
            width: 22,
            height: 31
          });
          // #endif
          that.markers = markers;
        });
    }
  }
};
</script>

<style>
.near_info_map {
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
}
.map_view {
  height: 60%;
  width: 100%;
  min-height: 60%;
}
.map_cont {
  height: 40%;
  background: #ffffff;
  width: 100%;
}
.map_btn {
  flex-shrink: 0;
}
.map_near_info_list {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 30upx;
  padding-bottom: 30upx;
  padding-top: 20upx;
  box-sizing: border-box;
}
.map_near_info_item {
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  line-height: 70upx;
  padding-right: 30upx;
}
.map_near_info_name {
  width: 45%;
  text-align: left;
  font-size: 24upx;
  color: #000;
  max-width: 45%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.map_near_info_address {
  width: 55%;
  padding-left: 30upx;
  box-sizing: border-box;
  text-align: right;
  font-size: 24upx;
  color: #999;
  max-width: 45%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
