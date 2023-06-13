<template>
  <div class="loading__wrapper">
    <div>
      <BounceLoader :loading="true" :color="color" :size="size"></BounceLoader>
      <h3>Scanning {{ title }}</h3>
      <p>It can take some time to check {{ description }}</p>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
export default {
  data() {
    return {
      color: "#7DB94B",
      size: "70px",
      title: "all texts on this page...",
      description: "all your text, you also can select specific modules to speed up checking.",
    };
  },
  props: ["isCheckedModules"],
  components: {
    BounceLoader,
  },
  watch: {
    isCheckedModules(value) {
      if (value === true) {
        this.title = "your design...";
        this.description = "texts, but it worth it.";
      } 
    },
  },
};
</script>

<style lang="scss">
@import "../figma-ui/figma-plugin-ds";

.loading__wrapper {
  position: relative;
  width: 100%;
  height: calc(100% - 40px);

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  text-align: center;
  padding: 0 30px;
  h3 {
    font-size: 15px;
    font-weight: 600;
  }
  p {
    margin: 0;
    color: #4e4b66;
    font-size: 11px;
     padding: 0 30px;
  }
  footer {
    position: absolute;
    bottom: 0;
    text-align: center;
    font-size: 12px;
    padding: 0 30px 15px 30px;
    color: #4e4b66;
  }
  .v-bounce {
    margin: auto;
  }
}
</style>
