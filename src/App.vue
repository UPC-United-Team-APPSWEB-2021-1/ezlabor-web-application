<template>
  <v-app id="inspire" class="blue-grey lighten-3">
    <v-navigation-drawer
        v-model="drawer"
        app
        color="deep-purple accent-2"

    >
      <v-card flat color="deep-purple accent-2">
        <v-card-title class="text-h6">
          <h2>EZLabor</h2>
        </v-card-title>
        <v-card-text>
          <v-list-item dense>
            <v-list-item-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <router-link to="/user">
                <h3 class="align-end" style="color: #2c2c2c">Hello User1!</h3>
              </router-link>
            </v-list-item-content>

          </v-list-item>
        </v-card-text>
      </v-card>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to = "item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app color="deep-purple accent-2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>

  </v-app>

</template>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
      { title: 'Search', icon: 'mdi-account-search', to: '/search' },
      { title: 'Create', icon: 'mdi-briefcase-plus', to: '/create' },
      { title: 'My Postulations', icon: 'mdi-briefcase-plus', to: '/postulations' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
    ],
    right: null,

    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>

<style scoped>
  .h3 label{
    font-size: 20px;
  }
</style>
