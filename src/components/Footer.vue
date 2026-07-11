<template>
  <footer class="site-footer">
    <video class="footer-video" autoplay muted loop playsinline aria-hidden="true">
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_183632_c311af08-e4b7-458f-81e7-79847a49b3d3.mp4" type="video/mp4" />
    </video>
    <div class="footer-video-overlay" aria-hidden="true"></div>

    <div class="footer-content">
      <div class="footer-intro">
        <div class="footer-brand">
          <img src="/logo.png" alt="Welight Logo" class="footer-logo" />
          <strong>Welight</strong>
        </div>
        <h2>让每一次创作，都更接近发布。</h2>
        <p>公众号创作者的智能排版与 AI 创作工作台。</p>
        <a
          class="footer-download"
          href="/download"
        >
          下载 Welight
          <span aria-hidden="true">↗</span>
        </a>
        <div class="footer-credit">
          <span class="footer-copyright">© 2025 Welight. All rights reserved.</span>
          <span class="footer-author">
            Made with <span aria-hidden="true">♥</span> by
            <a href="https://xuyi.dev" target="_blank" rel="noopener noreferrer" class="footer-signature-link">
              <Signature text="Cerebellum" :font-size="21" :duration="1.7" color="#000000" />
            </a>
          </span>
        </div>
      </div>

      <nav class="footer-group" aria-label="Welight 导航">
        <strong>探索 Welight</strong>
        <router-link to="/">首页</router-link>
        <router-link to="/pricing">定价</router-link>
        <router-link to="/download">下载</router-link>
        <router-link to="/documentation">使用文档</router-link>
      </nav>

      <nav class="footer-group" aria-label="更多产品">
        <strong>更多产品</strong>
        <a href="https://clibo.us" target="_blank" rel="noopener noreferrer">clibo.us</a>
        <a href="https://waer.ltd" target="_blank" rel="noopener noreferrer">waer.ltd</a>
        <a href="https://citu.work" target="_blank" rel="noopener noreferrer">citu.work</a>
        <a href="https://ornata.app" target="_blank" rel="noopener noreferrer">ornata.app</a>
      </nav>

      <nav class="footer-group" aria-label="法律与其他产品">
        <strong>其他</strong>
        <router-link to="/terms">服务条款</router-link>
        <router-link to="/privacy">隐私政策</router-link>
        <router-link to="/disclaimer">免责声明</router-link>
        <a href="https://clibo.us" target="_blank" rel="noopener noreferrer">Clibo</a>
      </nav>
    </div>

    <span class="footer-wordmark" aria-hidden="true">Welight</span>
  </footer>
</template>

<script setup>
import Signature from './Signature.vue'
</script>

<style scoped>
.site-footer {
  position: relative;
  min-height: clamp(560px, 66vw, 720px);
  overflow: hidden;
  padding: clamp(44px, 5vw, 72px) clamp(20px, 5vw, 72px) clamp(210px, 22vw, 290px);
  background: #ffffff;
  color: #000000;
}

.footer-video,
.footer-video-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.footer-video {
  z-index: 0;
  object-fit: cover;
  pointer-events: none;
}

.footer-video-overlay {
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5) 48%, rgba(255, 255, 255, 0.1)),
    linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.68));
}

.footer-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(280px, 1.2fr) repeat(3, minmax(120px, 0.48fr));
  gap: clamp(36px, 7vw, 104px);
  max-width: 1180px;
  margin-inline: auto;
  transform: translateY(-10px);
}

.footer-intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.footer-logo {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  object-fit: cover;
}

.footer-brand strong {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.footer-intro h2 {
  max-width: 460px;
  margin: 44px 0 0;
  font-size: clamp(30px, 4vw, 58px);
  font-weight: 850;
  letter-spacing: -0.065em;
  line-height: 0.98;
}

.footer-intro > p {
  margin: 18px 0 0;
  color: rgba(0, 0, 0, 0.58);
  font-size: 15px;
  line-height: 1.6;
}

.footer-download {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
  padding: 12px 18px;
  border-radius: 999px;
  background: #000000;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 180ms ease, background-color 180ms ease;
}

.footer-download:hover {
  background: #222222;
  transform: translateY(-2px);
}

.footer-credit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 34px;
  color: rgba(0, 0, 0, 0.42);
  font-size: 13px;
}

.footer-author {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.footer-signature-link {
  display: inline-flex;
  align-items: center;
  height: 38px;
  color: rgba(0, 0, 0, 0.68);
  font-weight: 650;
  text-decoration: none;
}

.footer-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-top: 8px;
}

.footer-group strong {
  margin-bottom: 8px;
  color: #000000;
  font-size: 16px;
  font-weight: 850;
}

.footer-group a {
  color: rgba(0, 0, 0, 0.58);
  font-size: 15px;
  font-weight: 520;
  line-height: 1.55;
  text-decoration: none;
  transition: color 180ms ease, transform 180ms ease;
}

.footer-group a:hover {
  color: #000000;
  transform: translateX(2px);
}

.footer-wordmark {
  position: absolute;
  z-index: 2;
  bottom: clamp(18px, 3vw, 42px);
  left: 50%;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(112px, 22vw, 320px);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 0.78;
  pointer-events: none;
  transform: translateX(-50%);
  white-space: nowrap;
}

@media (max-width: 900px) {
  .site-footer {
    min-height: 760px;
    padding-bottom: 240px;
  }

  .footer-content {
    grid-template-columns: minmax(0, 1fr) repeat(3, minmax(120px, 0.42fr));
    gap: 28px;
  }

  .footer-intro h2 {
    font-size: clamp(30px, 5vw, 48px);
  }
}

@media (max-width: 640px) {
  .site-footer {
    min-height: 840px;
    padding-top: 44px;
    padding-bottom: 190px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 34px;
    transform: none;
  }

  .footer-intro h2 {
    margin-top: 36px;
    font-size: clamp(34px, 11vw, 56px);
  }

  .footer-group {
    gap: 9px;
    padding-top: 0;
  }

  .footer-group strong {
    margin-bottom: 4px;
  }

  .footer-wordmark {
    bottom: 8px;
    font-size: clamp(96px, 32vw, 160px);
  }
}
</style>
