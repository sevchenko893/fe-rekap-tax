<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')">Home</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.route"
          link
        >
          <!-- Ikon sejajar dengan teks -->
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
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

// State untuk drawer
const drawer = ref(false);

// Fungsi toggle drawer (Buka/Tutup)
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// Data menu navigasi
const menuItems = ref([
  { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
  { title: "Absensi", icon: "mdi-calendar-check", route: "/attendance" },
  { title: "Tempat Proyek", icon: "mdi-office-building", route: "/projects" },
  { title: "Logout", icon: "mdi-logout", route: "/logout" },
]);
</script>
