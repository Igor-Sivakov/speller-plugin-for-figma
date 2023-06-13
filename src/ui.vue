<template>
  <div class="plugin-wrapper">
    <Header 
      v-if="!isAccountSetts"
      v-on:toAccountSetts="toAccountSetts"
      :mistakesQtty="mistakesQtty"
      :isResults="isResults"
    />

    <WelcomeScreen v-show="!startScan"
      :isUserLicense="isUserLicense" 
      v-on:startScan="startScanning"
      v-on:checkCurrentModules="toggleLoadingHeader" 
      :checkLanguage="checkLanguage"
      :freeTrials="freeTrials"
      :freeTrialsMode="freeTrialsMode"
    />

    <SpellCheckResults 
      v-if="searchResults.length > 0 && isResults" 
      :searchResults="searchResults"
      :mistakesQtty="mistakesQtty" 
    />

    <NoMistakes v-if="searchResults.length == 0 && isSearching" 
      :errMessage="errMessage"
      v-on:startScan="startScanning"
      :freeTrials="freeTrials"
      :isUserLicense="isUserLicense"
     />

    <Loading v-show="isLoading" 
      :isCheckedModules="isCheckedModules"
     />

     <AccountSettings v-if="isAccountSetts && !isSearching && !isLoading"
      v-on:toStart="toStart"
      v-on:setCheckLanguage="setCheckLanguage"
      v-on:offUserLicense="offUserLicense"
      :checkLanguage="checkLanguage"
      :freeTrialsUI="freeTrials"
      :licenseOffDate="licenseOffDate"
    />
  </div>
</template>

<script>
import { handleEvent, dispatch } from './uiMessageHandler';
import ScanScreen from "./components/scanScreen.vue";
import SpellCheckResults from "./components/spellCheckResults.vue";
import NoMistakes from './components/noMistakes.vue';
import WelcomeScreen from './components/welcomeScreen.vue';
import Loading from './components/loading.vue';
import AccountSettings from './components/account.vue';
import Header from './components/header.vue';

export default {
  data() {
    return {
      searchResults: [],
      mistakesQtty: 0,
      isSearching: false,
      errMessage: "Nice, no mistakes were found.",
      startScan: false,
      isLoading: false,
      isAccountSetts: false,
      isCheckedModules: null,
      freeTrials: null,
      isUserLicense: true,
      checkLanguage: 'English US' ,
      isResults: false,
      isBasic: false,
      license: null,
      licenseOffDate: null,
      freeTrialsMode: false,
      counter: 0
    };
  },
  components: {
    WelcomeScreen,
    ScanScreen,
    SpellCheckResults,
    NoMistakes,
    Loading,
    AccountSettings,
    Header
  },
  mounted() {
    dispatch('checkLicenseStatus');
    handleEvent('uiResultsHandler', data => {
      this.searchResults = data;
      this.mistakesQtty = data.length;
    });

    handleEvent("changeResults", (data) => {
      this.searchResults = this.searchResults.filter((item) => item.token != data);
      this.isSearching = true;
      this.mistakesQtty = this.searchResults.length;
    });

    handleEvent("errorEvent", (data) => {
      this.errMessage = data;
      this.isSearching = true;
      this.isLoading = false;
      this.searchResults = [];
    });

    handleEvent('setLicense', value => {
        if(value.license) dispatch('checkLicenseKey', value.license.purchase.license_key);
    });

    handleEvent('getFreeTrials', (data) => {
        this.freeTrials = data;
        if(data === 0) this.isUserLicense = false
    });

    handleEvent('licenseKeyStatus', value => {
        if(value.success) {
          this.license = value;
        }
    });
  },
  methods: {
    startScanning() {
      this.startScan = true;
      this.isLoading = true;
      if(this.isSearching) this.isSearching = false;
      if(this.isAccountSetts) this.isAccountSetts = false;

      if(!this.isUserLicense) {
        dispatch('isFreeTrials')
      }
    },
    toggleLoadingHeader(value) {
      this.isCheckedModules = value;
    },
    toAccountSetts(value) {
      if (value) {
        this.isLoading = false;
        this.isAccountSetts = value;  
        this.startScan = true;
        this.isSearching = false;
        this.isResults = false;
      }
    },
    toStart(value) {
      dispatch('isFreeTrials');
      if (value) {
        this.isAccountSetts = !value;
        this.startScan = !value;
      }
    },
    setCheckLanguage(value) {
      this.checkLanguage = value;
    },
    offUserLicense(value) {
      if (value == 0) {
        this.isUserLicense = false;
      } else if (value == 1) {
        this.isUserLicense = true;
      }
    },
   },
  watch: {
    searchResults: function(val) {
      if(val.length > 0) {
        this.isLoading = false;
        this.isResults = true;
      };
      if(this.isAccountSetts) this.isAccountSetts = false;
      dispatch('isFreeTrials');
    },
    freeTrials: function(val) {
      if(!this.isUserLicense && !val || val !== 0) {
        dispatch('checkLastUseDate');
      } else if(val >= 0 && !this.isUserLicense) {
        this.freeTrialsMode = true;
      }
    },
    isSearching: function(val) {
      if(val && this.isAccountSetts) this.isAccountSetts = false;
    },
  }
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');

  html, body {
    font-family: 'Outfit', sans-serif;
  }
</style>