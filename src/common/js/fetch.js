/**
 * Created by gxk on 2017/8/28.
 */
import axios from 'axios';
var qs = require('qs');
export function postFetch(url,data,call) {
  var token = '000';
  data.token = token;
  var postData  = qs.stringify(data);
  axios({
    method:'post',
    url:`http://shede.sinmore.vip${url}`,
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    dataType:'json',
    data:postData
  }).then(function(re){
    call(re.data)
  });
}
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}
/**
 * Created by gxk on 2017/8/28.
 */
