import React from "react"
import "./styles.css"

const Header = () => {

	return (
		<div>
			<ul className={"header"}>
				<li>Дата</li>
				<li>Название</li>
				<li>Количество</li>
				<li>Расстояние</li>
			</ul>
		</div>
	)
}

export default Header