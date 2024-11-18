import { NativeModules } from 'react-native';
const UtilModule = NativeModules.UtilModule;
import RNFetchBlob from 'rn-fetch-blob';
import AppUtils from './AppUtils';


export default class FileMetaDataUtil {

    static getFileMetaDataForUpload(uri) {
        return new Promise((resolve, reject) => {
            console.log(`fileuri: ${uri}`)
            uri = AppUtils.isIOS() ? uri.replace('file://', '') : uri
            if (!AppUtils.isNull(uri)) {
                RNFetchBlob.fs.stat(uri)
                    .then(async (stats) => {
                        console.log(`file info: ${JSON.stringify(stats)}`)
                        try {
                            if (!AppUtils.isIOS()) {
                                UtilModule.filePathToURI(stats.path)
                                    .then(async uriPath => {
                                        console.log(`file URI ${uriPath}`)
                                        let fileData = {
                                            'size': stats.size,
                                            'path': stats.path,
                                            'fileName': stats.filename,
                                            'uri': uriPath,
                                            'mimeType': AppUtils.getMimeTypeFromFileName(stats.filename)
                                        }
                                        resolve(fileData)
                                    }).catch((err) => {
                                        reject(err)
                                        AppUtils.showAlert(err.message)
                                    })
                            } else {
                                let fileData = {
                                    'size': stats.size,
                                    'path': stats.path,
                                    'fileName': stats.filename,
                                    'uri': uri,
                                    'mimeType': '*/*'
                                }
                                resolve(fileData)
                            }
                        } catch (err) {
                            reject(err)
                            console.log(`error getting image ${err}`)
                        }
                    })
                    .catch((err) => {
                        reject(err)
                        console.log(`file info error: ${err}`)
                    })
            } else {
                reject('File not found')
            }
        })
    }
}