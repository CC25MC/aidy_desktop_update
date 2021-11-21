import { useDropzone } from 'react-dropzone';
import {  Box, Text } from 'bumbag';
import { useEffect, useMemo } from 'react';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

const Dropzone = ({ label, accept, onChange }) => {
    const { 
        acceptedFiles,
        getRootProps, 
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    useEffect( () => {
        if(typeof onChange === 'function' &&  acceptedFiles.length ){
            onChange(acceptedFiles);
        }
    }, [ acceptedFiles ] );
    
    return (
        <Box height = "100%">
            <Box 
                padding = "20px" 
                display = "flex"
                justifyContent = "center"
                alignItems = "center"
                border = "1px dashed #eeeeee"
                backgroundColor = "#fafafa"
                height = "100%"
                {...getRootProps({ style })}
            >
                <Box use="input" {...getInputProps()} />
                <Text textAlign = "center">
                    {label}
                </Text>
            </Box>
        </Box>
    )
}

export { Dropzone };
  