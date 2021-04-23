window.onload = function(){
    
    var usersName = document.getElementsByClassName('usersName')[0];
    usersName.vaLue = localStorage.getItem('userName');
    usersName.onfocus = function(){
        this.style.borderColor = '#81C3F2';
    }
    usersName.onblur = function(){
        this.style.borderColor = '#cad2db';
    }

    var password = document.getElementsByClassName('password')[0];
    password.onfocus = function(){
        this.style.borderColor = '#81C3F2';
    }
    password.onblur = function(){
        this.style.borderColor = '#cad2db';
    }
    //点击进入注册页面
    var registerFont = document.getElementsByClassName('registerFont')[0];
    registerFont.onclick = function(){
        window.location = "register.html";
    }
    //点击登录
    var loginBtn = document.getElementsByClassName('loginBtn')[0];
    var error = document.getElementById('error');
    loginBtn.onclick = function(){
        $.ajax({
            url: 'http://118.195.129.130:3000/user/login',
            type: 'post',
            data:{
                us: usersName.value,
                ps: password.value
            },
            success: function(data){
                console.log(data)
                if(data.err == -1){
                    error.style.visibility = 'visible';
                }else{
                    localStorage.setItem('userName',usersName.value)
                    localStorage.setItem('userId',data.data[0]._id)
                    window.location = "dishes.html";
                }
            },
            error: function(jqXML){
                console.log('错误');
            }
        })
        
    }
    //密码是否可见
    var eye = document.getElementById('eye');
    eye.onclick = function(){
        if(password.type == 'password'){
            this.className = 'iconfont iconmimakejian';
            password.type = 'text';
        }else{
            this.className = 'iconfont iconmimabukejian';
            password.type = 'password';
        }
    }
}