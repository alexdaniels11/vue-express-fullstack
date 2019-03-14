<template lang="pug">
  #proposals
    .page-header
      h1 My Proposals
      .create-post
        b-button(@click="onShowModalProposals" variant="primary") Create Proposal
    hr
    p.error(v-if="error") {{ error }}
    .posts
      .post(
        v-for="(post, index) in posts"
        :index="index"
        :key="post._id"
        @dblclick="deleteProposal(post._id)")
        b-card.post-content.m-1(tag="article")
          div
            | {{ `${post.createdAt.getMonth() + 1}/${post.createdAt.getDate()}/${post.createdAt.getFullYear()}` }}
            .h3 {{ post.title }}
            .post-descriptions.mb-1 {{ post.description }}
          b-button(href="#" variant="outline-primary") View
    b-modal#modalProposal(v-model="showProposalModal" ref="modalProposal" size="lg" title="Create Proposal" ok-title="Create" @shown="onShowModalProposals")
      form(@submit.stop.prevent="handleSubmit")
        label(for="createProposalTitle") Proposal Title
        b-input.mb-3#createProposalTitle(type="text" ref="createProposalTitle" v-model="title" placeholder="Proposal Title")
        label(for="createProposalDescription") Proposal Description
        b-form-textarea.mb-3#createProposalDescription(v-model="description" ref="createProposalDescription" placeholder="Enter something descriptive..." rows="3" max-rows="6")
        .row.mb-3
          .col
            label Item
            b-select(v-model="itemName" :options="itemOptions")
          .col
            label Quantity
            b-input(v-model="quantity" type="number")
          .col
            label Price per Item
            b-input(v-model="price" type="text")
        label Item Description
        b-input(v-model="itemDescription" type="text")
      div(slot="modal-footer" class="w-100")
        .float-left
          b-button(variant="outline-primary") Add Another Item
        .float-right
          b-button.mr-2(variant="secondary" @click="handleClose") Cancel
          b-button(variant="primary" @keyup.enter="handleOk" @click="handleOk") Create Proposal
</template>

<script>
import ProposalService from '../../ProposalService'

export default {
  name: 'Proposals',
  data: () => ({
    title: '',
    description: '',
    itemName: null,
    itemOptions: [
      { value: null, text: 'Please select an item', disabled: true },
      { value: 'Bouquet', text: 'Bouquet' },
      { value: 'Boutonniere', text: 'Boutonniere' },
      { value: 'Corsage', text: 'Corsage' },
      { value: 'Center Piece', text: 'Center Piece' }
    ],
    quantity: '',
    price: '',
    itemDescription: '',
    error: '',
    posts: [],
    showProposalModal: false
  }),
  async created() {
    try {
      this.posts = await ProposalService.getProposals()
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    async createProposal() {
      await ProposalService.insertProposal(this.title, this.description, this.itemName, this.quantity, this.price, this.itemDescription)
      this.title = ''
      this.description = ''
      this.itemName = ''
      this.quantity = ''
      this.price = ''
      this.itemDescription = ''
      this.posts = await ProposalService.getProposals()
    },
    async deleteProposal(id) {
      await ProposalService.deleteProposal(id)
      this.posts = await ProposalService.getProposals()
    },
    onShowModalProposals() {
      this.title = ''
      this.description = ''
      this.itemName = ''
      this.quantity = ''
      this.price = ''
      this.itemDescription = ''
      this.showProposalModal = true
      this.$refs.createProposalTitle.focus()
    },
    handleOk(evt) {
      evt.preventDefault()
      if (!this.title || !this.description) {
        alert('Please fill in all fields.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit() {
      this.createProposal()
      this.showProposalModal = false
    },
    handleClose() {
      this.title = ''
      this.description = ''
      this.itemName = ''
      this.quantity = ''
      this.price = ''
      this.itemDescription = ''
      this.showProposalModal = false
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
  overflow: auto;

  .post {
    display: flex;
    flex-basis: 250px;
    flex-grow: 1;

    .post-content {
      width: 100%;

      .card-body {
        display: flex;
        flex-direction: column;

        .btn {
          margin-top: auto;
        }

        .post-descriptions {
          color: #aaa;
          font-weight: 100;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; 
          width: 75%;
        }
      }
    }
  }
}

#modalProposal {
  .modal-body {
    max-height: 60vh;
    overflow: auto;
  }
}
</style>
