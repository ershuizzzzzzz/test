window.onload = function(){
    if(localStorage.getItem('userName') == null){
        window.location = 'login.html';
    } 
    //欢迎的用户名字
    var name = document.getElementsByClassName('name')[0];
    var lastname = localStorage.getItem("registerName");
    name.innerHTML = lastname;
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
    

    //获得总页数
    var allPage = document.getElementsByClassName('allPage')[0];
    $.ajax({
        url: 'http://118.195.129.130:3000/users/allpage_users',
        type: 'get',
        data: {
        },
        success: function(data){
            if(data.pages % 10 == 0){
                data.pages /= 10;
            }else{
                data.pages = parseInt(data.pages/10) + 1;
            }
            allPage.innerHTML = data.pages;
        },
        error: function(){
            console.log('错误')
        }
    })

//自动排序
    var inquireTbodyTr = document.getElementsByClassName('inquireTbodyTr');
    function sort(){
        for(let i = 0;i <　inquireTbodyTr.length;i++){
            inquireTbodyTr[i].children[0].innerHTML = i+1;
        }
    }
    //增加一行
    function addTr(){
        var inquireTbody = document.getElementsByClassName('inquireTbody')[0];
        var creadTr = document.createElement('tr');
        creadTr.className = 'inquireTbodyTr';
        inquireTbody.appendChild(creadTr);
        for(let i = 0;i < 7;i++){
            //第六个格子加按钮
            if(i == 6){
                var creatTd = document.createElement('td');
                creatTd.innerHTML = "<button class='changeBtn'>修改<button class='deleteBtn'>删除"
                creatTd.className = 'inquireTbodyTd';
                creadTr.appendChild(creatTd);
            }else{
                var creatTd = document.createElement('td');
                creatTd.className = 'inquireTbodyTd';
                creadTr.appendChild(creatTd);
            }
        }
        sort();
    }
    
    //分页查询
    var toPage = document.getElementsByClassName('toPage')[0]; 
    var inquireTbodyTr = document.getElementsByClassName('inquireTbodyTr');
    showDishes();//使页面加载出来时表格里面有内容；
    var allPage = document.getElementsByClassName('allPage')[0];
    var inquireTbody = document.getElementsByClassName('inquireTbody')[0];
    var usersId = new Array();
    function showDishes(){
        $.ajax({
            url:'http://118.195.129.130:3000/users/getInfoByPage_users',
            type:'post',
            data:{
                page: toPage.value,
                per_page: 10,
            },
            success:function(data){
                for(let i = 0;i < data.data.length;i++){
                    usersId[i] = data.data[i]._id
                    addTr();
                    inquireTbodyTr[i].children[1].innerHTML = data.data[i].us;
                    if(data.data[i].phone == ""){
                        inquireTbodyTr[i].children[2].innerHTML = "未填写";
                    }else{
                        inquireTbodyTr[i].children[2].innerHTML = data.data[i].phone;
                    }
                    if(data.data[i].sex === 0){
                        inquireTbodyTr[i].children[3].innerHTML = "男";
                    }else{
                        inquireTbodyTr[i].children[3].innerHTML = "女";
                    }
                    inquireTbodyTr[i].children[4].innerHTML = data.data[i].age;
                    inquireTbodyTr[i].children[5].innerHTML = data.data[i].integral;
                }
            },
            error:function(){
                console.log('错误');
            }
        })
    }


    //下一页
    var nextPageBtn = document.getElementsByClassName('nextPageBtn')[0];
    var toLastPageBtn = document.getElementsByClassName('toLastPageBtn')[0];
    var toFirstPageBtn = document.getElementsByClassName('toFirstPageBtn')[0];
    nextPageBtn.onclick = function(){
        if(toPage.value == allPage.innerHTML){
            return;
        }else{
            toPage.value++;
            inquireTbody.innerHTML = "";
            showDishes()
        }
        if(toPage.value == allPage.innerHTML){
            nextPageBtn.style.opacity = '0.3';
            toLastPageBtn.style.opacity = '0.3';
        }
        backPageBtn.style.opacity = '1';
        toFirstPageBtn.style.opacity = '1';
    }
    
    //上一页
    var backPageBtn = document.getElementsByClassName('backPageBtn')[0];
    
    backPageBtn.onclick = function(){
        if(toPage.value == 1){
            return;
        }else{
            toPage.value--;
            inquireTbody.innerHTML = "";
            showDishes()
        }
        if(toPage.value == 1){
            backPageBtn.style.opacity = '0.3';
            toFirstPageBtn.style.opacity = '0.3';
        }
        nextPageBtn.style.opacity = '1';
        toLastPageBtn.style.opacity = '1';
    }
    //回车键跳到某一页
    toPage.onkeydown=function(ev){
        var event=ev || event
        if(event.keyCode==13){
            if(parseInt(toPage.value) < 1 || parseInt(toPage.value) > parseInt(allPage.innerHTML)){
                toPage.value = 1;
                alert('无内容，请重新输入！');
                inquireTbody.innerHTML = "";
                showDishes()
            }else{
                backPageBtn.style.opacity = '1';
                inquireTbody.innerHTML = "";
                showDishes()
            }
            toLastPageBtn.style.opacity = '1';
            toFirstPageBtn.style.opacity = '1';
            if(toPage.value == 1){
                backPageBtn.style.opacity = '0.3';
                toFirstPageBtn.style.opacity = '0.3';
                nextPageBtn.style.opacity = '1';
                toLastPageBtn.style.opacity = '1';
            }
            
            if(toPage.value == allPage.innerHTML){
                nextPageBtn.style.opacity = '0.3';
                toLastPageBtn.style.opacity = '0.3';
                backPageBtn.style.opacity = '1';
                toFirstPageBtn.style.opacity = '1';
            }
            
        }
    }
    //跳到第一页
    var toFirstPageBtn = document.getElementsByClassName('toFirstPageBtn')[0];
    toFirstPageBtn.onclick = function(){
        if(toPage.value == 1){
            return false;
        }else{
            toPage.value = 1;
            inquireTbody.innerHTML = "";
            showDishes();
            toFirstPageBtn.style.opacity = '0.3';
            toLastPageBtn.style.opacity = '1';
            nextPageBtn.style.opacity = '1';
            backPageBtn.style.opacity = '0.3';
        }
    }
    //跳到最后一页
    var toLastPageBtn = document.getElementsByClassName('toLastPageBtn')[0];
    toLastPageBtn.onclick = function(){
        if(toPage.value == allPage.innerHTML){
            return false;
        }else{
            toPage.value = allPage.innerHTML;
            inquireTbody.innerHTML = "";
            showDishes();
            toFirstPageBtn.style.opacity = '1';
            toLastPageBtn.style.opacity = '0.3';
            nextPageBtn.style.opacity = '0.3';
            backPageBtn.style.opacity = '1';
        }
    }
//删除菜品

    var hideDelete = document.getElementsByClassName('hideDelete')[0];
    var hideDeleteForm = document.getElementsByClassName('hideDeleteForm')[0];
    var deleteInput = document.getElementsByClassName('deleteInput');
    
    //删除表单里面加内容
    $('.content').on('click','.deleteBtn',function(ev){
        showDeleteForm();
        for(let i = 0;i < deleteInput.length;i++){
            deleteInput[i].innerHTML = this.parentNode.parentNode.children[i].innerHTML;
        }
    });
    var deleteNoBtn = document.getElementsByClassName('deleteNoBtn')[0];
    var closeDelete = document.getElementById('closeDelete');
    deleteNoBtn.onclick = closeDeleteForm;
    closeDelete.onclick = closeDeleteForm;

    //显示要删除菜品的表单
    function showDeleteForm(){
        hideDelete.style.display = 'block';
        setTimeout(function(){
            hideDeleteForm.style.opacity = '1';
            hideDeleteForm.style.transform = "translate(" + -50 + "%," +　300 + "px)";
        },1)
    }

    //关闭删除的表单
    function closeDeleteForm(){
        setTimeout(function(){
            hideDelete.style.display = 'none';
        },270)
        hideDeleteForm.style.opacity = '0';
        hideDeleteForm.style.transform = "translate(" + -50 + "%," +　-300 + "px)";
        for(let i = 0;i<deleteInput.length;i++){
            deleteInput[i].innerHTML = "";
        }
    }

    var deleteYesBtn = document.getElementsByClassName('deleteYesBtn')[0];
    //函数：删除这一行内容
    function deleteThis(){
        $.ajax({
            url: 'http://118.195.129.130:3000/users/del_users',
            type: 'post',
            data:{
                _id: usersId[deleteYesBtn.parentNode.parentNode.getElementsByTagName('tr')[0].children[1].children[0].innerHTML-1],
            },
            success:function(data){
                inquireTbody.removeChild(inquireTbody.children[deleteInput[2].parentNode.parentNode.parentNode.children[0].children[1].children[0].innerHTML-1]);
                closeDeleteForm();
                //给新增的一行加上内容
                $.ajax({
                    url:'http://118.195.129.130:3000/users/getInfoByPage_users',
                    type:'post',
                    data:{
                        page: toPage.value,
                        per_page: 10,
                    },
                    success:function(data){
                        inquireTbody.innerHTML = "";
                        for(let i = 0;i < data.data.length;i++){
                            addTr();
                            inquireTbodyTr[i].children[1].innerHTML = data.data[i].us;
                            if(data.data[i].phone == ""){
                                inquireTbodyTr[i].children[2].innerHTML = '未填写';
                            }else{
                                inquireTbodyTr[i].children[2].innerHTML = data.data[i].Phone;
                            }
                            if(data.data[i].sex == 0){
                                inquireTbodyTr[i].children[3].innerHTML = '男';
                            }else{
                                inquireTbodyTr[i].children[3].innerHTML = '女';
                            }
                            inquireTbodyTr[i].children[4].innerHTML = data.data[i].age;
                            inquireTbodyTr[i].children[5].innerHTML = data.data[i].integral;
                        }
                        sort();
                    }
                })
            },
            error:function(){
                console.log('错误')
            }
        })
    }
    //点击确认删除按钮后
    deleteYesBtn.onclick = function(ev){
        var deleteInput = document.getElementsByClassName('deleteInput');
        //当最后一页的时候
        if(parseInt(toPage.value) == parseInt(allPage.innerHTML) || pages.style.display == 'none'){
            $.ajax({
                url: 'http://118.195.129.130:3000/users/del_users',
                type: 'post',
                data:{
                    _id: usersId[deleteYesBtn.parentNode.parentNode.getElementsByTagName('tr')[0].children[1].children[0].innerHTML-1],
                },
                success:function(data){
                    sort();
                    inquireTbody.removeChild(inquireTbody.children[deleteInput[2].parentNode.parentNode.parentNode.children[0].children[1].children[0].innerHTML-1]);
                    closeDeleteForm();
                    //当最后一页被删完了
                    if(inquireTbody.innerHTML == ""){
                        if(pages.style.display == 'none'){
                            return;
                        }else{
                            //更新总页数
                            $.ajax({
                                url: 'http://118.195.129.130:3000/users/allpage_users',
                                type: 'get',
                                data: {
                                },
                                success: function(data){
                                    if(data.pages % 10 == 0){
                                        data.pages /= 10;
                                    }else{
                                        data.pages = parseInt(data.pages/10) + 1;
                                    }
                                    allPage.innerHTML = data.pages;
                                },
                                error: function(){
                                    console.log('错误')
                                }
                            })
                            //最后一页删完了要到上一页
                            $.ajax({
                                url:'http://118.195.129.130:3000/users/getInfoByPage_users',
                                type:'post',
                                data:{
                                    page: --toPage.value,
                                    per_page: 10,
                                },
                                success:function(data){
                                    for(let i = 0;i < data.data.length;i++){
                                        addTr();
                                        inquireTbodyTr[i].children[1].innerHTML = data.data[i].us;
                                        if(data.data[i].phone == ""){
                                            inquireTbodyTr[i].children[2].innerHTML = '未填写';
                                        }else{
                                            inquireTbodyTr[i].children[2].innerHTML = data.data[i].Phone;
                                        }
                                        if(data.data[i].sex == 0){
                                            inquireTbodyTr[i].children[3].innerHTML = '男';
                                        }else{
                                            inquireTbodyTr[i].children[3].innerHTML = '女';
                                        }
                                        inquireTbodyTr[i].children[4].innerHTML = data.data[i].age;
                                        inquireTbodyTr[i].children[5].innerHTML = data.data[i].integral;
                                    }
                                }
                            })
                        }
                    }
                },
                error:function(){
                    console.log('错误')
                }
            })
        }else{
            deleteThis();
            
        }
    }

    //修改菜品，用户名，性别，年龄
    var hideChange = document.getElementsByClassName('hideChange')[0];
    var hideChangeForm = document.getElementsByClassName('hideChangeForm')[0];
    var closeChange = document.getElementById('closeChange');
    var ChangeInput = document.getElementsByClassName('ChangeInput');
    var ChangeNoBtn = document.getElementsByClassName('ChangeNoBtn')[0];
    $('.content').on('click','.changeBtn',function(ev){
        changeForm();
        //给打开的表单填入这一行的菜品信息
        var select = document.getElementsByClassName('select')[0];
        if(this.parentNode.parentNode.children[3].innerHTML == '男'){
            select.value = 'male';
        }else{
            select.value = 'female';
        }
        ChangeInput[0].value = this.parentNode.parentNode.children[0].innerHTML;
        ChangeInput[1].value = this.parentNode.parentNode.children[1].innerHTML;
        ChangeInput[2].value = this.parentNode.parentNode.children[4].innerHTML;
        var ChangeYesBtn = document.getElementsByClassName('ChangeYesBtn')[0];
        ChangeYesBtn.onclick = function(ev){
            if(select.value == 'male'){
                sex = 0;
            }else{
                sex = 1;
            }
            $.ajax({
                url:'http://118.195.129.130:3000/users/update_users',
                type:'post',
                data:{
                    us:ChangeInput[1].value,
                    age:ChangeInput[2].value,
                    sex:sex,
                    _id:usersId[ev.target.parentNode.parentNode.getElementsByTagName('td')[1].children[0].value-1],
                },
                success:function(data){
                    if(data.msg === '用户名已存在'){
                        alert('该用户已存在！')
                    }else{
                        var inquireTbodyTr = document.getElementsByClassName('inquireTbodyTr');
                        inquireTbodyTr[ev.target.parentNode.parentNode.getElementsByTagName('td')[1].children[0].value-1].children[1].innerHTML = ChangeInput[1].value;
                        inquireTbodyTr[ev.target.parentNode.parentNode.getElementsByTagName('td')[1].children[0].value-1].children[4].innerHTML = ChangeInput[2].value;
                        if(sex == 0){
                            inquireTbodyTr[ev.target.parentNode.parentNode.getElementsByTagName('td')[1].children[0].value-1].children[3].innerHTML = '男';
                        }else{
                            inquireTbodyTr[ev.target.parentNode.parentNode.getElementsByTagName('td')[1].children[0].value-1].children[3].innerHTML = '女';
                        }
                        //增加积分
                        $.ajax({
                            url:"http://118.195.129.130:3000/users/integral",
                            data:{
                                us:ChangeInput[1].value,
                                age:ChangeInput[2].value,
                                sex:sex,
                                integral:ChangeInput[3].value,
                            },
                            success:function(data){
                                inquireTbodyTr[ev.target.parentNode.parentNode.getElementsByTagName('td')[1].children[0].value-1].children[3].innerHTML += ChangeInput[3].value;
                            },
                            error:function(){
                                console.log(data)
                            }
                        })
                        closeChangeForm();
                    }
                    console.log(data)
                    
                },
                error:function(){
                    console.log('错误')
                }
            })
        }
        
    });
    


    function changeForm(){
        hideChange.style.display = 'block';
        setTimeout(function(){
            hideChangeForm.style.opacity = '1';
            hideChangeForm.style.transform = "translate(" + -50 + "%," + 300 + "px)";
        },1)
    }
    ChangeNoBtn.onclick = closeChangeForm;
    closeChange.onclick = closeChangeForm;
    function closeChangeForm(){
        setTimeout(function(){
            hideChange.style.display = 'none';
        },270)
        hideChangeForm.style.transform = "translate(" + -50 + "%," + -300 + "px)";
        hideChangeForm.style.opacity = '0';
        for(let i = 0;i < ChangeInput.length;i++){
            ChangeInput[i].value = "";
        }
    }

//查询菜品
    var searchInputHide = true;
    var searchBtn = document.getElementsByClassName('searchBtn')[0];
    var hideSearch = document.getElementsByClassName('hideSearch')[0];
    searchBtn.onclick = function(){
        if(searchInputHide){
            searchInputHide = !searchInputHide;
            hideSearch.style.display = 'inline-block';
            setTimeout(function(){
                hideSearch.style.transform = "translateY(" + 52 + 'px' + ")";
            },1)
            searchBtn.style.border = 'solid 1px white';
            searchBtn.style.color = 'white';
            searchBtn.style.backgroundColor = '#647f9d';
        }else{
            closeChangeInput();
        }
        
    }


    //关闭搜索的表单
    var searchInput = document.getElementsByClassName('searchInput')[0];
    function closeChangeInput(){
        setTimeout(function(){
            hideSearch.style.display = 'none';
            
        },500)
        if(searchInput.value != ""){
            location.reload();
        }
        hideSearch.style.transform = "translateY(" + -52 + 'px' + ")";
        searchBtn.style.border = 'solid 1px #eab67c';
        searchBtn.style.color = '#eab67c';
        searchBtn.style.backgroundColor = 'white';
        searchInputHide = !searchInputHide;
    }


    var searchInput = document.getElementsByClassName('searchInput')[0];
    var searchYesBtn = document.getElementsByClassName('searchYesBtn')[0];
    var pages = document.getElementsByClassName('pages')[0];
    searchYesBtn.onclick = function(){
        if(searchInput.value == ""){
            alert('请输入搜索内容！')
        }else{
            searchFunc();
        }
    }
    searchInput.onkeydown=function(ev){
        var event=ev || event
        if(event.keyCode==13){
            searchFunc();
        }
    }
    function searchFunc(){
        $.ajax({
            url:'http://118.195.129.130:3000/users/getInfoByKw_users',
            type:'post',
            data:{
                kw:searchInput.value
            },
            success:function(data){
                if(data.data.length == 0){
                    inquireTbody.innerHTML = "<div class='none'>查无数据！</div>";
                }else{
                    inquireTbody.innerHTML = "";
                    for(let i = 0;i < data.data.length;i++){
                        addTr();
                        inquireTbodyTr[i].children[1].innerHTML = data.data[i].us;
                        if(data.data[i].phone === ''){
                            inquireTbodyTr[i].children[2].innerHTML = '未填写';
                        }else{
                            inquireTbodyTr[i].children[2].innerHTML = data.data[i].phone;
                        }
                        if(data.data[i].sex === 0){
                            inquireTbodyTr[i].children[3].innerHTML = '男';
                        }else{
                            inquireTbodyTr[i].children[3].innerHTML = '女';
                        }
                        inquireTbodyTr[i].children[4].innerHTML = data.data[i].age;
                        inquireTbodyTr[i].children[5].innerHTML = data.data[i].integral;
                    }
                }
                pages.style.display = 'none';
            },
            error:function(){
                console.log('错误')
            }
        })
        
    }

    


    var returnBtn = document.getElementsByClassName('returnBtn')[0];
    returnBtn.onclick = function(){
        location.reload();
    }
}