<template>
  <div class="welcome-page">
    <div class="welcome-page__body">
      <svg
        width="70"
        height="40"
        viewBox="0 0 180 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M37 28.5H9.49998C4.45831 28.5 0.333313 24.375 0.333313 19.3333C0.333313 14.2917 4.45831 10.1667 9.49998 10.1667H37C42.0416 10.1667 46.1666 14.2917 46.1666 19.3333C46.1666 24.375 42.0416 28.5 37 28.5ZM37 56H9.49998C4.45831 56 0.333313 60.125 0.333313 65.1667C0.333313 70.2083 4.45831 74.3334 9.49998 74.3334H37C42.0416 74.3334 46.1666 70.2083 46.1666 65.1667C46.1666 60.125 42.0416 56 37 56ZM164.233 113.658L135.633 85.0583C127.75 90.1917 118.308 93.125 108.133 92.575C86.4083 91.5667 67.8 74.6083 64.8666 53.0667C60.8333 22.3583 87.325 -3.58333 118.308 1.64167C136.183 4.66667 151.033 18.6 154.975 36.2917C158 49.675 155.067 62.1417 148.558 72.0417L177.25 100.733C180.825 104.308 180.825 110.083 177.25 113.658C173.675 117.233 167.808 117.233 164.233 113.658ZM137.833 46.8333C137.833 31.7083 125.458 19.3333 110.333 19.3333C95.2083 19.3333 82.8333 31.7083 82.8333 46.8333C82.8333 61.9583 95.2083 74.3334 110.333 74.3334C125.458 74.3334 137.833 61.9583 137.833 46.8333ZM9.49998 120.167H82.8333C87.875 120.167 92 116.042 92 111C92 105.958 87.875 101.833 82.8333 101.833H9.49998C4.45831 101.833 0.333313 105.958 0.333313 111C0.333313 116.042 4.45831 120.167 9.49998 120.167Z"
          fill="#A0A3BD"
        />
      </svg>
      <h3 v-if="freeTrialsMode || isUserLicense">We are ready to spell check</h3>
      <h3 v-if="!isUserLicense && !freeTrialsMode">You are out of scans</h3>

      <p v-if="isUserLicense || freeTrials > 0">Please, select specific modules, artboards, or use button below to scan all texts on this page</p>
      <p v-if="!isUserLicense && freeTrials == 0">Sorry, you have used your 1 per day scan. To get unlimitated access please buy license.</p>

      <div v-if="isUserLicense || freeTrials > 0" @click="startScan" class="start-btn">Start</div>
      <a class="getLicense start-btn" href="https://figm8.gumroad.com/l/speller" target="_blank" 
        v-if="freeTrials == 0 && !isUserLicense">Get license</a>
      
    </div>
  </div>
</template>

<script>
import { handleEvent } from '../uiMessageHandler';
import { dispatch } from '../uiMessageHandler';
export default {
    props: ['isUserLicense', 'checkLanguage', 'freeTrials', 'freeTrialsMode'],
    mounted() {
        dispatch('checkMode');

        handleEvent("isCheck", () => {
            dispatch('startCheckModulesScan', this.checkLanguage);
            this.$emit('checkCurrentModules', true);
        });
        handleEvent("noCheck", () => {
            dispatch('startScanning', this.checkLanguage);
            this.$emit('checkCurrentModules', false);
        });
    },
    methods: {
        startScan() {
            dispatch('checkCurrentModules');
            this.$emit('startScan');
        },
    }   
}

</script>

<style lang="scss" scoped>
@import "../figma-ui/figma-plugin-ds";

.welcome-page__body {
    font-family: Helvetica;
    h3 {
        color: #202223;
        text-align: center;
        font-weight: 600;
        margin-bottom: 7px;
        font-size: 15px;
        font-family: Outfit;
    }
    svg {
        margin: 15px 0 10px 0;
    }
    p {
        max-width: 90%;
        color: #4E4B66;
        font-size: 11px;
        font-family: Outfit;
        margin-bottom: 20px;
    }
    .start-btn {
        color: #ffffff;
        background-color: #7DB94B;
        border-radius: 5px;
        padding: 10px 39px;
        font-family: Outfit;
        font-size: 15px;
        font-weight: 500;
        &:hover, &:active {
            cursor: pointer;
            background-color: #6ea441;
        }
        &--disabled {
            background-color: #4e4b6648;
            color: #ffffff;
            border-radius: 5px;
            padding: 13px 43px;
            font-size: 17px;
            font-weight: bolder;
        }
    }
}
.getLicense{
    text-decoration: none;
}
</style>
