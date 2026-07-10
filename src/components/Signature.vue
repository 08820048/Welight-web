<template>
  <span class="signature-wrap" :class="className">
    <svg
      class="signature"
      width="190"
      height="42"
      viewBox="0 0 230 52"
      role="img"
      :aria-label="text"
    >
      <text
        x="3"
        y="39"
        class="signature-text"
        :style="{
          fontSize: `${fontSize}px`,
          fill: color,
          stroke: color,
          '--signature-duration': `${duration}s`,
          '--signature-delay': `${delay}s`
        }"
      >{{ text }}</text>
    </svg>
    <span class="signature-fallback">{{ text }}</span>
  </span>
</template>

<script setup>
defineProps({
  text: { type: String, default: 'Signature' },
  color: { type: String, default: 'currentColor' },
  fontSize: { type: Number, default: 32 },
  duration: { type: Number, default: 1.5 },
  delay: { type: Number, default: 0 },
  className: { type: String, default: '' }
})
</script>

<style scoped>
@font-face {
  font-family: 'WelightSignature';
  src: url('/LastoriaBoldRegular.otf') format('opentype');
  font-display: swap;
}

.signature-wrap {
  position: relative;
  display: inline-flex;
  width: 190px;
  height: 34px;
  align-items: center;
  overflow: visible;
  vertical-align: middle;
}

.signature {
  display: block;
  width: 190px;
  height: 42px;
  overflow: visible;
}

.signature-text {
  font-family: 'WelightSignature', cursive;
  font-weight: 700;
  letter-spacing: -0.02em;
  paint-order: stroke fill;
  stroke-width: 0.55px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 900;
  stroke-dashoffset: 900;
  fill-opacity: 0;
  animation:
    signature-draw var(--signature-duration) cubic-bezier(0.2, 0.65, 0.3, 1) forwards,
    signature-fill 260ms ease forwards;
  animation-delay: var(--signature-delay), calc(var(--signature-delay) + var(--signature-duration) * 0.72);
}

.signature-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  color: inherit;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.03em;
  opacity: 0;
  pointer-events: none;
}

@keyframes signature-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes signature-fill {
  to {
    fill-opacity: 0.96;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signature-text {
    animation: none;
    stroke-dashoffset: 0;
    fill-opacity: 0.96;
  }
}
</style>
