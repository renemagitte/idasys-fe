<template>
  <div class="Login">
    <div>
      <h1 class="Login__title">
        idasys-fe login page
      </h1>
      <div class="links">
        <form autocomplete="off" @submit.prevent="loginUser" method="post"  @keydown="clearErrors">
          <div class="row justify-content-center">
            <div class="form-group mb-4 col-12 col-md-12">
              <input type="checkin" class="form-control form-control-lg" placeholder="Din e-postadress" :class="{'is-invalid': form.errors.has('email')}" v-model="form.email" required>
            </div>
            <div class="form-group mb-3 col-12 col-md-12">
              <input type="password" class="form-control form-control-lg" placeholder="Ditt lösenord" v-model="form.password" :class="{'is-invalid': form.errors.has('email')}" required>
            </div>

            <div class="form-group alert alert-warning mb-4 col-12 col-md-6" v-if="form.errors.has('email')">
              {{ form.errors.first('email') }}
            </div>

            <div class="col-12 mt-4">
              <div class="text-center">
                <button type="submit" class="btn btn-default btn-lg mb-2 px-4">Logga in</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Form from 'form-backend-validation';

export default {
    data() {
      return {
        form: new Form({
            email: '',
            password: '',
        }),
        error: '',
        message: '',
      }
    },
    methods: {
      async loginUser(){
        try {
          let response = await this.form.post('/api/login', this.form)
          console.log('apipost resp:', response)
          return response;
        }catch(err){
          return err;
        }
      },
      clearErrors($event){
        //Clear errors if exists
        if(this.isObjectAndNotEmpty(this.form.errors.all())){
          this.form.errors.clear($event.target.name);
        }
      },
      isObjectAndNotEmpty(obj){
        return (obj.constructor === Object && Object.keys(obj).length > 0 )
      },
    }
}
</script>

<style>

</style>
