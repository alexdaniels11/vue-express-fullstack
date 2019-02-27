<template lang="pug">
  #app
    .main-header
      router-link.logo(to="/")
          img(src="https://floralist.azurewebsites.net/images/icon.png")
      .main-header--actions
        button.main-header--options
          svg(xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round")
            path(d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2")
            circle(cx="12" cy="7" r="4")
    .main-content
      .left-nav
        router-link(to="proposals") My Proposals
        router-link(to="proposals") Customers
        router-link(to="proposals") Images
        router-link(to="proposals") Tags
      router-view.router-view
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#scope {
  height: 100%;
  margin: 0;
  position: absolute;
  width: 100%;

  #app {
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
  }
}

.main-header {
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
  width: 100%;

  .logo {
    width: 250px;

    img {
      width: 100%;
    }
  }

  .main-header--actions {
    margin: 0 0 0 auto;
  }
}

.main-content {
  display: flex;
  flex-direction: row;
  height: 100%;

  .left-nav {
    display: flex;
    flex-direction: column;
    padding: 16px;
    width: 250px;
  }

  .router-view {
    display: flex;
    flex-direction: column;
    padding: 16px;
    width: calc(100% - 250px);
  }
}
</style>
