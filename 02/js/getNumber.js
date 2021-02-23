$(function () {
    function getCmtList() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            // data:{},
            success: function (res) {
                if (res.status !== 200) return alert('获取数据失败！');
                console.log(res);
                // let rows = [];
                // $.each(res.data, function (i, item) {
                //     let str =
                //         `
                //         <li class="list-group-item">
                //             <span class="badge" style="background-color: #F0AD4E;">评论时间：${item.time}</span>
                //             <span class="badge" style="background-color: #5BC0DE;">评论人：${item.username}</span>
                //             ${item.content}
                //         </li>
                //         `;
                //     rows.push(str);
                // });
                // $('#cmt-list').empty().append(rows.join());

                let html = '';
                res.data.forEach(function ({ time, content, username }) {   //{ time, content, username }这是对象解构,把当前对象解构
                    html +=
                        `
                        <li class="list-group-item">
                            <span class="badge" style="background-color: #F0AD4E;">评论时间：${time}</span>
                            <span class="badge" style="background-color: #5BC0DE;">评论人：${username}</span>
                            ${content}
                        </li>   
                        `;
                });
                // console.log(html);
                $('#cmt-list').html(html);

            }
        });
    };

    $('#formAddCmt').on('submit', function (e) {
        e.preventDefault();
        const data = $(this).serialize();  //获取表单提交的数据
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3006/api/addcmt',
            data,
            success: (res) => {    //这里使用箭头函数是让this指向form表单
                // console.log(res);
                if (res.status !== 201) {
                    return alert('添加评论失败！');
                }
                //调用方法重新渲染页面
                getCmtList();
                //清空表单里的内容
                this.reset();
            }
        })
    })

    getCmtList();
})