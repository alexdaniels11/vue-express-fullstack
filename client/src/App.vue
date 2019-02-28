<template lang="pug">
  #app.container
    .main-header
      router-link.logo(to="/")
          | Dahlia
      .main-header--actions
        b-dropdown(variant="outline-primary" size="sm" right no-caret)
          template(slot="button-content")
            svg(xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round")
              path(d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2")
              circle(cx="12" cy="7" r="4")

          b-dropdown-item(href="https://www.google.com") My Profile
          b-dropdown-item(href="#") Settings
          b-dropdown-divider
          b-dropdown-item(href="#") Logout
    .main-content
      .left-nav
        b-list-group
          b-list-group-item(to="/proposals") My Proposals
          b-list-group-item(to="#") Customers
          b-list-group-item(to="#") Images
          b-list-group-item(to="#") Tags
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
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 32px 16px 8px;
  width: 100%;

  .logo {
    font-size: 24px;
    //width: 250px;

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
