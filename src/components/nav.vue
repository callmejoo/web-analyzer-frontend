<template>
  <div id="menu">
    <div class="pure-menu">
      <a class="pure-menu-heading" href="/">控制中心</a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link to="/" exact class="pure-menu-link">概览</router-link></li>
        <li class="pure-menu-item"><router-link to="/visitor" exact class="pure-menu-link">访客</router-link></li>
        <li class="pure-menu-item"><router-link to="/user" exact class="pure-menu-link">用户</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #menu{
    width: 150px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    background: #191818;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  #menu .router-link-active{
    background-color: #EEEEEE;
  }
  #menu .router-link-active a{
    color: #000;
  }
  .pure-menu-heading{
    background-color: #1F8DD6;
    color: #fff;
    font-size: 20px;
  }
</style>
