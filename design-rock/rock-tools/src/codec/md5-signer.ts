import md5 from 'md5'

//FIXME 单元测试 + 完善注释 + 改NameSpace
export class Md5SignerUtils {
  /**
   * json参数升序
   * @param jsonObj 发送参数
   */

  static sortAsc(jsonObj:{ [key:string]:any }) {
    const arr:any[] = [];
    let num = 0;
    for (const i in jsonObj) {
      arr[num] = i;
      num++;
    }
    const sortArr = arr.sort();
    const sortObj = {};
    for (const i in sortArr) {
      sortObj[sortArr[i]] = jsonObj[sortArr[i]];
    }
    return sortObj;
  }

  /**
   * @param url 请求的url,应该包含请求参数(url的?后面的参数)
   * @param requestParams 请求参数(POST的JSON参数)
   * @param signatureSecret 密钥
   * @returns {string} 获取签名
   */
  static getSign(url, requestParams, signatureSecret:string) {
    const urlParams = this.parseQueryString(url);
    const jsonObj = this.mergeObject(urlParams, requestParams);
    const requestBody = this.sortAsc(jsonObj);
    delete requestBody._t;
    return md5(JSON.stringify(requestBody) + signatureSecret).toUpperCase();
  }

  /**
   * @param url 请求的url
   * @returns {{}} 将url中请求参数组装成json对象(url的?后面的参数)
   */
  static parseQueryString(url) {
    const urlReg = /^[^\?]+\?([\w\W]+)$/,
      paramReg = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      urlArray = urlReg.exec(url),
      result = {};

    // 获取URL上最后带逗号的参数变量 sys/dict/getDictItems/sys_user,realname,username
    //【这边条件没有encode】带条件参数例子：/sys/dict/getDictItems/sys_user,realname,id,username!='admin'%20order%20by%20create_time
    let lastpathVariable = url.substring(url.lastIndexOf('/') + 1);
    if (lastpathVariable.includes(',')) {
      if (lastpathVariable.includes('?')) {
        lastpathVariable = lastpathVariable.substring(0, lastpathVariable.indexOf('?'));
      }
      //update-begin---author:wangshuai ---date:20221103  for：[issues/183]下拉搜索，使用动态字典，在线页面不报错，生成的代码报错 ------------
      //解决Sign 签名校验失败 #2728
      //decodeURI对特殊字符没有没有编码和解码的能力，需要使用decodeURIComponent
      result['x-path-variable'] = decodeURIComponent(lastpathVariable);
      //update-end---author:wangshuai ---date:20221103  for：[issues/183]下拉搜索，使用动态字典，在线页面不报错，生成的代码报错 ------------
    }
    if (urlArray && urlArray[1]) {
      let paramString = urlArray[1];
      while ((paramResult = paramReg.exec(paramString)) != null) {
        //数字值转为string类型，前后端加密规则保持一致
        if (this.myIsNaN(paramResult[2])) {
          paramResult[2] = paramResult[2].toString();
        }
        result[paramResult[1]] = paramResult[2];
      }
    }
    return result;
  }

  /**
   * @returns {*} 将两个对象合并成一个
   */
  static mergeObject(objectOne, objectTwo) {
    if (objectTwo && Object.keys(objectTwo).length > 0) {
      for (const key in objectTwo) {
        if (objectTwo.hasOwnProperty(key) === true) {
          //数字值转为string类型，前后端加密规则保持一致
          if (this.myIsNaN(objectTwo[key])) {
            objectTwo[key] = objectTwo[key].toString();
          }
          objectOne[key] = objectTwo[key];
        }
      }
    }
    return objectOne;
  }

  static urlEncode(param, key, encode) {
    if (param == null) return '';
    let paramStr = '';
    const t = typeof param;
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param);
    } else {
      for (const i in param) {
        const k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += this.urlEncode(param[i], k, encode);
      }
    }
    return paramStr;
  }

  /**
   * 接口签名用 生成header中的时间戳
   * @returns {number}
   */
  static getTimestamp() {
    return new Date().getTime();
  }

  // static getDateTimeToString() {
  //   const date_ = new Date()
  //   const year = date_.getFullYear()
  //   let month = date_.getMonth() + 1
  //   let day = date_.getDate()
  //   if (month < 10) month = '0' + month
  //   if (day < 10) day = '0' + day
  //   let hours = date_.getHours()
  //   let mins = date_.getMinutes()
  //   let secs = date_.getSeconds()
  //   const msecs = date_.getMilliseconds()
  //   if (hours < 10) hours = '0' + hours
  //   if (mins < 10) mins = '0' + mins
  //   if (secs < 10) secs = '0' + secs
  //   if (msecs < 10) secs = '0' + msecs
  //   return year + '' + month + '' + day + '' + hours + '' + mins + '' + secs
  // }
  // true:数值型的，false：非数值型
  static myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value);
  }
}