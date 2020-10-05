<template>
  <v-app>
    <div class="fill-height" id="app-view" style="background: #f6fcf678">
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </v-app>
</template>
<script>
  export default {
      title: 'Homepage Title'
  }
</script>