class HelperService{
    
    diffDays(val1,val2){
        const date1 = new Date(val1);
        const date2 = new Date(val2);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays + " days"
    }
    diffHours(start, end) {
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0,parseInt(start[0]) , parseInt(start[1]), 0);
        var endDate = new Date(0, 0, 0, parseInt(end[0]), parseInt(end[1]), 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
        
        // If using time pickers with 24 hours format, add the below line get exact hours
        if (hours < 0)
           hours = hours + 24;
        
        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
    }

}
export default new  HelperService();
