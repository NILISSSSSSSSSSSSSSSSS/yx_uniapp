

const amapFile = require("./amap-wx.js");

// 初始化类型
export class SetMapItem {
	zoom = 8;
	scale = 2;
	width = 100;
	height = 100;
	id = ""; // 地图id
}

// 静态图类型
export class StaticMapItem {
	localLan = 0;
	localLat = 0;
	hasMarker = false;
}

// 搜索附近信息类型
export class SearchNearMarkerItem {
	adcode = "";
	address = "";
	name = "";
	district = "";
	lng = "";
	lat = "";
}

// 当前定位点的类型
export class ControlsItem {
	id = "";  // 控件id
	iconPath = ""; // 图片路径
	width = 0;  // 单位：px
	height = 0;  // 单位：px
	left = 0;  // 距离地图的左边界多远 单位：px
	top = 0;  // 距离地图的上边界多远 单位：px
	clickable = false; // 能否点击
}

// 地图可视区域的最大和最小经纬度
export class RegionMaxMinGpsItem {
	minLat = null;
	minLng = null;
	maxLat = null;
	maxLng = null;
}

// 地图找房marker
export class MapFindeHouseItem {
	lat = null;
	lng = null;
	id = "";
	iconPath = "";
	width = 0;
	height = 0;

	// 气泡设置
	callout_content = ""; // 气泡文本
	callout_color = "#000000";
	callout_fontSize = 12;
	callout_borderRadius = 0;
	callout_bgColor = "transparent";
	callout_padding = 5;  // 文本边缘留白
	callout_display = "ALWAYS"; // 'BYCLICK':点击显示; 'ALWAYS':常显
	callout_textAlign = "center";
}

export class GetStaticMapImg {
	lat = 0;
	lng = 0;
	constructor(lat, lng) {
	    this.lat = lat;
		this.lng = lng;
	}

	getImgUrl(width = 375, height = 320) {
		return "https://apis.map.qq.com/ws/staticmap/v2/?center="
			+this.lat+","+this.lng
			+"&zoom=16&scale=2&markers=size:large|icon:https://cd.haofang.net/Public/images/wap/icon_mylocation.png|"
			+this.lng+","+ this.lat+"&key=DGFBZ-3IFW2-PDEUL-CBLCE-XOSYK-K5B5I"
			+"&size="+width+"*"+height;
	}
}

export class SetMap {
	item = new SetMapItem();
	myAmapFun = null;
	mapContext = null;
	key = "924a344dd942f959aafba539c81e1b24";

	constructor(item = new SetMapItem()) {
	    this.item = item;
		this.init();
	}

	init() {
		this.myAmapFun = new amapFile.AMapWX({key: this.key});
	}

	// 获取静态图
	getStaticMap(markerItem) {
		let that = this;
		return new Promise((resolve, reject) => {
			if(markerItem === undefined) {
				throw new Error("请配置静态地图的参数");
				reject("");
				return;
			}

			if(!markerItem.localLat || !markerItem.localLan) {
				throw new Error("请配置静态地图的定位点的经纬度");
				reject("");
				return;
			}

			let url = `https://restapi.amap.com/v3/staticmap?key=${this.key}&s=rsx&platform=WXJS`
				+`&appname=${this.key}&sdkversion=1.2.0&logversion=2.0`
				+`&location=${markerItem.localLan},${markerItem.localLat}&zoom=${this.item.zoom}`
				+`&size=${this.item.width}*${this.item.height}`
				+`&scale=${this.item.scale}`;
			if(markerItem.hasMarker) {
				url = url + `&markers=mid,0x${markerItem.markerColor},A:116.282034,40.046875`;
			}
			resolve(url);
		});
	}

	// 获取周边信息
	getNearMarkers() {
		let that = this;
		return new Promise((resolve, reject) => {
			that.myAmapFun.getPoiAround({
				success: function(data){
					console.log(data);
					resolve(data);
				},
				fail: function(info){
					console.log(info);
					reject(info);
				}
			})
		});
	}

	// 搜索附近的信息
	searchNearInfo(keywords, cityId = "", lng = "", lat = "") {
		let that = this;
		return new Promise((resolve, reject) => {
			let location = lng && lat ? lng+","+lat : "";
			that.myAmapFun.getInputtips({
				keywords: keywords,
				city: cityId,
				citylimit: true,
				location: location,
				success: function(data){
					if(!data || !data.tips) {
						resolve([]);
						return;
					}

					let tips = data.tips || [];
					let items = [];
					for(let i = 0;i<tips.length;i++) {
						let dataItem = tips[i] || {};
						if(!dataItem.adcode || dataItem.adcode.length === 0) continue;

						let gps = dataItem.location && dataItem.location.indexOf(",") >= 0 ? dataItem.location.split(",") : ["", ""];
						let item = new SearchNearMarkerItem();
						item.adcode = dataItem.adcode || "";
						item.address =((dataItem.address) instanceof Array) ? "暂无区域" : dataItem.address || "暂无区域";
						item.name = dataItem.name || "暂无名称";
						item.district = ((dataItem.district) instanceof Array) ? "暂无行政区域" : dataItem.district || "暂无行政区域";
						item.lng = gps[0];
						item.lat = gps[1];
						items.push(item);
					}
					resolve(items);
				},
				fail: function(err) {
					reject(err);
				}
			});
		});
	}

	// 设置地图控制点
	setControls(controlsList = []) {
		return new Promise((resolve, reject) => {
			let controls = [];
			let idMap = {};
			for(let item of controlsList) {
				if(!item.id) {
					throw new Error("请配置控制的id");
					continue;
				}

				if(!item.iconPath) {
					throw new Error("请配置控制的图片");
					continue;
				}

				if(idMap[item.id]) {
					throw new Error("配置的id重复了");
					continue;
				}

				idMap[item.id] = true;
				controls.push({
					id: item.id,
					position: {
						left: item.left,
						top: item.top,
						width: item.width,
						height: item.height
					},
					iconPath: item.iconPath,
					clickable: item.clickable
				});
			}
			resolve(controls);
		});
	}

	// 获取地图可视区域的四个点的经纬度信息
	getRegion(mapContext) {
		return new Promise((resolve, reject) => {
			if(!this.item.id) {
				throw new Error(`请配置地图id`);
			}

// 			if(!this.mapContext) {
// 				throw new Error(`请初始化id === ${this.item.id}的地图对象`);
// 			}
            this.mapContext = mapContext;
            this.mapContext.getRegion({
            	success: function(res) {
            		let southwest = res.southwest || {};
            		let northeast = res.northeast || {};
            		let item = new RegionMaxMinGpsItem();
            		item.minLat = southwest.latitude || 0;
            		item.minLng = southwest.longitude || 0;
            		item.maxLat = northeast.latitude || 0;
            		item.maxLng = northeast.longitude || 0;
            		resolve(item);
            	},
            	fail: function(err) {
            		reject(err);
            	}
            });
		});
	}

	// 设置地图找房的marker点
	setMapFindMarkers(list = []) {
		return new Promise((resolve, reject) => {
			let markers = [];
			for(let item of list) {
				if(!item.id) continue;

				markers.push({
					id: item.id,
					latitude: item.lat,
					longitude: item.lng,
					iconPath: item.iconPath,
					title: item.callout_content,
					width: item.width,
					height: item.height,
                    callout: {
						content: item.callout_content,
						color: item.callout_color,
						fontSize: item.callout_fontSize,
						borderRadius: item.callout_borderRadius,
						bgColor: item.callout_bgColor,
						padding: item.callout_padding,
						display: item.callout_display,
						textAlign: item.callout_textAlign
					}
				});
			}
			resolve(markers);
		});
	}
}
