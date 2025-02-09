<template>
    <v-app>
      <!-- Navbar -->
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title @click="$router.push('/')">Home</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
  
      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.route" :to="item.route">
            <template v-slot:prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- Main Content -->
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const drawer = ref(true);
  const menuItems = ref([
    { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
    { title: "Absensi", icon: "mdi-calendar-check", route: "/absensi" },
  ]);
  </script>
  