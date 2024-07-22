import { secondary, primary, Gray } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";

export default {
   container: { flex: 1, 
    padding: moderateScale(16), 
    backgroundColor: '#f5f5f5' 
  },
  greeting: { 
    fontSize: moderateScale(15),
     fontWeight: 'bold', 
     marginBottom: 10, 
     color: primary 
    },
  daysList: {
    marginBottom: moderateScale(8),
    height: moderateScale(10),
    paddingVertical: moderateScale(3),
  },
  dayCircle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(8),
  },
  selectedDayCircle: {
    borderWidth: 1,
    borderColor: primary
  },
  day: {
     fontSize: moderateScale(16), 
     color: 'white' 
    },
  selectedDayText: {
    fontWeight: 'bold'
  },
  resetButton: {
    marginVertical: moderateScale(10),
    alignSelf: 'center',
    backgroundColor: secondary,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(2)
  },
  card: { 
    marginBottom: moderateScale(10), 
    backgroundColor: 'white' 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  title: { 
     fontSize: moderateScale(18),
     fontWeight: 'bold', 
     color: secondary 
    },
  categoryDate: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: moderateScale(4) 
  },
  category: { 
     fontSize: moderateScale(14),
     color: primary
    },
  date: { 
     fontSize: moderateScale(12),
     color: primary 
    },
  content: { 
    fontSize: moderateScale(14), 
    marginTop: moderateScale(8), 
    color: primary 
  },
  addButton: { marginTop: moderateScale(16) },
  backgroundImgView: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(50)
  },
  backgroundImg: {
    height: moderateScale(300),
    width: moderateScale(300),
  },
  emptyArray: {
    justifyContent:'center', 
    alignItems:'center',
    marginTop:moderateScale(40)
  },
  emptyText:{
  fontWeight: 'bold', 
  fontSize: moderateScale(16),
  color:primary
},
loaderItem:{ 
  justifyContent: "center", 
  alignItems: "center", 
  marginTop: "50%" 
},

}