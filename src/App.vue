<template>
  <div id="app">
    <h1 v-text="title" class="titled"></h1>
    <button v-on:mousedown="signUp()" v-on:mouseup="signIn(items)">查看todos list</button>
    <button v-on:click="deletAll()">删除全部</button>
    <input v-model="newItem" class="inputbox" v-on:keyup.enter="addNew" placeholder="Do what?">
    <ul>
      <li v-for="item in items">
      <input type="checkbox" v-on:click="toggleFinish(item)" class="lis" name="mst">
      <h3 v-bind:class="{finish:item.isFinish}">{{item.label}}</h3>
      <p class="item-status" v-if="item.isFinish" v-bind:class="{finish:item.isFinish}">finished</p>
      <span v-html="des" v-on:click="delet(item)" class="del"></span>
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
      items: [],
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
    signUp:function(){
      this.items=Store.fetch()
    },

    signIn:function(items){    
    var sss=items.length
    var syt=document.getElementsByName("mst")
    for(var i=0;i<sss;i++){
      if(items[i].isFinish){
        syt[i].checked=true
    }
  }
    },
    deletAll:function(){
      this.items=[]
    },
    delet:function(item){
      var index=this.items.indexOf(item)
      this.items.splice(index,1)
      Store.deletsa(index)
    }
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
/* app组件 */
#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  width: 70%;
  height: 70%;
  position: relative;
  top: 0px;
  text-align: left;
}
/*list完成后添加删除线样式 */
.finish{
  text-decoration: line-through;
}
#app .titled{
  position: absolute;
  top: -50px;
}
.inputbox{
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
}

.lis{
  cursor: pointer;
  
}
ul{
  text-align: left;
  list-style: none;
  line-height: 40px;
}
li{
  font-size: 20px;
  font-weight: bold;
  display: block;
}
p,.del{
  display: none;
}
h3{
  display: inline;
}
li:hover .del{
display: inline;
text-decoration: underline;
font-size: 12px;
color: grey;
cursor: pointer;
}
button{
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
