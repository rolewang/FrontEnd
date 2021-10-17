import React, { Component, useRef } from 'react';
import { CSVReader } from "react-papaparse"





function UploadCategorys({setDataToUpload, uploadName}) {


const buttonRef = useRef();
let dataToBeUploaded = useRef()

function handleOpenDialog(e) {
            // Note that the ref is set async, so it might be null at some point
            if (buttonRef.current) {
                buttonRef.current.open(e);
              }
}
 
    
function  handleOnFileLoad(data) {
        console.log('---------------------------');
        console.log(data);
        console.log('---------------------------');
        dataToBeUploaded.current = data
        uploadName.current = buttonRef.current.props.id
        setDataToUpload(data)
      };
    
      function  handleOnError(err, file, inputElem, reason){
        console.log('---------------------------');
        console.log(err);
        console.log('---------------------------');
        setDataToUpload(false)
      };
    
      function handleOnRemoveFile (data) {
        console.log('---------------------------');
        console.log(data);
        console.log('---------------------------');
        setDataToUpload(false)
      };
    
      function handleRemoveFile (e) {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.removeFile(e);
        }
      };


    return(
        
        <CSVReader
        id="categories_bulk_create"
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        // noClick
        // noDrag
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        >
        <span>Click to upload <b>Categorys</b> file.</span>
      </CSVReader>
    )
}

export default UploadCategorys
