<template>
  <div class='home'>
    <Filtered />
  </div>
</template>

<script>
import Filtered from '@/components/Filtered.vue';

export default {
  name: 'Home',
  components: {
    Filtered,
  },
};
</script>
