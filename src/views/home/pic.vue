<template>
  <div class="head-pic">
    <img src="@/img/main/main-pic.png" class="head-pic_day" alt="img" />
    <img src="@/img/main/main-pic-night.png" class="head-pic_night" alt="img" />
    <a href="#" class="head-btn" @click.stop="$emit('input', true)">
      <span class="icon-triangle"></span>
    </a>
  </div>
</template>
