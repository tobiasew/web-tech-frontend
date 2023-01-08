<template>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
          <h3 class="float-md-start mb-0">Fresh Find</h3>
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <router-link class="nav-link fw-bold py-1 px-0" to="/">Home</router-link>
            <router-link class="nav-link fw-bold py-1 px-0" to="/items">Items</router-link>
          </nav>
        </div>
      </header>

      <main class="px-3">
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <router-view />
        </transition>
      </main>

      <footer class="mt-auto text-white-50">
        <p>Made by <a href="https://github.com/tobiasewald" class="text-white">Tobias Ewald</a> </p>
      </footer>
    </div>
</template>

<style>

</style>
