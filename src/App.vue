<template>
  <div id="app">
    <!-- 顶部 -->
    <top/>
    <index/>
  </div>
</template>

<script>
  import top from './components/01.top'
  import index from './components/02.index'

export default {
  name: 'App',
  components: {
    top,
    index
  }
}
</script>

<style>

</style>
