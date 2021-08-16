import React from "react"
import "./styles.css"

const Item = ({el}) => {	

	const date = new Date(el.date)

	return (
		<div className={"item"}>
			<div className={"text"}>{date.getFullYear()+" "+date.getMonth()+" "+date.getDate()}</div>
			<div className={"text"}>{el.name}</div>
			<div className={"text"}>{el.amount}</div>
			<div className={"text"}>{el.distance}</div>
		</div>
	)
}

export default Item