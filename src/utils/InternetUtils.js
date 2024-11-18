import NetInfo from "@react-native-community/netinfo";


export function checkInternet() {
    return new Promise((resolve,reject)=>{
        NetInfo.fetch().then(state => {
            console.log(`internet is: ${state.isConnected}`)
            resolve(state.isConnected)
        }).catch(error=>{
            reject(error)
        })
    })
}