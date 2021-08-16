import { useEffect, useState, useMemo, useRef } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Select from "./components/Select";
import { filter } from "./services/filter";
import { sort } from "./services/sort";

function App() {

  const [selectedSort, setSelectedSort] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [selectedTypeSort, setSelectedTypeSort] = useState("")
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [pageAmount, setPageAmount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [posts, setPosts] = useState([
    { id: 1, date: 1629154621288, name: "ааааа", amount: 22, distance: 500 },
    { id: 2, date: 1629117621288, name: "вввв", amount: 44, distance: 12312 },
    { id: 3, date: 1629194621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 4, date: 1629114631288, name: "ааааа", amount: 22, distance: 500 },
    { id: 5, date: 1629114121288, name: "вввв", amount: 44, distance: 12312 },
    { id: 6, date: 1620114621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 7, date: 1625114621288, name: "ааааа", amount: 22, distance: 500 },
    { id: 8, date: 1629714621288, name: "вввв", amount: 44, distance: 12312 },
    { id: 9, date: 1629174621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 10, date: 1629214621288, name: "ааааа", amount: 22, distance: 500 },
    { id: 11, date: 1629114721288, name: "вввв", amount: 44, distance: 12312 },
    { id: 12, date: 1629111621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 13, date: 1629014621288, name: "ааааа", amount: 22, distance: 500 },
    { id: 14, date: 1629914621288, name: "вввв", amount: 44, distance: 12312 },
    { id: 15, date: 1629104621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 16, date: 1629114021288, name: "ааааа", amount: 22, distance: 500 },
    { id: 17, date: 1629110621288, name: "вввв", amount: 44, distance: 12312 },
    { id: 18, date: 1629184621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 19, date: 1629164621288, name: "ааааа", amount: 22, distance: 500 },
    { id: 20, date: 1629114221288, name: "вввв", amount: 44, distance: 12312 },
    { id: 21, date: 1629174621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 22, date: 1629114521288, name: "ааааа", amount: 22, distance: 500 },
    { id: 23, date: 1629114621288, name: "вввв", amount: 44, distance: 12312 },
    { id: 24, date: 1629124621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 25, date: 1629114921288, name: "бббб", amount: 87, distance: 7978 },
    { id: 26, date: 1629117621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 27, date: 1629112621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 28, date: 1629117621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 29, date: 1629119621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 30, date: 1629114821288, name: "бббб", amount: 87, distance: 7978 },
    { id: 31, date: 1629116621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 32, date: 1629111621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 33, date: 1629214621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 34, date: 1629114221288, name: "бббб", amount: 87, distance: 7978 },
    { id: 35, date: 1629113621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 36, date: 1629114721288, name: "бббб", amount: 87, distance: 7978 },
    { id: 37, date: 1629104621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 38, date: 1629914621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 39, date: 1629814621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 40, date: 1629714621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 41, date: 1629614621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 42, date: 1629514621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 43, date: 1629414621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 44, date: 1629314621288, name: "бббб", amount: 87, distance: 7978 },
    { id: 45, date: 1629114621288, name: "бббб", amount: 87, distance: 7978 },
  ])

  let emergencyRation = useRef(posts)       //для устранения точки невозврата
                                            //когда установленные параметры фильтров
  const reload = () => {                    //возвращают пустой список постов
    setPosts(emergencyRation.current);      //(без перезагрузки страницы)
  }

  useEffect(() => {
    setPageAmount(Math.ceil(posts.length / 7))
  }, [posts])

  let pagesArray = []
  for (let i = 0; i < pageAmount; i++) {
    pagesArray.push(i + 1)
  }

  const currentPosts = useMemo(() => {
    if (!posts) {
      return null
    } else {
      let currentIndexes = []
      for (let i = currentPage * 7 - 7; i < currentPage * 7; i++) {
        currentIndexes.push(i)
      }
      return posts.filter((el, i) => currentIndexes.includes(i))
    }
  }, [posts, currentPage])

  return (
    <div className="App">
      <div className={"container"}>
        <div className={"sort"}>
          <Select
            value={selectedSort}
            onChange={sort => setSelectedSort(sort)}
            defaultValue="Выберите колонку"
            options={[
              { value: "name", name: "По названию" },
              { value: "amount", name: "По количеству" },
              { value: "distance", name: "По расстоянию" }
            ]}
          />
          <Select
            value={selectedTypeSort}
            defaultValue="Выберите условие"
            onChange={sortType => setSelectedTypeSort(sortType)}
            options={[
              { value: "more", name: "По возрастанию" },
              { value: "less", name: "По убыванию" }
            ]}
          />
          <button 
            className={"buttonSF"}
            disabled={!selectedSort || !selectedTypeSort}
            onClick={() => sort(selectedTypeSort, selectedSort, posts, setPosts)}
          >sort</button>
        </div>
        <div className={"filter"}>
          <Select
            value={selectedFilter}
            onChange={filter => setSelectedFilter(filter)}
            defaultValue="Выберите колонку"
            options={[
              { value: "date", name: "По дате" },
              { value: "name", name: "По названию" },
              { value: "amount", name: "По количеству" },
              { value: "distance", name: "По расстоянию" },
            ]}
          />
          <Select
            value={selectedTypeFilter}
            defaultValue="Выберите условие"
            onChange={filterType => setSelectedTypeFilter(filterType)}
            options={[
              { value: "more", name: "Больше заданного" },
              { value: "less", name: "Меньше заданного" },
              { value: "equals", name: "Равняется заданному" },
              { value: "contains", name: "Содержит заданное" },
            ]}
          />
          <input
            placeholder={"задайте значение"}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }
            }></input>
          <button 
            className={"buttonSF"}
            disabled={!selectedFilter || !selectedTypeFilter || !inputValue}
            onClick={() => filter(selectedTypeFilter, selectedFilter, setPosts, posts, inputValue)}
          >filter</button>
        </div>
      </div>
      <Header />
      <hr style={{ margin: "15px 0" }} /> 
      <List posts={currentPosts} reload={reload}/>
      <div className={"containerPagesBtns"}>
        {
          pagesArray.map(el =>
            <button 
              className={"pagesButton"} 
              disabled={el === currentPage} 
              onClick={() => setCurrentPage(el)} 
              key={el}
            >{el}</button>
          )
        }
      </div>
    </div>
  );
}

export default App;
