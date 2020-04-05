

// 基础类
class SliderDefault{
	currentVal = 0;
	list = [];
	type = "";  // callback返回类型
	unit = "";  // 单位
	caseType = "";  // 房源类型
	
	sliderVal = "";
	movePositionLeft = 0;
	moveChooseVal = "";
	moveSliderMinVal = 0;
	moveSliderMaxVal = 250;
	
	constructor(currentVal, list, type, unit, caseType) {
		this.currentVal = currentVal;
		this.list = list;
		this.type = type;
		this.unit = unit;
		this.caseType = caseType;
		this.sliderVal = currentVal;
	}
	
	getSliderBiLi(x,y,val) {
		return (100*parseInt(val-x))/parseInt(y-x);
	}
}

// 价格slider
export class SliderPriceChangeCallback extends SliderDefault{
	sliderMoveChangeTimeOutVal = null;
	
	constructor(currentVal, list, type, unit, caseType) {
		super(currentVal, list, type, unit, caseType);
	}
	
	init(callback = function() {}) {
		this.initPrice();
		this.upPriceSlider(function(item) {
			callback(item);
		});
	}
	
	initPrice() {
		this.moveSliderMinVal = 0;
		this.moveSliderMaxVal = 6000;
		if(this.caseType == 3) {
			this.moveSliderMinVal = 0;
			this.moveSliderMaxVal = 380;
		}
	}
	
	upPriceSlider(callback = function() {}) {
		this.sliderVal = this.currentVal;
		this.sliderPriceMoveChange({detail: {value: this.transSliderHousePriceVal()}}, (item) => {
			callback(item);
		});
	}
	
	// 价格 转化尺寸为slider的实际尺寸
	transSliderHousePriceVal() {
		let val = parseInt(this.sliderVal);
		let currentFloorMoveVal = 0;
		let floorRange = this.list;
		let banBiLi = ((Number(this.moveSliderMaxVal) - Number(this.moveSliderMinVal))/5)/2;
		let areaL = 0;
		let areaH = 0;
		let chaVal = 20;
		let unit = this.unit;
		let areaMoveChoose = "";
		let sliderVal = 0;
		let keDuVal = 0;
		let keDuCha = 0;
		if (val >= floorRange[2]) {
			chaVal = 20;
		}
		if (val > floorRange[0]) {
			keDuVal = floorRange[0];
			sliderVal = banBiLi;
			keDuCha = floorRange[1] - floorRange[0];
		}
		if (val > floorRange[1]) {
			keDuVal = floorRange[1];
			sliderVal = floorRange[0] + banBiLi * 1;
			keDuCha = floorRange[2] - floorRange[1];
		}
		if (val > floorRange[2]) {
			keDuVal = floorRange[2];
			sliderVal = floorRange[0] + banBiLi * 3;
			keDuCha = floorRange[3] - floorRange[2];
		}
		if (val > floorRange[3]) {
			keDuVal = floorRange[3];
			sliderVal = floorRange[0] + banBiLi * 5;
			keDuCha = floorRange[4] - floorRange[3];
		}
		if (val > floorRange[4]) {
			keDuVal = floorRange[4];
			sliderVal = floorRange[0] + banBiLi * 7;
			keDuCha = floorRange[4] - floorRange[3];
		}
		if (val <= floorRange[0]) {
			areaL = 0;
			unit += "以下";
			areaMoveChoose = floorRange[0] + unit
		}
		if (val >= floorRange[4]) {
			areaL = this.moveSliderMaxVal;
			unit += "以上";
			areaMoveChoose = floorRange[4] + unit;
		}
		if (val > floorRange[0] && val < floorRange[4]) {
			areaL = parseInt((banBiLi * 2 * (val - keDuVal))/keDuCha) + sliderVal;
			areaH = val + chaVal;
			areaMoveChoose = val + "-" + areaH + unit;
		}
		this.sliderVal = areaL;
		return areaL;
	}
	
	// slider change 价格
	sliderPriceMoveChange(e, callback = function() {}) {
		clearTimeout(this.sliderMoveChangeTimeOutVal);
		this.sliderMoveChangeTimeOutVal = null;
	
		let areaRange = this.list;
		let val = parseInt(e.detail.value);
		let caseType = this.caseType;
		this.sliderMoveChangeTimeOutVal = setTimeout(() => {
			if (!this.sliderMoveChangeTimeOutVal) return;
	
			let areaL = 0;
			let areaH = 0;
			let chaVal = 20;
			let unit = "万";
			let areaMoveChoose = "";
			let sliderVal = 0;
			let keDuVal = 0;
			let keDuCha = 0;
	
			if (caseType != 4) {
				if (val > 38) {
					keDuVal = 80;
					sliderVal = 38;
					keDuCha = 40;
				}
				if (val > 114) {
					keDuVal = 120;
					sliderVal = 114;
					keDuCha = 60;
				}
				if (val > 190) {
					keDuVal = 180;
					sliderVal = 190;
					keDuCha = 60;
				}
				if (val > 266) {
					keDuVal = 240;
					sliderVal = 266;
					keDuCha = 60;
				}
	
				areaL = val+"";
				if (caseType == 4) {
					areaL = areaL.substring(0, areaL.length -2);
					areaL = areaL + "00";
				}else {
					areaL = areaL.substring(0, areaL.length -1);
					areaL = areaL+"0";
				}
				areaL = parseInt(areaL);
				if (val <= 38) {
					areaH = 80;
					areaL = 0;
					unit = "以下";
					areaMoveChoose = areaH + "万" + unit
				}
				if (val >= 342) {
					areaL = 300;
					areaH = 0;
					unit = "以上";
					areaMoveChoose = areaL + "万" + unit;
				}
				if (val > 38 && val < 342) {
					areaL = parseInt(((val - sliderVal) * keDuCha)/76) + keDuVal + "";
					areaL = areaL.substring(0, areaL.length -1);
					areaL = areaL+"0";
					areaL = parseInt(areaL);
					areaH = areaL + chaVal;
					areaMoveChoose = areaL + "-" + areaH + unit;
				}
			}
			if (caseType == 4) {
				chaVal = 200;
				if (val >= 2000) {
					chaVal = 400;
				}
				if (val >= 3000) {
					chaVal = 700;
				}
				unit = "元";
				if (val > 600) {
					keDuVal = 1000;
					sliderVal = 600;
					keDuCha = 500;
				}
				if (val > 1800) {
					keDuVal = 1500;
					sliderVal = 1800;
					keDuCha = 500;
				}
				if (val > 3000) {
					keDuVal = 2000;
					sliderVal = 3000;
					keDuCha = 1000;
				}
				if (val > 4200) {
					keDuVal = 3000;
					sliderVal = 4200;
					keDuCha = 2000;
				}
	
				areaL = val+"";
				if (caseType == 4) {
					areaL = areaL.substring(0, areaL.length -2);
					areaL = areaL + "00";
				}else {
					areaL = areaL.substring(0, areaL.length -1);
					areaL = areaL+"0";
				}
				areaL = parseInt(areaL);
				if (val <= 600) {
					areaH = 1000;
					areaL = 0;
					unit = "以下";
					areaMoveChoose = areaH + "元" + unit
				}
				if (val >= 5400) {
					areaL = 5000;
					areaH = 0;
					unit = "以上";
					areaMoveChoose = areaL + "元" + unit;
				}
				if (val > 600 && val < 5400) {
					areaL = parseInt(((val - sliderVal) * keDuCha)/1200) + keDuVal + "";
					areaL = areaL.substring(0, areaL.length -2);
					areaL = areaL+"00";
					areaL = parseInt(areaL);
					areaH = areaL + chaVal;
					areaMoveChoose = areaL + "-" + areaH + unit;
				}
			}
	
			this.movePositionLeft = this.getSliderBiLi(this.moveSliderMinVal,this.moveSliderMaxVal,e.detail.value);
			this.moveChooseVal = areaMoveChoose;
			callback({priceMin: areaL, priceMax: areaH, type: this.type, priceText: areaMoveChoose})
		}, 50);
	}
}


// 面积slider
export class SliderAreaChangeCallback extends SliderDefault {
	sliderMoveChangeTimeOutVal = null;
	
	constructor(currentVal, list, type, unit, caseType) {
		super(currentVal, list, type, unit, caseType);
	}
	
	init(callback = function() {}) {
		this.initArea();
		this.upAreaSlider(function(item) {
			callback(item);
		});
	}
	
	initArea() {
		this.moveSliderMinVal = 0;
		this.moveSliderMaxVal = 250;
	}
	
	upAreaSlider(callback = function() {}) {
		this.sliderVal = this.currentVal;
		this.sliderAreaMoveChange({detail: {value: this.transSliderHouseAreaVal()}}, (item) => {
			callback(item);
		});
	}
	
	// 面积 转化尺寸为slider的实际尺寸
	transSliderHouseAreaVal() {
		let val = parseInt(this.sliderVal);
		let currentFloorMoveVal = 0;
		let floorRange = this.list;
		let banBiLi = ((Number(this.moveSliderMaxVal) - Number(this.moveSliderMinVal))/5)/2;
		let areaL = 0;
		let areaH = 0;
		let chaVal = 10;
		let unit = this.unit;
		let areaMoveChoose = "";
		let sliderVal = 0;
		let keDuVal = 0;
		let keDuCha = 0;
		if (val >= floorRange[2]) {
			chaVal = 20;
		}
		if (val > floorRange[0]) {
			keDuVal = floorRange[0];
			sliderVal = banBiLi;
			keDuCha = floorRange[1] - floorRange[0];
		}
		if (val > floorRange[1]) {
			keDuVal = floorRange[1];
			sliderVal = floorRange[0] + banBiLi * 1;
			keDuCha = floorRange[2] - floorRange[1];
		}
		if (val > floorRange[2]) {
			keDuVal = floorRange[2];
			sliderVal = floorRange[0] + banBiLi * 3;
			keDuCha = floorRange[3] - floorRange[2];
		}
		if (val > floorRange[3]) {
			keDuVal = floorRange[3];
			sliderVal = floorRange[0] + banBiLi * 5;
			keDuCha = floorRange[4] - floorRange[3];
		}
		if (val > floorRange[4]) {
			keDuVal = floorRange[4];
			sliderVal = floorRange[0] + banBiLi * 7;
			keDuCha = floorRange[4] - floorRange[3];
		}
		if (val <= floorRange[0]) {
			areaL = 0;
			unit += "以下";
			areaMoveChoose = floorRange[0] + unit
		}
		if (val >= floorRange[4]) {
			areaL = this.moveSliderMaxVal;
			unit += "以上";
			areaMoveChoose = floorRange[4] + unit;
		}
		if (val > floorRange[0] && val < floorRange[4]) {
			areaL = parseInt((banBiLi * 2 * (val - keDuVal))/keDuCha) + sliderVal;
			areaH = val + chaVal;
			areaMoveChoose = val + "-" + areaH + unit;
		}
		this.sliderVal = areaL;
		return areaL;
	}

	// slider change 面积
	sliderAreaMoveChange(e, callback = function() {}) {
		clearTimeout(this.sliderMoveChangeTimeOutVal);
		this.sliderMoveChangeTimeOutVal = null;
	
		let areaRange = this.list;
		let val = parseInt(e.detail.value);
		this.sliderMoveChangeTimeOutVal = setTimeout(() => {
			if (!this.sliderMoveChangeTimeOutVal) return;
	
			let areaL = 0;
			let areaH = 0;
			let chaVal = 10;
			let unit = "㎡";
			let areaMoveChoose = "";
			let sliderVal = 0;
			let keDuVal = 0;
			let keDuCha = 0;
			if (val >= 100) {
				chaVal = 20;
			}
			if (val > 25) {
				keDuVal = 50;
				sliderVal = 25;
				keDuCha = 20;
			}
			if (val > 75) {
				keDuVal = 70;
				sliderVal = 75;
				keDuCha = 30;
			}
			if (val > 125) {
				keDuVal = 100;
				sliderVal = 125;
				keDuCha = 50;
			}
			if (val > 175) {
				keDuVal = 150;
				sliderVal = 175;
				keDuCha = 50;
			}
			areaL = val+"";
			areaL = areaL.substring(0, areaL.length -1);
			areaL = areaL+"0";
			areaL = parseInt(areaL);
			if (val <= 25) {
				areaH = 50;
				areaL = 0;
				unit = "以下";
				areaMoveChoose = areaH + "㎡" + unit
			}
			if (val >= 225) {
				  areaL = 200;
				  areaH = 0;
				  unit = "以上";
				  areaMoveChoose = areaL + "㎡" + unit;
			}
			if (val > 25 && val < 225) {
				areaL = parseInt(((val - sliderVal) * keDuCha)/50) + keDuVal + "";
				areaL = areaL.substring(0, areaL.length -1);
				areaL = areaL+"0";
				areaL = parseInt(areaL);
				areaH = areaL + chaVal;
				areaMoveChoose = areaL + "-" + areaH + unit;
			}
			
			this.movePositionLeft = this.getSliderBiLi(this.moveSliderMinVal,this.moveSliderMaxVal,e.detail.value);
			this.moveChooseVal = areaMoveChoose;
			callback({areaMin: areaL, areaMax: areaH, type: this.type, areaText: areaMoveChoose})
		}, 50);
	}
}
