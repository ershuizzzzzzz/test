window.onload = function(){
    var text = document.getElementsByClassName('text');
    for(let i = 0;i < text.length;i++){
        text[i].onfocus = function(){
            this.style.borderColor = '#81C3F2';
        }
        text[i].onblur = function(){
            this.style.borderColor = '#cad2db';
        }
    }
    var clickSend = document.getElementsByClassName("clickSend")[0];
    var textName = document.getElementsByClassName('text')[0];
    var textPassword = document.getElementsByClassName('text')[1];
    var textEmail = document.getElementsByClassName('text')[2];
    var textCode = document.getElementsByClassName('text')[3];
    var loginBtn = document.getElementsByClassName('loginBtn')[0];
    var errorCode = document.getElementById('errorCode');
    //注册
    loginBtn.onclick = function(){
        if(text[0].value =="" || text[1].value =="" || text[2].value =="" || text[3].value ==""){
            alert('请正确输入表单内容！')
        }else{
            $.ajax({
                url: 'http://118.195.129.130:3000/user/reg',
                type: 'post',
                data: {
                    us: textName.value,
                    ps: textPassword.value,
                    mail: textEmail.value,
                    code:　textCode.value
                },
                success:function(data){
                    if(data.msg == "用户名已存在"){
                        alert("用户名已存在，请重新注册！")
                    }else if(data.msg == "验证码错误"){
                        errorCode.style.visibility = 'visible';
                    }else{
                        window.location = 'login.html';
                    }
                    console.log(data)
                },
                error:function(){
                    errorCode.style.visibility = 'visible';
                }
            })
        }
    }
    //发送验证码
    clickSend.onclick = function(){
        if(textEmail.value == ""){
            alert('请输入邮箱！')
        }else{
            $.ajax({
                url: 'http://118.195.129.130:3000/user/getMailCode',
                type: 'post',
                data: {
                    mail: textEmail.value,
                },
                success:function(data){
                    if(data.err == -1){
                        alert('请正确输入邮箱！')
                    }else{
                        clickSend.style.display = 'none';
                        wait.style.display = 'flex';
                        cutSecond();
                    }
                },
                error:function(){
                    console.log('错误');
                }
            })
        }
        
    }
    var clickSend = document.getElementsByClassName('clickSend')[0];
    var second = document.getElementsByClassName('second')[0];
    var wait = document.getElementsByClassName('wait')[0];
    var time = 60;
    function cutSecond(){
        second.innerHTML = time;
        aa = setInterval(function(){
            if(time == 0){
                clearInterval(aa)
                clickSend.style.display = 'inline';
                wait.style.display = 'none';
            }else{
                time -= 1;
                second.innerHTML = time;
            }
        },1000)
    }
    

    //密码是否可见
    var eye = document.getElementById('eye');
    eye.onclick = function(){
        if(textPassword.type == 'text'){
            this.className = 'iconfont iconmimabukejian';
            textPassword.type = 'password';
        }else{
            this.className = 'iconfont iconmimakejian';
            textPassword.type = 'text';
        }
    }
}