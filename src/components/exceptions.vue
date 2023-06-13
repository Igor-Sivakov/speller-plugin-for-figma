<template>
  <div class="plugin-wrapper">
    <header class="header__account header__account--active">
      <div class="header__account-back" @click="$emit('toAccount', true)">
        <svg width="10" height="10" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M11.9683 1.30187C11.2533 0.586875 10.0983 0.586875 9.38332 1.30187L0.968318 9.71688C0.253318 10.4319 0.253318 11.5869 0.968318 12.3019L9.38332 20.7169C10.0983 21.4319 11.2533 21.4319 11.9683 20.7169C12.6833 20.0019 12.6833 18.8469 11.9683 18.1319L4.85498 11.0002L11.9683 3.88688C12.6833 3.17188 12.665 1.99854 11.9683 1.30187Z"
            fill="#4E4B66"
          />
        </svg>
      </div>
      <div>Exceptions</div>
    </header>
    <div class="scan-wrapper">
      <div class="bing-results__row" v-for="ex in exceptions" v-bind:key="ex">
        <div class="exception-value bing-results__word">{{ ex }}</div>
        <div @click="rmStorageExceptions(ex)">
          <svg width="10" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M21.5002 0.516664C20.8502 -0.133336 19.8002 -0.133336 19.1502 0.516664L11.0002 8.65L2.8502 0.499997C2.2002 -0.150003 1.1502 -0.150003 0.500195 0.499997C-0.149805 1.15 -0.149805 2.2 0.500195 2.85L8.6502 11L0.500195 19.15C-0.149805 19.8 -0.149805 20.85 0.500195 21.5C1.1502 22.15 2.2002 22.15 2.8502 21.5L11.0002 13.35L19.1502 21.5C19.8002 22.15 20.8502 22.15 21.5002 21.5C22.1502 20.85 22.1502 19.8 21.5002 19.15L13.3502 11L21.5002 2.85C22.1335 2.21666 22.1335 1.15 21.5002 0.516664Z"
                fill="#6E7191"
              />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dispatch } from "../uiMessageHandler";
import { handleEvent } from "../uiMessageHandler";
export default {
  data() {
    return {
      exceptions: null,
    };
  },
  mounted() {
    dispatch("getUserExceptions");
    handleEvent("exceptions", (value) => {
        this.exceptions = value;
      });
  },
  methods: {
    rmStorageExceptions(exception) {
      dispatch("rmStorageExceptions", exception);
    },
  },
};
</script>

<style scoped>
  .exception-value {
    font-size: 12px;
  }
  .bing-results__row {
    padding: 0 10px; 
    justify-content: space-between;
  }
  .bing-results__row  > div {
    padding-top: 10px;
    padding-left: 5px !important;
  }
</style>