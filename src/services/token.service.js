class TokenService {
    getToken() {
      const token = localStorage.getItem("token");
      // console.log(token)
      return token;
    }

    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
    getOgid() {
      return this.getUser().ogid;
    }
  
    setUser(user) {
      // console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    }
    setToken(token) {
      // console.log(token);
      localStorage.setItem("token", token);
    }
    removeToken() {
        localStorage.removeItem("token");
    }
    removeUser() {
      localStorage.removeItem("user");
    }
    clearStorage(){
      localStorage.clear()
    }
    setAttendance(data){
      localStorage.setItem("attendance", JSON.stringify(data));
    }
    getAttendance(){
     return JSON.parse(localStorage.getItem("attendance"));
    }
    removeAttendance(){
      localStorage.removeItem("attendance");
    }
  }

  export default new TokenService();