<template>
  <div class="Login">
    <div>
      <h1 class="Login__title">
        idasys-fe signup page
      </h1>
      <div class="links">
        <form autocomplete="off" @submit.prevent="createUser" method="post"  @keydown="clearErrors">
          <div>
              <div>
                <input type="checkin" placeholder="Din e-postadress (ditt inlogg)" :class="{'is-invalid': form.errors.has('email')}" v-model="form.email" required>
              </div>
              <div>
                <input type="password" placeholder="Ditt lösenord" v-model="form.password" :class="{'is-invalid': form.errors.has('email')}" required>
              </div>
              <div>
                <input type="password" placeholder="Ditt namn" v-model="form.name" :class="{'is-invalid': form.errors.has('name')}" required>
              </div>

              <div v-if="form.errors.has('email')">
                  {{ form.errors.first('email') }}
              </div>

              <div>
                <div>
                  <button type="submit">Registrera dig</button>
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
            name: ''
        }),
        error: '',
        message: '',
      }
    },
    methods: {
        async createUser() {
          try {
            let response = await this.form.post('/api/signup', this.form)
            console.log('apipost resp:', response)
          } catch(err) {
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
