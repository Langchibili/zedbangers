var audioconcat = require('audioconcat')
 
var songs = [
  
  'C:\\Users\\Z. Goldwyn\\Desktop\\amalevelz\\public\\uploads\\tracks\\11 Lady In A Glass Dress -Interlude- - -www-SongsLover-pk--AMALEVELZ.COM-1bfacd8e-08b5-11ea-9234-0123456789ab.mp3',
  'C:\\Users\\Z. Goldwyn\\Desktop\\amalevelz\\public\\uploads\\tracks\\09. The Weeknd, Kendrick Lamar - Pray For Me.mp3',
  'C:\\Users\\Z. Goldwyn\\Desktop\\amalevelz\\public\\uploads\\tracks\\19. Chris Brown - Sweetheart (Prod by Kevin McCall).mp3',
  
]
 
audioconcat(songs)
  .concat('C:\\Users\\Z. Goldwyn\\Desktop\\amalevelz\\public\\uploads\\tracks\\cb-weeknd.mp3')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Audio created in:', output)
  })