<template>
  <div id="app" data-app>
    <v-container style="height:50vh; width:100%; overflow-y:scroll; margin-top:30px; margin-bottom-10px">
      <v-layout v-if="selectedTemplate==null" row wrap justify-center align-center>
        <div v-for="book in books" :key="book.title">
          <v-card
            flat
            style="margin:10px; background-color: transparent;"
            :width="width"
          >
            <div flat class="text-center">
              <v-img
                :aspect-ratio="1 / 1"
                class="media"
                :src="book.image"
                @click="selectTemplate(book.title)"
              >
              </v-img>
            </div>
            <div>
              <v-tooltip top class="block">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    style="cursor:default;"
                    class="content-text text-center"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ book.title }}
                  </div>
                </template>
                <span>{{ book.title }}</span>
              </v-tooltip>
            </div>
          </v-card>
        </div>
      </v-layout>
      <Template1 v-else-if="selectedTemplate=='เมนูนี้มีส่วนลด'" />
      <Template2 v-else-if="selectedTemplate=='แนะนำเมนูเด็ด!'" />
      <Template3 v-else-if="selectedTemplate=='เมนูใหม่ท้าให้ลอง'" />
      <Template4 v-else-if="selectedTemplate=='ร้านใหม่น่าลอง'" />
      <Template5 v-else-if="selectedTemplate=='ร้านดังใกล้บ้านคุณ'" />
      <Template6 v-else-if="selectedTemplate=='ส่งเร็ว สุดใจ'" />
    </v-container>
    <v-snackbar
      :timeout="timeout"
      v-model="snackbar"
      top
      right 
      :color="snackbarColor"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="#fff"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Template1 from './Template1.vue'
import Template2 from './Template2.vue'
import Template3 from './Template3.vue'
import Template4 from './Template4.vue'
import Template5 from './Template5.vue'
import Template6 from './Template6.vue'
import { mapState, mapActions } from "vuex";
export default {
  name: "Banner",
  components: {
    Template1,
    Template2,
    Template3,
    Template4,
    Template5,
    Template6,
  },
  data: () => ({
      snackbar: false,
      snackbarColor: '#41A746',
      snackbarText: 'test',
      timeout: 5000,
      books: [
        { title: 'เมนูนี้มีส่วนลด', image: require('../assets/template1.png')},
        { title: 'แนะนำเมนูเด็ด!', image: require('../assets/template2.png')},
        { title: 'เมนูใหม่ท้าให้ลอง',  image: require('../assets/template3.png')},
        { title: 'ร้านใหม่น่าลอง', image: require('../assets/template4.png')},
        { title: 'ร้านดังใกล้บ้านคุณ',  image: require('../assets/template5.png')},
        { title: 'ส่งเร็ว สุดใจ',  image: require('../assets/template6.png')},
        { title: 'template7',  image: 'http://www.homelyfreshfoods.com/storage/plan_picture/Food_Hero_Image_1586349408.jpg'},
        { title: 'template8',  image: 'http://www.homelyfreshfoods.com/storage/plan_picture/Food_Hero_Image_1586349408.jpg'},
      ]
  }),
  computed: {
    ...mapState(["isLogin", "selectedTemplate"]),
    width () {
        console.log(this.$vuetify.breakpoint.name)
        let w = '300px';
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': w = '125px'; break;
          case 'sm': w = '125px'; break;
          case 'md': w = '250px'; break;
          case 'lg': w = '300px'; break;
          case 'xl': w = '400px'; break;
        }
        return w;
      },
  },
  methods: {
    ...mapActions(["setSelectedTemplate"]),
    selectTemplate(key) {
      if (!this.isLogin) {
        this.snackbarColor = "#DC3A45"
        this.snackbarText = `โปรดทำการ Login ก่อนใช้งาน`
        this.snackbar = true
      } else { 
        this.setSelectedTemplate(key)
      }
    }
  }
};
</script>
<style scoped>
.media{
  border-radius:3%;
}
.media:hover{
  box-shadow: 0 0 3pt 2pt #d70f64;
  border-radius:3%;
  cursor: pointer;
}
.text{
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   cursor: default;
   width: 100%;
   position: absolute;
}
.block{
   display: block !important;
   height: 24px;
}
.content-text {
  margin-top: 20px;
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-weight: 900;
}

</style>