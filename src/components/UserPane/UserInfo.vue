<template>
  <div class="user-info">
    <div>name: {{ userInfo.name }}</div>
    <div>desc: {{ userInfo.desc }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import { fetchUsetInfo } from '@/api/user';

interface UserInfoType {
  name: string;
  desc: string;
}

export default defineComponent({
  props: {
    count: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    let userInfo = ref<UserInfoType>({ name: '', desc: '' });
    const getUserInfo = async (name: string) => {
      const info = await fetchUsetInfo(name);
      userInfo.value = info;
    };

    onMounted(() => {
      getUserInfo('yoo');
    });

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
