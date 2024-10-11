import Products from "./components/Products"
import Projects from "./components/Projects"
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

  return (
    <>
    {/* <Todos /> */}
    {/* <Projects /> */}
    <Products />
    </>
  )
}

export default App
