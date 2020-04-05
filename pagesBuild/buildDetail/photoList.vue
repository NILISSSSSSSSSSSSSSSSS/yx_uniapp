<template>
  <view class="photo-list">
    <scroll-view scroll-x="true" class="scroll-view-1">
      <view class="select-box">
        <view :class="{'active': selectBoxValue === 'qjt'}" @click="selectBox('qjt')" v-if="vrList.length > 0">全景图({{vrList.length}})</view>
        <block v-for="(m, n) in photoTypeObj" :key="m">
          <view :class="{'active': selectBoxValue === m.value}" @click="selectBox(m.value)" v-if="listObj[n].list.length !== 0">{{m.name + '(' + (listObj[n].list.length ? (accountSource === 1 ? listObj[n].list.length : listObj[n].list.length - 1) : 0) + ')'}}</view>
        </block>
      </view>
    </scroll-view>
    <scroll-view :scroll-into-view="selectBoxValue" scroll-y="true" class="scroll-view-2">
      <!-- vr -->
      <view class="photo-list-item" v-if="vrList.length > 0" id="qjt">
        <view class="p-l-i-title">{{'全景图（' + vrList.length + '）'}}</view>
        <view class="p-l-i-box">
          <block v-for="(item, index) in vrList" :key="index">
            <view>
              <image :src="item.photoAddr" @click="goToVr(item.panoramaPlayUrl)" mode="aspectFill" @error="imgVrError(index)"></image>
            </view>
          </block>
        </view>
      </view>
      <!-- 其他 -->
      <block v-for="(val, key) in listObj" :key="val">
        <view class="photo-list-item" :id="val.name" v-if="listObj[key].list.length !== 0">
          <view class="p-l-i-title">{{photoTypeObj[key].name}}</view>
          <view class="p-l-i-box">
            <block v-for="(item, index) in val.list" :key="item.photoUrl">
              <view @click="imgBtn(item.allIndex, key, index === val.list.length - 1)">
                <image :src="item.photoUrl || 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'" mode="aspectFill"></image>
                <view class="delet-btn" @click.stop="delImg(item.photoId, key, index)" v-if="(index !== val.list.length - 1) && accountSource === 2"></view>
              </view>
            </block>
          </view>
        </view>
      </block>
    </scroll-view>
  </view>
</template>

<script>
import { GetNewBuildPhotoListByType, AddBuildPhoto, DeleteOneLayOutPhoto } from '@/net/BuildNet.js'
import { GetLoginModel } from '@/model/LoginSuccessModel'
import { Utils } from "@/utils/Utils"
import { Const } from "@/utils/Const.js"
import { buildModel } from "@/model/buildModel.js"
import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"

export default {
  data () {
    return {
      accountSource: null, // 1 置业顾问端  2 开发商端
      buildId: '',
      selectBoxValue: 'qjt', // 选中的值
      vrList: [],
      listObj: {},
      photoTypeObj: {
        1: { name: '效果图', value: 'xgt', addType: 2 },
        2: { name: '规划图', value: 'ght', addType: 5 },
        3: { name: '户型图', value: 'hxt', addType: 3 },
        4: { name: '样板间', value: 'ybt', addType: 7 },
        5: { name: '实景图', value: 'sjt', addType: 8 },
        6: { name: '配套图', value: 'ptt', addType: 6 }
      }
    }
  },
  onLoad (params = {}) {
    this.buildId = params.buildId
    this.initData()
  },
  onShow() {
    this.accountSource = GetLoginModel.getAccountSource()
  },
  methods: {
    initData () {
      new GetNewBuildPhotoListByType({
        flag: 1,
        buildId: this.buildId
      }).send().then(res => {
        console.log(res)
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          let data = res.data
          this.vrList = data.vrList || []
          let list = data.list || []
          let allIndex = 0
          for (let key in this.photoTypeObj) {
            this.listObj[key] = {
              name: '',
              list: []
            }
          }
          for (let item of list) {
            for (let m of item.oneList) {
              m.allIndex = allIndex
              allIndex++
            }
            this.listObj[item.photoType].list = item.oneList
          }
          new buildModel().setModel(JSON.parse(JSON.stringify(list)), 'photoList')
          for (let key in this.photoTypeObj) {
            this.listObj[key].name = this.photoTypeObj[key].value
            if (this.accountSource === 2) {
              if (this.listObj[key].list.length > 0) {
                this.listObj[key].list.push({
                  photoUrl: 'http://cdn.haofang.net/static/xfldDeveloper/build/add-img.png',
                  photoId: ''
                })
              } else {
                this.listObj[key].list = [{
                  photoUrl: 'http://cdn.haofang.net/static/xfldDeveloper/build/add-img.png',
                  photoId: ''
                }]
              }
            }
          }
          if (this.vrList.length === 0) {
            this.selectBoxValue = 'xgt'
          }
          console.log(this.listObj)
        }
      })
    },
    // 选中图形类别
    selectBox (val) {
      this.selectBoxValue = val
    },
    goToVr (path) {
      new buildModel().setModel(path, 'path')
      uni.navigateTo ({
        url: '/pagesBuild/buildDetail/vrPage'
      })
    },
    imgVrError (index) {
      this.vrList[index].photoAddr = 'http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png'
    },
    // 点击图片
    imgBtn (allIndex, key, bool) {
      if (this.accountSource === 1) {
        bool = false
      }
      if (bool) {
        console.log('上传图片')
        this.uploadImg(this.photoTypeObj[key].addType)
      } else {
        // 查看图片
        uni.navigateTo ({
          url: '/pagesBuild/buildDetail/photoListSwiper?allIndex=' + allIndex
        })
      }
    },
    // 上传图片
    uploadImg (type) {
      let _this = this
      uni.chooseImage({
        count: 1,
        success: function (res) {
          console.log(res.tempFilePaths[0])
          uni.showLoading({title: '上传中...'})
          new Utils().upLoadImg(res.tempFilePaths[0])
            .then(resData => {
              console.log(resData)
              uni.hideLoading()
              if (resData.errCode !== Const.success) {
                return Promise.reject(resData)
              }
              let data = resData.data || {}
              if(!data.path || !data.url) return null
              new AddBuildPhoto({
                photoAttr :data.path,
                photoType: type,
                buildId: _this.buildId
              }).send().then(resJson => {
                if (resJson.errCode !== Const.success) {
                  return Promise.reject(resJson)
                } else {
                  _this.initData()
                  new Notification().postNotification(Notify.PhotoChange.Name)
                }
              })
            })
            .catch(err => {
              console.log('err', err)
              uni.hideLoading()
              uni.showToast({title: err.errMsg || "上传失败", icon: "none"})
            })
        }
      })
    },
    // 删除图片
    delImg (id, key, index) {
      console.log('删除图片')
      let _this = this
      uni.showModal({
        title: '提示',
        content: '是否确认删除？',
        success: function (res) {
          if (res.confirm) {
            new DeleteOneLayOutPhoto({
              buildId: _this.buildId,
              photoId: id
            }).send().then(res => {
              if (res.errCode !== Const.success) {
                _this.DifferenceApi.showToast(res.errMsg)
              } else {
                _this.DifferenceApi.showToast('删除成功')
                console.log(_this.listObj[key].list, key, index)
                _this.listObj[key].list.splice(index, 1)
                _this.$forceUpdate()
                new Notification().postNotification(Notify.PhotoChange.Name)
              }
            })
          }
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
.photo-list {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding-bottom: 40upx;
  .scroll-view-1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120upx;
    padding: 0 40upx;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 999;
  }
  .select-box {
    display: flex;
    width: 100%;
    height: 120upx;
    align-items: center;
    background-color: #ffffff;
    &>view {
      flex: 0 0 150upx;
      width: 150upx;
      color: #7d8184;
      font-family: PingFang-SC-Medium;
      font-size: 26upx;
      text-align: center;
      &.active {
        flex: 0 0 180uxp;
        position: relative;
        color: #191f25;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        font-size: 30upx;
        &::after {
          content: '';
          position: absolute;
          bottom: -10upx;
          left: 50%;
          margin-left: -22upx;
          width: 44upx;
          height: 5upx;
          background-color: #0084ff;
          border-radius: 3upx;
        }
      }
    }
  }
  .scroll-view-2 {
    width: 100%;
    height: 100%;
    padding-top: 120upx;
    padding-bottom: 40upx;
    box-sizing: border-box;
  }
  .photo-list-item {
    width: 100%;
    height: auto;
    overflow: hidden;
    .p-l-i-title {
      width: 100%;
      height: 80upx;
      display: flex;
      align-items: center;
      padding: 0 28upx;
      box-sizing: border-box;
      color: #a3a5a8;
      font-size: 24upx;
      font-weight: bold;
    }
    .p-l-i-box {
      width: 100%;
      height: auto;
      display: flex;
      padding: 0 28upx;
      box-sizing: border-box;
      flex-wrap: wrap;
      overflow: hidden;
      &>view {
        position: relative;
        flex: 0 0 200upx;
        height: 200upx;
        margin-right: 35upx;
        margin-top: 35upx;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
          margin-top: 0;
        }
        &>image {
          width: 200upx;
          height: 200upx;
        }
        &>.delet-btn {
          position: absolute;
          top: 0;
          right: 0;
          width: 35upx;
          height: 35upx;
          background-image: url('http://cdn.haofang.net/static/xfldDeveloper/build/photo-delet.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
