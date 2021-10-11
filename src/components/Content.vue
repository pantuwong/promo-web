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
                @click="selectTemplate(book.idx)"
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
      <Template1 v-else-if="selectedTemplate==1" />
      <Template2 v-else-if="selectedTemplate==2" />
      <Template3 v-else-if="selectedTemplate==3" />
      <Template4 v-else-if="selectedTemplate==4" />
      <Template5 v-else-if="selectedTemplate==5" />
      <Template6 v-else-if="selectedTemplate==6" />
      <Template7 v-else-if="selectedTemplate==7" />
      <Template8 v-else-if="selectedTemplate==8" />
      <Template9 v-else-if="selectedTemplate==9" />
      <Template10 v-else-if="selectedTemplate==10" />
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
import Template7 from './Template7.vue'
import Template8 from './Template8.vue'
import Template9 from './Template9.vue'
import Template10 from './Template10.vue'
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
    Template7,
    Template8,
    Template9,
    Template10,
  },
  data: () => ({
      snackbar: false,
      snackbarColor: '#41A746',
      snackbarText: 'test',
      timeout: 5000,
      books: [
        { title: 'เมนูนี้มีส่วนลด', idx: 1, image: require('../assets/template1.png')},
        { title: 'แนะนำเมนูเด็ด!', idx: 2,image: require('../assets/template2.png')},
        { title: 'เมนูใหม่ท้าให้ลอง',  idx: 3,image: require('../assets/template3.png')},
        { title: 'ร้านใหม่น่าลอง', idx: 4,image: require('../assets/template4.png')},
        { title: 'ร้านดังใกล้บ้านคุณ',  idx: 5,image: require('../assets/template5.png')},
        { title: 'ส่งเร็ว สุดใจ',  idx: 6,image: require('../assets/template6.png')},
        { title: 'โปรโมชั่นแถมๆ',  idx: 7,image: require('../assets/template7.png')},
        { title: 'ลดทุกเมนู',  idx: 8, image: require('../assets/template8.png')},
        { title: 'ส่งเร็ว สุดใจ',  idx: 9, image: require('../assets/template9.png')},
        { title: 'ส่งเร็ว สุดใจ',  idx: 10, image: require('../assets/template9.png')},
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
    ...mapActions(["setSelectedTemplate", "setTryAccess"]),
    selectTemplate(key) {
      if (!this.isLogin) {
        // this.snackbarColor = "#DC3A45"
        // this.snackbarText = `โปรดทำการ Login ก่อนใช้งาน`
        // this.snackbar = true
        this.setTryAccess(true);
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