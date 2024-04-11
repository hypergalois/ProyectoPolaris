import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("__dirname", __dirname);

const getSaveDirectory = () => {
	const railwayVolumeMountPath = process.env.RAILWAY_VOLUME_MOUNT_PATH || process.env.FILE_UPLOAD_PATH;
	// Me da muchos problemas path con el doble slash
	// const basePath = railwayVolumeMountPath ? railwayVolumeMountPath : path.join(__dirname, "uploads");
	const basePath = railwayVolumeMountPath ? railwayVolumeMountPath : __dirname + "/uploads";
	return basePath.endsWith("/") ? basePath : `${basePath}/`;
	// return basePath;
};

const saveDirectory = getSaveDirectory();
console.log("saveDirectory", saveDirectory);

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		console.log("Desde destination: req.files", req.files);
		if (req.files.folderId) {
			const destinationPath = saveDirectory + req.files.folderId;
			console.log("destinationPath desde if", destinationPath);
			callback(null, destinationPath);
		} else {
			const newFolderId = uuidv4(); // Generar un nuevo ID único
			req.files.folderId = newFolderId;
			const destinationPath = saveDirectory + newFolderId;
			console.log("destinationPath desde else", destinationPath);
			fs.mkdirSync(destinationPath, { recursive: true });
			callback(null, destinationPath);
		}
	},
	filename: function (req, file, callback) {
		console.log("Desde filename: req.files", req.files);
		console.log("file.originalname", file.originalname);
		if (file.originalname.split(".")[0] === "thumbnail" || file.originalname.split(".")[0] === "summary"){
			callback(null, file.originalname);
		} else {
			const ext = path.extname(file.originalname);
			const filename = file.originalname + ext;
			console.log("filename", filename);
			callback(null, filename);
		}
	},
});

export const uploadFile = multer({ storage });
