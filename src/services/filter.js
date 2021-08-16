export const filter = (selectedTypeFilter, selectedFilter, setPosts, posts, inputValue) => {
    switch (selectedTypeFilter) {
        case "more":
          if (selectedFilter === "name") {
            alert("несовместимые параметры")
          } else {
            setPosts([...posts].filter((el) => inputValue <= el[selectedFilter]))
          }
          break
  
        case "less":
          if (selectedFilter === "name") {
            alert("несовместимые параметры")
          } else {
            setPosts([...posts].filter((el) => inputValue >= el[selectedFilter]))
          }
          break
  
        case "equals":
          setPosts([...posts].filter((el) => inputValue === el[selectedFilter].toString()))  //оба параметра в строковом формате всегда
          break
  
        case "contains":
          setPosts([...posts].filter((el) => el[selectedFilter].toString().includes(inputValue))) //оба параметра в строковом формате всегда
          break
  
        default:
          console.log('error!');
          break
      }
}