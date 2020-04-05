export let change_data_tools = {
	// 交易数据处理
	changeAllDealTrends: function (obj) {
		//图表数据
		if (obj != undefined) {
			obj.result.sort ((a, b) => {
				return new Date(a.date).getTime()- new Date(b.date).getTime()
			})

			let series = [
				{
					name: '交易金额',
					data: obj.result.map(v => {return Math.floor(v.dealAmount||0 / 1000 * 100) / 100}),
					type: 'line',
					color: '#f95742',
					pointShape: 'circle',
					addPoint: true,
					legendShape: 'circle'
				},
				{
					name: '交易套数',
					data: obj.result.map(v => {return v.dealNum||0}),
					type: 'line',
					color: '#0586ff',
					pointShape: 'circle',
					addPoint: true,
					legendShape: 'circle'
				}
			];
			// 最大值
			let max = series.map(v => {return Math.ceil(Math.max(...v.data) * 1.2)})
			// content数据
			let allDealTrends =  {
				allDealAmount: obj.allDealTrends[0].allDealAmount||0, 
				allDealAvg: obj.allDealTrends[0].allDealAvg||0, 
				allDealNum: obj.allDealTrends[0].allDealNum||0, 
			}
			for (let k in allDealTrends) {
				allDealTrends[k] = Math.floor(allDealTrends[k] / 1000 * 100) / 100;
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
			return {
				allDealTrends: { allDealAmount: 0.00, allDealAvg: 0.00, allDealNum: 0.00 },
				categories: [],
				max: [10, 10],
				series: [{
					addPoint: true,
					color: "#f95742",
					data: [0, 0, 0, 0, 0],
					legendShape: "circle",
					name: "交易金额",
					pointShape: "circle",
					type: "line",
				},
				{
					addPoint: true,
					color: "#0586ff",
					data: [0, 0, 0, 0, 0],
					legendShape: "circle",
					name: "交易套数",
					pointShape: "circle",
					type: "line",
				}],
				categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
				bandRate: { series: [{ name: '带看率', data: 0, color: '#0084ff' }] },
				commissionRate: { series: [{ name: '结佣率', data: 0, color: '#0084ff' }] },
				reportRate: { series: [{ name: '报备率', data: 0, color: '#0084ff' }] },
				signRate: {
					series: [
						{ name: '签约率', data: 0, color: '#0084ff' },
					]
				}
			}
		}
	},
	// 户型销售对比
	changeSellProportionLayout: function (obj) {
		if (obj != undefined) {
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
			
			//title
			let title = 0
			for (let i = 0; i < series.length; i++) {
				title += series[i].data;
			}
			title = `${title}`
			if (series[0] == undefined)
				title='0'; 
				
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
				series= [{name: '暂无数据', data:1, color:'#0084ff'}]

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
				legend[i].percent = `${legend[i].percent * 100}` + '%'
			}

			return { series, legend, title };
		} else {
			return {
				series: [{ name: '暂无数据', data: [1], color: "#0084ff" }],
				legend: [{ color: "#0084ff", name: "暂无数据", percent: "0%", sellNum: "0" }],
				title: '暂无数据'
			}
		}
	}
}
