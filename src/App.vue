<template>
    <div class="fill-height" id="app-view">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
</template>