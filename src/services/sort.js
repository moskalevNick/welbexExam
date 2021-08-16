export const sort = (selectedTypeSort, selectedSort, posts, setPosts) => {
    switch (selectedTypeSort) {
    case "more":
      if (selectedSort === "name") {
        setPosts([...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort])))
      } else {
        setPosts([...posts].sort((a, b) => a[selectedSort] - b[selectedSort]))
      }
      break

    case "less":
      if (selectedSort === "name") {
        setPosts([...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort])).reverse())
      } else {
        setPosts([...posts].sort((a, b) => a[selectedSort] - b[selectedSort]).reverse())
      }
      break

    default:
      console.log('error!');
      break
  }
}