const styles = theme => ({

  root : {
    overflow : "scroll"
  },

  sendBtn: {
    color: 'blue',
    cursor: 'pointer',
    '&:hover': {
      color: 'gray'
    }
  },
  content: {
    
    overflow: 'auto',
    // padding: '25px',
    // marginLeft: '300px',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    top: '50px',
    width: 'calc(100%)',
    // position: 'relative'
  },
  

  chatTextBoxContainer: {
    backgroundColor:"gray",
    position: 'inherit',
    bottom: '1px',
    left: '15px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    width: 'calc(100%)'
  },
  box: {
    display: "flex",
    paddingBottom: "15px",
    alignItems: 'flex-end'
  },

  chatTextBox: {
    width: 'calc(100% - 25px)',

   
  },

  image: {
    margin : "0.5px 1px"
  },

  // emoji: {
  //  display: "flex",
  //   alignItems: 'flex-end',
  //   paddingBottom: "15px",
  //   position: 'absolute',
  //   bottom: '1px',
  //   left: '15px',
  //   boxSizing: 'border-box',
  //   overflow: 'auto',
  //   width: 'calc(100%  - 70px)'
  // }

});

export default styles;


