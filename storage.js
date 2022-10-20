// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

const storageOption = (process.env.GOOGLE_SERVICE_ACCOUNT_KEYFILE !== undefined) ? { keyFilename: process.env.GOOGLE_SERVICE_ACCOUNT_KEYFILE } : {};
// Creates a client from a Google service account key
const storage = new Storage(storageOption);

const bucketName = process.env.BUCKET_NAME || "my-bucket";

async function uploadFile(filePath, uploadPath) {
    let options = {
        destination: uploadPath
    };

    try {
        await storage.bucket(bucketName).upload(filePath, options);
    } catch (error) {
        throw new Error(error);
    }
    // console.log(`${filePath} uploaded to ${bucketName}`);
}
async function getFileAcl(fileName) {
    // Gets the ACL for the file
    const [acls] = await storage.bucket(bucketName).file(fileName).acl.get();

    return acls;
}

async function deleteFileAcl(fileName, entity) {
    let apiResponse;
    try {
        apiResponse = await storage.bucket(bucketName).file(fileName).acl.delete({
            entity: entity
        });
    } catch (error) {
        throw new Error(error);
    }
}

function addFileAcl(fileName, entity, role) {
    let apiResponse;
    try {
        apiResponse = storage.bucket(bucketName).file(fileName).acl.add({
            entity: entity,
            role: role
        });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    uploadFile,
    addFileAcl,
    getFileAcl,
    deleteFileAcl,
    storage,
};