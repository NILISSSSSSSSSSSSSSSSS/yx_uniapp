

export class SetH5BrowerTitle {
	headNode = null;
	headTextNode = "uni-page-head__title";
	text = "";
	
	constructor() {
        // #ifdef H5
	    this.headNode = this.getHeadNode();
		this.text = this.getHeadText();
        // #endif
	}
	
	init(title = "") {
		// #ifdef H5
		if(title) {
			this.text = title;
		}
		this.removeSpace();
		this.removeEnter();
		this.hideHead();
		this.setBrowerTitle();
		// #endif
	}
	
	getHeadNode() {
		if(!document.getElementsByTagName("uni-page-head")) return null;
		
		return document.getElementsByTagName("uni-page-head")[0];
	}
	
	hideHead() {
		this.headNode.style.display = "none";
	}
	
	getHeadText() {
		if(!document.getElementsByClassName(this.headTextNode) 
			|| !document.getElementsByClassName(this.headTextNode)[0]) {
			return "";
		}
		
		return (document.getElementsByClassName(this.headTextNode)[0].innerText) || "";
	}
	
	setBrowerTitle() {
		if(!this.text) return;
		
		document.title = this.text;
	}
	
	removeSpace() {
		this.text = this.text.replace(/\ +/g,"");
	}
	
	removeEnter() {
		this.text = this.text.replace(/[\r\n]/g,"");
	}
}