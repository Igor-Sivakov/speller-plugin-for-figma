<template>
  <header class="header__account">
    <div v-if="!isResults">You are good!</div>
    <div v-if="isResults">{{mistakesQtty}} mistakes were found</div>
    <div @click="$emit('toAccountSetts', true)" 
      class="header__icon" 
      @mouseenter="iconClasses = 'header__icon--hover'"
      @mouseleave="iconClasses = ''"
      :class="iconClasses">
      <svg
        width="18"
        height="18"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19 0.666748C8.87996 0.666748 0.666626 8.88008 0.666626 19.0001C0.666626 29.1201 8.87996 37.3334 19 37.3334C29.12 37.3334 37.3333 29.1201 37.3333 19.0001C37.3333 8.88008 29.12 0.666748 19 0.666748ZM19 6.16675C22.0433 6.16675 24.5 8.62341 24.5 11.6667C24.5 14.7101 22.0433 17.1667 19 17.1667C15.9566 17.1667 13.5 14.7101 13.5 11.6667C13.5 8.62341 15.9566 6.16675 19 6.16675ZM19 32.2001C14.4166 32.2001 10.365 29.8534 7.99996 26.2967C8.05496 22.6484 15.3333 20.6501 19 20.6501C22.6483 20.6501 29.945 22.6484 30 26.2967C27.635 29.8534 23.5833 32.2001 19 32.2001Z"
          fill="#A0A3BD"
        />
      </svg>
      <div class="header__account-err" v-if="freeTrials <= 2">
        <svg width="10" height="10" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.96 22.9999H23.04C25.0933 22.9999 26.3733 20.7732 25.3467 18.9999L15.3067 1.65324C14.28 -0.120091 11.72 -0.120091 10.6933 1.65324L0.653332 18.9999C-0.373334 20.7732 0.906666 22.9999 2.96 22.9999ZM13 13.6666C12.2667 13.6666 11.6667 13.0666 11.6667 12.3332V9.66658C11.6667 8.93324 12.2667 8.33324 13 8.33324C13.7333 8.33324 14.3333 8.93324 14.3333 9.66658V12.3332C14.3333 13.0666 13.7333 13.6666 13 13.6666ZM14.3333 17.9999C14.3333 18.5522 13.8856 18.9999 13.3333 18.9999H12.6667C12.1144 18.9999 11.6667 18.5522 11.6667 17.9999V17.3332C11.6667 16.781 12.1144 16.3332 12.6667 16.3332H13.3333C13.8856 16.3332 14.3333 16.781 14.3333 17.3332V17.9999Z" fill="#FF8C00"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script>
import { handleEvent } from '../uiMessageHandler';
import { dispatch } from '../uiMessageHandler';

export default {
    name: 'Header',
    mounted() {
      dispatch('checkMode');

      handleEvent('getBasicTrials', value => {
        this.freeTrials = value;
      })
    },
    data() {
      return {
        iconClasses: '',
        freeTrials: 25
      }
    },
    props: ['isResults', 'mistakesQtty']
};

</script>

<style>
  .header__account {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-flow: row nowrap;
      border-bottom: 1px #e5e5e5 solid;
      margin:  0 -8px;
      padding: 2px 11px 10px 11px;
      font-size: 12px;
  }
  .header__icon {
      position: relative;
      cursor: pointer;
      padding-left: 10px;
  }
  .header__icon:hover {
    cursor: pointer;
  }
  .header__icon--hover svg path {
    fill: #6e7191;
  }
  .header__account-err {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>