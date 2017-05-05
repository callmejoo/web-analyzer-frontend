<template>
  <div class="main">
    <h2>注册统计</h2>
    <div class="table">
      <form class="pure-form form">
        <input placeholder="ip地址，回车查询" maxlength="15" v-model="ip" @keyup.enter="getNew"/>
        <input placeholder="用户名，回车查询" v-model="username" @keyup.enter="getNew"/>
        <select title="a" style="height: 40px" v-model="hasKeyword">
          <option selected>全部</option>
          <option>有关键字</option>
          <option>无关键字</option>
        </select>
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
          <th>用户名</th>
          <th>关键字</th>
          <th>时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in items">
          <td>{{ item.id }}</td>
          <td>{{ item.ip }}</td>
          <td>{{ item.user }}</td>
          <td>{{ item.keyword }}</td>
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
            user: '',
            keyword: '',
            date: ''
          }
        ],
        url: '',
        api: '/db?do=get&db=user',
        ip: '',
        hasKeyword: '全部',
        username: '',
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
        this.curStart = 0
        this.getData()
      },
      whichTime: function (val, oldVal) {
        this.curStart = 0
        this.startTimeShow = val === '开始时间'
      },
      hasKeyword: function (val, oldVal) {
        this.curStart = 0
        this.getData()
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
      usermameApi: function () {
        return '&user=' + this.username
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
      },
      hasKeywordApi: function () {
        if (this.hasKeyword === '有关键字') return '&hasKeyword=true'
        if (this.hasKeyword === '无关键字') return '&hasKeyword=false'
        else return ''
      }
    },
    methods: {
      getData: function () {
        bus.$emit('loading', true)
        this.$http.get(this.url + this.api + this.curStartApi + this.pageSizeApi + this.selectedApi + this.ipApi + this.usermameApi + this.startTimeApi + this.endTimeApi + this.hasKeywordApi)
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

<style scoped>
  .table{
    min-height: 500px;
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
</style>
