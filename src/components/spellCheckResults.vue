<template>
  <div class="scan-wrapper">
    <div class="bing-results">
      <resultItem
        v-for="item in this.searchResults"
        v-bind:key="item.token + Math.random()"
        v-bind:item="item">
      </resultItem>
    </div>
  </div>
</template>

<script>
import resultItem from './resultItem.vue';
export default {
  components: {resultItem},
  props: ["searchResults", "mistakesQtty", "componentKey"],
  mounted() {
    // console.log('mounted search results', this.searchResults)
  }
};
</script>

<style lang="scss">
@import "../figma-ui/figma-plugin-ds";

.bing-results {
  width: 100%;
  border-collapse: collapse;
  &__row {
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    border-bottom: 1px #e5e5e5 solid;
    &:hover {
      background-color: #f7f7fc;
      cursor: pointer;
    }
    & > div {
      padding: 7px 5px 7px 15px;
    }
    & > :first-child {
      color: #AD5A5A;
      min-width: 30%;
      max-width: 30%;
      width: 30%;
    }
    font-weight: 500;
  }
  &__word {
    width: 50%;
    padding-left: 0 !important;
  }
  &__word > span {
    color: #628f47;
    font-weight: 500;
    height: 100%;
    padding: 3px 5px;
    word-break: none;
    white-space: nowrap;
  }
  &__word > span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  &__word-actions {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    display: none;
    & > div {
      margin: 0 5px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
    &--active {
      display: flex;
    }
  }
}
.scan-wrapper {
  margin: 0 -8px;
  &__mistakes {
    padding: 7px 15px 7px 10px;
    border-bottom: 1px #e5e5e5 solid;
    & > p {
      margin: 0;
      font-weight: 500;
      font-size: 12px;
    }
  }
}
.type {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
