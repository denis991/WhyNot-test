
<template>

  <div>
    <div >
      <Navigation></Navigation>
      <router-view v-slot="{ Component }">
        <suspense>
          <component :is="Component"/>
        </suspense>
      </router-view>
    </div>
  </div>

</template>
<script setup lang="ts">


</script>
<style lang="less">

</style>
