import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  increasePages = () => {
    const {getData, totalPages} = this.props
    this.setState(
      prev => {
        if (prev.pageNo < totalPages) {
          return {
            pageNo: prev.pageNo + 1,
          }
        }
        return prev
      },
      () => {
        const {pageNo} = this.state
        getData(pageNo)
      },
    )
  }

  goingBackfromPage = () => {
    const {getData} = this.props
    this.setState(
      prev => {
        if (prev.pageNo > 1) {
          return {
            pageNo: prev.pageNo - 1,
          }
        }
        return prev
      },
      () => {
        const {pageNo} = this.state
        getData(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <div className="pages-container">
        <button className="btns" type="button" onClick={this.goingBackfromPage}>
          Prev
        </button>
        <p className="page">{pageNo}</p>
        <button className="btns" type="button" onClick={this.increasePages}>
          Next
        </button>
      </div>
    )
  }
}
export default Pagination
