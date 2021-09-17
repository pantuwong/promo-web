<template>
  <div id="app" data-app>
    <v-container style="height:50vh; width:100%; overflow-y:scroll; margin-top:30px; margin-bottom-10px">
      <v-layout row wrap justify-center align-center>
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
                src="http://www.homelyfreshfoods.com/storage/plan_picture/Food_Hero_Image_1586349408.jpg"
              >
              </v-img>
            </div>
            <div>
              <v-tooltip top class="block">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    style="cursor:default;"
                    class="text"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ book.title }}
                  </div>
                </template>
                <span>{{ book.title }}</span>
              </v-tooltip>
            </div>
            <div class="text-no-wrap" style="cursor:default;">
              {{ book.year }}
            </div>
          </v-card>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Banner",

  data: () => ({
      books: [
        { title: 'template1', rating: 3, year: '2016' },
        { title: 'template2 with very very long text', rating: 5, year: '2016' },
        { title: 'template3', rating: 2.5, year: '2016' },
        { title: 'template4', rating: 1.8, year: '2016' },
        { title: 'template5', rating: 4, year: '2016' },
        { title: 'template6', rating: 4, year: '2016' },
        { title: 'template7', rating: 4, year: '2016' },
        { title: 'template8', rating: 4, year: '2016' },
      ]
  }),
  computed: {
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


</style>