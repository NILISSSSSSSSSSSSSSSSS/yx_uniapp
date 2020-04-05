<template>
	<form class="collect-form-id " @submit="formSubmit" report-submit="true">
		<button formType="submit"></button>
   </form>
</template>

<script>
  	import {UserInfoModel} from "../model/UserInfoModel";
  	import {GetLoginModel} from "../model/LoginSuccessModel";
  	import {CollectFormId} from "../net/CommonNet";

	export default{
		methods: {
			formSubmit(e) {
				// #ifdef MP
				let formId = e.detail.formId;
				console.log("CollectFormId", formId);
				let openId = new UserInfoModel().getModel("openId") || "";
				let userId = GetLoginModel.getUserId() || "";
				if(!userId || !openId) return;

				if (formId.indexOf("mock one") >= 0) return;

				if (e.detail && e.detail.formId){
					new CollectFormId({
						formId: e.detail.formId,
						userId: userId,
						openId: openId,
						formSource: "xfldyx"
					}).send();
				}
				// #endif
			}
		}
	}
</script>

<style>
	.collect-form-id {
		position: absolute;
	   	width: 100%;
	   	height: 100%;
	   	left: 0;
	   	top: 0;
	   	opacity: 0;
		z-index: 1;
	}
	.collect-form-id button {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
		padding: 0;
		z-index: 1;
	}
</style>
