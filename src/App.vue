<template>
  <div id="app">
    <div id="mk" class="bbch" @click="test">
       alert_you

       <div class="sk">sk</div>
    </div>
    <div class="nnbb" >nnbb</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  mounted(){
    console.log('is mounted')
  },
  methods:{
      test(){
          alert('jk')
      }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.bbch{
    color: red;
    background: url('./assets/images/icon.png');
    background-repeat: no-repeat;
    .sk{
      color: yellow;
    }
  }
.nnbb{
  color:red
}
</style>
