import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { useController } from "react-hook-form";

const KeyCodes = {
	comma: 188,
	enter: 13,
	space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

// Agrega props adicionales que recibirás de react-hook-form
const TagsInputComponent = ({ control, name }) => {
	const {
		field: { onChange, value }, // Usa el método onChange para actualizar react-hook-form y value para el valor inicial
	} = useController({
		name,
		control,
	});

	const handleDelete = (i) => {
		const newTags = value.filter((tag, index) => index !== i);
		onChange(newTags); // Actualiza el valor en react-hook-form
	};

	const handleAddition = (tag) => {
		const newTags = [...value, tag];
		onChange(newTags); // Actualiza el valor en react-hook-form
	};

	return (
		<ReactTags
			tags={value || []} // Asegúrate de que value no sea undefined
			handleDelete={handleDelete}
			handleAddition={handleAddition}
			delimiters={delimiters}
		/>
	);
};

export default TagsInputComponent;
