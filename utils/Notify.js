

// Name：通知名称
// Info：通知信息

export class Notify {
	static CityInfoChanged = {
		Name: "CityInfoChanged",
		Info: null
	};

	static GpsChanged = {
		Name: "GpsChanged",
		Info: null
	};

	// 筛选显示的通知
	static ScreenShowChanged = {
		Name: "ScreenShowChanged",
		Info: null
	};

	// 筛选结果的通知
	static ScreenResultChanged = {
		Name: "ScreenResultChanged",
		Info: null
	};

	// 搜索结果的通知
	static SearchResChanged = {
		Name: "SearchResChanged",
		Info: null
	};

	// 房源周边信息的通知
	static NearInfoMapBtnChanged = {
		Name: "NearInfoMapBtnChanged",
		Info: null
	};

	// 个人授权信息变化的通知
	static UserInfoChanged = {
		Name: "UserInfoChanged",
		Info: null
	};

	// 授权变化的通知
	static AuthonChanged = {
		Name: "AuthonChanged",
		Info: null
	};

	// 房源列表经纪人弹窗的通知
	static HouseListAgentChanged = {
		Name: "HouseListAgentChanged",
		Info: null
	};

	// ------------------ im相关 -----------------
	// 更新消息列表  重新请求api
	static UpChartListChanged = {
		Name: "UpChartListChanged",
		Info: null
	};

	// 新消息
	static NewMsgChanged = {
		Name: "NewMsgChanged",
		Info: null,
		Type_entrust: "entrust"
	};

	// 语音播放change
	static VoicePlayChange = {
		Name: "VoicePlayChange",
		info: null
	};

	// 消息内容change
	static UpChartMsgChanged = {
		Name: "UpChartMsgChanged",
		Info: null
	};

	// 点击聊天详情的scroll区域
	static ClickChartDetailScroll = {
		Name: "ClickChartDetailScroll",
		Info: null
	};

	// 点击发送消息展开按钮
	static ClickChartMoreInfo = {
		Name: "ClickChartMoreInfo",
		Info: null
	};

	// 拒绝授权
	static RefuseAuthSettingChanged = {
		Name: "RefuseAuthSettingChanged",
		Info: null
	};

	// 消息已读回执
	static MsgReadChanged = {
		Name: "MsgReadChanged",
		Info: null
	};

	// 房源详情撩客文案
	static LiaoKeChartChanged = {
		Name: "LiaoKeChartChanged",
		Info: null
	};

	// 旗舰店筛选按钮点击
	static CompStoreChooseChanged = {
		Name: "CompStoreChooseChanged",
		info: null
	};

	// 旗舰店筛选结果
	static CompStoreChooseResultParamsChanged = {
		Name: "CompStoreChooseResultParamsChanged",
		info: null
	};

	// 原生导航栏按钮事件
	static AppTitleEventChange = {
		Name: "AppTitleEventChange",
		info: null
	};

	// 服务商圈确定
	static ServiceRegSectionChanged = {
		Name: "ServiceRegSectionChanged",
		info: null
	};

	// 登录成功
	static LoginSuccessChange = {
		Name: "LoginSuccessChange",
		info: null
  };

  //选择小区楼盘 确定
  static SearchBuildChange = {
    Name: "SearchBuildChange",
    info: null
  };


	// 房源编辑
	static HouseEditChange = {
		Name: "HouseEditChange",
		info: null
	};

	// 新登记一条房源
	static PushNewHouse = {
		Name: "PushNewHouse",
		info: null
	};

	// im 连接成功
	static ImLinkSuccessChange = {
		Name: "ImLinkSuccessChange",
		info: null
	};

	// 扫码确客
	static ScanConfirmChange = {
		Name: "ScanConfirmChange",
		info: null
	};

	// 消息内容发送成功
	static MsgSendSuccessChange = {
		Name: "MsgSendSuccessChange",
		info: null
	};

    // 语音视频完成
    static VideoChart = {
        Name: "VideoChart",
        info: null
    };

    // 对方接受语音/视频通话
    static AcceptAudioChart = {
        Name: "AcceptAudioChart",
        info: null
    };

	// 语音/视频通话信息
	static AudioChartInfo = {
		Name: "AudioChartInfo",
		info: null
	};


	
	// 自动登录成功回到
	static AutoLoginSuccess = {
		Name: "AutoLoginSuccess",
		info: null
	};
	
	// 区域商圈改变
	static RegSectionChange = {
		Name: "RegSectionChange",
		info: null
	};
	
	// 楼盘字典改变
	static DicMessageChange = {
		Name: "DicMessageChange",
		info: null
	};
	
	// 页面可见
	static PageShowChange = {
		Name: "PageShowChange",
		info: null
	};
	
	// 页面隐藏
	static PageHideChange = {
		Name: "PageHideChange",
		info: null
	};
	
	// 个人信息初始化
	static PersonalInfoChange = {
		Name: "PersonalInfoChange",
		info: null
	};
	
	// 统计时间选择
	static StatisticsTimeChange = {
		Name: "StatisticsTimeChange",
		info: null
	};

	// 发布动态成功
	static CreateActivityChange = {
		Name: "CreateActivityChange",
		info: null
	};

	// 楼盘添加修改成功
	static SaveBuildChange = {
		Name: "SaveBuildChange",
		info: null
	};

	// 户型添加修改成功
	static DistributionChange = {
		Name: "DistributionChange",
		info: null
	};

	// 户型删除成功
	static DistributionDelChange = {
		Name: "DistributionChange",
		info: null
	};

	// 相册修改成功
	static PhotoChange = {
		Name: "PhotoChange",
		info: null
	};

	// 规则修改成功
	static RuleChange = {
		Name: "RuleChange",
		info: null
	};
	
	// 新的动态提醒
	static RemindChange = {
		Name: "RemindChange",
		info: null
	};
	
	// 确认消息
	static CustomerConfirmMsgChange = {
		Name: "CustomerConfirmMsgChange",
		info: null
	};
	
	// 通讯录
	static ContractListChanged = {
		Name: "ContractListChanged",
		info: null
	};
}
