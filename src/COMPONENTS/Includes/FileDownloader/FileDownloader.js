import React from "react";
import download from "downloadjs";
import api_url from "../../../constants/api_url";
import api from "../../../Store/api";


export default class FileDownloader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      downloadedSongs: [],
      downloadEd: false
    }
  }
  getFileExtension = (file)=>{
    let fileArray = file.split(".");
    const lastItem = fileArray.length - 1;
    return fileArray[lastItem]; // the extension
  }


  logDownload = async (songId)=>{
    const downloadedSongs = this.state.downloadedSongs;
    if(downloadedSongs.includes(songId)){ return }
    const song = await api.getItemById("/posts", songId, ""); // get song once over
    if(song){ 
      const user = await api.getItemByUsername("/users",song.userName,""); // get song owner
      if(!user.downloads.includes(song._id)){
        song.counts.unique_downloads = song.counts.unique_downloads + 1; // update song's unique_download count
        user.downloads.push(song._id); //push song id into song owner's download array only if not there before
        user.counts.unique_downloads = user.counts.unique_downloads + 1; // update song owner's unique_download count
      }
      user.counts.downloads = user.counts.downloads + 1; // update song owner's download count
      if(user){
        const updatedUser = await api.updateItem("/users",user,user._id); // update user's document
        if(updatedUser){
          song.counts.downloads = song.counts.downloads + 1; // update song's download count
          const updatedSong = await api.updateItem("/posts",song,song._id); // post counts
          const downloadedSongs = this.state.downloadedSongs;
          downloadedSongs.push(song._id)
          this.setState({
            downloadedSongs: downloadedSongs,
            downloadEd: true
          })
        }
      }
    } 
  }

  async componentDidUpdate(){
    if(this.props.downloadObject){
      const downloadObject = this.props.downloadObject;
      // let download_link = downloadObject.file.download_link;
      // download_link = download_link.replace("https://thenetworkmusic.thenetworkzambia.com", api_url);
      // console.log(download_link);
      const fileExtension = this.getFileExtension(downloadObject.file.uri_path)
      // const res = await fetch("https://thenetworkmusicapi.thenetworkzambia.com/downloads/download/?type=audio&filename=06 101 -Interlude- - -www-SongsLover-pk--MUSICSTREAMBASE.COM-f27bd7be-56dd-11eb-9234-0123456789ab.mp3");
      // console.log(res.body.getReader());
      // const blob = await res.blob();
      const link_url = downloadObject.file.uri_path.replace(window.location.origin, "");
      const link = document.createElement('a');
      link.href = link_url;
      document.body.appendChild(link);
      link.setAttribute("download", downloadObject.title+"."+fileExtension)
      link.click(); // click n created link and download file
      //document.body.removeChild(link);
      this.logDownload(downloadObject.songId); // log download data
      //const data = get
      //download(blob, downloadObject.title+"."+fileExtension,"audio/"+fileExtension);
    }
  }
    
    render(){ 
        return(
        <div></div>
        );
    }
}
