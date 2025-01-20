<script setup>

</script>


<template>
    <div class="box">
        <form name="search">
            <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();">
        </form>
        <img src="~/assets/images/actions/search.svg" alt="">

    </div>
</template>



<style scoped>
.box{
    position: relative;
}

.input {
    padding: 10px;
    width: 80px;
    height: 80px;
    background: none;
    border: 4px solid #ffd52d;
    border-radius: 50px;
    box-sizing: border-box;
    font-family: Comic Sans MS;
    font-size: 26px;
    color: #ffd52d;
    outline: none;
    transition: .5s;
}
.box:hover input{
    width: 90vw;
    background: #3b3640;
    border-radius: 10px;
}
.box i{
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translate(-50%,-50%);
    font-size: 26px;
    color: #ffd52d;
    transition: .2s;
}
.box:hover i{
    opacity: 0;
    z-index: -1;
}

/* YouTube icon */
#ytb {
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 52px;
  border: 2px solid transparent;
  color: #ff1717;
  font-size: 25px;
  transition: 0.3s;
}

#ytb:hover{
  border-radius: 50%;
  border-color: #ff1717;
  box-shadow: 0 0 10px #ff4040;
}
</style>