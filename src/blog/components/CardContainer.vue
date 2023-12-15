<script setup>
import { ref, toRef, toRefs, watch } from "vue";
import router from "@/router/index.js";

const metadata = {
  title: "",
  cover: "",
  text: "",
  date: "",
  likes: "",
  comments: "",
};

const props = defineProps([
  "data",
  "title",
  "cover",
  "text",
  "date",
  "likes",
  "comments",
]);

const { data, title, cover, text, date, likes, comments } = toRefs(props);
</script>

<template>
  <div class="gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
    <div
      v-for="item in data"
      class="overflow-hidden transition-shadow duration-300 bg-white rounded"
      @click.prevent="router.push('/blog/post/' + item.id)"
    >
      <a href="/public" aria-label="Article">
        <img
          :src="cover ? item[cover] : item.cover"
          class="object-cover w-full h-64 rounded"
          alt=""
        />
      </a>
      <div class="py-2">
        <p class="mb-2 text-xs font-semibold text-gray-600 uppercase">
          {{ date ? item[date] : item.date }}
        </p>
        <a
          href="/public"
          aria-label="Article"
          class="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          <p class="title">
            {{ title ? item[title] : item.title }}
          </p>
        </a>
        <p class="mb-4 text-gray-700">
          {{ text ? item[text] : item.text }}
        </p>
        <div class="flex space-x-4">
          <a
            href="/public"
            aria-label="Likes"
            class="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
          >
            <div class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
              >
                <polyline
                  points="6 23 1 23 1 12 6 12"
                  fill="none"
                  stroke-miterlimit="10"
                ></polyline>
                <path
                  d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                ></path>
              </svg>
            </div>
            <p class="font-semibold">
              {{ likes ? item[likes] : item.likes }}
            </p>
          </a>
          <a
            href="/public"
            aria-label="Comments"
            class="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
          >
            <div class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
              >
                <polyline
                  points="23 5 23 18 19 18 19 22 13 18 12 18"
                  fill="none"
                  stroke-miterlimit="10"
                ></polyline>
                <polygon
                  points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                ></polygon>
              </svg>
            </div>
            <p class="font-semibold">
              {{ comments ? item[comments] : item.comments }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--juejin-font-1);
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.duration-300 {
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  /* border: 1px solid #79bbff !important; */
  margin-bottom: 1.5rem;
}
</style>