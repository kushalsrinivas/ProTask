import React from 'react';

function ProgressBar({ progress  , width}) {
  const progressBarStyles = {
    height: '20px',
    backgroundColor: '#D2B48C', // Beige background color
    borderRadius: '10px',

    width : `${width}%`,
    overflow: 'hidden',
  };

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#5e503f', // Beige progress color
  };

  const textStyle = {
    color: 'black',
    textAlign: 'center',
    justifycontent : 'center',
    margin : '0 0 0 20px ',


  };

  return (
    <div style={{
        margin : '40px 0 0px 0',
        display : 'flex', 
        justifyContent : 'start', 
        alignContent : 'center',
        alignItems : 'center'
    }}>

    <div style={progressBarStyles}>
      <div style={fillerStyles}></div>
    </div>
       <h3 style={textStyle}>{parseInt(progress)}%</h3> 

    </div>
  );
}

export default ProgressBar;
