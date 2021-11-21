import React from 'react';
import {  Avatar as MUIAvatar  } from 'bumbag';
export const Avatar  = ({variant="circle", src, alt, size="small"} ) =>{
    return <MUIAvatar variant={variant} src={src} alt={alt} size={size}/>;
};