import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
	padding: 0 16px;
`;

const StepContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 70px;
	position: relative;
	:before {
		content: "";
		position: absolute;
		background: #f3e7f3;
		height: 4px;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		z-index: 0; /* Ensure the base line is below the steps */
	}
	:after {
		content: "";
		position: absolute;
		background: #4a154b;
		height: 4px;
		width: ${({ width }) => width};
		top: 50%;
		transition: 0.4s ease;
		transform: translateY(-50%);
		left: 0;
		z-index: 0; /* Ensure the progress line is below the steps */
	}
`;

const StepWrapper = styled.div`
	position: relative;
	z-index: 1; /* Ensure the steps are above the progress line */
`;

const StepStyle = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #ffffff;
	border: 3px solid ${({ isCompleted }) => (isCompleted ? "#4A154B" : "#F3E7F3")};
	transition: 0.4s ease;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StepCount = styled.span`
	font-size: 19px;
	color: ${({ isCompleted }) => (isCompleted ? "#4A154B" : "#F3E7F3")};
	@media (max-width: 600px) {
		font-size: 16px;
	}
`;

const StepLabel = styled.span`
	display: block;
	text-align: center;
	font-size: 19px;
	color: #4a154b;
	margin-top: 8px;
	@media (max-width: 600px) {
		font-size: 16px;
	}
`;

const steps = [
	{ label: "Address", step: 1 },
	{ label: "Shipping", step: 2 },
	{ label: "Payment", step: 3 },
	{ label: "Summary", step: 4 },
];

const ProgressSteps = ({ currentStep }) => {
	const totalSteps = steps.length;
	const width = `${(100 / (totalSteps - 1)) * (currentStep - 1)}%`;

	return (
		<MainContainer>
			<StepContainer width={width}>
				{steps.map(({ step, label }) => (
					<StepWrapper key={step}>
						<StepStyle isCompleted={currentStep >= step}>
							<StepCount isCompleted={currentStep >= step}>{step}</StepCount>
						</StepStyle>
						<StepLabel>{label}</StepLabel>
					</StepWrapper>
				))}
			</StepContainer>
		</MainContainer>
	);
};

export default ProgressSteps;
