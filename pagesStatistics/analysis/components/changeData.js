function dealNum (p) {
	if (p) {
		let unit= ''
		let p_fix= Math.floor(p*100)/100; 
		let p_fix_str= `${p_fix}`; 
		if (p_fix_str.split('.')[0].length > 4) {
			return {
				p_fix: Math.floor(p_fix/100)/100, 
				unit: '亿'
			}
		} else {
			return {
				p_fix: Math.floor(p_fix), 
				unit:'万'
			}
		}
	} else {
		return {
			p_fix: 0,   
			unit:'万'
		}
	}
}

export let week_month_data_change = {
	// 交易数据处理
	changeAllDealTrends: function (obj) {
		//图表数据
		if (obj.result[0] !=undefined) {
			let hasData= obj.result.some (v => {
				return v.dealAmount!=undefined&&v.dealNum!=undefined
			})
			if (hasData) {
				obj.result.sort ((a, b) => {
					return new Date(a.date).getTime()- new Date(b.date).getTime()
				})
	
				let series = [
					{
						name: '交易金额',
						data: obj.result.map(v => {
							if (v.dealAmount) {
								return dealNum(v.dealAmount).p_fix
							} else {
								return 0
							}
						}),
						type: 'line',
						color: '#f95742',
						pointShape: 'circle',
						addPoint: true,
						legendShape: 'circle', 
						index: 0
					},
					{
						name: '交易套数',
						data: obj.result.map(v => {return v.dealNum||0}),
						type: 'line',
						color: '#0586ff',
						pointShape: 'circle',
						addPoint: true,
						legendShape: 'circle', 
						index:1, 
					}
				];
				// 最大值
				let max= series.map( v=> {
					return Math.ceil( Math.max(...v.data)/5 )*5
				})
				// content数据
				let allDealTrends =  {
					allDealAmount: {
						num: dealNum(obj.allDealTrends[0].allDealAmount).p_fix||0, 
						unit: dealNum(obj.allDealTrends[0].allDealAmount).unit||'万'
					}, 
					allDealAvg: obj.allDealTrends[0].allDealAvg||0, 
					allDealAvg: {
						num: dealNum(obj.allDealTrends[0].allDealAvg).p_fix||0, 
						unit: dealNum(obj.allDealTrends[0].allDealAvg).unit||'万'
					}, 
					allDealNum: obj.allDealTrends[0].allDealNum||0, 
				}
				//日期
				let categories
				if (obj.result[0].date.length > 7){
					categories = obj.result.map(v => {
						return v.date.slice(5)
					});				
				}else {
					categories = obj.result.map(v => {
						return `${new Date(v.date).getFullYear()}-${new Date(v.date).getMonth()+1}`
					});	
				}
				return {
					allDealTrends, series, max, categories
				}
			} else {
				let emptyData= 	{
					allDealTrends: { 
						allDealAmount: {
							num: 0, 
							unit: '万'
						}, 
						allDealAvg: {
							num: 0, 
							unit: '万'
						}, 
						allDealNum: 0
					},
					max: [10, 10],
					series: [{
						addPoint: true,
						color: "#f95742",
						data: [],
						legendShape: "circle",
						name: "交易金额",
						pointShape: "circle",
						type: "line",
					},
					{
						addPoint: true,
						color: "#0586ff",
						data: [],
						legendShape: "circle",
						name: "交易套数",
						pointShape: "circle",
						type: "line",
					}],
					categories:['']
				}
				return emptyData; 
			}
		}
		else {
			return {
				allDealTrends: { 
					allDealAmount: {
						num: 0, 
						unit: '万'
					}, 
					allDealAvg: {
						num: 0, 
						unit: '万'
					}, 
					allDealNum: 0,
				}, 
				max: [10, 10],
				series: [{
					addPoint: true,
					color: "#f95742",
					data: [],
					legendShape: "circle",
					name: "交易金额",
					pointShape: "circle",
					type: "line",
				},
				{
					addPoint: true,
					color: "#0586ff",
					data: [],
					legendShape: "circle",
					name: "交易套数",
					pointShape: "circle",
					type: "line",
				}],
				categories: ['']
			}
		}
	},
	// 客户转化对比数据处理
	changeCustDataInfo: function (obj) {                                        
		if (obj.custTimeCount != undefined) {
			let hasData= obj.custTimeCount.some (v => {
				return v.reportCount!=0||v.bandCount!=0||v.signCount!=0
			})
			if (hasData) {
				obj.custTimeCount.sort ((a, b) => {
					return new Date(a.timeStr).getTime()- new Date(b.timeStr).getTime()
				})
				let series = [
					{
						name: '报备组',
						data: obj.custTimeCount.map(v => {return v.reportCount||0}),
						color: '#0586ff'
					},
					{
						name: '带看组',
						data: obj.custTimeCount.map(v => {return v.bandCount||0}),
						color: '#ff891f'
					},
					{
						name: '成交组',
						data: obj.custTimeCount.map(v => {return v.signCount||0}),
						color: '#43bc6d'
					},
				];

				let custCount = {
					bandCount: obj.custCount.bandCount||0, 
					reportCount: obj.custCount.reportCount||0,
					signCount: obj.custCount.signCount||0,
				};
				//求最大值并向上取5的倍数
				let _max= series.map( v=> {
					return Math.ceil( Math.max(...v.data)/5 )*5
				})
				let max= Math.max(..._max)
				//日期
				let categories
				if (obj.custTimeCount[0].timeStr.length > 7){
					categories = obj.custTimeCount.map(v => {return v.timeStr.slice(5)});			
				}else {
					categories = obj.custTimeCount.map(v => {
						return `${new Date(v.timeStr).getFullYear()}-${new Date(v.timeStr).getMonth()+1}`
					});	
				}

				return { series, custCount, max, categories }
			} else {
				return {
					series: [{
						name: '报备组',
						data: [],
						color: '#0586ff'
					},
					{
						name: '带看组',
						data: [],
						color: '#ff891f'
					},
					{
						name: '成交组',
						data: [],
						color: '#43bc6d'
					}],
					custCount: { bandCount: 0, reportCount: 0, signCount: 0 },
					max: 10,
					categories: [''],
				}
			}
		}else {
			return {
				series: [{
					name: '报备组',
					data: [],
					color: '#0586ff'
				},
				{
					name: '带看组',
					data: [],
					color: '#ff891f'
				},
				{
					name: '成交组',
					data: [],
					color: '#43bc6d'
				}],
				custCount: { bandCount: 0, reportCount: 0, signCount: 0 },
				max: 10,
				categories: [''],
			}
		}
	},

	//客户转化率
	custStatisticInfo: function (obj) {
		if (obj != undefined) {
			let bandRate = { series: [{ name: '带看率', data: obj.bandRate || 0, color: '#0084ff' }] }
			let commissionRate = { series: [{ name: '结佣率', data: obj.commissionRate || 0, color: '#0084ff' }] }
			let reportRate = { series: [{ name: '报备率', data: obj.reportRate || 0, color: '#0084ff' }] }
			let signRate = { series: [{ name: '签约率', data: obj.signRate || 0, color: '#0084ff' }] }
			// 当为data为0时显示的颜色
			if (bandRate.series[0].data=== 0) {
				bandRate.series[0].color= '#e9e9e9'
			}
			if (commissionRate.series[0].data=== 0) {
				commissionRate.series[0].color= '#e9e9e9'
			}
			if (reportRate.series[0].data=== 0) {
				reportRate.series[0].color= '#e9e9e9'
			}
			if (signRate.series[0].data=== 0) {
				signRate.series[0].color= '#e9e9e9'
			}
			let data_list = [
				{ name: '报备数(组)', value: obj.reportCount ||0 },
				{ name: '审核通过(组)', value: obj.auditCount ||0 },
				{ name: '带看数(组)', value: obj.bandCount ||0 },
				{ name: '成交数(组)', value: obj.signCount ||0 },
				{ name: '退佣数(组)', value: obj.retCommissionCount ||0 },
				{ name: '结佣数(组)', value: obj.commissionCount ||0 },

			]
			return {
				bandRate, commissionRate, reportRate, signRate, data_list
			}
		} else {
			return {
				data_list: [{ name: '报备数(组)', value: 0 }, { name: '审核通过(组)', value: 0 }, { name: '带看数(组)', value: 0 }, { name: '成交数(组)', value: 0 }, { name: '退佣数(组)', value: 0 }, { name: '结佣数(组)', value: 0 },],
				bandRate: { series: [{ name: '带看率', data: 0, color: '#e9e9e9' }] },
				commissionRate: { series: [{ name: '结佣率', data: 0, color: '#e9e9e9' }] },
				reportRate: { series: [{ name: '报备率', data: 0, color: '#e9e9e9' }] },
				signRate: {
					series: [
						{ name: '签约率', data: 0, color: '#e9e9e9' },
					]
				}
			}
		}
	},
	// 户型销售对比
	changeSellProportionLayout: function (obj) {
		if (obj[0] != undefined) {
			let color = ['#0084ff', '#13c2c2', '#ffb109', '#9083f8', '#ff625b']
			let overArr = null;
			let legend = []
			// 数据 
			let series = obj.slice(0, 4).map(v => {
				return {
					name: v.name,
					data: v.sellNum 
				}
			})
			
			
			// 数据
			if (obj.length > 5) {
				let sum = 0
				overArr = obj.slice(4);
				for (let i = 0; i < overArr.length; i++) {
					sum += overArr[i].sellNum;
				}
				series.push({ name: '其他', data: sum });
			}
			for (let i = 0; i < series.length; i++) {
				series[i].color = color[i]
			}
			if(series[0]==undefined)
				series= [{name: '暂无数据', data:1, color:'#e9e9e9'}]

			//title
			let title = 0
			for (let i = 0; i < series.length; i++) {
				title += series[i].data;
			}
			title = `${title}`
			if (series[0].name == '')
				title='0'; 
				

			// 图例
			legend = obj.slice(0, 4);
			let allNum = 0;
			let allPer = 0;

			if (obj.length > 5) {
				let overLegend = obj.slice(4);
				for (let i = 0; i < overLegend.length; i++) {
					allNum += overLegend[i].sellNum;
					allPer += overLegend[i].percent;
				}
				legend.push({ name: '其他', sellNum: allNum, percent: allPer });
			}

			for (let i = 0; i < legend.length; i++) {
				legend[i].color = color[i];
				legend[i].percent = `${Math.round((legend[i].percent*100)*1000)/1000}` + '%'
      }
			return { series, legend, title };
		} else {
			return {
				series: [{ name: '暂无数据', data: [1], color: "#e9e9e9" }],
				legend: [{ color: "#0084ff", name: "暂无数据", percent: "0%", sellNum: "0" }],
				title: '0'
			}
		}
	}

}
