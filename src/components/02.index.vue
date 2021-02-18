<template>
  <div class="index-container">
    <!-- 导航区域 -->
    <div class="nav" >
      <ul>
        <li>
          <router-link to="/discovery">
            发现音乐
            <span class="el-icon-search"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            推荐歌单
            <span class="el-icon-s-unfold"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            最新音乐
            <span class="el-icon-headset"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            最新 M V
            <span class="el-icon-video-play"></span>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <audio :src='musicUrl' controls autoplay></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      musicUrl:""
    };
  }
};
</script>

<style >

</style>
