<template>
    <view class="live-player">
        <live-player
                src="rtmp://pccb9a80a.live.126.net/live/230d26bdd84442818f0ffa6a720679fc?wsSecret=68893db33f684fda0c6109d6fcc821e9&wsTime=1582123820"
                autoplay
                @statechange="statechange"
                @netstatus="netstatus"
                @error="error"
                style="width: 100%; height: 100%;"
        />
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            error(err) {
                console.error(err,"--err--");
            },
            statechange(res) {
                console.error("res--", res);
            },
            netstatus(res) {
                console.error("res--", res);
            },
        }
    }
</script>

<style>
    page{
        width: 100%;
        height: 100%;
    }
</style>
<style scoped lang="less">
    .live-player {
        width: 100%;
        height: 100%;
    }
</style>