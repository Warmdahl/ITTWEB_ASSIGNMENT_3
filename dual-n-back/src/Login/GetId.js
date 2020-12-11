// not used atm

export default function GetId() {
    const jwt = localStorage.getItem('jwt'); //Name might change depending on what it is called in localstorage
    let id;

    try{
        if(jwt) {
            let jwtData = jwt.split('.')[1];
            let decode = window.atob(jwtData);
            let decodedData = JSON.parse(decode);
            id = (decodedData['_id']);
            return id;
        }
    } catch (error) {
        console.log(error);
    }
}