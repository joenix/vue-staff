<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

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
  color: var(--color__font);
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
