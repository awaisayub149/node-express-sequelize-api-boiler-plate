/**
 * lib fileUploader.js
 *
 * Uploads the files to S3. Sperate export for images and documents
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */


 const S3FS = require('s3fs');

let uploadToS3 = async (file, name, path) => {
  let client = new S3FS ( process.env.AWS_BUCKET + path, {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  let status = await client.writeFile(name, file.buffer, {"ContentType": file.mimetype});
  console.log("https://s3.amazonaws.com/" + client.getPath(name))
  return "https://s3.amazonaws.com/" + client.getPath(name);
}

module.exports = (file, document) => {
  
  let url = "/transactions/"+document.transactionId+"/";
  return uploadToS3(file, document.id+"-"+document.name, url);
}