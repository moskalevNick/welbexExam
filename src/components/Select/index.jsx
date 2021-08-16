import React from "react"
import "./styles.css"

const Select = ({ options, defaultValue, value, onChange }) => {

	return (
		<div>
			<select
				className={"select"}
				value={value}
				onChange={(e) => (onChange(e.target.value))}
			>
				<option disabled value="">{defaultValue}</option>
				{options.map(option =>
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				)}
			</select>
		</div>
	)
}

export default Select