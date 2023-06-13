import Vue from 'vue';
import App from './ui.vue';
import VueClipboard from 'vue-clipboard2';
import VueSocialSharing from 'vue-social-sharing'

new Vue({
	el: '#app',
	render: h => h(App)
});

Vue.use(VueClipboard);
Vue.use(VueSocialSharing, {
	networks: {
	  instagram: 'https://instagram.com/share?url=https://www.figma.com/community/plugin/1085813390515798975/Speller---Spell-checker-for-design&title=Speller - Best spell checker for Figma'
	}
});