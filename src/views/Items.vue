<template>
  <div class="container">
    <h1>Shopping List</h1>
    <form @submit.prevent="addItem" class="mb-3">
      <div class="input-group">
        <input type="text" v-model="newItem" placeholder="Add item" v-bind:class="{ 'is-invalid': error }" class="form-control" />
        <div class="input-group-append">
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
        <div v-if="error" class="invalid-feedback">
         {{ error }}
        </div>
      </div>
    </form>
    <form class="mb-3">
      <div class="form-group">
        <label for="sortSelect">Sort by:</label>
        <select v-model="sortOrder" id="sortSelect" class="form-control">
          <option value="name">Name</option>
          <option value="date">Date Added</option>
        </select>
      </div>
    </form>
    <ul class="list-group mt-3">
      <transition-group name="slide-out">
        <li v-bind:class="{ 'completed': item.completed }" class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in sortedItems" :key="item._id" @click="deleteItem(index)">
          <div>
            <img v-bind:src="item.imageUrl" class="mr-3" style="height: 2rem;" />
            {{ item.name }}
          </div>
          <input type="checkbox" v-model="item.completed" @change="markItemAsCompleted(index)" @click="(event) => event.stopPropagation()"/>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<style>
.input-group {
  margin-bottom: 1rem;
}

.slide-out-enter-active,
.slide-out-leave-active {
  transition: all .3s ease;
}
.slide-out-enter,
.slide-out-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newItem: '',
      items: [],
      error: '',
      completed: false,
      sortOrder: 'name',
      dateAdded: ' ',
    }
  },
  computed: {
    sortedItems() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties,array-callback-return
      return this.items.sort((a, b) => {
        if (this.sortOrder === 'name') {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        } else if (this.sortOrder === 'date') {
          return new Date(...a.dateAdded) - new Date(...b.dateAdded);
        }
      });
    },
  },
  watch: {
    sortOrder: function () {
      // eslint-disable-next-line no-unused-expressions
      this.sortedItems;
    },
  },
  methods: {
    async addItem() {
      try {
        if (!this.newItem) {
          this.error = 'Please enter a item';
          return;
        }

        const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${process.env.VUE_APP_GOOGLE_API_KEY}&cx=${process.env.VUE_APP_GOOGLE_CX}&q=${this.newItem}&imgSize=large&num=1&searchType=image`);

        if (typeof response.data.items === 'undefined') {
          this.error = 'This item is invalid';
          return;
        }

        const imageUrl = response.data.items[0].link;
        await axios.post('https://web-tech-projekt.herokuapp.com/api/v1/items', { name: this.newItem, imageUrl });
        this.newItem = '';
        this.error = '';
        this.items = await this.fetchItems();
      } catch (error) {
        console.error(error);
        this.error = 'Backend Error';
      }
    },
    async markItemAsCompleted(index) {
      try {
        const item = this.items[index];
        await axios.put(`https://web-tech-projekt.herokuapp.com/api/v1/items/${item.id}`, item);
        this.items = await this.fetchItems();
      } catch (error) {
        console.error(error);
        this.error = 'An error occurred';
      }
    },
    async deleteItem(index) {
      try {
        await axios.delete(`https://web-tech-projekt.herokuapp.com/api/v1/items/${this.items[index].id}`);
        this.items = await this.fetchItems();
      } catch (error) {
        console.error(error);
        this.error = 'An error occurred';
      }
    },
    async fetchItems() {
      try {
        const response = await axios.get('https://web-tech-projekt.herokuapp.com/api/v1/items');
        return response.data;
      } catch (error) {
        console.error(error);
        this.error = 'An error occurred';
      }
    },

  },
  async mounted() {
    this.items = await this.fetchItems();
  },
}
</script>
