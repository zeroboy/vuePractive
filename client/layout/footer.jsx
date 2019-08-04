import '../assets/styles/footer.css'

export default {
  data () {
    return {
      author: 'zeroboy'
    }
  },
  render (h) {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
