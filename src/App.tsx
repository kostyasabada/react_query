import Todos from "./components/Todo"

function App() {

  //old
  // useEffect(() => {
  //   axios.get('http://localhost:8080/todos').then((response) => {
  //     setData(response.data)
  //   }).catch((err) => {
  //     console.log((err));
      
  //   });
  // })

  return <Todos />
}

export default App
