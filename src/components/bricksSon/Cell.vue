<template>
  <div class="cell" @click="toLink">
    <div class="cell-l">
      <i v-if="icon" class="iconfont cell-l-icon" v-html="icon"></i>{{title}}
      <div v-if="label" class="cell-info">{{label}}</div>
    </div>
    <div class="cell-r">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'icon', 'to', 'label'],
  methods: {
    toLink () {
      if(this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style>
.cell{
  display: flex;
  justify-content: space-between;
  padding: 0 .5rem;
  height: 2.2rem;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  color: #333333;
}
.cell-l{
  max-width: 14rem;
  font-size: .6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cell-l .cell-l-icon{
  margin-right: .3rem;
  font-size: .6rem;
  color: #999999;
}
.cell-r{
  font-size: .6rem;
}
.cell-r .cell-r-icon{
  font-size: .6rem;
  color: #999999;
}
.cell-info{
  margin-top: .5rem;
  font-size: .6rem;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
