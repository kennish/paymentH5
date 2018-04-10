<template>
  <img :src="require('@/'+path)" />
</template>

<script>
export default {
  props: ['path']
}
</script>

<style scoped>
img{
  width: 100%;
  display: block;
}
</style>
