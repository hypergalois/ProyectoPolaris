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

const selectStylesCustom = {
	control: (styles) => ({
		...styles,
		backgroundColor: "white",
		fontFamily: "Montserrat, sans-serif",
		fontWeight: "600",
		color: "#60a5fa",
		borderColor: "#60a5fa",
		borderWidth: "2px",
		"&:hover": { borderColor: "darkblue" },
	}),
	placeholder: (styles) => ({
		...styles,
		fontFamily: "Montserrat, sans-serif",
		fontWeight: "600",
		fontSize: "0.8rem",
		color: "#60a5fa",
	}),
	singleValue: (styles) => ({
		...styles,
		fontFamily: "Montserrat, sans-serif",
		fontWeight: "600",
		color: "#3b82f6",
	}),
	option: (styles) => ({ isSelected }) => ({
        ...styles,
		fontFamily: "Montserrat, sans-serif",
		fontWeight: "600",
		color: isSelected ? "white" : "#60a5fa",
    }),    
	menu: (styles) => ({
		...styles,
		backgroundColor: "white",
	}),
	menuPortal: (base) => ({
		...base,
		zIndex: 9999,
	}),
};

const courseOptions = [
	{ value: "1", label: "1º" },
	{ value: "2", label: "2º" },
	{ value: "3", label: "3º" },
	{ value: "4", label: "4º" },
	{ value: "5", label: "5º" },
];

export { rolesEnum, statusEnum, academicRoleEnum, colorsDegreesEnum, selectStylesCustom, courseOptions };
