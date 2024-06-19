export const isAuthenticated = () => {
    if (typeof window === undefined) return false;
    if (localStorage.getItem("userData") && localStorage.getItem("token")) {
        return true
    } else {
        return false
    }

};