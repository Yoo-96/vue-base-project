<template>
  <div>当前查询次数: {{ count }}</div>
  <div class="user-info">
    <div>name: {{ userInfo.name }}</div>
    <div>desc: {{ userInfo.desc }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue';

import { fetchUsetInfo } from '@/api/user';

interface userInfoType {
  name?: string;
  desc?: string;
}

export default defineComponent({
  props: {
    count: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { count } = toRefs(props);
    console.log(count.value);

    const userInfo = ref();
    const getUserInfo = async (name: string) => {
      const info = await fetchUsetInfo(name);
      userInfo.value = info;
    };

    getUserInfo('yoo');
    return {
      userInfo,
    };
  },
});
</script>

<style lang="less" scoped>
.user-info {
  color: @primary-color;
}
</style>
