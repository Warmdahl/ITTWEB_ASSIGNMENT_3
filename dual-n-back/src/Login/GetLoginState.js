export function getLoginState() {
    if(localStorage.getItem("jwt") != null) {
        return true;
    } else {
        return false;
    }
}