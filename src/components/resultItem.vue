<template>
  <div class="bing-results__row" @mouseover="hoverOn" @mouseleave="hoverOff">
    <div class="bing-results__token type type--bold">{{ item.token }}</div>
    <div class="bing-results__word">
      <span
        class="type type--bold"
        @click="clickWord(item)"
        v-for="word in item.suggestions"
        :id="word.suggestion"
        v-bind:key="word + Math.random()"
      >
        {{ word.suggestion }}
      </span>
    </div>
    <div :class="wordClasses">
      <div class="word-location" @click="onFocus(item)">
        <div :class="tooltipLocateClass">Focus</div>
        <svg
          @mouseenter="showLcTooltip"
          @mouseleave="tooltipsOff('lc')"
          width="13"
          height="13"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 0C14.1716 0 13.5 0.671573 13.5 1.5V3.105C8.07 3.795 3.795 8.07 3.105 13.5H1.5C0.671572 13.5 0 14.1716 0 15C0 15.8284 0.671573 16.5 1.5 16.5H3.105C3.795 21.93 8.07 26.205 13.5 26.895V28.5C13.5 29.3284 14.1716 30 15 30C15.8284 30 16.5 29.3284 16.5 28.5V26.895C21.93 26.205 26.205 21.93 26.895 16.5H28.5C29.3284 16.5 30 15.8284 30 15C30 14.1716 29.3284 13.5 28.5 13.5H26.895C26.205 8.07 21.93 3.795 16.5 3.105V1.5C16.5 0.671572 15.8284 0 15 0ZM13.5 6.12V7.5C13.5 8.32843 14.1716 9 15 9C15.8284 9 16.5 8.32843 16.5 7.5V6.135C20.25 6.75 23.25 9.75 23.88 13.5H22.5C21.6716 13.5 21 14.1716 21 15C21 15.8284 21.6716 16.5 22.5 16.5H23.865C23.25 20.25 20.25 23.25 16.5 23.88V22.5C16.5 21.6716 15.8284 21 15 21C14.1716 21 13.5 21.6716 13.5 22.5V23.865C9.75 23.25 6.75 20.25 6.12 16.5H7.5C8.32843 16.5 9 15.8284 9 15C9 14.1716 8.32843 13.5 7.5 13.5H6.135C6.75 9.75 9.75 6.75 13.5 6.12ZM15 13.5C14.6022 13.5 14.2206 13.658 13.9393 13.9393C13.658 14.2206 13.5 14.6022 13.5 15C13.5 15.3978 13.658 15.7794 13.9393 16.0607C14.2206 16.342 14.6022 16.5 15 16.5C15.3978 16.5 15.7794 16.342 16.0607 16.0607C16.342 15.7794 16.5 15.3978 16.5 15C16.5 14.6022 16.342 14.2206 16.0607 13.9393C15.7794 13.658 15.3978 13.5 15 13.5Z"
            fill="#6E7191"
          />
        </svg>
      </div>
      <div class="word-rm" @click="editStorageExceptions(item.token)">
        <div :class="tooltipRmClass">Ignore</div>
        <svg
          @mouseenter="showRmTooltip"
          @mouseleave="tooltipsOff('rm')"
          width="10"
          height="10"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.5002 0.516664C20.8502 -0.133336 19.8002 -0.133336 19.1502 0.516664L11.0002 8.65L2.8502 0.499997C2.2002 -0.150003 1.1502 -0.150003 0.500195 0.499997C-0.149805 1.15 -0.149805 2.2 0.500195 2.85L8.6502 11L0.500195 19.15C-0.149805 19.8 -0.149805 20.85 0.500195 21.5C1.1502 22.15 2.2002 22.15 2.8502 21.5L11.0002 13.35L19.1502 21.5C19.8002 22.15 20.8502 22.15 21.5002 21.5C22.1502 20.85 22.1502 19.8 21.5002 19.15L13.3502 11L21.5002 2.85C22.1335 2.21666 22.1335 1.15 21.5002 0.516664Z"
            fill="#6E7191"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { dispatch } from '../uiMessageHandler'
export default {
  data() {
    return {
      wordClasses: 'bing-results__word-actions',
      tooltipLocateClass: 'word-location__tooltip',
      tooltipRmClass: 'word-rm__tooltip',
    }
  },
  props: ['item'],
  methods: {
    hoverOn() {
      this.wordClasses =
        'bing-results__word-actions bing-results__word-actions--active'
    },
    hoverOff() {
      this.wordClasses = 'bing-results__word-actions'
    },
    onFocus(item) {
      dispatch('onFocus', item)
    },
    clickWord(item) {
      dispatch('clickWord', item)
    },
    editStorageExceptions(exception) {
      dispatch('editStorageExceptions', exception)
    },
    showRmTooltip() {
      this.tooltipLocateClass = 'word-location__tooltip'
      this.tooltipRmClass = 'word-rm__tooltip active'
    },
    showLcTooltip() {
      this.tooltipRmClass = 'word-rm__tooltip'
      this.tooltipLocateClass = 'word-location__tooltip active'
    },
    tooltipsOff(item) {
      if (item == 'rm') this.tooltipRmClass = 'word-rm__tooltip'
      else if (item == 'lc') this.tooltipLocateClass = 'word-location__tooltip'
    },
  },
}
</script>

<style scoped lang="scss">
@import '../figma-ui/figma-plugin-ds';

.word-rm,
.word-location {
  position: relative;
  &__tooltip {
    display: none;
    position: absolute;
    top: -15px;
    font-family: Outfit;
    color: #fff;
    font-size: 10px;
    background-color: #000;
    padding: 0 2px;
    border-radius: 2px;
  }
  &__tooltip.active {
    display: block;
  }
}
.word-rm__tooltip.active {
  left: -13px;
}
</style>
