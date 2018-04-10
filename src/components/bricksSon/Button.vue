<template>
  <button class="qd-button" @click="submit" type="button">{{title}}</button>
</template>

<script>
export default{
  props: ['title'],
  data () {
    return {
      
    }
  },
  methods: {
    submit(){
      this.$emit('click')
    }
  }
}
</script>

<style>
.qd-button{
  width: 100%;
  height: 2rem;
  color: #ffffff;
  font-size: .7rem;
  border-radius: 2rem;
}

</style>
