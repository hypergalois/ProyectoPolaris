import { useEffect, useCallback, useMemo } from "react";
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

const DropzoneInput = (props) => {
    const { name, label = name } = props;

    const {
        register,
        unregister,
        setValue,
        watch,
    } = useFormContext();

    const files = watch(name);

    useEffect(() => {
        console.log(files);
        console.log(watch(name));
    }, [files, name]);

    const onDrop = useCallback(
        (droppedFiles) => {
          setValue(name, droppedFiles, { shouldValidate: true })
        },
        [setValue, name]
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: props.accept,
        maxFiles: props.maxfiles
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

	return (
		<div {...getRootProps({ style })}>
			<input
                {...props}
                {...getInputProps()}
            />
			{files?.length > 0 ?
                <ul>
                    { files.map(({ file, index }) => <li key={`${index}_${file.path}`}>{file?.name ? file.name : file.path}</li>) }
                </ul> :
                <p>Drag and drop your documents here.</p>}
		</div>
	);
};

export default DropzoneInput;
