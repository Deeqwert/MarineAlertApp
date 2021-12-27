import AsyncStorage from '@react-native-community/async-storage';
const DataManager = {
    setAccessToken(token) {
        AsyncStorage.setItem('token', JSON.stringify(token))
    },
    getAccessToken() {
        try {
            return AsyncStorage.getItem('token').then((token) => {
                return token
            })
        } catch (error) {
            // console.log(error)
        }
    },
    setUserDetails(userDetails) {
        AsyncStorage.setItem('userDetails', JSON.stringify(userDetails))
    },
    getUserDetails() {
        try {
            return AsyncStorage.getItem('userDetails').then((userDetails) => {
                return userDetails
            })
        } catch (error) {
            // console.log(error)
        }
    },
    setDeviceToken(value) {
        AsyncStorage.setItem('deviceToken', JSON.stringify(value))
    },
    getDevicetoken() {
        try {
            return AsyncStorage.getItem('deviceToken').then((token) => {
                return token
            })
        } catch (error) {
            // console.log(error)
        }
    },
    setSettingsDetail(settingsDetail) {
        AsyncStorage.setItem('settingsDetail', JSON.stringify(settingsDetail))
    },
    getSettingsDetail() {
        try {
            return AsyncStorage.getItem('settingsDetail').then((settingsDetail) => {
                return settingsDetail
            })
        } catch (error) {
            // console.log(error)
        }
    },
    setUserPassword(value) {
        AsyncStorage.setItem('userPassword', JSON.stringify(value))
    },
    getUserPassword() {
        try {
            return AsyncStorage.getItem('userPassword').then((token) => {
                return token
            })
        } catch (error) {
            // console.log(error)
        }
    },
    clearData() {
        try {
            AsyncStorage.clear()
        } catch (e) {
            // console.log(error)
        }
    },
    setAdminEmail(value) {
        AsyncStorage.setItem('adminEmail', JSON.stringify(value))
    },
    getAdminEmail() {
        try {
            return AsyncStorage.getItem('adminEmail').then((token) => {
                return token
            })
        } catch (error) {
            // console.log(error)
        }
    },

};
module.exports = DataManager;