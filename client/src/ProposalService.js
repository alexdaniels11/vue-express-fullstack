import axios from 'axios'

const url = 'api/posts/'

class ProposalService {
  // Get proposals
  static getProposals() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        )
      } catch(err) {
        reject(err)
      }
    })
  }
  // Create post
  static insertProposal(title, description, itemName, quantity, price, itemDescription) {
    return axios.post(url, {
      title,
      description,
      items: {
        item: {
          itemName,
          quantity,
          price,
          itemDescription
        }
      }
    })
  }

  // Delete post
  static deleteProposal(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default ProposalService