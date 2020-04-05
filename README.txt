

文件夹名称介绍：
    pagesCustomer：客户
    pagesMsg：消息
    pagesCommission：佣金
    pagesBuild：楼盘
    pagesWeb：网页
    pagesStatistics：统计
    pagesConfirm：扫码确客
    pagesSet：设置
    pages：主包
    net：接口存放处（含有对应的分包文件js）
    model：用到数据储存的时候一定在群里说一下
    utils：相关用到的公共js代码
    components：功能组件（组件一定要export 对应组件的类型 class）
    分包里面也可以设置自己的components组件文件夹，如果想放到公共components下，一定在群里同步一下写法

判断登录方法：
    if(!this.CheckUserStatus.isLogin()) return;
    在需要判断的按钮事件的最前面加一句这个

formId埋点:
    例如：
    <view>
        找房
        <collectFormId></collectFormId>
    </view>

文档地址：
	https://uniapp.dcloud.io/frame
	HTML5+ API: http://www.html5plus.org/doc/zh_cn/oauth.html

环境切换：
	在根目录下执行 make dev   make beta    make pro    会分别切换到本地环境、灰度环境、线上环境；
	utils下的config文件都是与环境相关的变量，如果需要新增环境变量需要在对应的config.dev.js  config.beta.js  config.pro.js  文件中分别
		增加环境变量，然后一定要执行make命令；

主要文件介绍：
	utils下的文件：
		Const.js  公共的常量都应该定义再这个文件中，原因：避免以后修改常量时多处修改，并且可以减少漏改的问题；
		addressGps.js  高德地图相关的方法会封装在此处；
		amap-wx.js  高德地图源码，基本不需要修改，如果有修改一定要做好兼容处理；
		CheckHousePrice.js  处理租房价格的合理化工具，如果需求不变基本不用修改；
		getColor.js  使用canvas获取图片顶部的颜色值；
		md5.js  进行传入的内容做加密处理；
		Notification.js  通知中心，对于代码的分离和解耦很有用；
		Notify.js  通知中心对应的通知名称和信息；
		RequestApi.js  对外层接口的封装，开发过程中一次书写以后基本无需修改；
		SetMap.js  view需要的地图方法都在此处开发和调用
		PlatformUserBehaviorBehavior.js  用户行为统计方法都在此开发和调用；

	App.vue  应用配置，用来配置App全局样式以及监听，类似于小程序的app.js

	main.js  Vue初始化入口文件，一些全局的通用方法可以在此处添加

	makefile  环境切换的命令文件，开发过程中不用修改

	manifest.json  配置应用名称、appid、logo、版本等打包信息，可以参考文档：https://uniapp.dcloud.io/collocation/manifest

	pages.json  配置页面路由、导航条、选项卡等页面类信息，分包的配置和小程序基本一致，注意事项可以
		参考文档：https://uniapp.dcloud.io/collocation/pages

	uni.scss  uni-app内置的常用样式变量

	unpackage 打包和编译后文件存放的位置

	static  项目的静态文件，不会被打包和转化

	pages  业务页面文件存放的目录，js部分按照小程序的生命周期方式开发

	pagesTool  分包路径，名字自定义，建议用pages开头然后加上存放的功能，js部分按照小程序的生命周期方式开发

	net  网络接口存放的位置，所有的接口都在此文件下开发和调用

	model  对于数据进行存储的文件夹，具体使用方法可以进入到 DefaultModel.js 中查看

	components  公共的组件会在此处书写，js部分的生命周期是按照Vue的周期方式开发

	common  公共文件存放位置

主要逻辑介绍：
	定位：每次程序从后台到前台都会更新当前定位信息；

	网络请求：接口和api统一封装在net下，文件的名字是该接口功能的概要，再net下只需要继承初始化的父类然后去实现
		对应的接口名和域名即可（由于项目中有很多域名所以没办法采用一个，只能去单独配置每个接口所需的域名）；

	Model：数据会储存在model中，父类会实现基本的setModel和getModel方法，在子类只需要去实现对应的Model的key以
		及是否需要存入内存中，会先显示model的数据同时去请求net更新model（之所以会把key写在model是为了避免时间
		久了key的乱用导致项目的缓存混乱）；

	分包：分包的写法和微信小程序是一致的，当前版本只有微信小程序支持分包；

	公共css引入：公共的通用css可以在App.vue中引入;

	通知：程序中主要使用了发送通知、注册通知、反注册通知的逻辑，例如：筛选功能，点击后只会发送对应的通知然后相关
		的页面去监听对应的通知去做出相应的变化，而不是直接去调用，做到模块之间的彻底分离;

    新房楼书分享：B端（掌上好房通）新盘详情中点击“分享获客”到微信，点击后便是新房楼书页面;

组件兼容写法问题：
	全局的page：再支付宝小程序上打包后页面的最外层没有page组件，所以再设置页面高度为100%时并不是手机屏幕的高度，
		而是元素的高度，其他程序正常；

	scroll-view组件再设置竖向滚动时，在百度小程序上使用触底加载只会执行一次，使用page方法来实现此效果；

	使用遮罩层在百度小程序上一定要加page的背景色，否则页面样式会穿透；

	公共的组件写在components中，注意：公共组件的周期采用的是vue的周期，pages下面的页面周期采用的是小程序的生命周期方式开发；

	阻止事件冒泡可以使用vue的方式等：@click.stop=事件名称；

	事件绑定：即便使用条件编译组件也不支持小程序的catch和bind，都要使用@去绑定；

	App.vue：相当于小程序的app.js，是程序的主入口；

	form：在小程序上button绑定的data-只有再小程序上才可以获取到，为了和h5统一把事件直接写在button上，不采用分发的方式去处理事件；

	Map：controltap 控件点击事件不执行，验证了微信小程序也不执行，微信这个事件出现了问题；

    Map: regionchange 视野变化的事件在小程序上无法执行，有对应的@end 和 @begin事件对应视野变化开始和结束;

	button: 在支付宝小程序上高度无法由内容撑起;

	button: 百度小程序在ios上增加ios的默认圆角5px，所以在安卓上正常的情况下ios是有问题的,解决方法（button.className{}）这样去书写button的样式;

	swiper: 在百度小程序中change事件中不可以设置其他相关的值，会造成滑不过去的影响，暂时未找到办法解决;在百度和支付宝小程序swiper元素中增加的view
		使用定位时达不到想要的效果，需要写出来不要放在swiper里;

	scroll-view: 横向滚动条时需要设置white-space: nowrap

	input: placeholder 的默认值不要写成数字, 否则在百度小程序上会出现输入的值显示不出来的;

	canvas: 在支付宝小程序上 需要设置id而不是多端的canvas-id;

	web-view: 再非百度小程序和H5外的其他应用时不要把https或http作为参数传到web-view, http或https再web-view中去拼接否则无法使用；

    text-area: 放在scroll-view中可以解决输入内容漂浮和渲染慢的问题

文档api兼容问题：
	获取系统信息的接口再百度小程序上会慢一些，建议设置一个延时获取，同时做好空的return；

	页面使用触底加载更多建议再底部增加一个空的view，例如：30upx的view，这样触底加载更多会更灵敏一些，否则再百度和支付宝小程序上触底不灵敏；

	App.vue 中 第一次进入的时候不会执行onShow,所以一定要注意（在百度小程序会有这种情况发生）;

	setStorageSync 和 getStorageSync: 在支付宝小程序上模拟器和手机上不一致请严格注意，模拟器上是data里，手机上是APDataStorage里;

	获取节点信息: 在支付宝小程序上需要使用对应的官方文档方法才可以，其他的使用uni文档即可;

	login: 在支付宝小程序上获取code时, 需要使用支付宝小程序的my.getAuthCode({})方法;

	v-for: 在百度和支付宝小程序上，不要在v-for上增加v-if的判断否则无法渲染数据;

全局的组件和方法
	get-user-info： 获取用户信息组件;

	houseDetailLoading: 房源详情加载中的样式;

	InitFormSubmit: formid获取的方法，使用时只需要在初始化生命周期中 new this.InitFormSubmit(this);

	PlatformUserBehavior: 用户行为统计  使用方法 new PlatformUserBehavior();

	CheckIsIphoneX: 全局判断是否是iphone x  使用方法: CheckIsIphoneX.init();

	Browser: 在H5上判断是否是pc;

	SetH5BrowerTitle： 设置h5网页的title  使用方法: new SetH5BrowerTitle().init(title);

	DifferenceApi: api差异性的文件，包括获取usrInfo、拨打电话等  使用方法: new DifferenceApi().方法名称;

	ImChart: IM的所有方法都在这个类 使用时先调用初始化;

	SetMetaInfo: 百度小程序专用的引流;

	ShareAppMessage: 分享功能  使用方法: new ShareAppMessage(path, title, des).init(function() {});


项目逻辑:
	委托列表: 专属委托与普通委托只有title有区别, 在专属委托中有专属经纪人icon;


第三方:
    图标插件: https://ext.dcloud.net.cn/plugin?id=271 (配置)


常见问题处理方法：
	1. border-radius在ios上会从放行上闪成圆角：加上这个样式“will-change: transform;”即可;

	2. ios 时间转化的时候 2019/11 不得行 需要2019/11/01, 安卓会默认1号

