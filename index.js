const { uploadFile } = require("./storage");
const sharp = require('sharp');

(async () => {
    let destFile = "output.webp";
    let srcFile = "input.jpg";

    const maxWidth = 1920;
    const maxHeight = 1080;
    const pathPrefix = "test/";

    // resize and convert to webp
    const metadata = await sharp(srcFile).metadata();

    let ratioX = maxWidth / metadata.width;
    let ratioY = maxHeight / metadata.height;
    let ratio = Math.min(ratioX, ratioY);
    let newWidth = Math.round(metadata.width * ratio);
    let newHeight = Math.round(metadata.height * ratio);

    const buffer = await sharp(srcFile)
        .resize(newWidth, newHeight).webp().toBuffer();

    await sharp(buffer).toFile(destFile);

    const dataPath = `${pathPrefix}${destFile}`;

    try {
        await uploadFile(destFile, dataPath);
    } catch (error) {
        console.log(error);
    }
    console.log("uploaded");
})()
