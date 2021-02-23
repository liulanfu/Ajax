function resolveData(data) {
    const arr = [];
    for (var key in data) {
        arr.push(`${key}=${data[key]}`);
    }
    return arr.join('&');
}
//第一种
function it(option) {
    const xhr = new XMLHttpRequest();

    let str = resolveData(option.data);

    if (option.method.toUpperCase() === 'GET') {
        //发起get请求
        xhr.open(option.method, option.url + '?' + str);
        xhr.send();
    } else if (option.method.toUpperCase() === 'POST') {
        xhr.open(option.method, option.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(str);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = JSON.parse(xhr.responseText);
            option.success(res);
        }
    }
}

//第二种(使用了对象解构)
function itCast(option) {
    const xhr = new XMLHttpRequest();

    const { method, url, data, success } = option;   //对象解构

    let str = resolveData(data);

    if (method.toUpperCase() === 'GET') {
        //发起get请求
        xhr.open(method, url + '?' + str);
        xhr.send();
    } else if (method.toUpperCase() === 'POST') {
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(str);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = JSON.parse(xhr.responseText);
            success(res);
        }
    }
}