import { CircularProgress } from "@material-ui/core";
import React from "react";
import Display from "../Display/Display";
import Loader from "../Loader/Loader";



export default class Filedownloadupdate extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            processes: [
                'loading file for download...',
                'unpacking file...',
                'optmizing file quality...',
                'scanning file format for compatibility with your device...',
                'scanning file for any corruption...',
                'creating a secured download link...',
                'file will begin downloading asap the video finishes ...',
                'thank you for your patience, file is now downloading...',
                'thank you for downloading the song, please enjoy the music...'
            ],
            processesRendered: [],
            isLastProcess: false,
            processIndex: 0
        }
        this.downloadProcessIntervalId = null 
    }
    
    
    // rednering processes after 2.5 seconds 
    downloadProcess = ()=>{
        const processes = this.state.processes;
        const processIndex = this.state.processIndex;
        const processesRendered = this.state.processesRendered;
        const isLastProcess = processes.length - processIndex === 1? true: false;
        const processToRender = processes[processIndex];
        processesRendered.push(processToRender);
        this.setState({
            processesRendered: processesRendered,
            isLastProcess: isLastProcess,
            processIndex: (processIndex + 1)
        })
    }

    showDownloadProcess = (processesRendered) =>{
        const isLastProcess = this.state.isLastProcess;
        return processesRendered.map((process,index)=>{
              let processColor = processesRendered.length - index === 1? "blue" : "green";
              if (isLastProcess){ processColor = "green"}
              return (<div key={index}><span style={{color: processColor}}>{process}</span></div>)
        })
    }
    componentDidMount(){
        const processes = this.state.processes;
        this.downloadProcessIntervalId = setInterval(()=>{
            this.downloadProcess();
        }, 3500, processes.length);
    }
    componentDidUpdate(){
        if(this.state.isLastProcess){
            clearInterval(this.downloadProcessIntervalId);
        }
    }

    render(){   
        return(
        <div>
         {this.showDownloadProcess(this.state.processesRendered)}
         <Display isVisible={!this.state.isLastProcess}>
             <CircularProgress disableShrink color={"secondary"}/>
             <p>preparing download... this may take upto 30 seconds...</p>
         </Display>
        </div>
        );
    }
}
