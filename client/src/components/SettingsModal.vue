<template>
  <div v-if="modelValue" class="settings-modal" role="dialog" aria-modal="true">
    <h3>API エンドポイント設定</h3>

    <!-- API モード選択 -->
    <div class="mode-group">
      <label><input type="radio" :checked="mode === 'existing'" @change="$emit('update:mode', 'existing')" /> 既存 API のみを使用</label>
      <label><input type="radio" :checked="mode === 'custom'" @change="$emit('update:mode', 'custom')" /> カスタムのみを使用</label>
      <label><input type="radio" :checked="mode === 'both'" @change="$emit('update:mode', 'both')" /> 両方をランダムに使用</label>
    </div>

    <!-- デフォルト再生方式 -->
    <div class="playback-default">
      <h4>デフォルト再生方式</h4>
      <label><input type="radio" :checked="defaultPlaybackMode === '1'" @change="$emit('update:defaultPlaybackMode', '1')" /> 通常</label>
      <label><input type="radio" :checked="defaultPlaybackMode === '2'" @change="$emit('update:defaultPlaybackMode', '2')" /> タイプ２</label>
    </div>

    <!-- 短動画フィルタ設定 -->
    <div class="short-video-filter">
      <h4 style="margin-block-end: 10px;">自動再生フィルタ</h4>
      <label>
        <input
          type="checkbox"
          :checked="shortVideoFilterEnabled"
          @change="$emit('update:shortVideoFilterEnabled', $event.target.checked)"
        />
        指定時間以下の動画のみ自動再生
      </label>
      <div v-if="shortVideoFilterEnabled" class="filter-time">
        <label>
          制限時間（分）:
          <input
            type="number"
            :value="shortVideoFilterMinutes"
            @change="$emit('update:shortVideoFilterMinutes', +$event.target.value)"
            min="1"
            max="120"
            step="1"
          />
        </label><br>
        <small>{{ shortVideoFilterMinutes }}分以下の動画のみが自動再生対象になります</small>
      </div>
    </div>

    <!-- 表示設定（デバイスに合わせる / ライト / ダーク） -->
    <div class="dark-mode-setting">
      <h4>表示設定</h4>
      <label><input type="radio" :checked="displayMode === 'device'" @change="$emit('update:displayMode', 'device')" /> デバイスに合わせる</label>
      <label><input type="radio" :checked="displayMode === 'light'" @change="$emit('update:displayMode', 'light')" /> ライトモード</label>
      <label><input type="radio" :checked="displayMode === 'dark'" @change="$emit('update:displayMode', 'dark')" /> ダークモード</label>
    </div>

    <!-- カスタムエンドポイント -->
    <div class="custom-list">
      <h4>カスタムエンドポイント</h4>
      <ul>
        <li v-for="(url, i) in customEndpoints" :key="i">
          <span class="endpoint-text">{{ url }}</span>
          <button type="button" class="remove-btn" @click="$emit('remove-endpoint', i)" aria-label="削除">削除</button>
        </li>
        <li v-if="customEndpoints.length === 0">
          <CustomEndpointsHelp />
        </li>
      </ul>

      <div class="add-row">
        <input
          type="text"
          :value="newEndpoint"
          @input="$emit('update:newEndpoint', $event.target.value)"
          placeholder="https://siawaseok.duckdns.org/exec"
        />
        <button type="button" @click="$emit('add-endpoint')">追加</button>
      </div>
    </div>

    <div class="settings-actions">
      <button type="button" @click="$emit('close')">閉じる</button>
    </div>
  </div>
</template>

<script setup>
import CustomEndpointsHelp from "./CustomEndpointsHelp.vue";

defineProps({
  modelValue: Boolean,
  mode: String,
  defaultPlaybackMode: String,
  shortVideoFilterEnabled: Boolean,
  shortVideoFilterMinutes: Number,
  displayMode: String,
  customEndpoints: Array,
  newEndpoint: String,
});

defineEmits([
  'update:mode',
  'update:defaultPlaybackMode',
  'update:shortVideoFilterEnabled',
  'update:shortVideoFilterMinutes',
  'update:newEndpoint',
  'update:displayMode',
  'add-endpoint',
  'remove-endpoint',
  'close',
]);
</script>

<style scoped>
.settings-modal {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  width: 320px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  padding: 12px;
  z-index: 2000;
  border-radius: 8px;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.settings-modal h3 {
  margin: 0 0 8px 0;
  font-size: 1rem;
}

.mode-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.mode-group input,
.playback-default input,
.short-video-filter input,
.dark-mode-setting input {
  accent-color: var(--accent-color);
}

.playback-default h4,
.dark-mode-setting h4,
.custom-list h4 {
  margin: 8px 0 6px 0;
  font-size: 0.95rem;
}

.playback-default label,
.dark-mode-setting label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.custom-list ul {
  max-height: 120px;
  overflow-y: auto;
  padding: 0;
  margin: 0 0 8px 0;
  list-style: none;
}

.custom-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 0.85rem;
}

.endpoint-text {
  word-break: break-all;
  margin-right: 8px;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.remove-btn {
  background: var(--danger-weak);
  border: none;
  color: var(--danger-text);
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.add-row {
  display: flex;
  gap: 6px;
}

.add-row input[type="text"] {
  flex: 1;
  padding: 6px;
  font-size: 0.9rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.add-row button {
  padding: 6px 8px;
  cursor: pointer;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.add-row button:hover {
  background-color: var(--hover-bg);
}

.settings-actions {
  text-align: right;
  margin-top: 8px;
}

.settings-actions button {
  padding: 6px 8px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.settings-actions button:hover {
  background-color: var(--hover-bg);
}
</style>
