$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();
    $('#btnSend').on('click', function () {
        let text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('');
        };
        $('.talk_list').append(
            `
                <li class="right_word">
                    <img src="img/person02.png" />
                    <span>${text}</span>
                </li>
            `
        );
        $('#ipt').val('');
        //重置滚动条位置
        resetui();
        //调用方法,把输入的内容传进去
        getMsg(text)
    });

    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: { spoken: text },
            success: function (res) {
                console.log(res);
                let msg = res.data.info.text;  //获取机器人回复的内容
                $('.talk_list').append(
                    `
                    <li class="left_word">
                        <img src="img/person01.png" /> <span>${msg}</span>
                     </li>
                    `
                );
                getVoice(msg);
                //重置滚动条位置
                resetui();
            }
        });
    };

    // 把文字转化为语音进行播放
    function getVoice(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                if (res.status == 200) {
                    // 播放语音
                    $('#voice').attr('src', res.voiceUrl);    //只要给audio加上src属性然后附上地址就可以让机器人读出来了
                }
            }
        });
    };

    // 为文本框绑定 keyup 事件
    $('#ipt').on('keyup', function (e) {
        // console.log(e.keyCode)
        if (e.keyCode === 13) {
            $('#btnSend').click()
        }
    })

})