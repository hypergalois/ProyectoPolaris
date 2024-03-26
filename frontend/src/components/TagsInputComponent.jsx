import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { useController } from "react-hook-form";

import "../styles/react-tags.css";

const COUNTRIES = ["CHILE", "ARGENTINA", "BOLIVIA", "BRASIL", "COLOMBIA", "ECUADOR", "PARAGUAY", "PERÚ", "URUGUAY", "VENEZUELA"];

// Suponiendo que COUNTRIES es un array de países o cualquier otra fuente de sugerencias que prefieras
const suggestions = COUNTRIES.map((country) => ({
	id: country,
	text: country,
}));

const KeyCodes = {
	comma: 188,
	enter: 13,
	space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

const TagsInputComponent = ({ control, name, placeholder = "Agregar tags...", disableBackspaceRemove = false, onExisting, onRemoved, isEditOnRemove = false, beforeAddValidate, classNames }) => {
	const {
		field: { onChange, value },
	} = useController({ name, control });

	const handleDelete = (i) => {
		const tagRemoved = value[i];
		const newTags = value.filter((_, index) => index !== i);
		onChange(newTags); // Actualiza el valor en react-hook-form
		if (onRemoved) onRemoved(tagRemoved.text); // Callback al remover
	};

	const handleAddition = (tag) => {
		if (
			beforeAddValidate &&
			!beforeAddValidate(
				tag.text,
				value.map((t) => t.text)
			)
		) {
			return; // Si beforeAddValidate retorna false, no añadir la etiqueta
		}
		if (value.find((t) => t.text === tag.text)) {
			if (onExisting) onExisting(tag.text); // Callback si la etiqueta ya existe
			return;
		}
		const newTags = [...value, tag];
		onChange(newTags); // Actualiza el valor en react-hook-form
	};

	return (
		<ReactTags
			tags={value || []}
			placeholder={placeholder}
			suggestions={suggestions}
			autocomplete={true}
			handleDelete={handleDelete}
			handleAddition={handleAddition}
			inputFieldPosition="inline"
			delimiters={delimiters}
			allowDeleteFromEmptyInput={!disableBackspaceRemove}
			classNames={classNames}
			editable={true}
			maxTags={15}
		/>
	);
};

export default TagsInputComponent;
