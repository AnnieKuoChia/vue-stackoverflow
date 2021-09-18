<template>
  <div class='Home'>
    <div class='searchArea'>
      <input type='text' v-model='msg' class='searchBar'/>
    </div>
    <div class='tagsArea'>
      <h1>trending tags</h1>
      <ul class='tagsList'>
        <li v-for="(item, index) in data.slice(0, 10)" :key="index">
          <button
            type=''
            class='tagItem'
            :tag-name="item"
            :id="item"
            @click="selectTag"
          >{{item}}</button>
        </li>
      </ul>
    </div>
    <QuestionsList :msg="msg.toLowerCase()" :tag="tag" />
  </div>
</template>

<script>
import { getTags } from '@/api/request';
import QuestionsList from '@/components/QuestionsList.vue';

export default {
  name: 'Filtered',
  components: {
    QuestionsList,
  },
  data() {
    return {
      data: [],
      msg: '',
      tag: '',
    };
  },
  methods: {
    selectTag(event) {
      const data = event.target.getAttribute('tag-name');
      this.tag = data;
      document.getElementsByClassName('tagItem').forEach((o) => o.classList.remove('action'));
      document.getElementById(this.tag).classList.add('action');
    },
  },
  created() {
    getTags()
      .then((res) => {
        const ary = res.data.items;
        ary.forEach((e) => {
          this.data.push(e.name);
        });
      });
  },
};
</script>

<style lang='scss' scoped>
.searchArea{
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  .searchBar{
    text-align: left;
    border: 2px solid rgb(104, 184, 222);
    border-radius: 10px;
    height: 30px;
    width: 100%;
  }
}
.tagsArea{
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #fff;
  padding-top: 30px;
  padding-bottom: 30px;
}
.tagsList{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    .tagItem{
        border: 1px solid rgb(104, 177, 211);
        padding: 5px 10px;
        margin-right: 5px;
        border-radius: 5px;
        font-size: 14px;
        background-color: white;
        cursor: pointer;
    }
    .tagItem:hover{
      background-color: rgb(104, 177, 211);
    }
    .action{
          background-color: rgb(104, 177, 211);
    }
}
</style>
