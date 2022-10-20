const { uploadFile } = require("./storage");
const sharp = require('sharp');

(async () => {
    let destFile = "output.webp";
    let srcFile = "input.jpg";

    const maxWidth = 1920;
    const pathPrefix = "test/";

    // resize to maxWidth, convert to webp
    const metadata = await sharp(srcFile).metadata();
    const width = (metadata.width > maxWidth) ? maxWidth : metadata.width;

    const buffer = await sharp(srcFile)
        .resize(width).webp().toBuffer();

    await sharp(buffer).toFile(destFile);

    const dataPath = `${pathPrefix}${destFile}`;

    try {
        await uploadFile(destFile, dataPath);
    } catch (error) {
        console.log(error);
    }
    console.log("uploaded");
})()
