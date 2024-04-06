import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	borderWidth: 2,
	borderRadius: 2,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	transition: "border .3s ease-in-out",
};

const activeStyle = {
	borderColor: "#2196f3",
};

const acceptStyle = {
	borderColor: "#00e676",
};

const rejectStyle = {
	borderColor: "#ff1744",
};

const DropzoneComponent = ({ uploadedFiles, setUploadedFiles, maxFiles = 0 }) => {
	const onDrop = (acceptedFiles) => {
		const newUploadedFiles = [...uploadedFiles];
		newUploadedFiles.push(...acceptedFiles);
		setUploadedFiles(newUploadedFiles);
		console.log(newUploadedFiles);
	};

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, maxFiles });

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	const files = uploadedFiles.map((file) => <li key={file.path}>{file.name}</li>);

	return (
		<div {...getRootProps({ style })}>
			<input {...getInputProps()} />
			{uploadedFiles.length > 0 ? <ul>{files}</ul> : <p>Drag and drop your documents here.</p>}
		</div>
	);
};

export default DropzoneComponent;
