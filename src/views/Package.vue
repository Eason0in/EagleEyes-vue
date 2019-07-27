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
          <v-tab v-for="item in dateList" :key="item" ripple dark class="eWhite">{{ item }}</v-tab>

          <v-tab-item v-for="item in dateList" :key="item" class="mt-4">
            <v-layout row wrap>
              <v-flex md3 class="pa-2" v-for="travel in travels" :key="travel.title">
                <v-card>
                  <v-img class="white--text" height="200px" :src="travel.src">
                    <v-card-title class="align-end fill-height">{{ travel.title}}</v-card-title>
                  </v-img>
                  <v-card-text>{{ travel.title}}</v-card-text>
                  <v-card-actions>
                    <v-btn flat fab color="eRed">
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
                          v-for="travelDate in dateList"
                          :key="travelDate"
                          @click="addStroke(travel.title,travelDate)"
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
          @click="drawer =!drawer"
        >
          <v-icon>storage</v-icon>
        </v-btn>
      </template>
      <span>規劃行程</span>
    </v-tooltip>

    <v-navigation-drawer v-model="drawer" app temporary class="indigo">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-sheet elevation="10" class="py-4 px-1">
            <v-chip-group mandatory active-class="eBlue--text">
              <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
            </v-chip-group>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn fixed dark fab bottom right color="eBlue" id="star" v-on="on">
          <v-icon>star</v-icon>
        </v-btn>
      </template>
      <span>我的最愛</span>
    </v-tooltip>
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
      drawer: false,
      travels: [
        {
          title: "台東",
          src:
            "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
        },
        {
          title: "台中",
          src:
            "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
        },
        {
          title: "新竹",
          src:
            "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
        },
        {
          title: "新",
          src:
            "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
        },
        {
          title: "台東1",
          src:
            "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
        },
        {
          title: "台中s",
          src:
            "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
        },
        {
          title: "新竹s",
          src:
            "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
        },
        {
          title: "新a",
          src:
            "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
        }
      ],
      items: [
        { title: "Click Me" },
        { title: "Click Me1" },
        { title: "Click Me3" },
        { title: "Click Me 2" }
      ],
      selectTravel: {},
      tags: [
        "Work",
        "Home Improvement",
        "Vacation",
        "Food",
        "Drawers",
        "Shopping",
        "Art",
        "Tech",
        "Creative Writing"
      ]
    };
  },
  computed: {
    dateList() {
      let interval = getDateDiff(this.date_S, this.date_E);
      return interval;
    }
  },
  methods: {
    addStroke(travelName, travelDate) {
      if (!this.selectTravel[travelDate]) {
        this.selectTravel[travelDate] = [travelName];
      } else {
        this.selectTravel[travelDate].push(travelName);
      }
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
</style>
