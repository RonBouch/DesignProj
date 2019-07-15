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
  
    input: {
        borderRadius: 10,
        fontSize: 10,
        height: 40,
        width: 200,
        textAlign: "center",
        borderColor: "black",
        borderWidth: 2,
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
        backgroundColor: 'rgba(255,255,255,.9)',
        paddingVertical: 27,
        borderRadius: 110,
        alignItems: 'center',
        // padding:20,
        marginTop:25,
       
        

  
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
        width: 230,
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
    }
});