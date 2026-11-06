<template>
  <div class="page-container yt-watch-page">
    <div class="main-content" v-if="video">
      <div class="video-wrapper">
        <StreamPlayer
          :videoId="videoId"
          :streamType="resolvedStreamType"
          @ended="onPlayerEnded"
          @play-autoplay-candidate="onPlayAutoplayCandidate"
          @autoplay-no-suitable-video="onAutoplayNoSuitableVideo"
        />
      </div>

      <h1 class="video-title" ref="videoTitle">{{ title }}</h1>
      <div class="video-info channel-info">
        <div
          class="channel-icon-link"
          @click.stop="onChannelClick"
          @keydown.enter="onChannelClick"
          tabindex="0"
          role="button"
        >
          <img
            :src="authorThumbnailUrl"
            alt="チャンネルアイコン"
            class="channel-icon"
            @error="onImageError($event, authorId)"
          />
        </div>
        <div class="channel-text">
          <div
            class="channel-name"
            @click.stop="onChannelClick"
            @keydown.enter="onChannelClick"
            tabindex="0"
            role="button"
          >
            {{ authorName }}
            <span style="margin-left: 5px" v-if="authorBadge === 'AUDIO_BADGE'"
              ><svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg"
                display="inherit"
              >
                <g class="layer">
                  <title>認証済み音楽チャンネル</title>
                  <path
                    fill="var(--svg-color)"
                    d="m6.6,1.04l-0.62,0.62l-0.87,0a3.41,3.43 0 0 0 -3.41,3.43l0,0.87l-0.62,0.62a3.41,3.43 0 0 0 0,4.85l0.62,0.62l0,0.87a3.41,3.43 0 0 0 3.41,3.43l0.87,0l0.62,0.62a3.41,3.43 0 0 0 4.82,0l0.62,-0.62l0.87,0a3.41,3.43 0 0 0 3.41,-3.43l0,-0.87l0.62,-0.62a3.41,3.43 0 0 0 0,-4.85l-0.62,-0.62l0,-0.87a3.41,3.43 0 0 0 -3.41,-3.43l-0.87,0l-0.62,-0.62a3.41,3.43 0 0 0 -4.82,0zm6.28,5.42a0.41,0.41 0 0 1 0.19,0.35l0,1.42a0.21,0.21 0 0 1 -0.32,0.18l-2.12,-1.28l0,3.72a2.23,2.25 0 1 1 -1.62,-2.16l0,-3.85a0.41,0.41 0 0 1 0.62,-0.35l3.25,1.98z"
                    id="svg_1"
                  />
                </g>
              </svg>
            </span>
            <span
              style="margin-left: 5px"
              v-else-if="authorBadge === 'CHECK_CIRCLE_THICK'"
              ><svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg"
                display="inherit"
              >
                <g class="layer">
                  <title>認証済み</title>
                  <path
                    fill="var(--svg-color)"
                    d="m9.04,0.16c-4.94,0 -8.93,3.98 -8.93,8.91s4,8.91 8.93,8.91s8.93,-3.99 8.93,-8.91s-4,-8.91 -8.93,-8.91zm4.64,5.9a0.81,0.81 0 0 1 0,1.15l-6.26,6.23l-3.01,-3a0.81,0.81 0 1 1 1.15,-1.15l1.86,1.86l5.11,-5.1a0.81,0.81 0 0 1 1.15,0z"
                    id="svg_1"
                  />
                </g></svg
            ></span>
          </div>
          <p class="subscriber-count">{{ subscriberCount }}</p>
        </div>

        <div class="channel-controls">
          <button
            class="subscribe-btn"
            :class="{ subscribed: subscribedLocal }"
            @click.stop="toggleSubscribe"
            :title="subscribedLocal ? '登録解除' : '登録'"
          >
            {{ subscribedLocal ? "登録解除" : "登録" }}
          </button>

          <StreamTypeDropdown
            :resolvedStreamType="resolvedStreamType"
            :isOpen="isDropdownOpen"
            @toggle="toggleDropdown"
            @select="selectStreamType"
          />
        </div>
      </div>
      <div
        style="
          padding: 10px 10px 0 10px;
          border-radius: 8px;
          background-color: var(--video-meta-bg);
        "
      >
        <div class="video-meta">
          <span>{{ viewCount.replace(/\s+/g, "") }}</span>
          <span>・{{ relativeDate }}</span>
          <span
            v-if="extended_title && extended_title.trim() !== ''"
            class="extended_title"
            >{{ extended_title }}</span
          >
          <div
            style="
              padding-top: 10px;
              display: flex;
              align-items: center;
              gap: 8px;
            "
          >
            <div id="mainvideo-likeCount">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="padding-top:2px;padding-right:4px">
  <defs>
    <clipPath id="a">
      <path d="M0 0h48v48H0z"/>
    </clipPath>
  </defs>
  <g class="layer" clip-path="url(#a)">
    <path fill="var(--normal-color)" d="M7.532 1.14c.154-.418.605-.673 1.066-.6l.998.154c2.16.346 3.581 2.32 3.12 4.347l-.595 2.646h3.897c1.652 0 3.082 1.082 3.437 2.61.22.936-.01 1.937-.614 2.71l.019.081c.288 1.164-.086 2.392-.98 3.238v.036l-.009.21c-.02.2-.057.408-.125.6l-.105.263c-.567 1.246-1.863 2.073-3.312 2.073h-3.466l-.374-.009a12 12 0 0 1-5.02-1.264l-.327-.163-.259-.146a2 2 0 0 0-.826-.236H2.042c-.797 0-1.44-.61-1.44-1.364V10.87c0-.755.643-1.364 1.44-1.364H3.76l.153-.01a.95.95 0 0 0 .692-.472l.057-.128zM6.476 9.497c-.403 1.09-1.487 1.827-2.716 1.827H2.52v4.547h1.412a3.95 3.95 0 0 1 1.9.482l.26.136.278.146a10.1 10.1 0 0 0 4.492 1.055h3.466c.72 0 1.363-.437 1.593-1.092l.03-.118c.009-.036.009-.073.009-.118v-.791l.566-.528c.365-.354.547-.845.5-1.336l-.039-.21-.02-.081-.2-.819.527-.673c.279-.354.384-.809.279-1.236-.164-.691-.807-1.182-1.556-1.182H12.12a1.98 1.98 0 0 1-1.498-.673 1.77 1.77 0 0 1-.383-1.528l.604-2.637c.23-1.018-.48-2.01-1.564-2.182l-.202-.028z" display="block"/>
  </g>
            </svg>
              {{ likeCount }}
            </div>
            <StreamPlayer :videoId="videoId" :streamType="'3'" />
            <button
              class="add-playlist-btn"
              @click.stop="openPlaylistModal"
              title="プレイリストに追加"
            >
              <svg
                style="padding-right: 3px"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg"
                display="inherit"
              >
                <g class="layer">
                  <title>Layer 1</title>
                  <path
                    d="m16.41,0.98l-12.69,0a1.81,1.79 0 0 0 -1.81,1.79l0,15.09c0,1.13 1.25,1.83 2.24,1.25l5.92,-3.5l5.92,3.5c0.99,0.58 2.24,-0.13 2.24,-1.25l0,-15.09a1.81,1.79 0 0 0 -1.81,-1.79zm-12.69,16.28l0,-14.5l12.69,0l0,14.5l-5.88,-3.47l-0.47,-0.28l-0.47,0.28l-5.88,3.47z"
                    id="svg_1"
                    fill="var(--normal-color)"
                  />
                </g>
              </svg>
              プレイリスト
            </button>
          </div>
        </div>
        <VideoDescription
          :descriptionRun0="descriptionRun0"
          :descriptionRun1="descriptionRun1"
          :formattedDescription="formattedDescription"
          :showFull="showFullDescription"
          @toggle="
            (v) => {
              showFullDescription = v;
            }
          "
        />
      </div>
      <Comment :videoId="videoId" />
    </div>

    <RelatedList
      v-if="relatedVideos.length"
      :relatedVideos="relatedVideos"
      :playlistId="playlistId"
      :currentVideoId="videoId"
      :loadingMore="loadingMore"
      @load-more="loadMoreRelatedVideos"
    />
    <div v-else-if="error" class="error-msg">
      ⚠️ {{ error }}<br />
      <button class="reload-btn" @click="reloadVideo">再取得</button>
    </div>
    <p v-else class="loading-msg">読み込み中...</p>

    <!-- 自動再生フィルタ通知 -->
    <AutoplayNotification
      v-if="showAutoplayNotification"
      :message="autoplayNotificationMessage"
      @close="showAutoplayNotification = false"
    />
    <PlaylistModal
      v-if="showPlaylistModal"
      :video="video"
      @close="closePlaylistModal"
      @added="onPlaylistAdded"
    />

    <!-- コラボレーター一覧ポップアップ -->
    <CollaboratorsPopup
      v-if="showCollaboratorsPopup && video?.author?.collaborators"
      :collaborators="video.author.collaborators"
      @close="showCollaboratorsPopup = false"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import PlaylistComponent from "@/components/Playlist.vue";
import Comment from "@/components/Comment.vue";
import StreamPlayer from "@/components/StreamPlayer.vue";
window.scrollTo(0, 0);

const route = useRoute();
const videoId = computed(() => route.query.v);
const playlistId = computed(() => route.query.list);

const currentType = ref("1");

function switchStream() {
  currentType.value = "3";
}
</script>

<script>
import { apiRequest } from "@/services/requestManager";
import { addVideoToHistory } from "@/utils/historyManager";
import PlaylistComponent from "@/components/Playlist.vue";
import Comment from "@/components/Comment.vue";
import StreamPlayer from "@/components/StreamPlayer.vue";
import StreamTypeDropdown from "@/components/StreamTypeDropdown.vue";
import VideoDescription from "@/components/VideoDescription.vue";
import RelatedList from "@/components/RelatedList.vue";
import AutoplayNotification from "@/components/AutoplayNotification.vue";
import PlaylistModal from "@/components/PlaylistModal.vue";
import CollaboratorsPopup from "@/components/CollaboratorsPopup.vue";
import subscriptionManager from "@/utils/subscriptionManager";

export default {
  components: {
    PlaylistComponent,
    Comment,
    StreamPlayer,
    StreamTypeDropdown,
    VideoDescription,
    RelatedList,
    AutoplayNotification,
    PlaylistModal,
    CollaboratorsPopup,
  },
  props: {
    videoId: { type: String, required: true },
    streamType: { type: String, default: "" },
  },
  data() {
    return {
      video: null,
      error: null,
      hoverId: null,
      showFullDescription: false,
      localStreamType: this.getDefaultPlaybackMode() || "1",
      isDropdownOpen: false,
      _autoplayTimer: null,
      _autoplayDecisionTimer: null,
      showAutoplayNotification: false,
      autoplayNotificationMessage: "",
      showPlaylistModal: false,
      nextContinuationToken: null,
      loadingMore: false,
      subscribedLocal: false,
      showCollaboratorsPopup: false,
    };
  },
  computed: {
    resolvedStreamType() {
      return (
        this.normalizeStreamType(this.streamType) ||
        this.normalizeStreamType(this.localStreamType) ||
        "1"
      );
    },
    viewCount() {
      return this.video?.views || "情報なし";
    },
    title() {
      return this.video?.title || "情報なし";
    },
    relativeDate() {
      return this.video?.relativeDate || "";
    },
    likeCount() {
      return this.video?.likes || "情報なし";
    },
    extended_title() {
      return this.video?.extended_superTitle || "";
    },
    subscriberCount() {
      return this.video?.author?.subscribers || "情報なし";
    },
    authorId() {
      return this.video?.author?.id || "情報なし";
    },
    authorName() {
      const author = this.video?.author;
      if (!author) return "情報なし";
      const name = author.name || "情報なし";
      // コラボの場合は「、他Nチャンネル」を追加
      if (
        author.collaborator &&
        Array.isArray(author.collaborators) &&
        author.collaborators.length > 1
      ) {
        const others = author.collaborators.length - 1;
        return `${name}、他${others}チャンネル`;
      }
      return name;
    },
    authorBadge() {
      return (
        this.video?.extended_badges?.[0]?.metadataBadgeRenderer?.icon
          ?.iconType || ""
      );
    },
    authorThumbnailUrl() {
      const author = this.video?.author;
      if (!author) return "情報なし";
      // コラボの場合、先頭のコラボレーターのサムネイルを優先
      if (
        author.collaborator &&
        Array.isArray(author.collaborators) &&
        author.collaborators.length > 0
      ) {
        return (
          author.collaborators[0].thumbnail || author.thumbnail || "情報なし"
        );
      }
      return author.thumbnail || "情報なし";
    },
    isSubscribedComputed() {
      return subscriptionManager.isSubscribed(this.authorId);
    },
    descriptionText() {
      return this.video?.description?.text || "情報なし";
    },
    formattedDescription() {
      const rawText =
        this.video?.description?.text ||
        "この動画には説明が追加されていません。";
      return rawText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
    },
    shouldShowToggle() {
      const text = this.descriptionRun3?.trim();
      return text !== "";
    },
    descriptionRun0() {
      return this.video?.description?.run0 || "情報なし";
    },
    descriptionRun1() {
      return this.video?.description?.run1 || "";
    },
    descriptionRun2() {
      return this.video?.description?.run2 || "";
    },
    descriptionRun3() {
      return this.video?.description?.run3 || "";
    },
    relatedVideos() {
      const feed = this.video?.["Related-videos"]?.relatedVideos || [];
      const mapped = feed.map((item) => {
        if (item.type === "playlist") {
          return {
            type: item.type,
            base64imge: item.thumbnail || "",
            badge: "",
            title: item.title || "",
            metadataRow1: "再生リスト",
            metadataRow2Part1: "",
            metadataRow2Part2: "",
            videoId: item.videoId || "",
            replaylistId: item.playlistId || "",
            duration: 0,
            verifiedIcon: null,
          };
        } else {
          return {
            type: item.type,
            base64imge: item.thumbnail || "",
            badge: item.badge || "",
            title: item.title || "",
            metadataRow1: item.channelName || "",
            metadataRow2Part1: item.viewCountText || "",
            metadataRow2Part2: item.publishedTimeText || "",
            videoId: item.videoId || "",
            replaylistId: "",
            duration: item.duration || 0,
            verifiedIcon: item.verifiedIcon || null,
          };
        }
      });

      if (mapped.length > 0) {
        console.log("First related video item:", mapped[0]);
        console.log("Raw API response first item:", feed[0]);
      }

      return mapped;
    },
  },
  methods: {
    normalizeStreamType(value) {
      try {
        if (value === null || value === undefined) return "";
        let normalized = String(value).trim();
        if (!normalized) return "";

        // localStorage が JSON 文字列（例: "\"1\""）の場合を吸収
        if (
          (normalized.startsWith('"') && normalized.endsWith('"')) ||
          (normalized.startsWith("'") && normalized.endsWith("'"))
        ) {
          try {
            normalized = JSON.parse(normalized);
          } catch (e) {}
          normalized = String(normalized).trim();
        }

        return ["1", "2", "3"].includes(normalized) ? normalized : "";
      } catch (e) {
        return "";
      }
    },
    getDefaultPlaybackMode() {
      try {
        const match = document.cookie.match(
          new RegExp("(^| )StreamType=([^;]+)")
        );
        const fromCookie = match
          ? this.normalizeStreamType(decodeURIComponent(match[2]))
          : "";
        if (fromCookie) return fromCookie;

        const fromStorage = this.normalizeStreamType(
          localStorage.getItem("defaultPlaybackMode")
        );
        if (fromStorage) return fromStorage;

        return null;
      } catch {
        return null;
      }
    },
    getCookieSafe(name) {
      try {
        const match = document.cookie.match(
          new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? decodeURIComponent(match[2]) : null;
      } catch {
        return null;
      }
    },
    parseDurationFromBadge(badgeText) {
      if (!badgeText || typeof badgeText !== "string") return 0;

      badgeText = badgeText.trim();
      console.log(`Parsing badge: "${badgeText}"`);

      const hhmmssMatch = badgeText.match(/^(\d+):(\d+):(\d+)$/);
      if (hhmmssMatch) {
        const seconds =
          parseInt(hhmmssMatch[1]) * 3600 +
          parseInt(hhmmssMatch[2]) * 60 +
          parseInt(hhmmssMatch[3]);
        console.log(`  HH:MM:SS matched: ${seconds}s`);
        return seconds;
      }

      const mmssMatch = badgeText.match(/^(\d+):(\d+)$/);
      if (mmssMatch) {
        const seconds = parseInt(mmssMatch[1]) * 60 + parseInt(mmssMatch[2]);
        console.log(`  MM:SS matched: ${seconds}s`);
        return seconds;
      }

      const japaneseMatch = badgeText.match(/^(\d+)分(?:(\d+)秒)?$/);
      if (japaneseMatch) {
        let seconds = parseInt(japaneseMatch[1]) * 60;
        if (japaneseMatch[2]) {
          seconds += parseInt(japaneseMatch[2]);
        }
        console.log(`  Japanese format matched: ${seconds}s`);
        return seconds;
      }

      console.log(`  No pattern matched`);
      return 0;
    },

    async toggleSubscribe() {
      try {
        const id = this.authorId;
        console.debug("toggleSubscribe clicked", {
          id,
          subscribedBefore: subscriptionManager.isSubscribed(id),
        });
        if (!id || id === "情報なし") return;
        if (subscriptionManager.isSubscribed(id)) {
          subscriptionManager.removeSubscription(id);
          this.subscribedLocal = false;
          try {
            window.dispatchEvent(new CustomEvent("subscriptions-changed"));
          } catch (e) {}
          console.debug(
            "after remove, subscriptions",
            subscriptionManager.getSubscriptions()
          );
          this.autoplayNotificationMessage = "チャンネル登録を解除しました";
          this.showAutoplayNotification = true;
          setTimeout(() => (this.showAutoplayNotification = false), 2000);
        } else {
          const initialIcon =
            this.authorThumbnailUrl && this.authorThumbnailUrl !== "情報なし"
              ? this.authorThumbnailUrl
              : null;
          const authorObj = this.video?.author || {};
          const subName =
            authorObj.name ||
            (authorObj.collaborator &&
              Array.isArray(authorObj.collaborators) &&
              authorObj.collaborators[0]?.name) ||
            this.authorName;
          subscriptionManager.addSubscription({
            id,
            name: subName,
            icon: initialIcon,
          });
          this.subscribedLocal = true;
          try {
            window.dispatchEvent(new CustomEvent("subscriptions-changed"));
          } catch (e) {}
          console.debug(
            "after add, subscriptions",
            subscriptionManager.getSubscriptions()
          );
          this.autoplayNotificationMessage = "チャンネルを登録しました";
          this.showAutoplayNotification = true;
          setTimeout(() => (this.showAutoplayNotification = false), 2000);

          // Fetch icon asynchronously and update subscription when available
          (async () => {
            try {
              const fetchedIcon = await subscriptionManager.fetchImageAsBase64(
                this.authorThumbnailUrl
              );
              if (fetchedIcon) {
                subscriptionManager.updateSubscription(id, {
                  icon: fetchedIcon,
                });
              } else if (
                this.authorThumbnailUrl &&
                this.authorThumbnailUrl !== "情報なし"
              ) {
                // If base64 fetch failed, fall back to original URL so image still shows
                subscriptionManager.updateSubscription(id, {
                  icon: this.authorThumbnailUrl,
                });
              }
            } catch (e) {
              console.warn("icon fetch failed", e);
            }
          })();
        }
        // ensure we re-sync shortly after in case of timing issues
        setTimeout(() => {
          try {
            this.subscribedLocal = subscriptionManager.isSubscribed(
              this.authorId
            );
          } catch (e) {}
        }, 50);
      } catch (e) {
        console.error("toggleSubscribe error", e);
      }
    },
    setCookieSafe(name, value, seconds) {
      try {
        const expires = new Date(Date.now() + seconds * 1000).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(
          value
        )}; expires=${expires}; path=/`;
      } catch {}
    },
    onStreamTypeChange() {
      const normalizedMode = this.normalizeStreamType(this.localStreamType) || "1";
      this.localStreamType = normalizedMode;
      // localStorage と Cookie の両方に保存
      try {
        localStorage.setItem("defaultPlaybackMode", normalizedMode);
      } catch (e) {
        console.error("localStorage save error:", e);
      }
      this.setCookieSafe("StreamType", normalizedMode, 99999);
    },
    onPlayerEnded() {
      try {
        // 既存のタイマーをクリア
        try {
          if (this._autoplayTimer) {
            clearTimeout(this._autoplayTimer);
            this._autoplayTimer = null;
          }
        } catch (e) {}
        try {
          if (this._autoplayDecisionTimer) {
            clearTimeout(this._autoplayDecisionTimer);
            this._autoplayDecisionTimer = null;
          }
        } catch (e) {}

        // 少し待って（他のイベントが到着するのを待つ）から遷移タイマーをセット
        this._autoplayDecisionTimer = setTimeout(() => {
          try {
            // 自動再生ロックがある場合はスケジュールを抑止
            const lockRaw = (() => {
              try {
                return sessionStorage.getItem("yt_autoplay_lock");
              } catch (e) {
                return null;
              }
            })();
            if (lockRaw) {
              try {
                const lock = JSON.parse(lockRaw);
                if (lock && lock.expires && Date.now() < lock.expires) {
                  // ロック期間内はスケジュールを行わない
                  return;
                }
              } catch (e) {}
            }

            const filterConfig = window.__autoplayDurationFilter || {
              enabled: false,
            };
            if (filterConfig.enabled) {
              return;
            }

            this._autoplayTimer = setTimeout(() => {
              const next =
                this.relatedVideos && this.relatedVideos.length
                  ? this.relatedVideos[0]
                  : null;
              if (next && next.videoId) {
                const query = { v: next.videoId, autoplay: "1" };
                if (next.replaylistId && next.replaylistId.length > 0) {
                  // If the candidate belongs to a playlist, prefer that playlist id.
                  query.list = next.replaylistId;
                }
                this.$router.push({ path: "/watch", query });
              }
            }, 3000);
          } catch (e) {
            console.error("autoplay decision error", e);
          }
        }, 300); // 300ms の短い待ち時間
      } catch (e) {
        console.error("onPlayerEnded error", e);
      }
    },

    onPlayAutoplayCandidate({ id }) {
      try {
        if (!id) return;
        // 自動遷移中の競合を防ぐためロックを設定（短時間）
        try {
          const lock = { target: id, expires: Date.now() + 5000 };
          sessionStorage.setItem("yt_autoplay_lock", JSON.stringify(lock));
        } catch (e) {}

        // 決定タイマーや既存の自動遷移タイマーをクリアしてから遷移
        try {
          if (this._autoplayDecisionTimer) {
            clearTimeout(this._autoplayDecisionTimer);
            this._autoplayDecisionTimer = null;
          }
        } catch (e) {}
        try {
          if (this._autoplayTimer) {
            clearTimeout(this._autoplayTimer);
            this._autoplayTimer = null;
          }
        } catch (e) {}

        const query = { v: id };
        this.$router.push({ path: "/watch", query });
      } catch (e) {
        console.error("onPlayAutoplayCandidate error", e);
      }
    },

    onAutoplayNoSuitableVideo() {
      try {
        const filterConfig = window.__autoplayDurationFilter || {
          enabled: false,
          minutes: 4,
        };
        this.autoplayNotificationMessage = `指定条件（${filterConfig.minutes}分以下）に合う関連動画がないため、自動再生をストップしました。`;
        this.showAutoplayNotification = true;

        // 5秒後に自動で通知を非表示
        setTimeout(() => {
          this.showAutoplayNotification = false;
        }, 5000);
      } catch (e) {
        console.error("onAutoplayNoSuitableVideo error:", e);
      }
    },

    openPlaylistModal() {
      this.showPlaylistModal = true;
    },
    closePlaylistModal() {
      this.showPlaylistModal = false;
    },
    onPlaylistAdded({ playlistId }) {
      // optional: show a brief notification
      try {
        this.autoplayNotificationMessage = "プレイリストに追加しました";
        this.showAutoplayNotification = true;
        setTimeout(() => (this.showAutoplayNotification = false), 2000);
      } catch (e) {}
      this.closePlaylistModal();
    },

    // --- fetchのみ（JSONのみ対応）
    async fetchVideoData(id) {
      const maxRetries = 3;
      if (!id) {
        this.video = null;
        this.error = "動画IDが指定されていません。";
        return;
      }

      try {
        this.video = null;
        this.error = null;
        // requestManager の apiRequest を使って中央集約されたリクエストを実行
        const data = await apiRequest({
          // Use raw query formatting required: video=動画ID==p==depth==i==1
          params: { __rawQuery: `video=${id}==p==depth==i==1` },
          method: "GET",
          retries: maxRetries,
          timeout: 15000,
        });

        this.video = data;
        this.nextContinuationToken =
          data["Related-videos"]?.nextContinuationToken || null;
        // Sync subscribed state immediately after we have the author id
        try {
          this.subscribedLocal = subscriptionManager.isSubscribed(
            this.authorId
          );
        } catch (e) {
          console.warn("subscribed sync error", e);
        }

        // 履歴に保存（非同期で実行、エラーは無視）
        try {
          await addVideoToHistory({
            id: data.id,
            title: data.title,
            views: data.views,
            author: data.author,
            description: data.description,
            thumbnail: data.thumbnail,
          });
        } catch (historyError) {
          console.warn("Failed to save to history:", historyError);
        }

        if (
          !data["Related-videos"] ||
          !Array.isArray(data["Related-videos"].relatedVideos) ||
          data["Related-videos"].relatedVideos.length === 0
        ) {
          this.error = "関連動画が見つかりませんでした。";
        }
        // Reset popup state when new video loads
        this.showCollaboratorsPopup = false;
        return;
      } catch (err) {
        console.error("fetchVideoData error:", err);
        this.video = null;

        this.error =
          err && err.message && err.message !== ""
            ? err.message
            : "動画情報を取得できませんでした。";
      }
    },
    reloadVideo() {
      this.fetchVideoData(this.videoId);
    },
    getPrimaryThumbnail(id) {
      return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    },
    onImageError(event, id) {
      if (!event.target.dataset.error) {
        event.target.src = `https://i.ytimg.com/vi/${id}/sddefault.jpg`;
        event.target.dataset.error = true;
      }
    },
    toggleDescription() {
      this.showFullDescription = !this.showFullDescription;
      this.$nextTick(() => {
        const el = this.$refs.videoTitle;
        if (el?.scrollIntoView) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectStreamType(value) {
      this.localStreamType = this.normalizeStreamType(value) || "1";
      this.isDropdownOpen = false;
      this.onStreamTypeChange();
    },
    async loadMoreRelatedVideos() {
      if (!this.nextContinuationToken || this.loadingMore) return;
      this.loadingMore = true;
      try {
        const data = await apiRequest({
          // Use raw query formatting required:
          // video=動画ID==p==token==i==トークン==p==depth==i==2
          params: {
            __rawQuery: `video=${this.videoId}==p==token==i==${this.nextContinuationToken}==p==depth==i==2`,
          },
          method: "GET",
          retries: 3,
          timeout: 15000,
        });
        if (
          data["Related-videos"] &&
          Array.isArray(data["Related-videos"].relatedVideos)
        ) {
          // Append new related videos
          this.video["Related-videos"].relatedVideos.push(
            ...data["Related-videos"].relatedVideos
          );
          this.nextContinuationToken =
            data["Related-videos"].nextContinuationToken || null;
        }
      } catch (err) {
        console.error("loadMoreRelatedVideos error:", err);
      } finally {
        this.loadingMore = false;
      }
    },
    handleClickOutside(event) {
      if (this.isDropdownOpen && !this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    handleEscape(event) {
      if (event.key === "Escape") {
        this.isDropdownOpen = false;
      }
    },
    onSubscriptionsChanged() {
      try {
        // Update local subscribed flag from storage so UI keeps consistent
        const val = subscriptionManager.isSubscribed(this.authorId);
        console.debug("subscriptions-changed received on watch page", {
          id: this.authorId,
          subscribed: val,
        });
        this.subscribedLocal = val;
      } catch (e) {
        console.warn("onSubscriptionsChanged error", e);
      }
    },

    onChannelClick(event) {
      try {
        const author = this.video?.author;
        if (
          author &&
          author.collaborator &&
          Array.isArray(author.collaborators) &&
          author.collaborators.length > 0
        ) {
          // show popup instead of navigate
          this.showCollaboratorsPopup = true;
          return;
        }
        if (!this.authorId || this.authorId === "情報なし") return;
        this.$router.push({ path: `/channel/${this.authorId}` });
      } catch (e) {
        console.error("onChannelClick error", e);
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("keydown", this.handleEscape);
    window.addEventListener(
      "subscriptions-changed",
      this.onSubscriptionsChanged
    );

    // initialize local subscribed state
    this.subscribedLocal = subscriptionManager.isSubscribed(this.authorId);

    // watch for storage changes from other tabs
    this._storageHandler = (e) => {
      if (e.key === "subscriptions_v1") {
        const val = subscriptionManager.isSubscribed(this.authorId);
        console.debug("storage event on watch page", {
          key: e.key,
          subscribed: val,
        });
        this.subscribedLocal = val;
      }
    };
    window.addEventListener("storage", this._storageHandler);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleEscape);
    window.removeEventListener(
      "subscriptions-changed",
      this.onSubscriptionsChanged
    );
    window.removeEventListener("storage", this._storageHandler);
    if (this._autoplayTimer) {
      clearTimeout(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  },
  watch: {
    videoId: {
      immediate: true,
      handler(newId) {
        this.fetchVideoData(newId);
      },
    },
    title(newTitle) {
      if (newTitle && newTitle !== "情報なし") {
        document.title = newTitle;
      }
    },
    authorId(newVal) {
      // keep local subscribed in-sync when author changes
      this.subscribedLocal = subscriptionManager.isSubscribed(newVal);
    },
  },
};
</script>

<style scoped>
.extended_title {
  margin-left: 10px;
  color: var(--text-secondary);
}
.add-playlist-btn {
  display: flex;
  padding: 6px 11px;
  background: var(--download-button);
  color: var(--text-primary);
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

#mainvideo-likeCount {
  font-size: 14px;
  padding: 4px 11px;
  background: var(--download-button);
  color: var(--text-primary);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
}

.dropdown-ending {
  display: inline-block;
  font-size: 1rem;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  display: inline-block;
  margin-top: -1rem;
  margin-bottom: -0.5rem;
  margin-left: 1rem;
}

.custom-dropdown {
  position: relative;
  background: var(--bg-secondary);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  width: max-content;
  font-size: 0.9rem;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.custom-dropdown-label {
  white-space: nowrap;
}

.re-actername {
  margin-bottom: 3px;
  font-size: 0.8rem;
}

.custom-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 100%;
  white-space: nowrap;
  max-width: max-content;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.custom-dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--text-primary);
}

.custom-dropdown-item:hover {
  background-color: var(--hover-bg);
}

.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
}

p {
  margin-block-start: 1em;
  margin-block-end: 0.8em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  unicode-bidi: isolate;
}
.channel-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.channel-controls {
  margin-left: auto; /* push to the right */
  display: flex;
  align-items: center;
  gap: 8px;
}

.subscribe-btn {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
}
.subscribe-btn.subscribed {
  background: var(--accent-color);
  color: var(--on-accent);
  border-color: rgba(0, 0, 0, 0.05);
}

.page-link {
  text-decoration: none;
}
.channel-icon-link {
  flex-shrink: 0;
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.channel-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 50%;
}

.channel-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.channel-name {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--text-primary);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.channel-name:hover,
.channel-name:focus {
  text-decoration: underline;
}

.subscriber-count {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 2px 0 0 0;
  white-space: nowrap;
}
.video-info p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0 0 4px 0;
  line-height: 1.4;
  font-weight: 400;
}
.video-description {
  font-size: 0.9rem;
  color: var(--text-primary);
  line-height: 1.5;
  margin-top: 12px;
  margin-bottom: 15px;
  white-space: pre-wrap;
  word-break: break-word;
}
.description-preview {
  max-height: 120px;
  overflow: hidden;
  margin: 0 0 0.4em 0;
}
.description-full {
  margin: 0;
}
.description-toggle {
  display: inline-block;
  color: var(--accent-color);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  user-select: none;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  margin-top: 4px;
}

.page-container {
  display: flex;
  gap: 24px;
  padding: 16px;
  flex-wrap: wrap;
}

.main-content {
  flex: 1 1 0;
  min-width: 0;
}

.video-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 8px 0;
  line-height: 1.4;
  color: var(--text-primary);
}

.video-meta {
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.related-section {
  width: 360px;
  flex-shrink: 0;
}

.related-title {
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.related-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  cursor: pointer;
}

.thumb-wrapper {
  position: relative;
  width: 168px;
  height: 94.5px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 4px;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

/* バッジ（動画時間・ライブ） */
.duration-badge {
  line-height: 1.3;
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: var(--on-accent);
  padding: 2px 4px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 2px;
  pointer-events: none;
  user-select: none;
  z-index: 10;
}
.badge-live {
  background: var(--danger);
}
.video-info {
  flex: 1;
}

.video-title-related {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-metadata {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.dot {
  margin: 0 4px;
}

.error-msg {
  color: red;
  font-size: 1rem;
  margin-top: 1rem;
}

.loading-msg {
  font-size: 1rem;
  color: var(--text-primary);
}

.reload-btn {
  padding: 10px 24px;
  background: var(--text-secondary);
  color: var(--on-accent);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1.1em;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s, color 0.2s;
}
.reload-btn:hover {
  background: var(--text-secondary-hover);
  color: var(--on-accent);
}

/* 自動再生フィルタ通知 */
.autoplay-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  max-width: 400px;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.notification-text {
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--text-primary);
}

.notification-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
}

.notification-close:hover {
  color: var(--text-primary);
}

@media (max-width: 999px) {
  .page-container {
    flex-direction: column;
  }

  .related-section {
    width: 100%;
    margin-top: 32px;
  }

  .related-item {
    gap: 10px;
  }

  .thumb-wrapper {
    width: 140px;
    height: 78.75px; /* 16:9 */
  }

  .video-title {
    font-size: 1.25rem;
  }

  .video-title-related {
    font-size: 0.9rem;
  }

  .video-metadata {
    font-size: 0.8rem;
  }

  .duration-badge {
    font-size: 0.65rem;
    padding: 1px 2px;
  }
}
</style>
