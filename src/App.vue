<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">HOME</router-link> |
      <router-link to="/about">ABOUT</router-link>
    </div>
    <router-view />
    {{ $store.state.home.mock }}
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("home/getMock");

    Console.info("THE INFO CONSOLE TOUCH", "MODULE NAME");
    Console.warn("THE WARN CONSOLE TOUCH");
    Console.error("THE ERROR CONSOLE TOUCH");
    Console.log("THE LOG CONSOLE TOUCH", "MODULE LOG");
  }
};
</script>

<style lang="css">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 60px;
  padding: 40px;
}
</style>

<style lang="css">
#app {
  color: var(--color__error);
}
</style>

<style lang="scss">
#app {
  border: 10px solid $color__border;
}
</style>

<style lang="less">
#app {
  background-color: @color__background;
}
</style>
