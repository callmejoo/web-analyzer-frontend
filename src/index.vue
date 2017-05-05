<template>
  <div class="main">
    <router-link class="link" to="/visitor"><h2>访问：</h2></router-link>
    <div class="overview">
      <single-data title="总访问量" :number="data.visit.all" tip="次"></single-data>
      <div class="hr"></div>
      <single-data title="今日访问" :number="data.visit.today" tip="次"></single-data>
      <div class="hr"></div>
      <single-data title="昨日访问" :number="data.visit.lastDay" tip="次"></single-data>
      <div class="hr"></div>
      <single-data title="本周访问" :number="data.visit.week" tip="次"></single-data>
      <div class="hr"></div>
      <single-data title="本月访问" :number="data.visit.month" tip="次"></single-data>
    </div>
    <div class="overview">
      <router-link class="link" to="/visitor"><h2>注册：</h2></router-link>
      <single-data title="总用户数" :number="data.user.all" tip="个"></single-data>
      <div class="hr"></div>
      <single-data title="今日注册" :number="data.user.today" tip="个"></single-data>
      <div class="hr"></div>
      <single-data title="昨日注册" :number="data.user.lastDay" tip="个"></single-data>
      <div class="hr"></div>
      <single-data title="本周注册" :number="data.user.week" tip="个"></single-data>
      <div class="hr"></div>
      <single-data title="本月注册" :number="data.user.month" tip="个"></single-data>
    </div>
    <div class="overview">
      <router-link class="link" to="/visitor"><h2>来路：</h2></router-link>
      <single-data title="百度" :number="data.from.baidu" tip="次"></single-data>
      <div class="hr"></div>
      <single-data title="谷歌" :number="data.from.google" tip="个"></single-data>
      <div class="hr"></div>
      <single-data title="必应" :number="data.from.bing" tip="个"></single-data>
      <div class="hr"></div>
      <single-data title="360搜索" :number="data.from.so" tip="个"></single-data>
      <div class="hr"></div>
      <single-data title="其他" :number="data.from.other" tip="个"></single-data>
    </div>
  </div>
</template>

<script>
import singleData from '@/components/singleData'
import {bus} from '@/bus.js'

export default {
  data () {
    return {
      data: {
        visit: {
          all: 0,
          today: 0,
          lastDay: 0,
          week: 0,
          month: 0
        },
        user: {
          all: 0,
          today: 0,
          lastDay: 0,
          week: 0,
          month: 0
        },
        from: {
          baidu: 0,
          google: 0,
          bing: 0,
          so: 0,
          other: 0
        }
      }
    }
  },
  components: {
    'single-data': singleData
  },
  beforeCreate: function () {
    bus.$emit('loading', true)
    this.$http.get('/db?do=overall').then((res) => {
      bus.$emit('loading', false)
      this.data = res.body
      let d = this.data
      for (let f in d) {
        for (let s in d[f]) {
          let num = d[f][s]
          let arr = []
          if (num < 20) {
            let x = num / 20
            for (let a = 1; a < 21; a++) {
              arr.push(Math.round(a * x))
            }
            arr.push(num)
          } else {
            let left = num % 20
            let x = (num - left) / 20
            for (let a = 1; a < 21; a++) {
              arr.push(a * x)
            }
            arr.push(num)
          }
          let c = 0
          let t = setInterval(function () {
            d[f][s] = arr[c]
            c++
            if (c > 20) {
              clearInterval(t)
            }
          }, 50)
        }
      }
    }, (err) => {
      console.log(err)
    })
  },
  mounted: function () {
  },
  beforeDestroy: function () {
    clearInterval(this.s)
  }
}
</script>

<style scoped>
  .overview{
    width: 100%;
  }
  .title{
    font-size: 30px;
    font-weight: bold;
  }
  .hr{
    display: inline-block;
    width: 3px;
    height: 60px;
    background-color: #ADB2B5;
  }
  .link{
    text-decoration: none;
    color: #73879C;
  }
</style>
