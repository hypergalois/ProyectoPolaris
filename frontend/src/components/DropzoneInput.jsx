import { useState, useEffect, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from 'react-hook-form'

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

const DropzoneInput = ({ name, ...rules }) => {
    const {
        register,
        unregister,
        setValue,
        setError,
        watch
    } = useFormContext();

    const onDrop = useCallback(
        (droppedFiles) => {
            if (droppedFiles?.[0]?.path){
                setValue(name, droppedFiles);
            }
        },
        [setValue, name]
    );

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        ...rules
    });

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

    useEffect(() => {
        register(name)
        return () => {
            unregister(name)
        }
    }, [register, unregister, name]);

    const files = watch(name);

    useEffect(() => {
        if (fileRejections) {
            fileRejections.map(({ file, errors }) => {
                errors.map(err => {
                    const error = { type: err.code, message: err.message };
                    if (err.code === "too-many-files") {
                        const maxNumFiles = rules.maxFiles;
                        error.message = (maxNumFiles == 1 ? 
                            "Se han proporcionado demasiados archivos, solo se subirá el primero de ellos" :
                            `Se han proporcionado demasiados archivos, solo se subirán los ${maxNumFiles} primeros`
                        );
                    }
                    setError(name, error);
                });
            });
        }
    }, [fileRejections]);

    const [acceptedFilesList, setAcceptedFilesList] = useState(null);
    useEffect(() => {
        if (files?.length > 0) {
            console.log(files);
            const filesList = (
                <ul>
                    { files.map(file => <li key={`${file?.path}`}>{file?.name ? file.name : "Archivo"}</li>) }
                </ul>
            );
            setAcceptedFilesList(filesList);
        }
    }, [files]);

	return (
		<div {...getRootProps({ style })}>
			<input
                {...getInputProps()}
            />
			{acceptedFilesList ?
                acceptedFilesList :
                <p>Drag and drop your documents here.</p>}
		</div>
	);
};

export default DropzoneInput;
