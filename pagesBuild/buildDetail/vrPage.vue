<template>
  <view class="vr-page">
    <web-view
      v-if="urlval"
      :webview-styles="webviewStyles"
      :src="urlval">
    </web-view>
  </view>
</template>

<script>
import { buildModel } from "@/model/buildModel.js"

export default {
  data () {
    return {
      urlval: '',
      webviewStyles: {}
    }
  },
  onLoad () {
    if (new buildModel().getModel('path')) {
      let path = new buildModel().getModel('path')
      console.log(path)
      this.urlval = path
    }
  }
}
</script>

<style>
page {
  width: 100%;
  height: 100%;
}

.vr-page {
  width: 100%;
  height: 100%;
}
</style>
