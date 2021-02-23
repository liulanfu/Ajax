$(function () {
  // console.log(Number.__proto__===String.__proto__);
  function zero(n) {
    // return n < 10 ? '0' + n : n;
    return String.prototype.padStart.call(n, 2, '0');   //padStart是string里面的方法
  }

  template.defaults.imports.dateFormate = function (data) {
    const datastr = new Date(data);
    const y = datastr.getFullYear();
    const m = zero(datastr.getMonth() + 1);
    const d = zero(datastr.getDate());


    const hh = zero(datastr.getHours());

    const mm = zero(datastr.getMinutes());

    const ss = zero(datastr.getSeconds());


    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }

  function getNumber() {
    $.ajax({
      type: 'GET',
      url: 'http://www.liulongbin.top:3006/api/news',
      success: function (res) {
        console.log(res);
        if (res.status !== 200) return alert('获取数据失败！');
        res.data.forEach((item) => {
          item.tags = item.tags.split(',');   //把字符串转化为数组
        });
        // console.log(res);
        const html = template('tpl-news', res);
        $('#news-list').html(html);
      }
    });
  }

  getNumber();

})
