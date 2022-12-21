<template>
  <h1>Einkaufsliste</h1>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="item in items" :key="item.id">
        <div class="card h-100">
          <img :src="getAvatar(item)" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ item.fullName }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Items',
  data () {
    return {
      items: []
    }
  },
  methods: {
    getAvatar (item) {
      if (item.selected === 'true') {
        return require('../assets/true.png')
      } else if (item.selected === 'false') {
        return require('../assets/false.png')
      }
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/items'
    const requestOptions = {

      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(item => {
        this.items.push(item)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
