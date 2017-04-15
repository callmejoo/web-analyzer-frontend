<template>
  <div class="main">
    <h2>访客统计</h2>
    <div class="table">
      <form class="pure-form form">
        <select title="a" style="height: 40px" v-model="selected">
          <option selected>全部</option>
          <option>百度</option>
          <option>搜狗</option>
          <option>神马</option>
          <option>360</option>
          <option>谷歌</option>
          <option>必应</option>
          <option>直接访问</option>
        </select>
        <input placeholder="ip地址，回车查询" maxlength="15" v-model="ip" @keyup.enter="getNew"/>
        <input placeholder="关键字，回车查询" v-model="keyword" @keyup.enter="getNew"/>
        <select title="a" style="height: 40px" v-model="whichTime">
          <option>开始时间</option>
          <option>结束时间</option>
        </select>
        <input v-show="startTimeShow" type="datetime-local" v-model="startTime" @keyup.enter="getNew"/>
        <input v-show="endTimeShow" type="datetime-local" v-model="endTime" @keyup.enter="getNew"/>
      </form>
      <table class="pure-table pure-table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>ip地址</th>
          <th>搜索引擎</th>
          <th>关键字</th>
          <th>来路链接</th>
          <th>访问链接</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items">
          <td>{{ item.id }}</td>
          <td>{{ item.ip }}</td>
          <td>{{ item['search_name'] }}</td>
          <td>{{ item.keyword }}</td>
          <td><a :href="item['from_url']">{{ item['from_url'].slice(0, 30) }}</a></td>
          <td><a :href="item.url">{{ item.url.slice(0, 20) }}</a></td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="page">
      <button class="pure-button" @click.prevent="prePage" :disabled="preDisabled">上一页</button>
      <button class="pure-button" @click.prevent="nextPage" :disabled="nextDisabled">下一页</button>
    </div>
  </div>
</template>

<script>
  import {bus} from '@/bus.js'
  export default {
    data () {
      return {
        items: [
          {
            id: '',
            ip: '',
            'search_name': '',
            keyword: '',
            'from_url': '',
            url: '',
            date: ''
          }
        ],
        url: 'http://127.0.0.1:3000',
        api: '/db?do=get&db=visitor',
        ip: '',
        keyword: '',
        selected: '全部',
        whichTime: '开始时间',
        startTimeShow: true,
        startTime: '',
        endTime: '',
        curStart: 0,
        curPageSize: 0,
        pageSize: 18,
        preDisabled: false,
        nextDisabled: false
      }
    },
    created: function () {
      this.getData(this.curStart, this.pageSize)
    },
    watch: {
      selected: function (val, oldVal) {
        this.curPage = 0
        this.getData()
      },
      whichTime: function (val, oldVal) {
        this.startTimeShow = val === '开始时间'
      }
    },
    computed: {
      curStartApi: function () {
        return '&start=' + this.curStart
      },
      pageSizeApi: function () {
        return '&size=' + this.pageSize
      },
      selectedApi: function () {
        if (this.selected === '全部') return ''
        else return '&select=' + this.selected
      },
      ipApi: function () {
        if (this.ip === '') return '&ip=' + ''
        else return '&ip=' + this.ip
      },
      keywordApi: function () {
        return '&keyword=' + this.keyword
      },
      endTimeShow: function () {
        return !this.startTimeShow
      },
      startTimeApi: function () {
        if (this.startTime) {
          return '&startTime=' + this.startTime.replace('T', ' ') + ':00'
        } else {
          return ''
        }
      },
      endTimeApi: function () {
        if (this.endTime) {
          return '&endTime=' + this.endTime.replace('T', ' ') + ':00'
        } else {
          return ''
        }
      }
    },
    methods: {
      getData: function () {
        bus.$emit('loading', true)
        this.$http.get(this.url + this.api + this.curStartApi + this.pageSizeApi + this.selectedApi + this.ipApi + this.keywordApi + this.startTimeApi + this.endTimeApi)
          .then((res) => {
            this.curPageSize = res.body.length
            if (this.curPageSize === 0) {
              alert('没数据了')
              this.prePage()
              bus.$emit('loading', false)
              return
            }
            if (this.curPageSize < this.pageSize) {
              this.nextDisabled = true
            } else {
              this.nextDisabled = false
            }
            if (this.curStart === 0) {
              this.preDisabled = true
            } else {
              this.preDisabled = false
            }
            this.items = res.body
            bus.$emit('loading', false)
          }, (err) => {
            console.log(err)
          })
      },
      getNew: function () {
        this.curStart = 0
        this.getData()
      },
      nextPage: function () {
        this.curStart += this.pageSize
        this.getData()
      },
      prePage: function () {
        if (this.curPageSize !== 0) {
          this.curStart -= this.pageSize
          this.getData()
        }
      }
    }
  }
</script>

<style>
  .table{
    min-height: 800px;
  }
  .pure-table{
    min-width: 820px;
  }
  .page{
    margin-top: 10px;
    text-align: center;
  }
  .page button{
    margin: 0 10px;
  }
  .form{
    margin: 5px 0;
  }
  .form select{
    vertical-align: top;
  }
  .form input{
    vertical-align: top;
  }
</style>
