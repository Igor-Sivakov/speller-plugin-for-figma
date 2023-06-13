<template>
  <div class="welcome-page__body" v-if="errMessage.length > 0">
    <div class="no-mistakes__body">
      <svg
        width="50"
        height="50"
        viewBox="0 0 148 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.83317 0H138.166C143.208 0 147.333 4.125 147.333 9.16667C147.333 14.2083 143.208 18.3333 138.166 18.3333H9.83317C4.7915 18.3333 0.666504 14.2083 0.666504 9.16667C0.666504 4.125 4.7915 0 9.83317 0Z"
          fill="#69BC35"
        />
        <path
          d="M9.83317 55H138.166C143.208 55 147.333 50.875 147.333 45.8334C147.333 40.7917 143.208 36.6667 138.166 36.6667H9.83317C4.7915 36.6667 0.666504 40.7917 0.666504 45.8334C0.666504 50.875 4.7915 55 9.83317 55Z"
          fill="#69BC35"
        />
        <path
          d="M9.83317 91.6667H55.6665C60.7082 91.6667 64.8332 87.5417 64.8332 82.5C64.8332 77.4583 60.7082 73.3333 55.6665 73.3333H9.83317C4.7915 73.3333 0.666504 77.4583 0.666504 82.5C0.666504 87.5417 4.7915 91.6667 9.83317 91.6667Z"
          fill="#69BC35"
        />
        <path
          d="M9.83317 128.333H55.6665C60.7082 128.333 64.8332 124.208 64.8332 119.167C64.8332 114.125 60.7082 110 55.6665 110H9.83317C4.7915 110 0.666504 114.125 0.666504 119.167C0.666504 124.208 4.7915 128.333 9.83317 128.333Z"
          fill="#69BC35"
        />
        <path
          d="M105.258 102.392L98.7498 95.8833C95.1748 92.3083 89.3998 92.3083 85.8248 95.8833C82.2498 99.4583 82.2498 105.233 85.8248 108.808L98.8415 121.825C102.416 125.4 108.191 125.4 111.766 121.825L140.825 92.7667C144.4 89.1917 144.4 83.4167 140.825 79.8417C137.25 76.2667 131.475 76.2667 127.9 79.8417L105.258 102.392Z"
          fill="#69BC35"
        />
      </svg>
      <h3>You are good!</h3>
      <p>{{ errMessage }}</p>
      <div class="start-btn" v-if="isUserLicense || freeTrials >= 1" @click="startScan">Scan</div>
      <a class="getLicense start-btn" href="https://figm8.gumroad.com/l/speller" target="_blank" 
        v-if="!isUserLicense && freeTrials < 1">Get license</a>
      <div class="footer">
       <div class="socials">
         <h3>Share your experience</h3>
         <div>
           <ShareNetwork
            network="twitter"
            url="https://www.figma.com/community/plugin/1085813390515798975/Speller---Spell-checker-for-design"
            title="Speller - Best spell checker for Figma"
            description="This plugin is what you really need if you want to make sure that your great design will not be spoiled by typos. Focus on your design, and we will help you with spell checking."
            twitter-user="LindaOjo_">
            <svg width="29" height="18" viewBox="0 0 54 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M53.1501 5C51.2251 5.875 49.1501 6.45 47.0001 6.725C49.2001 5.4 50.9001 3.3 51.7001 0.775C49.6251 2.025 47.3251 2.9 44.9001 3.4C42.9251 1.25 40.1501 0 37.0001 0C31.1251 0 26.3251 4.8 26.3251 10.725C26.3251 11.575 26.4251 12.4 26.6001 13.175C17.7001 12.725 9.7751 8.45 4.5001 1.975C3.5751 3.55 3.0501 5.4 3.0501 7.35C3.0501 11.075 4.9251 14.375 7.8251 16.25C6.0501 16.25 4.4001 15.75 2.9501 15C2.9501 15 2.9501 15 2.9501 15.075C2.9501 20.275 6.6501 24.625 11.5501 25.6C10.6501 25.85 9.7001 25.975 8.7251 25.975C8.0501 25.975 7.3751 25.9 6.7251 25.775C8.0751 30 12.0001 33.15 16.7251 33.225C13.0751 36.125 8.4501 37.825 3.4001 37.825C2.5501 37.825 1.7001 37.775 0.850098 37.675C5.6001 40.725 11.2501 42.5 17.3001 42.5C37.0001 42.5 47.8251 26.15 47.8251 11.975C47.8251 11.5 47.8251 11.05 47.8001 10.575C49.9001 9.075 51.7001 7.175 53.1501 5Z" fill="#4A9BEA"/>
            </svg>
          </ShareNetwork>

          <ShareNetwork
            network="facebook"
            url="https://www.figma.com/community/plugin/1085813390515798975/Speller---Spell-checker-for-design"
            title="Speller - Best spell checker for Figma"
            description="This plugin is what you really need if you want to make sure that your great design will not be spoiled by typos. Focus on your design, and we will help you with spell checking."
            hashtags="SpellChecker, FigmaPlugin">
            <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 0.0999756C11.25 0.0999756 0 11.325 0 25.15C0 37.65 9.15 48.025 21.1 49.9V32.4H14.75V25.15H21.1V19.625C21.1 13.35 24.825 9.89998 30.55 9.89998C33.275 9.89998 36.125 10.375 36.125 10.375V16.55H32.975C29.875 16.55 28.9 18.475 28.9 20.45V25.15H35.85L34.725 32.4H28.9V49.9C34.7911 48.9696 40.1555 45.9638 44.0248 41.4251C47.8941 36.8865 50.0134 31.1141 50 25.15C50 11.325 38.75 0.0999756 25 0.0999756Z" fill="#3981E5"/>
            </svg>
          </ShareNetwork>

          <ShareNetwork
            network="instagram"
            url="https://www.figma.com/community/plugin/1085813390515798975/Speller---Spell-checker-for-design"
            title="Speller - Best spell checker for Figma"
            description="This plugin is what you really need if you want to make sure that your great design will not be spoiled by typos. Focus on your design, and we will help you with spell checking."
            hashtags="SpellChecker, FigmaPlugin">
            <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 0H35.5C43.5 0 50 6.5 50 14.5V35.5C50 39.3456 48.4723 43.0338 45.7531 45.7531C43.0338 48.4723 39.3456 50 35.5 50H14.5C6.5 50 0 43.5 0 35.5V14.5C0 10.6544 1.52767 6.96623 4.24695 4.24695C6.96623 1.52767 10.6544 0 14.5 0ZM14 5C11.6131 5 9.32387 5.94821 7.63604 7.63604C5.94821 9.32387 5 11.6131 5 14V36C5 40.975 9.025 45 14 45H36C38.3869 45 40.6761 44.0518 42.364 42.364C44.0518 40.6761 45 38.3869 45 36V14C45 9.025 40.975 5 36 5H14ZM38.125 8.75C38.9538 8.75 39.7487 9.07924 40.3347 9.66529C40.9208 10.2513 41.25 11.0462 41.25 11.875C41.25 12.7038 40.9208 13.4987 40.3347 14.0847C39.7487 14.6708 38.9538 15 38.125 15C37.2962 15 36.5013 14.6708 35.9153 14.0847C35.3292 13.4987 35 12.7038 35 11.875C35 11.0462 35.3292 10.2513 35.9153 9.66529C36.5013 9.07924 37.2962 8.75 38.125 8.75ZM25 12.5C28.3152 12.5 31.4946 13.817 33.8388 16.1612C36.183 18.5054 37.5 21.6848 37.5 25C37.5 28.3152 36.183 31.4946 33.8388 33.8388C31.4946 36.183 28.3152 37.5 25 37.5C21.6848 37.5 18.5054 36.183 16.1612 33.8388C13.817 31.4946 12.5 28.3152 12.5 25C12.5 21.6848 13.817 18.5054 16.1612 16.1612C18.5054 13.817 21.6848 12.5 25 12.5ZM25 17.5C23.0109 17.5 21.1032 18.2902 19.6967 19.6967C18.2902 21.1032 17.5 23.0109 17.5 25C17.5 26.9891 18.2902 28.8968 19.6967 30.3033C21.1032 31.7098 23.0109 32.5 25 32.5C26.9891 32.5 28.8968 31.7098 30.3033 30.3033C31.7098 28.8968 32.5 26.9891 32.5 25C32.5 23.0109 31.7098 21.1032 30.3033 19.6967C28.8968 18.2902 26.9891 17.5 25 17.5Z" fill="url(#paint0_linear_563_302)"/>
              <defs>
                <linearGradient id="paint0_linear_563_302" x1="50" y1="0" x2="5.96046e-06" y2="50" gradientUnits="userSpaceOnUse">
                <stop stop-color="#A23FBE"/>
                <stop offset="1" stop-color="#F19F5B"/>
              </linearGradient>
              </defs>
            </svg>
          </ShareNetwork>
         </div>
          
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import { dispatch } from '../uiMessageHandler';

export default {
  props: ['errMessage', 'freeTrials', 'isUserLicense'],
  components: {},
  mounted() {
    // console.log('no mistakes mounted')
  },
  methods: {
    startScan() {
        dispatch('checkCurrentModules');
        this.$emit('startScan');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../figma-ui/figma-plugin-ds";

.no-mistakes__header {
  width: 100%;
  padding: 7px 10px 15px 10px;
  font-size: 12px;
  border-bottom: 1px #e5e5e5 solid;
}
.no-mistakes__body {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  height: 100%;
  svg {
    margin-bottom: 10px;
    margin-top: -50px;
  }
  p {
    margin-top: 0;
    font-size: 12px;
    text-align: center;
    color: #4e4b66;
  }
}
h3 {
    margin: 10px 0;
    font-weight: 600;
    font-size: 15px;
}
header.header__account {
  justify-content: space-between;
  max-width: 100%;
  margin: 0;
  padding-right: 8px;
}
.header__icon {
  cursor: pointer;
}
.footer {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  margin-top: 10px;
  margin-bottom: 20px;

  position: absolute;
  bottom: 0;
  h3 {
    text-align: center;
    color: #4e4b66;
    font-size: 12px;
  }
  svg {
    margin-right: 10px;
  }
}
.start-btn {
  color: #ffffff;
  background-color: #7DB94B;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: Outfit;
  font-size: 15px;
  font-weight: 500;
  width: fit-content;
  &:hover, &:active {
      cursor: pointer;
      background-color: #6ba040;
  }
  &.getLicense {
    text-decoration: none;
  }
}
.socials {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  svg {
    margin: 0;
  }
  a {
    padding: 0 5px;
    min-width: 40px;
    display: inline-block;
    text-align: center;
  }
}
</style>
