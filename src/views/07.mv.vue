<template>
<!-- 评论时间未写 -->
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon" alt="" />
          </div>
          <span class="name">{{mvInfo.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvInfo.name}}</h2>
          <span class="date">发布：{{mvInfo.publishTime}}</span>
          <span class="number">播放：{{mvInfo.playCount}}次</span>
          <p class="desc">
            {{mvInfo.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">({{hotCount}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in hotComments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number">(666)</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in simiMvs" :key="index">
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mv地址
      url: '',
      simiMvs: [],
      mvInfo: {},
      // 头像
      icon: '',
      hotComments: [],
      hotCount: 0,
      comments: []
    };
  },
  created() {
    // mv播放地址
    axios({
      url: 'https://autumnfish.cn/mv/url',
      method: 'get',
      params: {
        id: this.$route.query.q
      }
    }).then(res => {
      // console.log(res);
      this.url = res.data.data.url
    }).catch(err => err)
    // 获取相关mv
    axios({
      url: 'https://autumnfish.cn/simi/mv',
      method: 'get',
      params: {
        mvid: this.$route.query.q
      }
    }).then(res => {
      this.simiMvs = res.data.mvs
    }).catch(err => err)
    // 获取mv的信息
    axios({
      url: ' https://autumnfish.cn/mv/detail',
      method: 'get',
      params: {
        mvid: this.$route.query.q
      }
    }).then(res => {
      // mv的详情
      this.mvInfo = res.data.data
      // 获取 歌手信息
      axios({
        url: 'https://autumnfish.cn/artists',
        method: 'get',
        params: {
          id: this.mvInfo.artists[0].id
        }
      }).then(res => {
        // 歌手的封面信息
        this.icon = res.data.artist.picUrl
      }).catch(err => err)
    }).catch(err => err)
    // mv评论
    axios({
      url: 'https://autumnfish.cn/comment/mv',
      method: 'get',
      params: {
        id: this.$route.query.q,
        limit: 10,
        offset: 0
      }
    }).then(res => {
      console.log(res);
      this.hotComments = res.data.hotComments
      this.hotCount = res.data.hotComments.length
      this.comments = res.data.comments;
      this.total = res.data.total;
    }).catch(err => err)
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
          offset: (this.page - 1) * 10,
        },
      })
        .then((res) => {
          console.log(res);
          this.comments = res.data.comments;
          this.total = res.data.total;
        })
        .catch((err) => err);
    }
  }
};
</script>

<style></style>
