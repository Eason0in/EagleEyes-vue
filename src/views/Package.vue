<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-img :src="require('@/assets/googleMap.jpg') " height="250" class="grey darken-4"></v-img>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-4">
      <v-flex md12>
        <v-tabs v-model="active" grow>
          <v-tab
            v-for="recommendTab in recommendTabs"
            :key="recommendTab"
            ripple
            dark
            class="eWhite"
          >{{ recommendTab }}</v-tab>

          <v-tab-item v-for="recommendTab in recommendTabs" :key="recommendTab" class="mt-4">
            <v-layout row wrap>
              <v-flex
                md3
                class="pa-2"
                v-for="recommendItem in recommendItems[recommendTab]"
                :key="recommendItem.title"
              >
                <v-card>
                  <v-img class="white--text" height="200px" :src="recommendItem.src">
                    <v-card-title class="align-end fill-height">{{ recommendItem.title}}</v-card-title>
                  </v-img>
                  <v-card-text>{{ recommendItem.title}}</v-card-text>
                  <v-card-actions>
                    <v-btn flat fab color="eRed" @click="addFavorite(recommendItem)">
                      <v-icon>favorite</v-icon>
                    </v-btn>

                    <v-menu offset-y open-on-hover>
                      <template v-slot:activator="{ on }">
                        <v-btn flat fab color="eRed" v-on="on">
                          <v-icon large>add</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-tile
                          v-for="travelDate in strokeDate"
                          :key="travelDate"
                          @click="addStroke(recommendItem,travelDate)"
                        >
                          <v-list-tile-title>{{ travelDate }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>

    <!-- 規劃行程 -->
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="eBlue"
          id="stroke"
          v-on="on"
          @click="openDrawer()"
        >
          <v-icon>storage</v-icon>
        </v-btn>
      </template>
      <span>規劃行程</span>
    </v-tooltip>

    <v-navigation-drawer v-model="drawerStroke" app temporary class="eGreen1 lighten-2">
      <v-layout column>
        <v-flex md12 class="text-md-center">
          <v-btn icon flat @click="changeIndex(-1)">
            <v-icon>chevron_left</v-icon>
          </v-btn>

          <p class="d-inline-block">{{ strokeDate[index] }}</p>

          <v-btn icon flat @click="changeIndex(1)">
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </v-flex>

        <v-flex md12 pa-3>
          <v-card v-for="(travel,i) in selectTravel[currentDate]" :key="travel.title">
            <v-img class="white--text" height="200px" :src="travel.src">
              <v-card-title class="align-end fill-height">{{ travel.title}}</v-card-title>
            </v-img>
            <v-card-text>
              {{ travel.title}}
              <v-btn flat fab color="eRed" @click="deleteStroke(travel,i)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md12 class="text-md-center">
          <v-btn color="eGreen2 eDark--text" @click="getStrokPage">
            Get 行程
            <v-icon right>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <!-- 我的最愛 -->
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="eBlue"
          id="star"
          v-on="on"
          @click="drawerFavortie=!drawerFavortie"
        >
          <v-icon>star</v-icon>
        </v-btn>
      </template>
      <span>我的最愛</span>
    </v-tooltip>

    <v-navigation-drawer v-model="drawerFavortie" app temporary class="eRed lighten-3">
      <v-layout row column>
        <v-flex md3 class="pa-2" v-for="(travel,favoriteIndex) in favoriteList" :key="travel.title">
          <v-card>
            <v-img class="white--text" height="200px" :src="travel.src">
              <v-card-title class="align-end fill-height">{{ travel.title}}</v-card-title>
            </v-img>
            <v-card-text>{{ travel.title}}</v-card-text>
            <v-card-actions>
              <v-menu offset-y open-on-hover>
                <template v-slot:activator="{ on }">
                  <v-btn flat fab color="eRed" v-on="on">
                    <v-icon large>add</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-tile
                    v-for="travelDate in strokeDate"
                    :key="travelDate"
                    @click="addStroke(travel,travelDate,favoriteIndex)"
                  >
                    <v-list-tile-title>{{ travelDate }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

              <v-btn flat fab color="eRed" @click="deleteFavorite(favoriteIndex)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { getDateDiff } from "../js/dateFuns";
export default {
  name: "Package",
  props: ["city", "target", "date_S", "date_E"],
  data() {
    return {
      active: null,
      drawerStroke: false,
      drawerFavortie: false,
      recommendItems: {
        推薦美食: [
          {
            title: "台東",
            src: "https://picsum.photos/id/77/1920/1080"
          },
          {
            title: "台中",
            src: "https://picsum.photos/id/71/1920/1080"
          }
        ],
        "近期活動/票券": [
          {
            title: "新竹",
            src: "https://picsum.photos/id/62/1920/1080"
          },
          {
            title: "新",
            src: "https://picsum.photos/id/83/1920/1080"
          }
        ],
        風景: [
          {
            title: "台東1",
            src: "https://picsum.photos/id/120/1920/1080"
          },
          {
            title: "台中s",
            src: "https://picsum.photos/id/149/1920/1080"
          }
        ],
        購物: [
          {
            title: "新竹s",
            src: "https://picsum.photos/id/142/1920/1080"
          },
          {
            title: "新a",
            src: "https://picsum.photos/id/122/1920/1080"
          }
        ],
        Hotelscombined訂房推薦: [
          {
            title: "新竹s",
            src: "https://picsum.photos/id/179/1920/1080"
          },
          {
            title: "新a",
            src: "https://picsum.photos/id/162/1920/1080"
          }
        ]
      },
      selectTravel: {},
      strokeDate: getDateDiff(this.date_S, this.date_E),
      index: 0,
      favoriteList: [],
      recommendTabs: [
        "推薦美食",
        "近期活動/票券",
        "風景",
        "購物",
        "Hotelscombined訂房推薦"
      ]
    };
  },
  computed: {
    total() {
      return this.strokeDate.length;
    },
    currentDate() {
      return this.strokeDate[this.index];
    }
  },
  methods: {
    addStroke(travel, travelDate, favoriteIndex) {
      if (!this.selectTravel[travelDate]) {
        this.selectTravel[travelDate] = [travel];
      } else {
        this.selectTravel[travelDate].push(travel);
      }

      //如果是在我的最愛加入列表後將項目在我的最愛裡移除
      if (this.drawerFavortie) {
        this.deleteFavorite(favoriteIndex);
      }
    },
    openDrawer() {
      this.drawerStroke = !this.drawerStroke;
      this.index = 0;
    },
    deleteStroke(travel, strokeIndex) {
      //把剩下的留著
      const lessStroke = this.selectTravel[this.currentDate];
      const newArr = lessStroke.filter((item, index) => {
        return index !== strokeIndex;
      });

      //刪除整個日期
      this.$delete(this.selectTravel, this.currentDate);

      //重新設定日期的景點
      this.$set(this.selectTravel, this.currentDate, newArr);
    },
    changeIndex(change) {
      this.index = (this.index + change + this.total) % this.total;
    },
    addFavorite(travel) {
      this.favoriteList.push(travel);
    },
    deleteFavorite(favoriteIndex) {
      this.$delete(this.favoriteList, favoriteIndex);
    },
    getStrokPage() {
      this.$router.push({
        name: "stroke",
        params: {
          strokeDate: JSON.stringify(this.strokeDate)
        }
      });
      this.$bus.$emit("changeStep", { stepNum: 3 });
    }
  }
};
</script>
<style lang="scss" scoped>
.v-btn--bottom:not(.v-btn--absolute) {
  &#stroke {
    bottom: 50vh;
  }
  &#star {
    bottom: 40vh;
  }
}

.v-carousel {
  text-align: center;
}
</style>
