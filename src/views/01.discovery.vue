<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key='index'>
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in lists" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="el-icon-video-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in news" :key='index'>
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="el-icon-video-play" @click="playMusic(item.id)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="el-icon-video-play"></span>
            <div class="num-wrap">
              <div class="el-icon-video-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'

export default {
  name: 'discovery',
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      lists: [],
      // 最新音乐
      news: [],
      url: '',
      mvs: []
    }
  },
  methods: {
    playMusic(id) {
      // console.log(id);
      axios({
        url: 'https://autumnfish.cn/song/url',
        method: 'get',
        params: {
          id
        }
      }).then(res => {
        // // console.log(res);
        this.url = res.data.data[0].url
        // console.log(url);
        // 设置给父组件的 播放地址
        this.$parent.musicUrl = this.url
      }).catch( err => err)
    }
  },
  created() {
    // 调用轮播图接口
    axios({
      url: 'https://autumnfish.cn/banner',
      method: 'get',
      params: {}
    }).then(res => {
      // console.log(res);
      this.banners = res.data.banners
    })
    // 推荐歌单
    axios({
      url: 'https://autumnfish.cn/personalized',
      method: 'get',
      params: {
        // 获取的数据量
        limit: 10
      }
    }).then(res => {
      // console.log(res);
      this.lists = res.data.result
    }).catch(err => err)
    // 最新推荐
    axios({
      url: 'https://autumnfish.cn/personalized/newsong',
      method: 'get'
    }).then(res => {
      // console.log(res);
      this.news = res.data.result
    }).catch(err => err)
    // mv
    axios({
      url: 'https://autumnfish.cn/personalized/mv',
      method: 'get'
    }).then(res => {
      console.log(res);
      this.mvs = res.data.result
    }).catch(err => err)
  },
};
</script>
  
<style >
</style>
