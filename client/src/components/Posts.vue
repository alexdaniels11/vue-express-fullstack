<template lang="pug">
  .container
    h1 {{ msg }}
    .create-post
      label(for="createPost") Say Something...
      input#createPost(type="text" v-model="text" placeholder="Create a post")
      button(@click="createPost") Post
    hr
    p.error(v-if="error") {{ error }}
    .posts
      .post(v-for="(post, index) in posts" :item="post" :index="index" :key="post._id" @dblclick="deletePost(post._id)")
        span {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        p.text {{ post.text }}
</template>

<script>
import PostService from '../PostService'

export default {
  name: 'Posts',
  data: () => ({
    text: '',
    error: '',
    posts: []
  }),
  async created() {
    try {
      this.posts = await PostService.getPosts()
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text)
      this.posts = await PostService.getPosts()
    },
    async deletePost(id) {
      await PostService.deletePost(id)
      this.posts = await PostService.getPosts()
    }
  },
  props: {
    msg: String
  }
}
</script>
