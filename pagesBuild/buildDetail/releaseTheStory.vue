<template>
  <view class="release-the-story">
    <view class="common-box">
      <view>标题</view>
      <view style="height: 158upx;">
        <textarea v-model="paramsObj.actTitle" placeholder="请输入标题" maxlength="16" placeholder-style="color: #bbbbbb;" />
        <view>{{paramsObj.actTitle.length}}/16</view>
      </view>
    </view>
    <view class="common-box">
      <view>动态内容</view>
      <view style="height: 258upx;">
        <textarea v-model="paramsObj.actContent" placeholder="请输入内容" maxlength="300" placeholder-style="color: #bbbbbb;" />
        <view>{{paramsObj.actContent.length}}/300</view>
      </view>
    </view>
    <view class="common-box-another">
      <view>附件</view>
      <view>
        <image :src="photoUrl" v-if="paramsObj.actPhotos"></image>
        <image src="http://cdn.haofang.net/static/xfldDeveloper/build/add-img.png" v-if="!paramsObj.actPhotos" @click="uploadImg()"></image>
      </view>
    </view>
    <view class="save-btn" @click="saveBtn()">提交</view>
    <view class="note-box">备注：推送到掌上好房通和好房联动</view>
  </view>
</template>

<script>
import { Utils } from "@/utils/Utils"
import { Const } from "@/utils/Const"
import { CreateActivity } from '@/net/BuildNet.js'
import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"

export default {
  data () {
    return {
      photoUrl: '',
      paramsObj: {
        actTitle: '', // 标题
        actContent: '', // 内容
        actPhotos: '',
        buildId: ''
      }
    }
  },
  onLoad (params = {}) {
    this.paramsObj.buildId = params.buildId
  },
  methods: {
    // 上传图片
    uploadImg () {
      let _this = this
      uni.chooseImage({
        count: 1,
        success: function (res) {
          console.log(res.tempFilePaths[0])
          uni.showLoading({title: '上传中...'})
          new Utils().upLoadImg(res.tempFilePaths[0])
            .then(res => {
              console.log(res)
              uni.hideLoading()
              if (res.errCode !== Const.success) {
                return Promise.reject(res);
              }
              let data = res.data || {}
              if(!data.path || !data.url) return null
              _this.paramsObj.actPhotos = data.path
              _this.photoUrl = data.url
            })
            .catch(err => {
              console.log('err', err)
              uni.hideLoading()
              uni.showToast({title: err.errMsg || "上传失败", icon: "none"})
            })
        }
      })
    },
    saveBtn () {
      if (!this.paramsObj.actTitle) {
        this.DifferenceApi.showToast('请填写标题')
        return
      }
      if (!this.paramsObj.actContent) {
        this.DifferenceApi.showToast('请填写内容')
        return
      }
      if (!this.paramsObj.actPhotos) {
        this.DifferenceApi.showToast('请上传图片')
        return
      }
      new CreateActivity(this.paramsObj).send().then(res => {
        console.log(res)
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          this.DifferenceApi.showToast('发布成功')
          new Notification().postNotification(Notify.CreateActivityChange.Name)
          uni.navigateBack({
            delta: 1
          })
        }
      })
    }
  }
}
</script>

<style>
page {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" scoped>
.release-the-story {
  width: 100%;
  height: 100%;
  .common-box {
    width: 100%;
    height: auto;
    padding: 0 40upx;
    box-sizing: border-box;
    &>view {
      width: 100%;
      &:nth-child(1) {
        height: 110upx;
        line-height: 122upx;
        color: #191f25;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        font-size: 32upx;
      }
      &:nth-child(2) {
        &>textarea {
          width: 100%;
          height: 100%;
          padding: 20upx;
          font-family: PingFang-SC-Medium;
          font-size: 32upx;
          box-sizing: border-box;
          color: #191f25;
          background-color: #f6f6f6;
          border-radius: 10upx;
        }
        &>view {
          position: absolute;
          bottom: 16upx;
          right: 24upx;
          width: 100upx;
          line-height: 1;
          text-align: center;
          font-family: PingFang-SC-Medium;
          font-size: 28upx;
          color: #bbbbbb;
        }
      }
    }
  }
  .common-box-another {
    width: 100%;
    height: auto;
    padding: 40upx;
    box-sizing: border-box;
    display: flex;
    &>view {
      &:nth-child(1) {
        flex: 0 0 88upx;
        width: 88upx;
        line-height: 1;
        color: #191f25;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        font-size: 32upx;
      }
      &:nth-child(2) {
        flex: 1 1 auto;
        width: auto;
        height: auto;
        &>image {
          width: 150upx;
          height: 150upx;
          display: block;
        }
      }
    }
  }
  .save-btn {
    width: 668upx;
    height: 100upx;
    line-height: 100upx;
    background-color: #0084ff;
    border-radius: 10upx;
    margin: 70upx auto 54upx;
    color: #ffffff;
    text-align: center;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    font-size: 32upx;
  }
  .note-box {
    line-height: 1;
    text-align: center;
    color: #a3a5a8;
    font-family: PingFang-SC-Medium;
    font-size: 28upx;
  }
}
</style>
