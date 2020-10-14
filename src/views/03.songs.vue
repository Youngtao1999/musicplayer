<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{ active: type == 0 }" @click="type = 0"
        >全部</span
      >
      <span class="item" :class="{ active: type == 7 }" @click="type = 7"
        >华语</span
      >
      <span class="item" :class="{ active: type == 96 }" @click="type = 96"
        >欧美</span
      >
      <span class="item" :class="{ active: type == 8 }" @click="type = 8"
        >日本</span
      >
      <span class="item" :class="{ active: type == 16 }" @click="type = 16"
        >韩国</span
      >
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in lists" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <!-- 播放按钮 -->
              <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists["0"].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "songs",
  data() {
    return {
      // 歌曲列表
      lists: [],
      // 分类
      type: 0,
    };
  },
  methods: {
    typeData() {
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          // 传递设置的数据
          limit: 50,
          type: this.type
        },
      }).then((res) => {
        // console.log(res);
        this.lists = res.data.data;
        // 处理时长 毫秒 转为 分秒
        for (let i = 0; i < this.lists.length; i++) {
          // 获取 总毫秒数
          const duration = this.lists[i].duration;
          // 换算成分
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          // 换算成秒
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.lists[i].duration = `${min}:${sec}`;
        }
      });
    },
    playMusic(id) {
      axios({
        url: 'https://autumnfish.cn/song/url',
        method: 'get',
        params: {id}
      }).then(res => {
        // console.log(res);
        const url = res.data.data[0].url
        // console.log(url);
        this.$parent.musicUrl = url
      })
    }
  },
  created() {
    // 获取 最新音乐数据
    this.typeData()
  },
  watch: {
    type() {
      this.typeData()
    }
  },
};
</script>

<style >
</style>
