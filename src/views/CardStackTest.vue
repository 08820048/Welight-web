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
          <div>
            <img src="https://images.waer.ltd/notes/202509282306627.jpg" alt="AI 创作">
            <div class="content">
              <p class="text-gray-700 leading-relaxed">
                <strong>强大的 AI 辅助创作功能</strong><br>
                集成多个主流 AI 模型，包括 DeepSeek、智谱、Qwen、Kimi 等，为您提供智能文章生成、内容扩展、摘要提取等功能。
              </p>
              <p class="text-gray-700 leading-relaxed">
                支持自定义 AI 提示词，让创作更符合您的风格和需求。AI 自动配图功能（Beta）让您的文章更加生动。
              </p>
              <p class="text-gray-700 leading-relaxed">
                无论是灵感枯竭还是时间紧迫，AI 助手都能帮您快速产出高质量内容。
              </p>
            </div>
          </div>
        </article>

        <article id="article-2">
          <header>
            <h2>精美主题排版</h2>
            <label for="card-3">&#10539;</label>
          </header>
          <div>
            <img src="https://images.waer.ltd/notes/202509282306627.jpg" alt="主题排版">
            <div class="content">
              <p class="text-gray-700 leading-relaxed">
                <strong>21+ 精美主题任您选择</strong><br>
                从简约现代到古典优雅，从科技感到文艺范，每一款主题都经过精心设计，让您的文章脱颖而出。
              </p>
              <p class="text-gray-700 leading-relaxed">
                支持主题自定义编辑，调整颜色、字体、间距等参数，打造专属于您的排版风格。自定义主题会自动保存，随时可以复用。
              </p>
              <p class="text-gray-700 leading-relaxed">
                新增主题预览功能，选择主题时可以实时查看效果，让排版更加直观高效。
              </p>
            </div>
          </div>
        </article>

        <article id="article-3">
          <header>
            <h2>高效编辑体验</h2>
            <label for="card-1">&#10539;</label>
          </header>
          <div>
            <img src="https://images.waer.ltd/notes/202509282306627.jpg" alt="编辑体验">
            <div class="content">
              <p class="text-gray-700 leading-relaxed">
                <strong>流畅的 Markdown 编辑体验</strong><br>
                支持完整的 Markdown 语法，实时预览，所见即所得。代码高亮、表格、公式等高级功能一应俱全。
              </p>
              <p class="text-gray-700 leading-relaxed">
                内容模板功能让您可以保存常用的文章结构，一键应用，大幅提升创作效率。云存储支持让您的作品随时随地可访问。
              </p>
              <p class="text-gray-700 leading-relaxed">
                图片处理、背景自定义、一键复制到公众号后台，每一个细节都为提升您的创作体验而设计。
              </p>
            </div>
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
  --_offset-steps: 6rem; /* 向上移动的距离 */
  --_scale-steps: 25; /* 后面卡片的缩放比例 */
  --_opacity-steps: 15; /* 后面卡片的透明度 */

  --_ani-duration: 300ms; /* 卡片元素的过渡时间 */
  --_ani-delay: 200ms; /* 卡片元素的延迟时间 */

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
  --_bg-clr: rgba(59, 130, 246, var(--_bg-alpha, 1)); /* 蓝色 */
  --_order: var(--_1-order);
  --_scale: var(--_1-scale);
  --_opacity: var(--_1-opacity);
  --_offset: var(--_1-offset);
  --_pointer-event: var(--_1-pointer-event);
  --_pointer-cursor: var(--_1-pointer-cursor);
}

article:nth-of-type(2) {
  --_bg-clr: rgba(168, 85, 247, var(--_bg-alpha, 1)); /* 紫色 */
  --_order: var(--_2-order);
  --_scale: var(--_2-scale);
  --_opacity: var(--_2-opacity);
  --_offset: var(--_2-offset);
  --_pointer-event: var(--_2-pointer-event);
  --_pointer-cursor: var(--_2-pointer-cursor);
}

article:nth-of-type(3) {
  --_bg-clr: rgba(236, 72, 153, var(--_bg-alpha, 1)); /* 粉色 */
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

article > header {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--_bg-clr);
  transition: background-color var(--_ani-duration) ease-in-out;
  border-radius: var(--_border-radius) var(--_border-radius) 0 0;
}

article > header > label {
  padding: 0;
  color: white;
  font-size: 1.5rem;
  transition: rotate 300ms ease-in-out;
  pointer-events: var(--_pointer-event, none);
  cursor: var(--_pointer-cursor, none);
  user-select: none;
}

article > header > label:hover {
  rotate: 90deg;
}

article > header > h2 {
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
  color: white;
  transition: translate var(--_ani-duration) ease-in-out, opacity var(--_ani-duration) ease-in-out;
  transition-delay: var(--_delay-h2, 0);
  opacity: var(--_opacity, 0);
}

article > div {
  position: relative;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  place-items: start;
  gap: 2rem;
}

@media (min-width: 600px) {
  article > div {
    grid-template-columns: 200px 1fr;
  }
}

article img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: var(--_ani-duration) ease-in-out;
  opacity: var(--_opacity, 0);
}

article .content {
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
}

article p {
  transition: var(--_ani-duration) ease-in-out;
  transition-delay: 500ms;
  opacity: var(--_opacity, 0);
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
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

