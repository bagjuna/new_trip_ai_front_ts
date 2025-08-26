<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { container } from 'tsyringe';
import TripRepository from '@/repository/TripRepository';
import TripComponent from '@/components/TripComponent.vue';

const router = useRouter();

const TRIP_REPOSITORY = container.resolve(TripRepository);

const state = reactive({
  tripList: [],
});

function getList() {
  TRIP_REPOSITORY.getList().then((tripList) => {
    state.tripList = tripList;
  });
}

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="content">

    <ul class="trips">
      <li v-for="trip in state.tripList" :key="trip.id">
        <TripComponent :trip="trip" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.content {
  padding: 0 1rem 0 1rem;
  margin-bottom: 2rem;
}

.totalCount {
  font-size: 0.88rem;
}

.trips {
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 2.4rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
