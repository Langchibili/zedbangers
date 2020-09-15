var Jimp = require('jimp');

module.exports = {
  imageResizer: function (imageUri, imageName, imageExt){
    Jimp.read(imageUri)
    .then(pic => {
        return pic
        .resize(500, 270) // resize
        .quality(60) // set JPEG quality
        .write(imageName.replace("."+imageExt, "-500-270."+imageExt)); // save
    }).then(pic => {
        return pic
        .resize(160, 155) // resize
        .quality(60) // set JPEG quality
        .write(imageName.replace("."+imageExt, "-160-155."+imageExt)); // save
    }).then(pic => {
        return pic
        .resize(60, 60) // resize
        .quality(60) // set JPEG quality
        .write(imageName.replace("."+imageExt, "-60-60."+imageExt)); // save
    })
    .catch(err => {
        console.error(err);
    });    
  }
}


