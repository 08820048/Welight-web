<template>
  <div class="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gray-50">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-12">卡片堆叠效果测试</h1>

      <section class="card-stack-section">
        <input class="sr-only" id="card-1" type="radio" name="panel" checked />
        <input class="sr-only" id="card-2" type="radio" name="panel" />
        <input class="sr-only" id="card-3" type="radio" name="panel" />

        <article id="article-1">
          <header>
            <h2>AI 智能创作</h2>
            <label for="card-2">&#10539;</label>
          </header>
          <div class="card-content">
            <img src="https://images.waer.ltd/notes/202510131433244.png" alt="AI 创作">
          </div>
        </article>

        <article id="article-2">
          <header>
            <h2>精美主题排版</h2>
            <label for="card-3">&#10539;</label>
          </header>
          <div class="card-content">
            <img src="https://images.waer.ltd/notes/202510131434961.png" alt="主题排版">
          </div>
        </article>

        <article id="article-3">
          <header>
            <h2>高效编辑体验</h2>
            <label for="card-1">&#10539;</label>
          </header>
          <div class="card-content">
            <img src="https://images.waer.ltd/notes/202510131435237.png" alt="编辑体验">
          </div>
        </article>
      </section>

      <div class="text-center mt-12">
        <router-link to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '卡片堆叠效果测试 - Welight'
})
</script>

<style scoped>
/* 卡片堆叠效果样式 */
.card-stack-section {
  /* 默认值 */
  --_offset-steps: 6rem;
  /* 向上移动的距离 */
  --_scale-steps: 25;
  /* 后面卡片的缩放比例 */
  --_opacity-steps: 15;
  /* 后面卡片的透明度 */

  --_ani-duration: 300ms;
  /* 卡片元素的过渡时间 */
  --_ani-delay: 200ms;
  /* 卡片元素的延迟时间 */

  /* 计算值 */
  --_offset-steps-two: calc(var(--_offset-steps) * -1);
  --_offset-steps-three: calc(var(--_offset-steps) * -2);

  --scale-steps-two: calc(1 - var(--_scale-steps) * 0.01);
  --scale-steps-three: calc(1 - var(--_scale-steps) * 0.02);

  --opacity-steps-two: calc(1 - var(--_opacity-steps) * 0.02);
  --opacity-steps-three: calc(1 - var(--_opacity-steps) * 0.04);

  display: grid;
  grid-template-areas: "stack";
  color: black;
  width: min(calc(100% - 2rem), 50rem);
  margin: 0 auto;
}

@media (min-width: 600px) {
  .card-stack-section {
    --_offset-steps: 4em;
  }
}

article {
  --_bg-alpha: 0.5;
  --_border-radius: 12px;
  --_bg-dot-offset: 20px;
  --_bg-dot-color: var(--_bg-clr);

  position: relative;
  isolation: isolate;
  background-color: white;
  grid-area: stack;
  transition: 500ms ease-in-out;
  border-radius: var(--_border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  translate: 0 var(--_offset);
  order: var(--_order);
  z-index: var(--_order);
  scale: var(--_scale);
  opacity: var(--_opacity);
}

article::before,
article::after {
  content: "";
  position: absolute;
  border-radius: inherit;
  z-index: -1;
}

article::before {
  z-index: -1;
  inset: calc(var(--_bg-dot-offset) * -1);
  background-image: radial-gradient(var(--_bg-dot-color) 1px, transparent 0px);
  background-repeat: repeat;
  background-size: 5px 5px;
  background-position: center;
  border-radius: calc(var(--_border-radius) + var(--_bg-dot-offset));
}

article::after {
  background-color: white;
  inset: 0;
}

/* 定义每张卡片的样式 */
article:nth-of-type(1) {
  --_bg-clr: rgba(59, 130, 246, var(--_bg-alpha, 1));
  /* 蓝色 */
  --_order: var(--_1-order);
  --_scale: var(--_1-scale);
  --_opacity: var(--_1-opacity);
  --_offset: var(--_1-offset);
  --_pointer-event: var(--_1-pointer-event);
  --_pointer-cursor: var(--_1-pointer-cursor);
}

article:nth-of-type(2) {
  --_bg-clr: rgba(168, 85, 247, var(--_bg-alpha, 1));
  /* 紫色 */
  --_order: var(--_2-order);
  --_scale: var(--_2-scale);
  --_opacity: var(--_2-opacity);
  --_offset: var(--_2-offset);
  --_pointer-event: var(--_2-pointer-event);
  --_pointer-cursor: var(--_2-pointer-cursor);
}

article:nth-of-type(3) {
  --_bg-clr: rgba(236, 72, 153, var(--_bg-alpha, 1));
  /* 粉色 */
  --_order: var(--_3-order);
  --_scale: var(--_3-scale);
  --_opacity: var(--_3-opacity);
  --_offset: var(--_3-offset);
  --_pointer-event: var(--_3-pointer-event);
  --_pointer-cursor: var(--_3-pointer-cursor);
}

/* 焦点状态 */
.card-stack-section:has(input:nth-child(1):focus-visible) article:nth-of-type(1) label,
.card-stack-section:has(input:nth-child(2):focus-visible) article:nth-of-type(2) label,
.card-stack-section:has(input:nth-child(3):focus-visible) article:nth-of-type(3) label {
  rotate: 90deg;
}

/* 卡片 1 选中 */
.card-stack-section:has(input:nth-child(1):checked) {
  --_1-order: 3;
  --_1-scale: 1;
  --_1-opacity: 1;
  --_1-offset: 0;
  --_1-pointer-event: auto;
  --_1-pointer-cursor: pointer;

  --_2-order: 2;
  --_2-scale: var(--scale-steps-two);
  --_2-opacity: var(--opacity-steps-two);
  --_2-offset: var(--_offset-steps-two);

  --_3-order: 1;
  --_3-scale: var(--scale-steps-three);
  --_3-opacity: var(--opacity-steps-three);
  --_3-offset: var(--_offset-steps-three);
}

/* 卡片 2 选中 */
.card-stack-section:has(input:nth-child(2):checked) {
  --_2-order: 3;
  --_2-scale: 1;
  --_2-opacity: 1;
  --_2-offset: 0;
  --_2-pointer-event: auto;
  --_2-pointer-cursor: pointer;

  --_3-order: 2;
  --_3-scale: var(--scale-steps-two);
  --_3-opacity: var(--opacity-steps-two);
  --_3-offset: var(--_offset-steps-two);

  --_1-order: 1;
  --_1-scale: var(--scale-steps-three);
  --_1-opacity: var(--opacity-steps-three);
  --_1-offset: var(--_offset-steps-three);
}

/* 卡片 3 选中 */
.card-stack-section:has(input:nth-child(3):checked) {
  --_3-order: 3;
  --_3-scale: 1;
  --_3-opacity: 1;
  --_3-offset: 0;
  --_3-pointer-event: auto;
  --_3-pointer-cursor: pointer;

  --_1-order: 2;
  --_1-scale: var(--scale-steps-two);
  --_1-opacity: var(--opacity-steps-two);
  --_1-offset: var(--_offset-steps-two);

  --_2-order: 1;
  --_2-scale: var(--scale-steps-three);
  --_2-opacity: var(--opacity-steps-three);
  --_2-offset: var(--_offset-steps-three);
}

article>header {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--_bg-clr);
  transition: background-color var(--_ani-duration) ease-in-out;
  border-radius: var(--_border-radius) var(--_border-radius) 0 0;
}

article>header>label {
  padding: 0;
  color: white;
  font-size: 1.5rem;
  transition: rotate 300ms ease-in-out;
  pointer-events: var(--_pointer-event, none);
  cursor: var(--_pointer-cursor, none);
  user-select: none;
}

article>header>label:hover {
  rotate: 90deg;
}

article>header>h2 {
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
  color: white;
  transition: translate var(--_ani-duration) ease-in-out;
}

article>div.card-content {
  position: relative;
  padding: 0;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 0 0 var(--_border-radius) var(--_border-radius);
}

@media (min-width: 768px) {
  article>div.card-content {
    height: 500px;
  }
}

@media (min-width: 1024px) {
  article>div.card-content {
    height: 600px;
  }
}

article img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--_ani-duration) ease-in-out;
  display: block;
}

/* 工具类 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
