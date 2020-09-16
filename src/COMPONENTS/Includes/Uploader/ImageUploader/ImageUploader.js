import React from 'react';
import "./ImageUploader.css";
import { FilePond, registerPlugin } from 'react-filepond/dist/react-filepond';
import api_url from "../../../../constants/api_url";
import 'filepond/dist/filepond.min.css';// Import FilePond styles

// // Import the Image EXIF Orientation and Image Preview plugins
// // Note: These need to be installed separately
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import FilePondPluginFilePoster from "filepond-plugin-file-poster";
// import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// // // Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFilePoster,FilePondPluginFileValidateSize);

// Our app


export default class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.addPhoto = this.props.addPhoto.bind(this);
        this.state = {
            files: []
        };
        this.serverSettings = {
            url: api_url,
            process:{
                url: '/uploads',
                method: "POST",
                withCredentials: false,
                headers: {},
                process: null,
                onload: (data)=>{
                    data  = JSON.parse(data)
                    this.addPhoto(data.image)
                },
                onerror: (error)=>{ alert("your file couldn't be uploaded, try again.")},
                onabort: (data) =>{
                    alert("Are you sure you want to cancel the upload?");
                }
            }
        };
    }
    
    handleInit = () =>{
        console.log('FilePond instance has initialised', this.pond);
    }
    onProcessFiles = () => {
        let { onProcessFiles } = this.props;
        let pondFiles = this.pond.getFiles();
        if (onProcessFiles) onProcessFiles(pondFiles);
    }
    
    handleSubmitState = (file, progress) =>{
        const isFileUploadPending = progress !== 1;
        this.setState({ isSubmitDisabled: isFileUploadPending });
        }   

        render() {
            return (
                    <FilePond ref={ref => this.pond = ref}
                              files={this.state.files}
                              allowMultiple={true}
                              maxFiles={3}
                              server={this.serverSettings}
                              oninit={() => this.handleInit() }
                              onupdatefiles={(fileItems) => {
                                  this.setState({
                                      files: fileItems.map(fileItem => fileItem.file)
                                  });
                              }}>
                    </FilePond>
            );
        }
}









