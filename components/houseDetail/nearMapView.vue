<template>
		<view class="">
			<mapBtnView :currentIndex='-1' @NearInfoMapBtnChanged="NearInfoMapBtnChanged"></mapBtnView>
			<button form-type="submit" hover-class="none" class="near_map" @click="tapMap" >
				<image :src="mapImgUrl" mode="aspectFill" @click="allAmbitus"></image>
				
				<view class="map_center_view">
					<view class="map_center_name new_class">{{ item.buildName }}</view>
				</view>
                
        <view class="map_center_icon"></view>
			</button>
			
			<!-- <mapBtnView :currentIndex='-1'></mapBtnView> -->
		</view>
</template>

<script>
import { Notification } from "@/utils/Notification.js";
import { Notify } from "@/utils/Notify.js";

export class NearMapItem {
  lng = "";
  lat = "";
  buildName = "";
}

import mapBtnView from "./mapBtnView.vue";

export default {
  data() {
    return {
      mapImgUrl: ""
    };
  },

  props: ["item"],

  components: {
    mapBtnView
  },

  watch: {
    item(newValue, oldValue) {
      this.initMarkers();
    }
  },

  mounted() {
    this.initMarkers();
  },

  methods: {
    initMarkers() {
      if (!this.item.lat) return;

      this.mapImgUrl = "https://apis.map.qq.com/ws/staticmap/v2/?center=" + this.item.lat + "," + this.item.lng + "&zoom=16&scale=2&markers=size:large|icon:https://cd.haofang.net/Public/images/wap/icon_mylocation.png|" + this.item.lng + "," + this.item.lat + "&key=DGFBZ-3IFW2-PDEUL-CBLCE-XOSYK-K5B5I&size=375*320";
    },

    allAmbitus() {
      // this.UserBehavior.lookMapAll();
    },
    tapMap() {
      this.$emit("mapChanged", {
        item: { type: "transit", text: "公交" },
        index: 0
      });
    },
    NearInfoMapBtnChanged(data) {
      this.$emit("mapChanged", data);
    }
  }
};
</script>

<style>
.new_class {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.near_map {
  /* width: 100%; */
  height: 350upx;
  /* padding: 0 40upx; */
  position: relative;
}
.near_map > image {
  width: 100%;
  height: 100%;
}
.map_view {
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
}
.map_center_view {
  position: absolute;
  height: 80upx;
  line-height: 80upx;
  text-align: center;
  font-size: 32upx;
  color: #101d36;
  background-color: #ffffff;
  padding: 0 30upx;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4upx;
  z-index: 20;
}
.map_center_view::after {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -15upx;
  border-left: 20upx solid transparent;
  border-right: 20upx solid transparent;
  border-top: 20upx solid #ffffff;
  z-index: 20;
}
.map_center_icon {
  position: absolute;
  left: 50%;
  top: calc(50% + 35upx);
  transform: translate(-50%, 0);
  width: 32upx;
  height: 32upx;
  border-radius: 50%;
  border: solid 3upx #005aff;
  background-color: #adcef1;
  margin: 0 auto 0;
  z-index: 1;
}
</style>
