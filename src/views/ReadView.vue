<script setup lang="ts">
import { defineProps, onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { container } from 'tsyringe';
import TripRepository from '@/repository/TripRepository';
import TripRead from '@/entity/trip/TripRead';
import Trip from '@/entity/trip/Trip';

const router = useRouter();

const props = defineProps<{
  tripId: number;
}>();

const TRIP_REPOSITORY = container.resolve(TripRepository);

type StateType = {
  trip: Trip;
};

const state = reactive<StateType>({
  trip: new Trip(),
});

function getTrip() {
  TRIP_REPOSITORY.get(props.tripId)
    .then((trip: Trip) => {
      console.log(trip);
      state.trip = trip;
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '여행 정보를 불러오는데 실패했습니다.',
      });
    });
}

onMounted(() => {
  getTrip();
});
</script>

<template>
  <el-row>
    <el-col>
      <h2 class="title">{{ state.trip.title }}</h2>

      <div class="sub d-flex">
        <div class="category">개발</div>
        <div class="regDate">{{ state.trip.getDisplayRegDate() }}</div>
      </div>
    </el-col>
  </el-row>

  <el-row class="mt-3">

    <el-col>
      <div class="content">{{ state.trip.content }}</div>
    </el-col>
  </el-row>

  <el-row class="mt-3">
    <el-col>
      <div class="d-flex justify-content-end">
        <el-button type="warning">수정</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #383838;
  margin: 0;
}

.sub {
  margin-top: 10px;
  font-size: 0.78rem;

  .regDate {
    margin-left: 10px;
    color: #6b6b6b;
  }
}

.content {
  font-size: 0.95rem;
  margin-top: 12px;
  color: #616161;
  white-space: break-spaces;
  line-height: 1.5;
}
</style>
