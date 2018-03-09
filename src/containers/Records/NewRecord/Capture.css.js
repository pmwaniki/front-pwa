export default {
  captureContainer: {
      display: 'none',
      zIndex:10,
      position: 'fixed',
      justifyContent: 'center',
      top:"0",
      bottom: "0",
      width: '100%',
      height:'100%',
      backgroundColor:'black',
      //overflow:'auto',
  },
  video: {
      display:"none",
      width:"100%",
      height:"100%",
      position:"fixed",
      top:0,
      left:0,

      backgroundColor:"grey",
      //padding:"auto 56px",
      //border: "5px solid green"
  },
  img:{
      display:"none",
      maxWidth:"100%",
      maxHeight:'100%',

      position:"fixed",
      top:'0',
      backgroundColor:"black"
      //left:0

  },

  toolbar:{
      display:"block",
      position:"fixed",
      height:"50px",
      bottom:0,
      width:"100%",
      //backgroundColor:"brown",
      //opacity:0.2,
      border:"3px solid lime"
  },


  buttons:{
      display:"inline",
      position:"fixed",
      height:"50px",
      width:"60px",
      right:0,
      backgroundColor:"blue",
      bottom:"0",
      boxShadow:"3px green"

  }

}
