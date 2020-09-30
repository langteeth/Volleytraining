<template>
  <div class="table">
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
      <el-table-column
              type="index"

      >
      </el-table-column>
      <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180"
              column-key="date"
              :filters="[
                          {text: date1, value: date1},
                          {text: date2, value:date2},
                          {text: date3, value: date3},
                          {text:date4, value: date4}
                         ]"
              :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
              prop="time"
              label="时间"
              sortable
              width="180"
              column-key="time"
              :filters="[{text: time1, value: time1}, {text: time2, value: time2}, {text: time3, value: time3}]"
              :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名"
              width="180"
              :filters=" selectName ()"
              :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
              prop="gender"
              label="性别"
              width="180"
              :filters="[{text:male,value:male},{text:female,value:female}]"
              :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
              prop="address"
              label="训练场馆"
              :filters="[{text:gym1,value:gym1},{text:gym2,value:gym2}]"
              :filter-method="filterHandler"
              :formatter="formatter">
      </el-table-column>
      <el-table-column
              prop="count"
              label="人数"
              width="180">
      </el-table-column>
      <el-table-column
              prop="tag"
              label="标签"
              width="100"
              :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
                  :type="scope.row.tag === '家' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';
  import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        tableData: [],
        Name: [],
        arr2: []
        // tableData: [
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '田硕',
        //     gender:'女',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '田硕',
        //     gender:'女',
        //     address: '地坛排球馆',
        //     count:'1',
        //     tag: ''
        //   },
        //    {
        //     date: '2020-09-13',
        //     time: '08:00-10:00',
        //     name: '田硕',
        //     gender:'女',
        //     address: '地坛排球馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-20',
        //     time: '08:00-10:00',
        //     name: '田硕',
        //     gender:'女',
        //     address: '地坛排球馆',
        //     count:'1',
        //     tag: ''
        //   },
        //
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '媛媛',
        //     gender:'女',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '媛媛',
        //     gender:'女',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '童',
        //     gender:'女',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '大艾',
        //     gender:'女',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: 'Gordon',
        //     gender:'男',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: 'Gordon',
        //     gender:'男',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '赵莹',
        //     gender:'女',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '张骞',
        //     gender:'女',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '天一',
        //     gender:'女',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '小蔡',
        //     gender:'男',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '小智',
        //     gender:'男',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '逸生',
        //     gender:'男',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '林琳Lily',
        //     gender:'女',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-09-06',
        //     time: '08:00-10:00',
        //     name: '王湛鸣',
        //     gender:'男',
        //     address: '地坛体育馆',
        //     count:'1',
        //     tag: ''
        //   },
        //
        //
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '阿谷',
        //     gender:'女',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '小智',
        //     gender:'男',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '袁小风',
        //     gender:'女',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '小云',
        //     gender:'女',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '逸生',
        //     gender:'男',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '小蔡',
        //     gender:'男',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: 'LouiS',
        //     gender:'男',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //    {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: '童',
        //     gender:'女',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   },
        //   {
        //     date: '2020-08-23',
        //     time: '19:00-22:00',
        //     name: 'Manyuan',
        //     gender:'女',
        //     address: '博锐体育馆（欢乐谷）',
        //     count:'1',
        //     tag: ''
        //   }
        // ]
      }
    },
    methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      filterName (text) {
        const obj = {};
        obj.text = text;
        obj.value = text;
        return obj;
      },
      selectName () {
        return   [...this.Name.map(this.filterName)]
      }
    },
    computed: {
      ...mapState([
        'date1', 'date2', 'date3', 'date4', 'time1', 'time2', 'time3', 'time4', 'male', 'female',
        'gym1', 'gym2'
      ])

    },
    created() {
      this.$http.get('/api/trainingData.json')
              .then(res => {
                const data = eval('(' + res.data + ')');
                console.log(data);
                this.tableData = data;
                const temp = data.map(item => item.name);
                console.log(temp)
                const arr = Array.from(new Set(temp));
                console.log(arr);
                this.Name = arr;
              })
    },
    mounted() {

    }
  }
</script>