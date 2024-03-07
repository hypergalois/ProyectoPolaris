function VerifyEmailPage() {
	return (
		<>
			<div className="text-center grid min-h-full place-items-center px-6 my-16 py-32 sm:py-32 lg:px-8">
				<p className="text-base font-semibold text-blue-600">Verificacion</p>
				<h1 className="mt-4 text-8xl font-bold tracking-tight text-[#858585] sm:text-5xl">Verifica tu email</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">Por favor, haz click en el link que hemos enviado a tu correo (checkea el spam)</p>
				<div className="mt-10 items-center justify-center">
					<Button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
						Reenviar email
					</Button>
				</div>
			</div>
		</>
	);
}

export default VerifyEmailPage;
