const api_url = require("../utilities/constants/api");  // constant
const ffmpeg_path = require("../utilities/constants/ffmpeg_path"); // constant
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpeg_path.ffmpeg)  
ffmpeg.setFfprobePath(ffmpeg_path.ffprobe) 
ffmpeg.setFlvtoolPath(ffmpeg_path.ffplay)
const imageResizer = require('./image-processing').imageResizer;


module.exports = {
    generateThumnail: function(inputfilepath, outputpath, videoname){
        let thumbnail; // the images object to return.
        let image_uri_path;
        let image_full_path;
        let thumbExt;
        var proc = ffmpeg(inputfilepath)
        // setup event handlers
        .on('filenames', function(filenames) {
          let thumbnail = filenames[1]; // get second screenshot
          thumbExt = thumbnail.split('.').pop(); // get second screenshot  file extension
          const vidExt = videoname.split('.').pop();  // get video path's extension
          let thumbName = videoname.replace(vidExt, "videothumbnail."+thumbExt); // replace videoname with thumbnails extension
          filenames[1] = thumbName; // rename second screenshot to new thumbnail path
          image_uri_path = api_url +   '/files/images/' + thumbName; // set file uri path
          image_full_path = outputpath + thumbName; // set file full local path
          console.log('screenshots are ' + filenames.join(', ')); // essential logger for a tough to find process
        })
        .on('end', function() {
          console.log('screenshots were saved');
          thumbnail = imageResizer(image_uri_path, image_full_path, thumbExt);
        })
        .on('error', function(err) {
          console.log('an error happened: ' + err);
        })
        // take 2 screenshots at predefined timemarks and size
        .takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '6' ], size: '640x480' }, outputpath);

        return {image_uri_path: image_uri_path, thumbExt: thumbExt} // return thumbnails paths object
    }
} 