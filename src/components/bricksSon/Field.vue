<template>
  <div class="field-part">
    <div class="field-item">
      <div class="field-title" v-show="label">
        <span>{{label}}</span>
      </div>
      <div class="field-value">
        <i class="iconfont field-icon" v-if="icon" v-html="icon"></i>
        <input :type="istype" :placeholder="placeholder" @input="updateValue($event.target.value)" />
        <div class="field-state">
          <i class="iconfont success" v-show="state == 'success'">&#xe657;</i>
          <i class="iconfont error" v-show="state == 'error'">&#xe659;</i>
          <i class="iconfont warning" v-show="state == 'warning'">&#xe663;</i>
        </div>
        <div class="field-other">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: ['label', 'placeholder', 'type', 'icon', 'state'],
  data () {
    return {
      istype: 'text'
    }
  },
  created () {
    if(this.type) {
      this.istype = this.type;
    }
  },
  methods: {
    updateValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style>
.field-part{
  padding: 0 .5rem;
}
.field-part .field-item{
  display: flex;
  min-height: 2.4rem;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}
.field-part .field-item .field-title{}
.field-part .field-item .field-title span{
  display: flex;
  width: 4rem;
  font-size: .7rem;
  color: #333333;
}
.field-part .field-item .field-value{
  display: flex;
  flex: 1;
}
.field-part .field-item .field-value .field-icon{
  margin-right: .5rem;
  font-size: .8rem;
  color: #666666;
  display: flex;
  align-items: center;
}
.field-part .field-item .field-value input{
  display: flex;
  flex: 1;
  width: 100%;
  font-size: .7rem;
}
.field-part .field-item .field-value .field-state{
  display: flex;
  font-size: .7rem;
  margin-left: .5rem;
  align-items: center;
}
.field-part .field-item .field-value .field-state .success{
  color: #4caf50;
}
.field-part .field-item .field-value .field-state .error{
  color: #f44336;
}
.field-part .field-item .field-value .field-state .warning{
  color: #ffc107;
}
.field-part .field-item .field-value  .field-other{

}
</style>
