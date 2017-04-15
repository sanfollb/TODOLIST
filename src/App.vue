<template>
  <div id="app">
    <h1 v-text="title" class="titled"></h1>
    <input v-model="newItem" v-on:keyup.enter="addNew" placeholder="Do what?">
    <ul>
      <li v-for="item in items" v-bind:class="[{finish:item.isFinish},'lis']"
      v-on:click="toggleFinish(item)">
        {{item.label}} &nbsp;<p class="item-status" v-if="item.isFinish">finished</p><span v-html="des"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import Store from './store'

export default {
data () {
    return {
      title: 'Todos list',
      items: Store.fetch(),
      newItem:"",
      des:'<span>delete</span>'
    }
  },
  watch:{
   items:{
    handler(items){
      Store.save(items)
    },
    deep:true
   }
  },
  methods:{
    toggleFinish: function(item){
      item.isFinish=!item.isFinish
    },
    addNew:function(){
      this.items.push({
      label:this.newItem ,
      isFinish:false
     })
      this.newItem = ""
    },
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  width: 100%;
 
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  width: 70%;
  height: 600px;
  position:relative;
  top:-80px;
  text-align: left;
  padding-left:30px;
}
.finish{
  text-decoration: line-through;
}
.lis{
  cursor: pointer;
}
#app .titled{
  position: absolute;
  top: -50px;
}
#app input{
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
}
ul{
  text-align: left;
  list-style: circle;
  line-height: 40px;
  margin-left: 30px;
}
li{
  font-size: 20px;
  font-weight: bold;
}
p,span{
  display: none;
}
li:hover span{
display: inline;
text-decoration: underline;
font-size: 12px;
color: grey;
cursor: pointer;
}
.item-status{
  display: inline;
  background: red;
  color: white;
  padding: 0 5px;
  font-size: 12px;
}
</style>
