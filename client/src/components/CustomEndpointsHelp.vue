<template>
  <div class="help-container">
    <!-- 親要素内に表示する短い文 -->
    エンドポイントはまだ有りません
</template>

<script setup>
import settingIcon from '/Image/linkicon.txt?raw'
import img1 from '/Image/1.txt?raw'
import img2 from '/Image/2.txt?raw'
import img3 from '/Image/3.txt?raw'
import img4 from '/Image/4.txt?raw'
import img5 from '/Image/5.txt?raw'
import img6 from '/Image/6.txt?raw'

import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const visible = ref(false);
const panelRef = ref(null);

function open() {
  visible.value = true;
  document.body.classList.add("modal-open");
  nextTick(() => {
    if (panelRef.value && panelRef.value.focus) panelRef.value.focus();
  });
}

function close() {
  visible.value = false;
  document.body.classList.remove("modal-open");
}

// Esc キーで閉じる
function onKey(e) {
  if (e.key === "Escape" && visible.value) close();
}

// フォーカストラップ
function trapFocus(e) {
  if (!visible.value) return;
  const focusable = panelRef.value.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }
}

onMounted(() => {
  document.addEventListener("keydown", onKey);
  document.addEventListener("keydown", trapFocus);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKey);
  document.removeEventListener("keydown", trapFocus);
  document.body.classList.remove("modal-open");
});
</script>

<style scoped>
.help-container {
  display: inline-block;
}

.help-trigger {
  background: transparent;
  border: none;
  color: var(--accent-color);
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 0.95rem;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
  box-sizing: border-box;
}

.panel {
  background: var(--bg-primary);
  width: min(900px, calc(100% - 40px));
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  outline: none;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(180deg,var(--bg-primary),var(--bg-secondary));
  position: sticky;
  top: 0;
  z-index: 1;
}

.panel-header h3 {
  margin: 0;
  font-size: 1rem;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}

.panel-body {
  padding: 12px 16px 18px 16px;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.panel-body ol {
  margin: 0 0 10px 18px;
  padding: 0;
}

.panel-body a {
  color: var(--accent-color);
  text-decoration: underline;
}

.example {
  margin-top: 8px;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.note {
  margin-top: 10px;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

body.modal-open {
  overflow: hidden;
}

@media (max-width: 600px) {
  .panel {
    width: calc(100% - 20px);
    border-radius: 6px;
  }
}
</style>
