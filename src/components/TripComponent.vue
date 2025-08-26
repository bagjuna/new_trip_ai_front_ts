<script setup lang="ts">
import type Trip from "@/entity/trip/Trip";

const props = defineProps<{
  trip: Trip
}>()
</script>

<template>
  <div class="title">
    <router-link :to="{ name: 'trip', params: { tripId: props.trip.id } }">{{ props.trip.title }}</router-link>
  </div>

  <div class="regDate">{{ props.trip.getDisplaySimpleRegDate() }}</div>

  <div class="content">
    {{ props.trip.content }}
  </div>

  <div class="readMore">
    <router-link :to="{ name: 'trip', params: { tripId: props.trip.id } }">Read more </router-link>
  </div>
</template>

<style scoped lang="scss">
.title {
  a {
    color: inherit;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }
}

.regDate {
  margin-top: 0.5rem;
  font-size: 0.78rem;
  font-weight: 300;
}

.content {
  margin-top: 0.88rem;
  font-weight: 300;
}

.readMore {
  margin-top: 0.3rem;

  a {
    font-size: 0.88rem;
    color: #3d8dcb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
