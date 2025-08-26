<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { container } from 'tsyringe';
import TripRepository from '@/repository/TripRepository';
import TripComponent from '@/components/TripComponent.vue';
import Paging from '@/entity/data/Paging';
import type Trip from '@/entity/trip/Trip';

const router = useRouter();

const TRIP_REPOSITORY = container.resolve(TripRepository);

type stateType = {
  tripList: Paging<Trip>;
};

const state = reactive({
  tripList: new Paging<Trip>(),
});

function getList(page: number) {
  TRIP_REPOSITORY.getList(page).then((tripList) => {
    state.tripList = tripList;
  });
}

onMounted(() => {
  getList(0);
  console.log(state.tripList);
});
</script>

<template>
  <div class="content">
    <span class="totalCount"> 총 게시글 수{{ state.tripList.totalCount }}</span>
    <ul class="trips">
      <li v-for="trip in state.tripList.items" :key="trip.id">
        <TripComponent :trip="trip" />
      </li>
    </ul>
    <div class="d-flex justify-content-center">
      <el-pagination
        :background="true"
        v-model:current-page="state.tripList.page"
        layout="prev, pager, next"
        :total="state.tripList.totalCount"
        :page-size="3"
        @current-change="(page) => getList(page)"
      />
    </div>
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
