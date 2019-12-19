/**
 * lib uploader.js
 *
 * Uploads the files to S3. Sperate export for images and documents
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */


const S3FS = require('s3fs');

const saveImage = async (img, url, ext) => {
    let data = img.toString().replace(/^data:image\/\w+;base64,/, '').replace(/\\n/g, "");
    try {
        let name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6) + "." + ext;
        return await uploadToS3(data, name, url);

    } catch (e) {
        console.log(e);
        return null;
    }
}

let uploadToS3 = async (data, name, path) => {
    let client = new S3FS(process.env.AWS_BUCKET + path, {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    var buffer = Buffer.from(data, 'base64');
    let status = await client.writeFile(name, buffer);

    return "https://s3.amazonaws.com/" + client.getPath(name);
}

module.exports = (base64, user) => {
    let url = "/profile";
    let type = user.constructor.name.toLowerCase();
    url += "/" + type + "s/" + user.id + "/";
    let ext = base64.substring("data:image/".length, base64.indexOf(";base64"));

    return saveImage(base64, url, ext);
}