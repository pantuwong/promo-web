<template>
  <div>
    <img :style="bannerStyle" :src="bannerName"/>
  </div>
</template>

<script>
  export default {
    name: 'Banner',

    data: () => ({
      
    }),
    methods: {
    },
    computed: {
      bannerName () {
        let h = require('../assets/website.jpg');
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': h = require('../assets/mobile.jpg'); break;
          case 'sm': h = require('../assets/mobile.jpg'); break;
          case 'md': h = require('../assets/ipad.jpg'); break;
          case 'lg': h = require('../assets/website.jpg'); break;
          case 'xl': h = require('../assets/website.jpg'); break;
        }
        return h;
      },
      bannerStyle () {
        let s = 'width: 100%; height: auto;';
        return s;
      },
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