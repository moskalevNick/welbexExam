import React from "react"
import Item from "../Item"
import "./styles.css"

const List = ({ posts, reload }) => {

	if (posts.length === 0) {
		return (
			<div className={"noPosts"}>
				<h1>Посты не найдены</h1>
				<button onClick={() => reload()}>вернуться к начальному массиву данных</button>
			</div>
		)
	}

	return (
		<div className={"list"}>
			{
				posts.map((el) => (
					<Item key={el.id} el={el}/>
				))
			}
		</div>
	)
}

export default List