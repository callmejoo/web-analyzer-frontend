<template>
<div class="single-data">
  <div class="title">{{ title }}</div>
  <div class="number">{{ number }}</div>
  <div class="tip">{{ tip }}</div>
</div>
</template>

<script>
  export default {
    props: ['title', 'number', 'tip']
  }
</script>

<style scoped>
  .single-data{
    width: 160px;
    height: 60px;
    display: inline-block;
    padding: 0 5px;
  }
  .title{
    margin-left: 3px;
    color: #73879C;
    font-size: 14px;
  }
  .number{
    display: inline-block;
    font-size: 36px;
    font-weight: bold;
  }
  .tip{
    display: inline-block;
    font-size: 16px;
  }
</style>
