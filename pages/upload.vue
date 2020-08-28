<template>
  <div class="upload">
      <div class="form-group">
        <label for="file">excel upload</label>
        <input type="file" id="file" name="ex_file" v-on:change="handleFileInput($event)" >
        <!-- <p class="help-block">!!!</p> -->
      </div>
    <button class="btn btn-primary" id="upload_f" @click="submit">submit</button>
  </div>
</template>

<script>
import Form from 'form-backend-validation';

export default {
  data() {
    return {
      form: new Form({
        file: ''
      })
    }
  },
  methods: {
    handleFileInput(e) {
        var files = e.target.files || e.dataTransfer.files;
        this.form.file = files[0];
    },
    async submit() {
      await this.form.post('/api/importGarmentsFromExcel', this.form)
        .then(response => {
          console.log("repsonse:", response)
        })
        .catch(console.error);

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
