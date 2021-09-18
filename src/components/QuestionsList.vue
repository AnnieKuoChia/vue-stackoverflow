<template>
  <div class="home">
    <div
      v-for="item in filteredData"
      :key="item.id"
      :data-tags="item.questions.tags"
      class='questionList'
      id='questionList'
    >
      <div class="questionInfo">
        <a :href="item.questions.link" target="_blank">
          <h3 class="title">{{ item.questions.title }}</h3>
        </a>
        <ul class="num_area">
          <li>
            <p class="numTitle">Score</p>
            <p class="num highlight" v-if="item.questions.score < 0">
              {{ item.questions.score }}
            </p>
            <p class="num" v-else>{{ item.questions.score }}</p>
          </li>
          <li>
            <p class="numTitle">Answers</p>
            <p
              class="num border"
              v-if="
                item.questions.answers >= 1 && item.questions.accepted === false
              "
            >
              {{ item.questions.answers }}
            </p>
            <p
              class="num border bgc"
              v-else-if="
                item.questions.answers > 1 && item.questions.accepted === true
              "
            >
              {{ item.questions.answers }}
            </p>
            <p class="num" v-else>{{ item.questions.answers }}</p>
          </li>
          <li>
            <p class="numTitle">Viewed</p>
            <p class="num">{{ item.questions.viewed }}</p>
          </li>
        </ul>
      </div>
      <ul class="owner_area">
        <li class="ownerInfo">
          <img
            :src="item.owner.imageUrl"
            :alt="item.owner.name"
            class="ownerImg"
          />
          <p class="ownerName">{{ item.owner.name }}</p>
        </li>
      </ul>
    </div>
    <infinite-loading
      v-if="data.length"
      spinner="spiral"
      @infinite="infiniteScroll"
    ></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

export default {
  name: 'QuestionList',
  components: {
    InfiniteLoading,
  },
  props: {
    msg: String,
    tag: String,
  },
  watch: {
    tag: {
      deep: true,
      handler() {
        this.getTagFilterData();
      },
    },
  },
  data() {
    return {
      data: [],
      page: 1,
    };
  },
  methods: {
    infiniteScroll($state) {
      setTimeout(() => {
        this.page += 1;
        axios.get(this.url)
          .then((res) => {
            const ary = res.data.items;
            ary.forEach((e) => {
              const obj = {
                questions: {
                  title: e.title,
                  score: e.score,
                  answers: e.answer_count,
                  accepted: e.is_answered,
                  viewed: e.view_count,
                  tags: e.tags,
                  link: e.link,
                },
                owner: {
                  name: e.owner.display_name,
                  imageUrl: e.owner.profile_image,
                  link: e.owner.link,
                },
              };
              this.data.push(obj);
            });
            $state.loaded();
          });
      }, 500);
    },
    getTagFilterData() {
      this.data = [];
      this.page = 1;
      axios.get(this.url)
        .then((res) => {
          const ary = res.data.items;
          ary.forEach((e) => {
            const obj = {
              questions: {
                title: e.title,
                score: e.score,
                answers: e.answer_count,
                accepted: e.is_answered,
                viewed: e.view_count,
                tags: e.tags,
                link: e.link,
              },
              owner: {
                name: e.owner.display_name,
                imageUrl: e.owner.profile_image,
                link: e.owner.link,
              },
            };
            this.data.push(obj);
          });
        });
    },
  },
  created() {
    this.getTagFilterData();
  },
  computed: {
    url() {
      return `https://api.stackexchange.com/2.3/questions?page=${this.page}&pagesize=20&order=desc&sort=activity&site=stackoverflow&tagged=${this.tag}`;
    },
    filteredData() {
      return this.data
        .filter((item) => {
          const dataTitle = item.questions.title.toLowerCase();
          return dataTitle.match(this.msg);
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.searchBar {
  text-align: left;
  width: 100%;
  border: 2px solid rgb(104, 184, 222);
  border-radius: 20px;
  height: 20px;
}
.questionList {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom: 1px solid #000;
  padding: 10px;
  .questionInfo {
    width: 100%;
    .title {
      text-align: left;
      font-size: 18px;
      font-weight: 600;
    }
    .num_area {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 20px;
      .numTitle {
        color: red;
        margin-bottom: 10px;
      }
    }
  }
  .owner_area {
    display: inline-block;
    margin-left: 30px;
    .ownerImg {
      width: 100px;
      height: 100px;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
}
.highlight {
  color: red;
}
.border {
  border: 1px solid rgb(104, 177, 211);
}
.bgc {
  background-color: rgb(104, 177, 211);
}
</style>
