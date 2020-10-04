<template>
  <v-app>
    <div class="fill-height" id="app-view" style="background: #eaf5ea78;">
      <transition name="component-fade" mode="out-in">
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