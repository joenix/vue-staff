<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2>{{ $t("slogan") }}</h2>
    <x-sample />
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    console.log(124, this.$store.state.about);
  }
};
</script>
