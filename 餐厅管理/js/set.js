window.onload = function(){
    if(localStorage.getItem('userName') == null){
        window.location = 'login.html';
    }
    //欢迎的用户名字
    var name = document.getElementsByClassName('name')[0];
    name.innerHTML = localStorage.getItem('userName');
    //点击退出登录
    var logOut = document.getElementsByClassName('logOut')[0];
    var hideLogOut = document.getElementsByClassName('hideLogOut')[0];
    var hideLogOutContent = document.getElementsByClassName('hideLogOutContent')[0];

    logOut.onclick = function(){
        hideLogOut.style.display = 'block';
        setTimeout(function(){
            hideLogOutContent.style.opacity = '1';
            hideLogOutContent.style.transform = "translate(" + -50 + "%," + 200 + "px)";
        },1)
        // window.location = 'login.html';
    }
    var logOutNoBtn = document.getElementsByClassName('logOutNoBtn')[0];
    var logOutYesBtn = document.getElementsByClassName('logOutYesBtn')[0];
    //点击取消退出登录
    logOutNoBtn.onclick = function(){
        hideLogOutContent.style.opacity = '0';
        hideLogOutContent.style.transform = "translate(" + -50 + "%," + -200 + "px)";
        setTimeout(function(){
            hideLogOut.style.display = 'none';
        },250)
    }
    //点击确认退出登录
    logOutYesBtn.onclick = function(){
        localStorage.removeItem('userName');
        window.location = 'login.html';
    }

    var input = document.getElementsByClassName('input');
    var secondTd = document.getElementsByClassName('secondTd');
    $.ajax({
        url:'http://118.195.129.130:3000/user/inquire',
        type:'post',
        data:{
            _id:localStorage.getItem('userId')
        },
        success:function(data){
            console.log(data)
            //用户名
            secondTd[0].innerHTML = data.data[0].us;
            //手机号
            if(data.data[0].phone == ""){
                secondTd[1].innerHTML = '未填写';
            }else{
                secondTd[1].innerHTML = data.data[0].phone;
            };
            //年龄
            secondTd[2].innerHTML = data.data[0].age;
            
            //性别（0是男，1是女）
            if(data.data[0].sex == 0){
                secondTd[3].innerHTML = '男';
            }else{
                secondTd[3].innerHTML = '女';
            }
            
        },
        error:function(){
            console.log('错误');
        }
    })


    //点击修改按钮
    var changeYesBtn = document.getElementsByClassName('changeYesBtn')[0];
    var changeBtn  = document.getElementsByClassName('changeBtn')[0];
    var contentForm = document.getElementsByClassName('contentForm')[0];
    var changeNoBtn = document.getElementsByClassName('changeNoBtn')[0];
    changeBtn.onclick = function(){
        $.ajax({
            url:'http://118.195.129.130:3000/user/inquire',
            type:'post',
            data:{
                _id:localStorage.getItem('userId')
            },
            success:function(data){
                contentForm.style.boxShadow = '0px 0px 15px #707070';
                contentForm.style.transform = 'translate(' +  -50 + '%,'+ -170 + 'px)';
                for(let i = 0;i < 3;i++){
                    secondTd[i].innerHTML = "<input type='text' class='input'/>"
                }
                input[0].value = data.data[0].us;
                if(data.data[0].phone == ""){
                    input[1].value = '未填写';
                }else{
                    input[1].value = data.data[0].phone;
                };
                input[2].value = data.data[0].age;

                //性别
                secondTd[3].innerHTML = `<select class='select'><option value='male'>男<option value='female'>女<select/>`;
                var select = document.getElementsByClassName('select')[0];
                if(data.data[0].sex == 0){
                    select.value = 'male';
                }else{
                    select.value = 'female';
                }
                changeYesBtn.style.display = 'block';
                changeBtn.style.display = 'none';
                changeNoBtn.style.visibility = 'visible';
            },
            error:function(){
                console.log('错误');
            }
        })
        
    }


    //点击确认修改按钮之后
    var sex;
    $('.contentBottom').on('click','.changeYesBtn',function(){
        if(document.getElementsByClassName('select')[0].value == 'male'){
            sex = 0;
        }else{
            sex = 1;
        }
        $.ajax({
            url:'http://118.195.129.130:3000/user/mod',
            type:'post',
            data:{
                us:input[0].value,
                phone:input[1].value,
                age:input[2].value,
                sex:sex,
                _id:localStorage.getItem('userId')
            },
            success:function(data){
                if(data.err == -1){
                    alert('请正确填写所改信息')
                }else{
                    //用户名
                    secondTd[0].innerHTML = input[0].value;
                    name.innerHTML = secondTd[0].innerHTML;
                    localStorage.removeItem('userName');
                    localStorage.setItem('userName',secondTd[0].innerHTML);
                    
                    //手机号
                    if(input[0].value == ""){
                        secondTd[1].innerHTML = '未填写';
                    }else{
                        secondTd[1].innerHTML = input[0].value;
                    }

                    //年龄
                    secondTd[2].innerHTML = input[0].value;
                    //性别
                    if(document.getElementsByClassName('select')[0].value == 'male'){
                        secondTd[3].innerHTML = '男';
                    }else{
                        secondTd[3].innerHTML = '女';
                    }
                    //设置按钮和表单位置
                    changeYesBtn.style.display = 'none';
                    changeBtn.style.display = 'block';
                    changeNoBtn.style.visibility = 'hidden';
                    contentForm.style.boxShadow = 'none';
                    contentForm.style.transform = 'translate(' +  -50 + '%,'+ -150 + 'px)';
                }
            },
            error:function(){
                console.log('错误')
            }
        })
    })

    //点击取消按钮
    $('.contentBottom').on('click','.changeNoBtn',function(){
        $.ajax({
            url:'http://118.195.129.130:3000/user/inquire',
            type:'post',
            data:{
                _id:localStorage.getItem('userId')
            },
            success:function(data){
                //用户名
                secondTd[0].innerHTML = data.data[0].us;
                //手机号
                if(data.data[0].phone == ""){
                    secondTd[1].innerHTML = '未填写';
                }else{
                    secondTd[1].innerHTML = data.data[0].phone;
                };
                //年龄
                secondTd[2].innerHTML = data.data[0].age;
                
                //性别（0是男，1是女）
                if(data.data[0].sex == 0){
                    secondTd[3].innerHTML = '男';
                }else{
                    secondTd[3].innerHTML = '女';
                }

                //设置按钮和表单位置
                changeYesBtn.style.display = 'none';
                changeBtn.style.display = 'block';
                changeNoBtn.style.visibility = 'hidden';
                contentForm.style.boxShadow = 'none';
                contentForm.style.transform = 'translate(' +  -50 + '%,'+ -150 + 'px)';

            },
            error:function(){
                console.log('错误');
            }
        })
    })
    
}