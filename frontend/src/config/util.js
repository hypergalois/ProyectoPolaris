const rolesEnum = {
	ADMIN: "ADMIN",
	CREATOR: "CREATOR",
	USER: "USER",
};

const statusEnum = {
	PENDING: "PENDING",
	ACCEPTED: "ACCEPTED",
	REJECTED: "REJECTED",
};

const academicRoleEnum = {
	ALUMN: "ALUMN",
	ALUMNI: "ALUMNI",
	PROFESSOR: "PROFESSOR",
	COORDINATOR: "COORDINATOR",
	EMPLOYEE: "EMPLOYEE",
};

const colorsDegreesEnum = {
	DIGITAL_DESIGN: "#e83a57",
	ANIMATION: "#ffe802",
	ALTERNATIVE: "#f3ce00",
	INTERACTIVE_PRODUCTS: "#6a3ec5",
	INSO: "#46b6b6",
	MAIS: "#81c298",
	// OJO CICLOS
	MULTIPLATFORM_APPLICATIONS: "#4fbbea",
	INTERACTIVE_ENVIRONMENTS: "#c2d14b",
};

const selectStyles = {
	control: (provided) => ({
		...provided,
		width: "100%",
		minHeight: "48px",
		height: "48px",
		outline: "none",
		border: "none",
		backgroundColor: "transparent",
		paddingTop: "8px",
		color: "#3498db",
		boxShadow: "none",
		borderRadius: "1rem",
		borderColor: "transparent",
		"&:hover": {
			borderColor: "transparent",
		},
		"&:focus": {
			outline: "none",
			borderColor: "transparent",
			boxShadow: "none",
		},
	}),
	valueContainer: (provided) => ({
		...provided,
		height: "48px",
		padding: "0 6px",
	}),
	input: (provided) => ({
		...provided,
		margin: "0px",
		color: "#3498db",
		fontSize: "0.75rem",
		fontWeight: "bold",
	}),
	placeholder: (provided) => ({
		...provided,
		color: "#3498db",
		fontSize: "0.75rem",
		fontWeight: "bold",
	}),
	indicatorsContainer: (provided) => ({
		...provided,
		height: "48px",
	}),
	singleValue: (provided) => ({
		...provided,
		color: "#3498db",
		fontSize: "0.75rem",
		fontWeight: "bold",
	}),
};

export { rolesEnum, statusEnum, academicRoleEnum, colorsDegreesEnum, selectStyles };
