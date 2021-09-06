class HelperService{
    
    diffDays(val1,val2){
        const date1 = new Date(val1);
        const date2 = new Date(val2);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays + " days"
    }

}
export default new  HelperService();
