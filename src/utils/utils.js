// 工具函数
export function saveToken(token){
    window.sessionStorage.setItem('token',token);
}
export function clearSession(){
    window.sessionStorage.clear()
}