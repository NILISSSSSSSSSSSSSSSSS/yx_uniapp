

// caseType = 9 ? 旅居地产(新房)
// caseType = 6 ? 热销新房
// caseType = 2 ? 整租
// caseType = 3 ? 合租
// caseType = 1 ? 二手房
// caseType = 4 ? 新房
// caseType = 5 ? 公寓
// caseType = 7 ? 整租公寓
// caseType = 8 ? 合租公寓


export class Const {
	// 价格 面积 房源登记提示配置
	static areaPriceMap = {
		sale: {
			HOUSING: {
				area: {
					msg: "住宅面积不得低于5平米",
					minVal: 5
				},
				price: {
					msg: "价格不得低于5万元",
					minVal: 5
				}
			},
			VILLA: {
				area: {
					msg: "别墅面积不得低于40平米",
					minVal: 40
				},
				price: {
					msg: "价格不得低于5万元",
					minVal: 5
				}
			},
			OFFICE: {
				area: {
					msg: "写字楼面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于5万元",
					minVal: 5
				}
			},
			MANUFACT: {
				area: {
					msg: "厂房面积不得低于10平米",
					minVal: 10
				},
				price: {
					msg: "价格不得低于5万元",
					minVal: 5
				}
			},
			STORE: {
				area: {
					msg: "仓库面积不得低于10平米",
					minVal: 10
				},
				price: {
					msg: "价格不得低于5万元",
					minVal: 5
				}
			},
			TRADE: {
				area: {
					msg: "商铺面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于5万元",
					minVal: 5
				}
			},
			GARAGE: {
				area: {
					msg: "车库面积不得低于10平米",
					minVal: 10
				},
				price: {
					msg: "价格不得低于5万元",
					minVal: 5
				}
			},
		},
		lease: {
			HOUSING: {
				area: {
					msg: "面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于0.1元",
					minVal: 0.1
				}
			},
			VILLA: {
				area: {
					msg: "面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于0.1元",
					minVal: 0.1
				}
			},
			OFFICE: {
				area: {
					msg: "面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于0.1元",
					minVal: 0.1
				}
			},
			MANUFACT: {
				area: {
					msg: "面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于0.1元",
					minVal: 0.1
				}
			},
			STORE: {
				area: {
					msg: "面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于0.1元",
					minVal: 0.1
				}
			},
			TRADE: {
				area: {
					msg: "面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于0.1元",
					minVal: 0.1
				}
			},
			GARAGE: {
				area: {
					msg: "面积不得低于3平米",
					minVal: 3
				},
				price: {
					msg: "价格不得低于0.1元",
					minVal: 0.1
				}
			},
		}
	};
	static tokenExpireCode = 400;
    static success = 200;
    // cdn图片自定义尺寸
	static getDealCdnImgUrl(url = this.houseDefaultImg, width = 180, height = 120) {
		if (url.indexOf("?x-oss-process=image/resize") >= 0) return url;

		return url + "?x-oss-process=image/resize,m_fill,h_" + height + ",w_" + width;
	}
    // 房源默认图
    static houseDefaultImg = "http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png";
	// 人物头像默认图
    static defaultHeadImg = "http://cdn.haofang.net/static/xfldDeveloper/msg/default_header.png";
	// 聊天人物默认头像
    static imDefaultHeadImg = "http://cdn.haofang.net/static/xfldDeveloper/msg/default_header.png";
    // 客服电话
    static servicePhone = "400-800-8548";
	static erHouse = "erHouse";
	static newHouse = "newHouse";
	static zuHouse = "zuHouse";
    // 小程序原始id
	static wxAppOriginalId = "gh_70add125ef99";
    // 微信开放平台appId
	static wxPlatformAppId = "wx5b9bf6530fec7c52";

	// 找房 - 时间
	static timeList = [
		{ text: '不限', id: '' },
		{ text: '一天内', id: '1' },
		{ text: '一周内', id: '2' },
		{ text: '一月内', id: '3' },
		{ text: '一季内', id: '4' }
	];

	// 发房 - 时间
	static houseTimeList = [
		{ text: '不限', id: '' },
		{ text: '一天内', id: '1' },
		{ text: '一周内', id: '2' },
		{ text: '一月内', id: '3' },
		{ text: '一季内', id: '4' },
		{ text: '半年内', id: '5' },
		{ text: '一年内', id: '6' },
	];

	// 户型筛选
	static roomList =  [
		{ text: '1室', id: '1' },
		{ text: '2室', id: '2' },
		{ text: '3室', id: '3' },
		{ text: '4室', id: '4' },
		{ text: '5室', id: '5' },
		{ text: '6室', id: '6' },
		{ text: '7室', id: '7' },
		{ text: '8室及以上', id: '8' }
	];
	// 来源筛选
	static sourceLsit = [
		{ text: '业主房源', id: '0' },
		{ text: '经纪人', id: '1' }
	];
	// 面积筛选
	static areaList = [
		{ text: '不限', id: '' },
		{ text: '60㎡以下', id: '0:60' },
		{ text: '60-90㎡', id: '60:90' },
		{ text: '90-120㎡', id: '90:120' },
		{ text: '120-150㎡', id: '120:150' },
		{ text: '150-180㎡', id: '150:180' },
		{ text: '180-240㎡', id: '180:240' },
		{ text: '240-320㎡', id: '240:320' },
		{ text: '320-600㎡', id: '320:600' },
		{ text: '600㎡以上', id: '600:999' }
	];
	// 类型筛选
	static typeLsit = [
		{ text: '住宅', id: 1 },
		{ text: '别墅', id: 2 },
		{ text: '商铺', id: 3 },
		{ text: '写字楼', id: 4 },
		{ text: '其他', id: 8 }
	];
	// 新房类型筛选(就是用途)
	static newHouseTypeList = [
		{ text: "不限", id: "" },
		{ text: '住宅', id: 1 },
		{ text: '别墅', id: 2 },
		{ text: '商铺', id: 3 },
		{ text: '写字楼', id: 4 },
		{ text: "旅游地产", id: 5}
	];

	// 特色筛选
	static specialList = [
		{ text: '两证齐全', id: 1 },
		{ text: '满两年', id: 2 },
		{ text: '免税', id: 3 },
		{ text: '急售', id: 4 },
		{ text: '顶楼花园', id: 7 },
		{ text: '底楼花园', id: 8 },
		{ text: '带车位', id: 64 },
		{ text: '地下室', id: 96 }
	];

	// 装修情况
	static zhuangXiuList = [
		{ id: '2', text: '简装' },
        { id: '3', text: '精装' },
        { id: '6', text: '豪装' },
        { id: '1', text: '毛坯' },
        { id: '7', text: '不限' }
	];

// 范围
	static fanWeiList = [
		{ id: '', text: '不限'},
		{ id: '1', text: '收藏的房源'},
		{ id: '1', text: '已联系的房源'},
	]



	// -------- 公寓相关  以下 -----------
	// 出租方式
	static aparmentChuZuTypeList = [
		{ text: '不限', id: "" },
		{ text: '整租', id: 1 },
		{ text: '合租', id: 2 }
	];

	// 入住时间
	static aparmentRuZhuTimeList = [
		{ text: '立即入住', id: '1' },
		{ text: '一周内', id: '2' },
		{ text: '两周内', id: '3' }
	];

	// 公寓户型
	static apartmentRoomList = [
		{ text: '1室', id: '1:1' },
		{ text: '2室', id: '2:2' },
		{ text: '3室', id: '3:3' },
		{ text: '4室', id: '4:4' },
		{ text: '5室', id: '5:5' },
		{ text: '5室以上', id: '5:100' }
	];

	// 公寓面积(平米)
	static apartmentAreaList = [
		{ text: '10以下', id: '0:10' },
		{ text: '10-30', id: '10:30' },
		{ text: '30-50', id: '30:50' },
		{ text: '50-70', id: '50:70' },
		{ text: '70-90', id: '70:90' },
		{ text: '90以上', id: '90:999' }
	];

	// 公寓性别
	static aparmentSexList = [
		{ text: '全是妹子', id: 2 },
		{ text: '全是汉子', id: 1 }
	];

	// 公寓特色
	static apartmentSpecialList = [
		{ text: '可月付', id: 5 },
		{ text: '独卫', id: 1 },
		{ text: '飘窗', id: 3 },
		{ text: '阳台', id: 2 },
		{ text: '空调', id: 4 },
		{ text: '厨房', id: 6 }
	];
	// -------- 公寓相关  以上 -----------



	// -------- 委托相关 --------------
	// 类型
	static entrustHouseTypeList = [
		{ id: 1, text: "住宅" },
        { id: 2, text: "别墅" },
        { id: 3, text: "商铺" },
        { id: 4, text: "写字楼" }
	];
	// 装修情况
	static entrustZhuangXiuList = [
		{ id: '2', text: '简装' },
        { id: '3', text: '精装' },
        { id: '6', text: '豪装' },
        { id: '1', text: '毛坯' },
        { id: '7', text: '不限' },
	];
	// 室
	static entrustRoomList = [
		{ id: '1', text: '一室' },
        { id: '2', text: '二室' },
        { id: '3', text: '三室' },
        { id: '4', text: '四室' },
        { id: '5', text: '五室' },
        { id: '20', text: '五室以上' }
	];

	//佣金比例
    static feeMap = {
		1: [{ fee: '0.01|0.015', name: '1-1.5', unit: '%' }, { fee: '0.015|0.02', name: '1.5-2', unit: '%' }],//求购
        3: [{ fee: '0.01|0.015', name: '1-1.5', unit: '%' }, { fee: '0.015|0.02', name: '1.5-2', unit: '%' }],//求购
        4: [{ fee: '0|0.5', name: '10-15', unit: '天' }, { fee: '0.5|1', name: '15-20', unit: '天' }],//求租
    };

	// 经纪人性别
	static sexMap = [
        { id: 1, text: "帅哥", headImg: "https://uuweb.haofang.net/PublicC/images/publish/index/sex-man.png" },
        { id: 2, text: "美女", headImg: "https://uuweb.haofang.net/PublicC/images/publish/index/sex-woman.png" },
    ];

	// 房屋配套情况
	static housePeiTaoMap = [
		{ id: 7, text: "宽带" },
		{ id: 13, text: "热水器" },
		{ id: 9, text: "洗衣机" },
		{ id: 10, text: "冰箱" },
		{ id: 21, text: "衣柜" },
		{ id: 44, text: "厨房" },
		{ id: 11, text: "空调" },
		{ id: 27, text: "暖气" },
	];

	//出租房间类型
	static chuZuRoomTypeList = [
		{ id: 2, text: "次卧" },
		{ id: 3, text: "主卧" },
		{ id: 4, text: "单间" },
		{ id: 1, text: "不限" }
	];
	// 租金类型
	static zuJinTypeList = [
		{ id: 1, text: "月付" },
		{ id: 2, text: "季付" },
		{ id: 3, text: "半年付" },
		{ id: 4, text: "年付" },
		{ id: 5, text: "面议" },
	];

	//房屋装修情况数组:
	// static houseFitmentMap = [
	// 	{ id: '', text: "不限" },
	// 	{ id: 1, text: "毛坯房" },
	// 	{ id: 2, text: "普通装修" },
	// 	{ id: 3, text: "精装修" },
	// 	{ id: 6, text: "豪华装修" }
	// ];
	static houseFitmentMap = [
		{ id: '', text: "不限" },
		{ id: 1, text: "毛坯" },
		{ id: 2, text: "普通" },
		{ id: 3, text: "精装" },
		{ id: 6, text: "豪装" }
	];
	// lh
	static buildTypeObj = {
		1: { value: '待售', color: '#ffb109', bgColor: 'rgba(255, 177, 9, 0.07)'},
		2: { value: '在售', color: '#0084ff', bgColor: 'rgba(0, 132, 255, 0.07)'},
		3: { value: '售罄', color: '#c0c1c3', bgColor: 'rgba(163, 165, 168, 0.07)'},
		4: { value: '招商', color: '#fa5741', bgColor: 'rgba(250, 87, 65, 0.07)'},
		5: { value: '招租', color: '#44bc6e', bgColor: 'rgba(68, 188, 110, 0.07)'}
	};

	static distributionTypeIds = {
		1: '全明格局',
		2: '主卧带卫',
		3: '户型方正',
		4: '南北通透',
		5: '干湿分离',
		6: '带飘窗',
		7: '观景落地窗',
		8: '多阳台',
	};

	// 建筑类型列表
  static houseTypeList = [
		{ "text": "多层", "value": "多层" },
		{ "text": "电梯", "value": "电梯" },
		{ "text": "平房", "value": "平房" },
		{ "text": "商住两用", "value": "商住两用" },
		{ "text": "写住两用", "value": "写住两用" },
		{ "text": "独院", "value": "独院" },
		{ "text": "板楼", "value": "板楼" },
		{ "text": "塔楼", "value": "塔楼" },
		{ "text": "板塔结合", "value": "板塔结合" },
		{ "text": "超高层", "value": "超高层" },
		{ "text": "高层", "value": "高层" },
		{ "text": "小高层", "value": "小高层" },
		{ "text": "独栋别墅", "value": "独栋别墅" },
		{ "text": "联排别墅", "value": "联排别墅" },
		{ "text": "双拼别墅", "value": "双拼别墅" },
		{ "text": "叠排别墅", "value": "叠排别墅" },
		{ "text": "建筑综合体", "value": "建筑综合体" },
		{ "text": "其他", "value": "-" }
	];
	
	// 总价单位
  static unitList = [
		{ "text": "万元", "value": "1" },
		{ "text": "元/月", "value": "3" },
    { "text": "元/平方米/月", "value": "4" },
  ];
}

export class HouseListItem {
	houseId = "";
	houseImg = "";    // 房屋图片
	houseTitle = "";   // 房屋顶部title
	houseTing = "";   // 厅和室
	houseArea = "";     // 面积数值
	houseAreaUnit = "";  // 面积单位
	houseAddress = "";   // 地理位置文案
	houseName = "";   // 房源名称
	houseTags = [];  // 标签数组
	houseTotalPrice = "";   // 总价数值
	houseTotalPriceUnit = "";   // 总价单位
	housePriceOfArea = "";  // 单位面积的价格数值
	housePriceOfAreaUnit = "";   // 单位面积的价格单位
	hasVr = false;   // 是否有vr
	hasVideo = false;   // 是否有video
	cityId = "";   // 房源所在的城市id
	caseType = "";  // 房源类型  1 代表二手房
	reSource = "";  // 来源
	trueHouse = false;  // 是否是真房源
}

export class NewHouseListItem {
    buildId = "";
    buildStatus = "";  // 房屋状态
    buildImg = "";    // 房屋图片
    buildTing = "";   // 厅和室
    buildArea = "";     // 面积数值
    buildAreaUnit = "";  // 面积单位
    buildAddress = "";   // 地理位置文案
    buildName = "";   // 房源名称
    buildTags = [];  // 标签数组
    buildPriceOfArea = "";  // 单位面积的价格数值
    buildPriceOfAreaUnit = "元/㎡";   // 单位面积的价格单位
    isHotSale = false;  // 是否是热销
    cityId = "";   // 房源所在的城市id
	caseType = "";  // 房源类型  4 代表新房
	buildAreaMin = ""; // 面积最小值
	buildAreaMax = "";  // 面积最大值
}

export class ZuHouseListItem {
    houseId = "";
    houseImg = "";    // 房屋图片
    houseTitle = "";   // 房屋顶部title
    houseTing = "";   // 厅和室
    houseArea = "";     // 面积数值
    houseAreaUnit = "";  // 面积单位
    houseAddress = "";   // 地理位置文案
    houseName = "";   // 房源名称
    houseTags = [];  // 标签数组
    housePriceOfMonth = "";  // 每月的价格数值
    housePriceOfMonthUnit = "";   // 每月的价格单位
    hasVr = false;   // 是否有vr
    hasVideo = false;   // 是否有video
    cityId = "";   // 房源所在的城市id
    caseType = "";  // 房源类型
    reSource = "";  // 来源
}

export class ApartmentHouseListItem {
    houseId = "";
    houseImg = "";    // 房屋图片来源文案
    houseTing = "";   // 厅和室和卫
    houseAddress = "";   // 地理位置文案
    houseName = "";   // 房源名称
    houseTags = [];  // 标签数组
    houseResourceText = "";  // 提供方文案
    housePriceOfMonth = "";  // 每月的价格数值
    housePriceOfMonthUnit = "";   // 每月的价格单位
	apartmentUuid = "";
	roomUuid = "";
	rentType = "";
	caseType = "";
	houseSource = ""; // 房屋来源 例如：优客逸家
	houseJianText = ""; // 房间名称 例如：D房间
}


// 房源列表上经纪人的字段信息
export class HouseListAgentItem {
	zhuangXiuStatusId = "";  // 装修情况
	zhuangXiuStatusName = "";
	roomId = "";  // 几室id
	roomName = "";
	regionId = "";
	regionName = "";
	houseTypeId = ""; // 房屋类型id
	houseTypeName = ""; // 房屋类型文案
	buildId = "";
	buildName = ""; // 服务的小区名称
	buildAddress = "";  // 服务的区域
	agentHeaderImg = "";  // 经纪人头像
	archiveId = ""; // 聊天id
	agentName = "";  // 经纪人名称
	agentPhone = ""; // 经纪人电话
	isExit = ""; // 是否显示  不等于0显示
	caseId = ""; // 房源id
	caseType = "";  // 房源类型
	cityId = ""; // 城市id
	reSource = 1;  // 来源
	noBoxShadow = false;  // 不显示view 的 box-shadow style
}

export class ErHouseListItem {
	compId = ""; // 公司id
	isTopHouse = false; // 是否是置顶房源
	houseId = "";
	buildId = "";
	houseImg = "";    // 房屋图片
	houseTitle = "";   // 房屋顶部title
	shareTitle = "";  // 简短的title
	houseTing = "";   // 厅/室/卫
	houseRoom = "";  // 室
	houseHall = "";  // 厅
	houseWei = "";  // 卫
	houseArea = "";     // 面积数值
	houseAreaUnit = "m²";  // 面积单位
	houseAddress = "";   // 地理位置文案
	houseName = "";   // 房源名称
	houseTags = [];  // 标签数组
	houseTotalPrice = "";   // 总价数值，也可以代表租房的单价
	houseTotalPriceUnit = "";   // 总价单位， 也可以代表租房的价格单位
	housePriceOfArea = "";  // 单位面积的价格数值  （已弃用）
	housePriceOfAreaUnit = "";   // 单位面积的价格单位  （已启用）
	hasVr = false;   // 是否有vr
	hasVideo = false;   // 是否有video
	cityId = "";   // 房源所在的城市id
	caseType = "";  // 房源类型  1 代表二手房
	reSource = "";  // 来源
	trueHouse = false;  // 是否是真房源
	
	isShowBrowseNum = "";  // 是否显示浏览次数
	
	houseUseage = "";  // 类型id 如：1 = 住宅
	houseUseageCn = "";  // 类型id对应的文案
	
	regionName = "";  // 区域
	sectionName = "";  // 商圈
	
	pageFrom = "";  // 从那个页面进入 例如: entrustDetail: 委托详情  personalStore: 个人微店
	archiveId = ""; // 经纪人id
}
