const ffmpeg = require('fluent-ffmpeg');
const child_process = require('child_process');
//constants
const api_url = require("../utilities/constants/api"); 
const ffmpeg_path = require("../utilities/constants/ffmpeg_path"); 
// the ffprobe path set
ffmpeg.setFfprobePath(ffmpeg_path.ffprobe+".exe");

//const inputfilename = 'C:\\Users\\Z. Goldwyn\\Desktop\\amalevelz\\public\\uploads\\videos\\Chris Brown - Gliding ft- Wiz Khalifa[via torchbrowser-com]-AMALEVELZ.COM-5b6723de-08b3-11ea-9234-0123456789ab.mp4';
const inputfilename = "C:\\Users\\Z. Goldwyn\\Desktop\\amalevelz\\public\\uploads\\videos\\SN-S03E11-480p-AMALEVELZ.COM-e9d5718e-0b29-11ea-9234-0123456789ab.mkv";



ffmpeg.ffprobe(inputfilename, function(err, metadata) {
    let resolution = null; // the input videos resolution
    let videoPathobject = null;
    const vidCodec = metadata.streams[0].codec_name;
    let steps = 0;  // number of cuts of video to make
    if (err) {
        console.error(err);
    }
    else {
        // metadata should contain 'width', 'height' and 'display_aspect_ratio'
       let resolution = parseInt(metadata.streams[0].width.toString()+metadata.streams[0].height.toString());
       if(resolution <= lowestQuality){
           steps = 0;
       }
       
       if(resolution >= ULTRAHDQuality){
           steps = 5;
       }
       
       if(resolution <= FULLHDQuality){
        steps = 4;
       }
       if(resolution <= HDQuality){
        steps = 3;
       }
       if(resolution <= SDQuality){
        steps = 2;
       }
       if(resolution <= semiSDQuality){
        steps = 1;
       }
       const videoPathobject = videoCutter(steps, inputfilename, vidCodec);
    console.log(metadata);
    }
});

const lowestQuality = 426240;  // 426 x 240 
const semiSDQuality = 640360;  // 640 x 360
const SDQuality = 640480;      // 640 x 480 (4 x 3)
const HDQuality = 1280720;     // 1280  x 720
const FULLHDQuality = 19201080;  // 1920 x 1080 (6 x 9)
const ULTRAHDQuality = 38402160;  // 3840 x 2160

// cutting video to different sizes if too large
function videoCutter(steps, videopath, vidCodec){
   
    // getting the video dimensions
    let vidDimensions = "426x240";
    let outputfilepath = null;
    // the object to be returned that contains the file paths of resized videos
    let videoPathsObject = {
        
         lowestQuality: null, 
         semiSDQuality : null, 
         SDQuality : null, 
         HDQuality : null, 
         FULLHDQuality : null,
         ULTRAHDQuality : null
    };
    // checking if the steps are 0 , then returning the paths object with lowestQuality path set
    if(steps === 0){
        videoPathsObject.lowestQuality = videopath;
        return videoPathsObject;
    }
    else{
       // otherwise if steps is more than 0, cut the video to different sizes till steps is 0
       // cand on each loop, if entered, add the video dimensions string to the original video's path string
       // and add the generated path to the pathsObject with the property keyes set according to the video quality
       while(0 < steps){
            if(steps === 5){
                vidDimensions = "1920x1080";
                let videoPathArray = videopath.split('.');
                const fileExt = videoPathArray.pop(); 
                videoPathArray = videoPathArray + '-'+ vidDimensions + '.' + fileExt;
                uncleanedfileName = videoPathArray;
                outputfilepath = uncleanedfileName.replace(/[\|&;\$%@"<>\(\)\+,]/g, ".");
                child_process.execFile('ffmpeg', [
                    '-i', videopath,
                    '-s', vidDimensions,
                    '-c:v', vidCodec,
                    '-c:a', 'copy',
                       outputfilepath
                    ], function(error, stdout, stderr) {
                        if(error){
                            console.log(error);
                        }
                });
                videoPathsObject.ULTRAHDQuality = filepath;
                videoPathsObject.FULLHDQuality = outputfilepath;
            }

            if(steps === 4){
                vidDimensions = "1280x720";
                let videoPathArray = videopath.split('.');
                const fileExt = videoPathArray.pop(); 
                videoPathArray = videoPathArray + '-'+ vidDimensions + '.' + fileExt;
                uncleanedfileName = videoPathArray;
                outputfilepath = uncleanedfileName.replace(/[\|&;\$%@"<>\(\)\+,]/g, ".");
                child_process.execFile('ffmpeg', [
                    '-i', videopath,
                    '-s', vidDimensions,
                    '-c:v', vidCodec,
                    '-c:a', 'copy',
                       outputfilepath
                    ], function(error, stdout, stderr) {
                        if(error){
                            console.log(error);
                        }
                    });
                    videoPathsObject.HDQuality = outputfilepath;
            }
            if(steps === 3){
                vidDimensions = "640x480";
                let videoPathArray = videopath.split('.');
                const fileExt = videoPathArray.pop(); 
                videoPathArray = videoPathArray + '-'+ vidDimensions + '.' + fileExt;
                uncleanedfileName = videoPathArray;
                outputfilepath = uncleanedfileName.replace(/[\|&;\$%@"<>\(\)\+,]/g, ".");
                child_process.execFile('ffmpeg', [
                    '-i', videopath,
                    '-s', vidDimensions,
                    '-c:v', vidCodec,
                    '-c:a', 'copy',
                       outputfilepath
                    ], function(error, stdout, stderr) {
                        if(error){
                            console.log(error);
                        }
                    });
                    videoPathsObject.SDQuality = outputfilepath;
            }
            if(steps === 2){
                vidDimensions = "640x360";
                let videoPathArray = videopath.split('.');
                const fileExt = videoPathArray.pop(); 
                videoPathArray = videoPathArray + '-'+ vidDimensions + '.' + fileExt;
                uncleanedfileName = videoPathArray;
                outputfilepath = uncleanedfileName.replace(/[\|&;\$%@"<>\(\)\+,]/g, ".");
                child_process.execFile('ffmpeg', [
                    '-i', videopath,
                    '-s', vidDimensions,
                    '-c:v', vidCodec,
                    '-c:a', 'copy',
                       outputfilepath
                    ], function(error, stdout, stderr) {
                        if(error){
                            console.log(error);
                        }
                    });
                    videoPathsObject.semiSDQuality = outputfilepath;
            }

            if(steps === 1){
                vidDimensions = "426x240";
                let videoPathArray = videopath.split('.');
                const fileExt = videoPathArray.pop(); 
                videoPathArray = videoPathArray + '-'+ vidDimensions + '.' + fileExt;
                uncleanedfileName = videoPathArray;
                outputfilepath = uncleanedfileName.replace(/[\|&;\$%@"<>\(\)\+,]/g, ".");
                child_process.execFile('ffmpeg', [
                    '-i', videopath,
                    '-s', vidDimensions,
                    '-c:v', vidCodec,
                    '-c:a', 'copy',
                       outputfilepath
                    ], function(error, stdout, stderr) {
                        if(error){
                            console.log(error);
                        }
                    });
                    videoPathsObject.lowestQuality = outputfilepath;
            }
             
           steps = steps - 1;
       }

    }

     return videoPathsObject;
}

videoCutter(3,inputfilename,"h264");