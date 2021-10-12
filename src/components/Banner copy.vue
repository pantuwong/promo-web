<template>
  <v-row :style="{'height':height}">
    <v-col class="d-flex text-wrap" :cols="cols" style="height: 100%; position:relative;">
      <div class="ml-2 mr-2self-align-center text-center" style="width:85%; height: auto; top:40%; position:absolute;">
        <p :style="{'font-size': font_size, 'word-wrap': 'break-word'}" style="color:grey;"><span style="color: #d70f64; font-family: Avenir">foodpanda</span> <b>สั่งกินสุขใจ แชร์ไปในโซเชียล! </b></p>
        <p :style="{'font-size': caption_size, 'word-wrap': 'break-word'}" style="color:grey;">สร้างรูปโปรโมทร้านค้าด้วยตัวเอง พร้อม QR Code ให้ลูกค้าสั่งอาหารกับคุณได้ทันที ลองเลย! </p>
      </div>
    </v-col>
    <v-col :cols="12-cols" style="height: 100%;">
      <v-img
        style="height:100%; overflow-x: hidden"
        position="left top"
        :src="require('../assets/banner.jpg')"
      ></v-img>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Banner',

    data: () => ({
      
    }),
    computed: {
      height () {
        let h = '35vh';
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': h = '30vh'; break;
          case 'sm': h = '30vh'; break;
          case 'md': h = '35vh'; break;
          case 'lg': h = '40vh'; break;
          case 'xl': h = '40vh'; break;
        }
        return h;
      },

      cols () {
        let c = 8;
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': c = 8; break;
          case 'sm': c = 8; break;
          case 'md': c = 8; break;
          case 'lg': c = 8; break;
          case 'xl': c = 8; break;
        }
        return c;
      },

      font_size() {
        let f = '3em';
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': f = '1em'; break;
          case 'sm': f = '1em'; break;
          case 'md': f = '2em'; break;
          case 'lg': f = '3em'; break;
          case 'xl': f = '3em'; break;
          default: return '3em';
        }
        return f;
      },

      caption_size() {
        let f = '1.5em';
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': f = '0.5em'; break;
          case 'sm': f = '0.5em'; break;
          case 'md': f = '1em'; break;
          case 'lg': f = '1.5em'; break;
          case 'xl': f = '1.5em'; break;
          default: return '1.5m';
        }
        return f;
      }
    },
  }
</script>