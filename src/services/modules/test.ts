import axios from 'axios'

const test = () => {
  const getData = () => {
    return axios.get('https://jsonplaceholder.typicode.com/todos')
  }

  return {
    getData
  }
}

export default test()
