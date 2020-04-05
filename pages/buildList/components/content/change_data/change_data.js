export let change_data_tools = {
	// 交易数据处理
	changeAllDealTrends: function (obj) {
		let ifData= obj.result.some(v => {
			return v.dealAmount != undefined &&  v.dealNum != undefined
		})
		//图表数据
		if (ifData) {
			obj.result.sort ((a, b) => {
				return new Date(a.date).getTime()- new Date(b.date).getTime()
			})

			let series = [
				{
					name: '带看数',
					data: obj.result.map(v => {return v.bandNum||0}),
					type: 'line',
					color: '#0586ff',
					pointShape: 'circle',
					addPoint: true,
					legendShape: 'circle', 
					index:0
				},
				{
					name: '成交数',
					data: obj.result.map(v => {return v.dealNum||0}),
					type: 'line',
					color: '#f95742',
					pointShape: 'circle',
					addPoint: true,
					legendShape: 'circle', 
					index:1
				}
			];
			// 最大值
			let max= series.map( v=> {
				return	Math.ceil( Math.max(...v.data)/5 )*5
			})
			
			// content数据
			let allDealTrends =  {
				allBandNum: obj.allDealTrends[0].allBandNum||0, 
				allDealNum: obj.allDealTrends[0].allDealNum||0, 
				allCommissionNum: obj.allDealTrends[0].allCommissionNum||0, 
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
					data: [],
					legendShape: "circle",
					name: "交易金额",
					pointShape: "circle",
					type: "line",
					index:0
				},
				{
					addPoint: true,
					color: "#0586ff",
					data: [],
					legendShape: "circle",
					name: "交易套数",
					pointShape: "circle",
					type: "line",
					index:1
				}],
				categories: ['']
			}
		}
	},

	//客户转化率
	custStatisticInfo: function (obj) {
		if (obj != undefined) {
			let bandRate = { 
        series: [{ name: '带看率', data: obj.bandRate || 0, color: '#0084ff' }], 
        title: {
          name: '带看数(组)', 
          value: obj.bandCount ||0
        }
      
      }
			let signRate = { 
        series: [{ name: '签约率', data: obj.signRate || 0, color: '#0084ff' }], 
        title: {
          name: '成交数(组)', 
          value: obj.signCount ||0 
        }
      
      }
			if(bandRate.series[0].data=== 0) {
				bandRate.series[0].color= '#e9e9e9'
			}
			if(signRate.series[0].data=== 0) {
				signRate.series[0].color= '#e9e9e9'
			}
			return {
				bandRate, signRate
			}
		} else {
			return {
				bandRate: { series: [{ name: '带看率', data: 0, color: '#e9e9e9' }],title: { name: '带看数(组)', value: 0 },   },
				signRate: {series: [{ name: '签约率', data: 0, color: '#e9e9e9' }], title: {name: '成交数(组)', value: 0}}
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
			if (series[0].name == '暂无数据'){
				title='0'; 
			}
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
				title: '暂无数据'
			}
		}
	}
}
