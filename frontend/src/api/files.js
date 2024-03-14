
export const getFile = (filePath) => {
    const fs = require('fs');

    const file = fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return null;
        }

        const fileName = 'archivo'; // Nombre del archivo sin extensión
        const extension = filePath.split('.').pop(); // Obtener la extensión del archivo
        const type = `application/${extension}`; // Establecer el tipo MIME basado en la extensión

        const file = new File([data], fileName, { type: type });
        console.log('Objeto File creado:', file);
        return file;
        });
    return file;
}
