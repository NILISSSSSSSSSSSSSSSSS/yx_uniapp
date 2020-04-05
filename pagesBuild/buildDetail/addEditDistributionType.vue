<template>
  <view class="add-edit-distribution-type">
    <scroll-view class="view-all" scroll-y="true">
      <!-- 楼盘名称 -->
      <view class="item-normal">
        <view>户型名称</view>
        <view>
          <input type="text" v-model="paramsObj.layoutNo" maxlength="20" placeholder="请输入" placeholder-style="color: #c0c1c3;">
        </view>
      </view>
      <!-- 户型 -->
      <view class="item-input">
        <view>
          <view>户型</view>
          <view>
            <view>
              <input type="number" v-model="paramsObj.rooms" @input="inputNumS" placeholder="几" maxlength="2" placeholder-style="color: #c0c1c3;">
              <view>室</view>
            </view>
            <view>
              <input type="number" v-model="paramsObj.halls" @input="inputNumT" placeholder="几" maxlength="2" placeholder-style="color: #c0c1c3;">
              <view>厅</view>
            </view>
            <view>
              <input type="number" v-model="paramsObj.weis" @input="inputNumW" placeholder="几" maxlength="2" placeholder-style="color: #c0c1c3;">
              <view>卫</view>
            </view>
            <view>
              <input type="number" v-model="paramsObj.yangs" @input="inputNumY" placeholder="几" maxlength="2" placeholder-style="color: #c0c1c3;">
              <view>阳台</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 状态 -->
      <view class="item-select">
        <view>
          <view>状态</view>
          <view>
            <picker mode="selector" :range="layoutStatusList" range-key="name" :value="layoutStatusIndex" @change="layoutStatusChange">
              <view class="uni-input" :class="{'active': layoutStatusList[layoutStatusIndex].name ? true : false}">{{layoutStatusList[layoutStatusIndex].name || '请选择'}}</view>
            </picker>
          </view>
        </view>
        <view>
          <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill"></image>
        </view>
      </view>
      <!-- 面积 -->
      <view class="item-normal-another">
        <view>
          <view>面积</view>
          <view>
            <input type="digit" v-model="paramsObj.buildArea" maxlength="6" placeholder="请输入" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
        <view>㎡</view>
      </view>
      <!-- 户型总价 -->
      <view class="item-normal-another">
        <view>
          <view>户型总价</view>
          <view>
            <input type="digit" v-model="paramsObj.price" maxlength="8" placeholder="请输入" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
        <view>万/套起</view>
      </view>
      <!-- 首付起价 -->
      <view class="item-normal-another">
        <view>
          <view>首付起价</view>
          <view>
            <input type="digit" v-model="paramsObj.downPayments" maxlength="6" placeholder="请输入" placeholder-style="color: #c0c1c3;">
          </view>
        </view>
        <view>万/套起</view>
      </view>
      <!-- 标签 -->
      <view class="label-box">
        <view class="l-b-title">
          <text>标签</text>
          <!-- <text>(最多选择3个)</text> -->
        </view>
        <view class="l-b-content">
          <block v-for="(item, index) in tagIdsList" :key="index">
            <view class="l-b-c-item" :class="{'active': item.isActive}" @click="changeTags(item.name, index)">{{item.name}}</view>
          </block>
        </view>
      </view>
      <!-- 推荐理由 -->
      <view class="item-textarea">
        <view>推荐理由</view>
        <view>
          <textarea v-model="paramsObj.charact" placeholder="请输入推荐理由" maxlength="100" placeholder-style="color: #bbbbbb;" />
          <view>{{paramsObj.charact.length}}/100</view>
        </view>
      </view>
      <view class="upload-img">
        <view>附件</view>
        <view>
          <block v-for="(item, index) in selectPhotos" :key="index">
            <image :src="item.picUrl" mode="aspectFill"></image>
          </block>
          <image src="http://cdn.haofang.net/static/xfldDeveloper/build/add-img.png" @click="uploadImg()"></image>
        </view>
      </view>
    </scroll-view>
    <!-- 保存 -->
    <!-- #ifndef APP-PLUS -->
    <cover-view class="save-btn">
      <cover-view @click="saveBtn()" class="view-btn">提交</cover-view>
    </cover-view>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <view class="save-btn">
      <view @click="saveBtn()" class="view-btn">提交</view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import { AddAndChangLayOutPhoto } from '@/net/BuildNet.js'
import { Const } from "@/utils/Const.js"
import { Utils } from "@/utils/Utils"
import { buildModel } from '@/model/buildModel.js'

import { Notify } from "@/utils/Notify.js"
import { Notification } from "@/utils/Notification.js"

export default {
  data () {
    return {
      paramsObj: {
        buildId: '',
        buildArea: "", // 建筑面积
        charact: "", // 推荐理由
        downPayments: "", // 最低首付
        halls: "", // 几厅
        layoutId: "", // 户型图Id
        oldLayoutNo: "",
        layoutNo: "", // 户型名称
        layoutPics: "", // 图片地址，逗号隔开
        layoutStatus: null, // 该户型状态 1=待售2=在售3=售完
        photoIds: "", // 图片Id
        price: "", // 户型总价
        rooms: "", // 几室
        tagIds: "", // 标签ids，|隔开
        weis: "", // 几卫
        yangs: "" // 几阳
      },
      // 户型状态
      layoutStatusList: [
        { value: 1, name: '待售'},
        { value: 2, name: '在售'},
        { value: 3, name: '售罄'}
      ],
      layoutStatusIndex: null,
      tagIdsList: [], // 标签
      selectTagIds: [], // 选择的标签
      selectPhotos: [], // 上传的户型图片
      timeS: null,
      timeT: null,
      timeW: null,
      timeY: null
    }
  },
  onLoad (params = {}) {
    this.dealTagIds()
    this.paramsObj.buildId = params.buildId
    if (params.type === "add") {
      uni.setNavigationBarTitle({
        title: "添加户型"
      })
    } else {
      uni.setNavigationBarTitle({
        title: "编辑户型"
      })
      this.getDetail()
    }
  },
  methods: {
    getDetail () {
      let obj = new buildModel().getModel('distributionItem') || {}
      console.log(obj, 'obj')
      for (let key in this.paramsObj) {
        this.paramsObj[key] = obj[key]
      }
      this.paramsObj.oldLayoutNo = obj.layoutNo
      this.paramsObj.buildId = this.buildId
      // 状态处理
      this.layoutStatusList.forEach((item, index) => {
        if (obj.layoutStatus === item.value) {
          this.layoutStatusIndex = index
        }
      })
      // 标签处理
      if (obj.tagIds) {
        this.selectTagIds = obj.tagIds.split('|')
        this.tagIdsList.forEach((item, index) => {
          for (let m of this.selectTagIds) {
            if (item.name === m) {
              this.tagIdsList[index].isActive = true
            }
          }
        })
      }
      // 户型图片处理
      for (let item of obj.list) {
        this.selectPhotos.push({
          picUrl: item.picUrl,
          photoId: item.photoId
        })
      }
    },
    // 户型状态改变
    layoutStatusChange (e) {
      this.layoutStatusIndex = e.target.value
      this.paramsObj.layoutStatus = this.layoutStatusList[e.target.value].value
    },
    // 标签处理
    dealTagIds () {
      let obj = Const.distributionTypeIds
      for (let key in obj) {
        this.tagIdsList.push({
          name: obj[key],
          isActive: false
        })
      }
      console.log(this.tagIdsList, 'tagIdsList')
    },
    // 选择标签
    changeTags (val, index) {
      if (!this.tagIdsList[index].isActive) {
        if (this.selectTagIds.length >= 3) {
          this.DifferenceApi.showToast('最多选择3个')
          return
        }
        this.selectTagIds.push(val)
        this.tagIdsList[index].isActive = true
      } else {
        let indexNow = 0;
        this.selectTagIds.forEach((item, indexI) => {
          if (val === item.name) {
            indexNow = indexI
          }
        })
        this.selectTagIds.splice(indexNow, 1)
        this.tagIdsList[index].isActive = false
      }
    },
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
              _this.selectPhotos.push({
                picUrl: data.url
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
    // 提交保存
    saveBtn () {
      if (!this.paramsObj.layoutNo) {
        this.DifferenceApi.showToast('请输入户型名称')
        return
      }
      if (!this.paramsObj.rooms || !this.paramsObj.halls || !this.paramsObj.weis || !this.paramsObj.yangs) {
        this.DifferenceApi.showToast('请完善户型')
        return
      }
      if (!this.paramsObj.layoutStatus) {
        this.DifferenceApi.showToast('请选择状态')
        return
      }
      if (!this.paramsObj.buildArea) {
        this.DifferenceApi.showToast('请输入面积')
        return
      }
      if (!this.paramsObj.price) {
        this.DifferenceApi.showToast('请输入户型总价')
        return
      }
      if (!this.paramsObj.downPayments) {
        this.DifferenceApi.showToast('请输入首付起价')
        return
      }
      if (this.selectTagIds.length === 0) {
        this.DifferenceApi.showToast('请选择标签')
        return
      } else {
        this.paramsObj.tagIds = this.selectTagIds.join('|')
      }
      if (!this.paramsObj.charact) {
        this.DifferenceApi.showToast('请输入推荐理由')
        return
      }
      if (this.selectPhotos.length === 0) {
        this.DifferenceApi.showToast('请上传户型图')
        return
      } else {
        let layoutPics = []
        let photoIds = []
        for (let item of this.selectPhotos) {
          layoutPics.push(item.picUrl)
          if (item.photoId) {
            photoIds.push(item.photoId)
          }
        }
        this.paramsObj.layoutPics = layoutPics.join(',')
        this.paramsObj.photoIds = photoIds.join(',')
      }

      console.log(this.paramsObj, 'paramsObj')

      new AddAndChangLayOutPhoto(this.paramsObj).send().then(res => {
        console.log(res)
        if (res.errCode !== Const.success) {
          this.DifferenceApi.showToast(res.errMsg)
        } else {
          this.DifferenceApi.showToast('提交成功')
          new Notification().postNotification(Notify.DistributionChange.Name)
          uni.navigateBack({
            delta: 1
          })
        }
      })
    },
    inputNumS (e) {
      clearTimeout(this.timeS)
      if (e.detail.value !== '' && Number(e.detail.value) <= 0) {
        this.timeS = setTimeout(() => {
          this.paramsObj.rooms = ''
        }, 10)
      }
    },
    inputNumT (e) {
      clearTimeout(this.timeT)
      if (e.detail.value !== '' && Number(e.detail.value) <= 0) {
        this.timeT = setTimeout(() => {
          this.paramsObj.halls = ''
        }, 10)
      }
    },
    inputNumW (e) {
      clearTimeout(this.timeW)
      if (e.detail.value !== '' && Number(e.detail.value) <= 0) {
        this.timeW = setTimeout(() => {
          this.paramsObj.weis = ''
        }, 10)
      }
    },
    inputNumY (e) {
      clearTimeout(this.timeY)
      if (e.detail.value !== '' && Number(e.detail.value) <= 0) {
        this.timeY = setTimeout(() => {
          this.paramsObj.yangs = ''
        }, 10)
      }
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
$commonHeight: 120upx;

.add-edit-distribution-type {
  position: relative;
  width: 100%;
  height: 100%;
  .view-all {
    width: 100%;
    height: 100%;
    padding-bottom: 190upx;
    box-sizing: border-box;
    .item-normal {
      width: 100%;
      height: $commonHeight;
      padding: 0 40upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 2upx solid #ebebeb;
      &>view {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 30upx;
        &:nth-child(1) {
          flex: 0 0 190upx;
          color: #191f25;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
        }
        &:nth-child(2) {
          flex: 1 1 auto;
          &>input {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .item-select {
      width: 100%;
      height: $commonHeight;
      padding: 0 40upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 2upx solid #ebebeb;
      &>view {
        &:nth-child(1) {
          flex: 1 1 auto;
          height: 100%;
          display: flex;
          &>view {
            display: flex;
            align-items: center;
            font-size: 30upx;
            &:nth-child(1) {
              flex: 0 0 190upx;
              height: 100%;
              color: #191f25;
              font-family: PingFang-SC-Bold;
              font-weight: bold;
            }
            &:nth-child(2) {
              flex: 1 1 auto;
              height: 100%;
              &>picker {
                width: 100%;
                height: 100%;
                .uni-input {
                  width: 100%;
                  height: $commonHeight;
                  display: flex;
                  align-items: center;
                  color: #c0c1c3;
                  font-family: PingFang-SC-Medium;
                  font-size: 30upx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  &.active {
                    color: #191f25;
                  }
                }
                .uni-box {
                  width: 100%;
                  height: $commonHeight;
                  overflow: hidden;
                  &>.uni-box_ {
                    display: flex;
                    height: $commonHeight;
                    align-items: center;
                    overflow: scroll;
                    &>.u-b-item {
                      position: relative;
                      flex: 0 0 auto;
                      padding-right: 10upx;
                      box-sizing: border-box;
                      margin-right: 10upx;
                      text-align: center;
                      &>view {
                        &:nth-child(1) {
                          color: #191f25;
                          font-family: PingFang-SC-Medium;
                          font-size: 30upx;
                        }
                        &:nth-child(2) {
                          position: absolute;
                          top: 0upx;
                          right: 0upx;
                          width: 24upx;
                          height: 20upx;
                          line-height: 14upx;
                          border-radius: 50%;
                          text-align: center;
                          background-color: red;
                          color: #ffffff;
                          font-weight: bold;
                        }
                      }
                    }
                    &>.u-b-nodata {
                      flex: 0 0 auto;
                      color: #c0c1c3;
                      font-family: PingFang-SC-Medium;
                      font-size: 30upx;
                    }
                  }
                }
              }
            }
          }
        }
        &:nth-child(2) {
          flex: 0 0 14upx;
          height: 28upx;
          &>image {
            width: 14upx;
            height: 28upx;
            display: block;
          }
        }
      }
    }
    .item-input {
      width: 100%;
      height: $commonHeight;
      padding: 0 40upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 2upx solid #ebebeb;
      &>view {
        &:nth-child(1) {
          width: 100%;
          height: 100%;
          display: flex;
          &>view {
            display: flex;
            align-items: center;
            font-size: 30upx;
            &:nth-child(1) {
              flex: 0 0 190upx;
              height: 100%;
              color: #191f25;
              font-family: PingFang-SC-Bold;
              font-weight: bold;
            }
            &:nth-child(2) {
              flex: 1 1 auto;
              height: 100%;
              display: flex;
              &>view {
                flex: 1;
                display: flex;
                align-items: center;
                font-family: PingFang-SC-Medium;
                font-size: 30upx;
                margin-right: 10upx;
                padding: 0 6upx;
                box-sizing: border-box;
                &>input {
                  flex: 1 1 auto;
                  color: #191f25;
                }
                &>view {
                  flex: 0 0 auto;
                  color: #a3a5a8;
                }
              }
            }
          }
        }
      }
    }
    .item-normal-another {
      width: 100%;
      height: $commonHeight;
      padding: 0 40upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 2upx solid #ebebeb;
      &>view {
        display: flex;
        &:nth-child(1) {
          flex: 1 1 auto;
          height: 100%;
          &>view {
            display: flex;
            align-items: center;
            font-size: 30upx;
            &:nth-child(1) {
              flex: 0 0 190upx;
              height: 100%;
              color: #191f25;
              font-family: PingFang-SC-Bold;
              font-weight: bold;
            }
            &:nth-child(2) {
              flex: 1 1 auto;
              height: 100%;
              color: #191f25;
              font-family: PingFang-SC-Medium;
            }
          }
        }
        &:nth-child(2) {
          flex: 0 0 160upx;
          height: 100%;
          color: #a3a5a8;
          font-family: PingFang-SC-Medium;
          font-size: 30upx;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
    .label-box {
      width: 100%;
      height: auto;
      padding: 0 40upx;
      box-sizing: border-box;
      margin-top: 40upx;
      display: flex;
      &>.l-b-title {
        display: flex;
        flex: 0 0 140upx;
        flex-direction: column;
        // align-items: center;
        margin-right: 10upx;
        margin-top: 20upx;
        &>text {
          line-height: 1;
          &:nth-child(1) {
            color: #191f25;
            font-size: 30upx;
            font-weight: bold;
          }
          &:nth-child(2) {
            color: #191f25;
            font-size: 22upx;
            margin-top: 20upx;
          }
        }
      }
      &>.l-b-content {
        flex: 1 1 auto;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        &>.l-b-c-item {
          flex: 0 0 160upx;
          height: 60upx;
          line-height: 60upx;
          text-align: center;
          background-color: #ffffff;
          color: #191f25;
          border-radius: 30upx;
          margin-right: 16upx;
          font-family: PingFang-SC-Medium;
          font-size: 28upx;
          box-shadow: 0 7upx 15upx 1upx rgba(0, 0, 0, 0.05);
          &:nth-child(3n) {
            margin-right: 0;
          }
          &:nth-child(n+4) {
            margin-top: 20upx;
          }
          &.active {
            background-color: #0084ff;
            box-shadow: 0 7upx 15upx 1upx rgba(48, 114, 246, 0.05);
            color: #ffffff;
          }
        }
      }
    }
    .item-textarea {
      width: 100%;
      height: auto;
      padding: 0 40upx;
      box-sizing: border-box;
      margin-top: 20upx;
      &>view {
        &:nth-child(1) {
          width: 100%;
          height: 120upx;
          line-height: 120upx;
          color: #191f25;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          font-size: 30upx;
        }
        &:nth-child(2) {
          position: relative;
          width: 100%;
          height: 260upx;
          background-color: #f6f6f6;
          border-radius: 10upx;
          &>textarea {
            width: 100%;
            height: 100%;
            padding: 20upx 20upx 50upx;
            font-family: PingFang-SC-Medium;
            font-size: 32upx;
            box-sizing: border-box;
            color: #191f25;
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
    .upload-img {
      width: 100%;
      height: auto;
      padding: 0 40upx;
      box-sizing: border-box;
      display: flex;
      margin-top: 60upx;
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
          display: flex;
          flex-wrap: wrap;
          &>image {
            width: 150upx;
            height: 150upx;
            display: block;
            margin-right: 20upx;
            &:nth-child(3n) {
              margin-right: 0;
            }
            &:nth-child(n+4) {
              margin-top: 20upx;
            }
          }
        }
      }
    }
  }
  &>.save-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 190upx;
    background-color: #ffffff;
    z-index: 9;
    overflow: hidden;
    .view-btn {
      width: 670upx;
      height: 98upx;
      line-height: 98upx;
      text-align: center;
      margin: 46upx auto 0;
      background-color: #0084ff;
      box-shadow: 0px 7px 15px 1px rgba(0, 0, 0, 0.05);
      border-radius: 10upx;
      color: #ffffff;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      font-size: 32upx;
    }
  }
}
</style>
