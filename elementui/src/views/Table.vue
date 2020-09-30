<template>
  <div class="table">
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
            ref="filterTable"
            :data="tableData"
            stripe
            @summary-method="summary"
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
              :filters="selectDate()"
              :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
              prop="time"
              label="时间"
              sortable
              width="180"
              column-key="time"
              :filters="selectTime()"
              :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="180"
              column-key="name"
              :filters=" selectName ()"
              :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
              prop="gender"
              label="性别"
              sortable
              width="180"
              column-key="gender"
              :filters="selectGender()"
              :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
              prop="address"
              label="训练场馆"
              sortable
              width="180"
              column-key="address"
              :filters="selectGym()"
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
              label="备注"
              sortable
              column-key="tag"
              width="100">
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
        Date: [],
        Time: [],
        Gender:[],
        Gym:[]
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
      summary({column, data}) {
        console.log(111)
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
      },
      selectDate () {
        return [...this.Date.map(this.filterName)]
      },
      selectTime () {
        return [...this.Time.map(this.filterName)]
      },
      selectGender () {
        return [...this.Gender.map(this.filterName)]
      },
      selectGym () {
        return [...this.Gym.map(this.filterName)]
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
                const name = Array.from(new Set(data.map(item => item.name)));
                const date = Array.from(new Set(data.map(item => item.date)));
                const time = Array.from(new Set(data.map(item => item.time)));
                const gender = Array.from(new Set(data.map(item => item.gender)));
                const gym = Array.from(new Set(data.map(item => item.address)));
                this.Gym = gym;
                console.log(gender);
                this.Gender = gender;
                this.Time = time;
                console.log(time);
                console.log(date);
                this.Date = date;
                console.log(name);
                this.Name = name;
              })
    },
    mounted() {

    }
  }
</script>