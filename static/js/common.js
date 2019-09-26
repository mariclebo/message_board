"use strict";

$(function() {
    $("#").ajax(function() {
        var uname = $("uname").val();

        

    });
    $("#send_sms_code").click(function() {
        // 校验手机号格式
        var phone = $("phone").val();

        if(! /1\d{10}/.test(phone)) {
            alert("手机号格式错误!");
            $("#phone").focus();
            return;
        }
        
        // 通过Ajax将手机号发送给服务器后端程序
        $.ajax({
            url: "/send_one_code",
            data: {
                phone: phone
            },
        success: function(data)
        });


        var s = 10;
        $("#send_sms_code").prop("disabled", true);
        $("#send_sms_code").html(s + "S");
        
        var timer = window.setInterval(function() {
            --s;
            if (s === 0) {
                window.clearInterval(timer);
                $("#send_sms_code").html("重新发送");
                $("#send_sms_code").prop("disabled", false);
                return;
            }

            $("#send_sms_code").html(s + "S");
        }, 1000);
    });
});