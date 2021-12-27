import AppImages from './AppImages'
import mapData from '../mapData'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const CommonFunctions = {
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validateCharacters(text) {
    var re = /^[a-z A-Z]+$/;
    return re.test(text);
  },
  validatePhoneNumber(PhoneNumber) {
    var phonenumber = /^[0-9]+$/;
    return phonenumber.test(PhoneNumber);
  },
  validatePhoneNumberHyphen(PhoneNumber) {
    var phonenumber = /^[0-9-]+$/;
    return phonenumber.test(PhoneNumber);
  },
  specialCharaters(specialCharater) {
    var specialCharater = /[!@#$%^&*()<>?]/;
    return specialCharater.test(specialCharater);
  },
  dateTimeFormatter(timeStamp) {
    var d = new Date(parseInt(timeStamp));
    var hours = d.getHours();
    var min = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = min < 10 ? '0' + min : min;
    hours = hours < 10 ? '0' + hours : hours;
    var time = monthNames[d.getMonth()] + " " + d.getDate() + ', ' + hours + ':' + minutes + ' ' + ampm;
    return time
  },
  parseDate(timeStamp) {
    var d = new Date(timeStamp.replace(' ', 'T') + "Z");
    var hours = d.getHours();
    var min = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = min < 10 ? '0' + min : min;
    hours = hours < 10 ? '0' + hours : hours;
    var time = monthNames[d.getMonth()] + " " + d.getDate() + ', ' + d.getFullYear();
    return time
  },
  parseTime(timeStamp) {
    var d = new Date(timeStamp.replace(' ', 'T') + "Z");
    var hours = d.getHours();
    var min = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = min < 10 ? '0' + min : min;
    hours = hours < 10 ? '0' + hours : hours;
    var time = hours + ':' + minutes + ' ' + ampm;
    return time
  },

  addMapData(playlistArr) {
    let tempArr = playlistArr
    if (tempArr.length > 0) {
      mapData.map((staticZone, staticIndex) => {
        tempArr.map((dynamicZone, dynamicIndex) => {
          if (staticZone.id == dynamicZone.id) {
            dynamicZone['boundaries'] = staticZone.boundaries
            dynamicZone['name'] = staticZone.name
          }
        })
      })
    } else {
      mapData.map((staticZone, staticIndex) => {
        tempArr.push(staticZone)
      })
    }
    return tempArr;
  },

  parseEmergencyContacts(contactListArr) {
    let tempArr = []
    if (contactListArr.length > 0) {
      contactListArr.map((contactType, index) => {
        contactType.map((contact, index1) => {
          tempArr.push(contact)
        })

      })
    }
    return tempArr;
  },

  imageWithKey(key) {
    let image = null;
    const entries = Object.entries(AppImages.images);
    entries.forEach((item) => {
      if (item[0] == key) {
        image = item[1]
      }
    })
    return image
  }
};


module.exports = CommonFunctions;

