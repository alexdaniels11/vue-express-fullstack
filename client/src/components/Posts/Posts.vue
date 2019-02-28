<template lang="pug">
  div
    .page-header
      h1 My Proposals
      .create-post
        b-input.mb-2.mr-sm-2.mb-sm-0#createPost(type="text" ref="addposts" v-model="text" placeholder="Create a post" @keyup.enter="createPost")
        b-button(@click="createPost" variant="primary") Add Proposal
    hr
    p.error(v-if="error") {{ error }}
    .posts
      .post(
        v-for="(post, index) in posts"
        :index="index"
        :key="post._id"
        @dblclick="deletePost(post._id)")
        b-card.post-content.m-1(
          :title="post.text"
          tag="article")
          b-card-text
            | {{ `${post.createdAt.getMonth() + 1}/${post.createdAt.getDate()}/${post.createdAt.getFullYear()}` }}

          b-button(href="#" variant="outline-primary") View
</template>

<script>
import PostService from '../../PostService'

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
      this.text = ''
      this.$refs.addposts.focus();
      this.posts = await PostService.getPosts()
    },
    async deletePost(id) {
      await PostService.deletePost(id)
      this.posts = await PostService.getPosts()
    }
  }
}
</script>

<style lang="scss">
.page-header {
  align-items: center;
  display: flex;

  h1 {
    margin: 0;
  }

  .create-post {
    display: flex;
    flex-direction: row;
    margin-left: auto;

    .btn {
      white-space: nowrap;
    }
  }
}

.posts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .post {
    display: flex;
    flex-basis: 200px;
    flex-grow: 1;

    .post-content {
      width: 100%;

      .card-body {
        display: flex;
        flex-direction: column;

        .btn {
          margin-top: auto;
        }
      }
    }
  }
}
</style>
