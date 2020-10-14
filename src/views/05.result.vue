<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到{{ songCount }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in lists"
              :key="index"
              @dblclick="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span v-if="item.mvid != 0" class="iconfont icon-mv"></span>
                  </div>
                  <span v-if="item.alias.length != 0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item, index) in playLists" :key="index" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mvlists" :key="index" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "result",
  data() {
    return {
      activeIndex: "songs",
      lists: [],
      playLists: [],
      mvlists: [],
      songCount: 0,
    };
  },
  watch: {
    activeIndex() {
      let type = 1;
      // 获取个数
      let limit = 10;
      switch (this.activeIndex) {
        case "songs":
          type = 1;
          limit = 10;
          break;
        case "lists":
          type = 1000;
          limit = 10;
          break;
        case "mv":
          type = 1004;
          limit = 8;
          break;
        default:
          break;
      }
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
          limit,
          type,
        },
      }).then((res) => {
        console.log(res);
        // 获取歌曲
        if (type == 1) {
          this.lists = res.data.result.songs;
          this.songCount = res.data.result.songCount;
          // 转换时间
          for (let i = 0; i < this.lists.length; i++) {
            let duration = this.lists[i].duration;
            let min = parseInt(duration / 1000 / 60);
            let sec = parseInt((duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.lists[i].duration = min + ":" + sec;
          }
        }
        // 获取歌单
        else if(type == 1000) {
          this.playLists = res.data.result.playlists
          this.songCount = res.data.result.playlistCount
          // 处理播放次数
          for(let i=0;i<this.playLists.length;i++) {
            if(this.playLists[i].playCount>=100000) {
              this.playLists[i].playCount = parseInt(this.playLists[i].playCount/10000) + '万'
            }
          }
        }
        // 获取mv
        else {
          console.log(res);
          this.mvlists = res.data.result.mvs
          this.songCount = res.data.result.mvCount
          for(let i=0;i<this.mvlists.length;i++) {
            let min = parseInt(this.mvlists[i].duration/1000/60);
            let sec = parseInt(this.mvlists[i].duration/1000%60);
            if(min<10) {
              min = '0'+min
            }
            if(sec<10) {
              sec = '0'+sec
            }
            this.mvlists[i].duration = min+':'+sec
            if(this.mvlists[i].playCount >= 100000){
              this.mvlists[i].playCount = parseInt(this.mvlists[i].playCount/100000) + '万'
            }
          }
        }
      });
    },
  },
  created() {
    this.getList();
  },
  methods: {
    // 去mv页面
    toMv(id) {
      this.$router.push('/mv?q='+id)
    },
    toPlaylist(id) {
      // 跳转并携带数据即可
      this.$router.push('/playlist?q='+id)
    },
    getList() {
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
          limit: 10,
          type: 1,
        },
      }).then((res) => {
        // console.log(res);
        this.lists = res.data.result.songs;
        this.songCount = res.data.result.songCount;
        // 转换时间
        for (let i = 0; i < this.lists.length; i++) {
          let duration = this.lists[i].duration;
          let min = parseInt(duration / 1000 / 60);
          let sec = parseInt((duration / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.lists[i].duration = min + ":" + sec;
        }
      });
    },
    playMusic(id) {
      // console.log(id);
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      })
        .then((res) => {
          // // console.log(res);
          this.url = res.data.data[0].url;
          // console.log(url);
          // 设置给父组件的 播放地址
          this.$parent.musicUrl = this.url;
        })
        .catch((err) => err);
    },
  },
};
</script>

<style >
</style>
