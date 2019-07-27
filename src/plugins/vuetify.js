import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      eRed: '#ef426f',
      eWhite: '#f0f4f4',
      eGreen1: '#B1E4E3',
      eGreen2: '#3CDBC0',
      eBlue: '#59BEC9',
      eDark: '#ff00ff'
    }
  }
})
