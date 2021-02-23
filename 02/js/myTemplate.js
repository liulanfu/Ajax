function template(id, data) {
    //方法一
    // let str = document.getElementById(id).innerHTML;
    // let pattern = /{{([a-zA-Z]+)}}/;
    // // let patResult = pattern.exec(str);
    // let patResult = null;
    // // console.log(patResult);
    // while (patResult = pattern.exec(str)) {
    //     str = str.replace(patResult[0], data[patResult[1]]);
    // }
    // return str;

    //方法二
    let str = document.getElementById(id).innerHTML;
    let pattern = /{{([a-zA-Z]+)}}/g;
    str = str.replace(pattern, (match, key) => {
        console.log(match);
        return data[key];
    });
    return str;

}