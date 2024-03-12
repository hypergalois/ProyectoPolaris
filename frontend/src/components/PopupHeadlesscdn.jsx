import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAreas } from "../context/AreasContext";
import { useEffect } from "react";
import Select from "react-select";

const selectStyles = {
	control: (provided) => ({
		...provided,
		minHeight: "48px",
		height: "48px",
		boxShadow: "none",
		borderRadius: "1rem",
		borderColor: "#000000",
	}),
	valueContainer: (provided) => ({
		...provided,
		height: "48px",
		padding: "0 6px",
	}),
	input: (provided) => ({
		...provided,
		margin: "0px",
	}),
	indicatorsContainer: (provided) => ({
		...provided,
		height: "48px",
	}),
};

export default function MyModal({ openPopup, closePopup, initialRegistrationData }) {
	const {
		register,
		control,
		handleSubmit,
		watch,
		clearErrors,
		setError,
		setValue,
		formState: { errors },
	} = useForm();
	// Pongo registerUser para evitar colisiones con el hook register
	const { register: registerUser, isAuthenticated, errors: registerErrors } = useAuth();
	const { degrees, getDegrees, errors: areasErrors } = useAreas();
	const navigate = useNavigate();

	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [showValidation, setShowValidation] = useState(false);

	const password = watch("password");
	const password2 = watch("password2");

	// Queremos que se muestre el mensaje de error si el usuario ha escrito algo en los campos de contraseña en ambos campos
	useEffect(() => {
		if (password && password2) {
			setShowValidation(true);
		}

		const match = password === password2 && password?.length > 0;
		setPasswordsMatch(match);
	}, [password, password2, clearErrors, setError, showValidation]);

	// Esto ya no lo consiguemos del location sino que lo pasamos por props
	// const { email, fullName } = location.state || {};
	const { email, fullName } = initialRegistrationData || { email: "", fullName: "" };
	console.log(email, fullName);
	// console.log(location.state);

	// TODO LO QUITO POR AHORA
	const isEmailUtad = email.endsWith("@u-tad.com");
	const isEmailLive = email.endsWith("@live.u-tad.com");
	// const isUdEmailUtad = false;
	// const isUdEmailLive = true;

	// No entiendo que signfica 1, puede que se corresponda en el enum pero no es nada legible, TODO CAMBIARLO
	const [academicRole, setAcademicRole] = useState("1"); // Define academicRole state

	const departments = [];

	const [degreeOptions, setDegreeOptions] = useState([]);

	const years = [];

	for (let year = 2012; year <= 2025; year++) {
		years.push(year + "/" + (year + 1));
	}

	const handleAcademicRoleChange = (event) => {
		setAcademicRole(event.target.value);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		getDegrees();
	}, []);

	useEffect(() => {
		if (degrees) {
			const newDegreeOptions = degrees.map((degree) => ({
				value: degree.id,
				label: degree.name,
			}));
			setDegreeOptions(newDegreeOptions);
		}
	}, [degrees]);

	const onSubmit = async (data) => {
		data.username = !data.username ? email.split("@")[0] : data.username;
		console.log(data);
		console.log("Registrando usuario");
		// data.user = !data.user ? data.email.split("@")[0] : data.user;
		// await registerUser(data);
		closePopup();
	};

	return (
		<>
			<Transition appear show={openPopup} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closePopup}>
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
										{title}
									</Dialog.Title>
									{children}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
