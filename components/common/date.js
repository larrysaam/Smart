
export default academicYear =()=> {

    const month = new Date().getMonth()+1
    const year = new Date().getFullYear()
    const acadyear = ''

    if(month>=9 & month<=12){
        acadyear = String.valueOf(year) + "_" + String.valueOf(year + 1);
        return acadyear
    }else if(month>=1 & month<9){
        acadyear = String.valueOf(year - 1) + "_" + String.valueOf(year);
        return acadyear
    }

}