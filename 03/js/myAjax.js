function resolveData(data) {
    const arr = [];
    for (let key in data) {   //把传进来的数组遍历,然后push到数组arr里,注意push返回的是新数组的长度
        arr.push(key + '=' + data[key]);   //k + '=' + data[key]  =相当于==>  name=李四
    }
    return arr.join('&');      //然后用join方法把数组转化为字符串用&链接   相当于    name=李四&age=18
}

// console.log(resolveData({ name: "李四", age: 18 }))

function myAjax(options) {
    let xhr = new XMLHttpRequest();
    //把外界传进来的对象转化为查询字符串
    let qs = resolveData(options.data);

    if (options.method.toUpperCase() === 'GET') {
        //发起get请求
        xhr.open(options.method, options.url + '?' + qs);
        xhr.send();
    } else if (options.method.toUpperCase() === 'POST') {
        //发起post请求
        xhr.open(options.method, options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            options.success(result);
        }
    }
}