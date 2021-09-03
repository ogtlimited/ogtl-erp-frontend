class TokenService {
    getToken() {
      const token = localStorage.getItem("token");
      console.log(token)
      return token;
    }

    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    setUser(user) {
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    }
    setToken(token) {
      console.log(token);
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
  }
  
  export default new TokenService();