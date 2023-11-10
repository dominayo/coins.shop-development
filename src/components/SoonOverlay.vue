<template functional>
  <div class="soonOverlay" :class="props.classes">
    <span class="soonOverlay__text">Скоро</span>
  </div>
</template>

<style>
.soonOverlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,.8);
  z-index: 1;
  font-size: 15px;
  font-weight: normal;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.soonOverlay .soonOverlay__text {
  opacity: 0;
  transition: opacity .2s;
}
.soonOverlay:hover .soonOverlay__text {
  opacity: 1;
}
</style>