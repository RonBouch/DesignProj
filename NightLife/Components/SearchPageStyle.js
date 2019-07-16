import  { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        paddingVertical: 10,
        borderRadius: 10,
    },
    Header: {
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        backgroundColor: 'rgba(255,255,255,.3)',
        
    },
    TextInputStyleClass:{

        height: 80,
        borderWidth: 1,
        borderColor: '#9E9E9E',
        borderRadius: 10 ,
        backgroundColor: "rgba(255,255,255,.5)",
        width: 300,
        marginTop:20,
         
        },
    input: {
        backgroundColor: "rgba(255,255,255,.5)",
        borderRadius: 10,
        width:200,
        height: 40,
        textAlign: "center",
        borderColor: "gray",
        borderWidth: 2,
        margin: 10,


      },
    Content: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        padding:15
    },
    textBig: {
        fontSize: 35,
        color: 'red',
        margin: 10
    },
    textMedium: {
        fontSize: 30,
        color: 'pink'
    },
    formContainer: {
        marginTop:20,
        flexDirection: 'column',
        flexWrap: 'wrap',
         paddingBottom: 10,
         alignItems: 'center',
        justifyContent: 'center',
  },
     mainContainer:{
        // backgroundColor: 'rgba(255,255,255,.3)',
        // paddingVertical: 80,
        // borderRadius: 10,
     },
     checkBoxContainer:{
        alignItems: 'center',
        justifyContent: 'center',                 
        //  margin: 10,
        marginTop:10,
        flexDirection:'row-reverse',
     },
    buttonContainer: {
        backgroundColor: 'rgba(200,50,100,.7)',
        paddingVertical: 15,
        width:120,
        borderRadius: 110,
        alignItems: 'center',
        // padding:20,
        marginTop:25,
        borderColor: "white",
        borderWidth: 2
       
        

  
      },  
    // textSmall: {
    //     fontSize: 17,
    //     color: 'rgb(100,150,250)',
    //     margin:5
    // },
    card: {

        backgroundColor: 'rgba(255,255,255,.9)',
        shadowColor: "#000",
        height: '60%',
        width: '100%',
        borderWidth:2,
        backgroundColor:'gray',
        position: 'absolute',
        bottom: -40,
        
      },
      cardImage: {
        width: 235,
        height:130,
        
        // padding:10,
        // flex:3
 

        


        
      },
    Err:{
        color:'red',
        margin:15,
        
    },
    lblText:{
        fontSize:30
    },
    addImage: {
        flexDirection: "row",
      },
    icon:{
        margin:20
    },
    publishButton:{
        backgroundColor: "rgba(0,0,255,.7)",
        borderRadius: 200,
        height: 45,
        width:150,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        borderColor: "white",
        borderWidth: 2
    }
});