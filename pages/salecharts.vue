<template>
  <div class="Sale-charts">

    <PieChart v-if="!loading && garments" :data="garments" />

  </div>
</template>

<script>
import axios from 'axios';
import d3 from '@/assets/d3';
import _ from 'lodash';
import PieChart from '../components/PieChart';

export default {
    components: {
      PieChart
    },
    data() {
      return {
        loading: true,
        garments: []
      }
    },
    created() {
      this.getGarments();
    },
    methods: {
      async getGarments() {
        // try {
          await axios.get('/api/garments').then(response => {
            this.garments = response.data.garments;
            this.loading = false;
          })
          .catch(console.error);
        // } catch {
        //   console.log("catch");
        // }
      }
    }
}
</script>

<style>

</style>
