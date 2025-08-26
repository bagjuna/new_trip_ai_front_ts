<script setup lang="ts">
import { reactive, ref } from 'vue';

import axios from 'axios';
import { useRouter } from 'vue-router';
import TripWrite from '@/entity/trip/TripWrite';
import { container } from 'tsyringe';
import TripRepository from '@/repository/TripRepository';
import { ElMessage } from 'element-plus';

const state = reactive({
  tripWrite: new TripWrite(),
});

const router = useRouter();

const TRIP_REPOSITORY = container.resolve(TripRepository);

const write = function () {
  TRIP_REPOSITORY.write(state.tripWrite)
    .then(() => {
      ElMessage({ type: 'success', message: '여행 등록이 완료되었습니다.' });
      router.replace('/');
    })
    .catch((e: HttpError) => {
      ElMessage({ type: 'error', message: e.getMessage() });
    });
};
</script>

<template>
  <el-form label-position="top">
    <el-form-item label="제목">
      <el-input
        v-model="state.tripWrite.title"
        size="large"
        placeholder="제목을 입력해주세요"
      />
    </el-form-item>

    <el-form-item label="내용">
      <el-input
        v-model="state.tripWrite.content"
        type="textarea"
        rows="15"
        alt="내용"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="write()"
        >등록완료
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style></style>
