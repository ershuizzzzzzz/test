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
    
    //添加菜品表单
    var alertNum = document.getElementsByClassName('alertNum')[0];
    var addInput = document.getElementsByClassName('addInput');
    var addAlertPriceNum = document.getElementsByClassName('addAlertPriceNum')[0];
    for(let i = 0;i < addInput.length;i++){
        addInput[i].onfocus = function(){
            this.style.borderColor = '#2ECC71';
        }
        addInput[i].onblur = function(){
            this.style.borderColor = '#BDC3C7';
        }
        addInput[1].onfocus = function(){
            this.style.borderColor = '#2ECC71';
            addAlertPriceNum.style.visibility = 'visible';
        }
        addInput[1].onblur = function(){
            this.style.borderColor = '#BDC3C7';
            addAlertPriceNum.style.visibility = 'hidden';
        }
    }

    var addBtn = document.getElementsByClassName('addBtn')[0];
    var hideAdd = document.getElementsByClassName('hideAdd')[0];
    var hideAddForm = document.getElementsByClassName('hideAddForm')[0];
    addBtn.onclick = function(){
        hideAdd.style.display = 'block';
        setTimeout(function(){
            hideAddForm.style.opacity = '1';
            hideAddForm.style.transform = "translate("  + -50 + "%," + 300 + "px)";
        },1)
        addBtn.style.border = 'solid 1px white';
        addBtn.style.color = 'white';
        addBtn.style.backgroundColor = '#647f9d';
    }

    //关闭添加菜品的表单
    function closeAddForm(){
        setTimeout(function(){
            hideAdd.style.display = 'none';
        },270)
        hideAddForm.style.transform = "translate("  + -50 + "%," + -300 + "px)";
        hideAddForm.style.opacity = '0';
        addBtn.style.border = 'solid 1px #eab67c';
        addBtn.style.color = '#eab67c';
        addBtn.style.backgroundColor = 'white';
        for(var i = 0;i < addInput.length;i++){
            addInput[i].value = "";
        }
        var addRadioYes = document.getElementById('addRadioYes');
        var addRadioNo = document.getElementById('addRadioNo');
        addRadioYes.checked = false;
        addRadioNo.checked = false;
    }
    window.onclick = function(event){
        if(event.target.className == 'hideAdd'){
            closeAddForm();
        }else{
            return;
        }
    }
    var closeAdd = document.getElementById('closeAdd');
    closeAdd.onclick = function(){
        closeAddForm();
    }
    var addNoBtn = document.getElementsByClassName('addNoBtn')[0];
    addNoBtn.onclick = function(){
        closeAddForm();
    }
    //保存新增菜品
    var addYesBtn = document.getElementsByClassName('addYesBtn')[0];
    addYesBtn.onclick = function(){
        var pay;
        var addRadioYes = document.getElementById('addRadioYes');
        var addRadioNo = document.getElementById('addRadioNo');
        if(addRadioYes.checked == true){
            pay = 1;
        }else{
            psy = 0;
        }
        $.ajax({
            url:'http://118.195.129.130:3000/order/add_order',
            type:'post',
            data:{
                us:addInput[0].value,
                amount:addInput[1].value,
                phone:addInput[2].value,
                pay:pay,
            },
            success:function(data){
                if(addInput[0].value == "" || addInput[1].value == "" || addInput[2].value == ""){
                    alert('请正确填写表单内容！')
                }else{
                    if(data.err == -1){
                        alert('该用户不存在，请重新输入！')
                    }else{
                        location.reload()
                        hideAdd.style.display = 'none';
                        hideAddForm.style.opacity = '0';
                        for(var i = 0;i < addInput.length;i++){
                            addInput[i].value = " ";
                        }
                        addRadioYes.checked = false;
                        addRadioNo.checked = false;
                        addBtn.style.border = 'solid 1px #eab67c';
                        addBtn.style.color = '#eab67c';
                        addBtn.style.backgroundColor = 'white';
                    }
                }
            },
            error:function(){
                console.log('错误')
            }
        })
    }

    //获得总页数
    var allPage = document.getElementsByClassName('allPage')[0];
    $.ajax({
        url: 'http://118.195.129.130:3000/order/allpage_order',
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
        for(let i = 0;i < 5;i++){
            //第六个格子加按钮
            if(i == 4){
                var creatTd = document.createElement('td');
                creatTd.innerHTML = "<button class='changeBtn'>修改<button class='deleteBtn'>删除"
                creatTd.className = 'inquireTbodyTd';
                creadTr.appendChild(creatTd);
            }else{
                var creatTd = document.createElement('td');
                creatTd.className = 'inquireTbodyTd';
                creadTr.appendChild(creatTd);
            }
            //第五个格子加上是否支付的框框
            if(i == 3){
                var creatTd = document.createElement('td');
                creatTd.innerHTML = "<input type='checkbox' class='checkbox' disabled/>已支付"
                creatTd.className = 'ifPay';
                creadTr.appendChild(creatTd);
            }
        }
        sort();
    }
    
    //分页查询
    var toPage = document.getElementsByClassName('toPage')[0]; 
    var inquireTbodyTr = document.getElementsByClassName('inquireTbodyTr');
    showDishes();//使页面加载出来时表格里面有内容；
    var toPage = document.getElementsByClassName('toPage')[0];
    
    var _id = new Array();
    function showDishes(){
        $.ajax({
            url:'http://118.195.129.130:3000/order/getInfoByPage_order',
            type:'post',
            data:{
                page: toPage.value,
                per_page: 10,
            },
            success:function(data){
                for(let i = 0;i < data.data.length;i++){
                    addTr();
                    inquireTbodyTr[i].children[1].innerHTML = data.data[i].us;
                    inquireTbodyTr[i].children[2].innerHTML = data.data[i].amount;
                    inquireTbodyTr[i].children[3].innerHTML = data.data[i].phone;
                    var checkbox = document.getElementsByClassName('checkbox');
                    if(data.data[i].pay == 0){
                        checkbox[i].checked = false;
                    }else{
                        checkbox[i].checked = true;
                    }
                    checkbox[i].onclick = function(){
                        return false;//作用：阻止冒泡；阻止默认行为。
                    }
                    _id[i] = data.data[i]._id;
                }
            }
        })
    }


    //下一页
    var inquireTbody = document.getElementsByClassName('inquireTbody')[0];
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
        console.log(toPage.value)
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
        console.log(toPage.value)
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
        var deleteRadioYes = document.getElementById('deleteRadioYes');
        var deleteRadioNo = document.getElementById('deleteRadioNo');
        deleteRadioYes.checked = false;
        deleteRadioNo.checked = false;
        showDeleteForm();
        for(let i = 0;i < deleteInput.length;i++){
            deleteInput[i].innerHTML = this.parentNode.parentNode.children[i].innerHTML;
        }
        if(this.parentNode.parentNode.children[4].children[0].checked == true){
            deleteRadioYes.checked = true;
        }else{
            deleteRadioNo.checked = true;
        }
        deleteRadioYes.onclick = function(){
            return false;
        }
        deleteRadioNo.onclick = function(){
            return false;
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
            url: 'http://118.195.129.130:3000/order/del_order',
            type: 'post',
            data:{
                _id: _id[deleteYesBtn.parentNode.parentNode.getElementsByTagName('tr')[0].children[1].children[0].innerHTML-1],
            },
            success:function(data){
                inquireTbody.removeChild(inquireTbody.children[deleteInput[2].parentNode.parentNode.parentNode.children[0].children[1].children[0].innerHTML-1]);
                closeDeleteForm();
                //给新增的一行加上内容
                $.ajax({
                    url:'http://118.195.129.130:3000/order/getInfoByPage_order',
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
                            inquireTbodyTr[i].children[2].innerHTML = data.data[i].amount;
                            inquireTbodyTr[i].children[3].innerHTML = data.data[i].phone;
                            if(data.data[i].pay == 0){
                                inquireTbodyTr[i].children[4].children[0].checked = false;
                            }else{
                                inquireTbodyTr[i].children[4].children[0].checked = true;
                            }
                            inquireTbodyTr[i].children[4].children[0].onclick = function(){
                                return false;
                            }
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
                url: 'http://118.195.129.130:3000/order/del_order',
                type: 'post',
                data:{
                    _id: _id[deleteYesBtn.parentNode.parentNode.getElementsByTagName('tr')[0].children[1].children[0].innerHTML-1],
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
                                url: 'http://118.195.129.130:3000/order/allpage_order',
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
                                url:'http://118.195.129.130:3000/order/getInfoByPage_order',
                                type:'post',
                                data:{
                                    page: --toPage.value,
                                    per_page: 10,
                                },
                                success:function(data){
                                    for(let i = 0;i < data.data.length;i++){
                                        addTr();
                                        inquireTbodyTr[i].children[1].innerHTML = data.data[i].us;
                                        inquireTbodyTr[i].children[2].innerHTML = data.data[i].amount;
                                        inquireTbodyTr[i].children[3].innerHTML = data.data[i].phone;
                                        if(data.data[i].pay == 0){
                                            inquireTbodyTr[i].children[4].children[0].checked = false;
                                        }else{
                                            inquireTbodyTr[i].children[4].children[0].checked = true;
                                        }
                                        inquireTbodyTr[i].children[4].children[0].onclick = function(){
                                            return false;
                                        }
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

    //修改菜品
    var hideChange = document.getElementsByClassName('hideChange')[0];
    var hideChangeForm = document.getElementsByClassName('hideChangeForm')[0];
    var closeChange = document.getElementById('closeChange');
    var ChangeInput = document.getElementsByClassName('ChangeInput');
    var ChangeNoBtn = document.getElementsByClassName('ChangeNoBtn')[0];
    $('.content').on('click','.changeBtn',function(ev){
        changeForm();
        var changeRadioYes = document.getElementById('changeRadioYes');
        var changeRadioNo = document.getElementById('changeRadioNo');
        //给打开的表单填入这一行的菜品信息
        var number = this.parentNode.parentNode.children[0].innerHTML;
        var us = this.parentNode.parentNode.children[1].innerHTML;
        var amount = this.parentNode.parentNode.children[2].innerHTML;
        var phone = this.parentNode.parentNode.children[3].innerHTML;
        ChangeInput[0].value = number;
        ChangeInput[0].disabled = true;
        ChangeInput[0].style.border = 'none';
        ChangeInput[1].value = us;
        ChangeInput[2].value = amount;
        ChangeInput[3].value = phone;
        if(this.parentNode.parentNode.children[4].children[0].checked == true){
            changeRadioYes.checked = true;
        }else{
            changeRadioNo.checked = true;
        }
        var ChangeYesBtn = document.getElementsByClassName('ChangeYesBtn')[0];
        ChangeYesBtn.onclick = function(){
            if(changeRadioYes.checked == true){
                pay = 1;
            }else{
                pay = 0;
            }
            $.ajax({
                url:'http://118.195.129.130:3000/order/update_order',
                type:'post',
                data:{
                    us:ChangeInput[1].value,
                    amount:ChangeInput[2].value,
                    phone:ChangeInput[3].value,
                    pay:pay,
                    _id:_id[this.parentNode.parentNode.getElementsByTagName('tr')[0].children[1].children[0].value-1]
                },
                success:function(data){

                },
                error:function(){
                    console.log("错误");
                }
            })
            var inquireTbodyTr = document.getElementsByClassName('inquireTbodyTr')[this.parentNode.parentNode.getElementsByTagName('tr')[0].children[1].children[0].value-1];
            inquireTbodyTr.children[1].innerHTML = ChangeInput[1].value;
            inquireTbodyTr.children[2].innerHTML = ChangeInput[2].value;
            inquireTbodyTr.children[3].innerHTML = ChangeInput[3].value;
            if(pay == 1){
                inquireTbodyTr.children[4].children[0].checked = true;
            }else{
                inquireTbodyTr.children[4].children[0].checked = false;
            }
            closeChangeForm();
        }
        
    });
    

    var alertPriceNum = document.getElementsByClassName('alertPriceNum')[0];
    var ChangeInput = document.getElementsByClassName('ChangeInput');
    for(let i = 0;i < ChangeInput.length-1;i++){
            ChangeInput[i].onfocus = function(){
                console.log(i + 'dianji')
                this.style.borderColor = '#2ECC71';
            }
            ChangeInput[i].onblur = function(){
                console.log(i + 'songkai')
                this.style.borderColor = '#BDC3C7';
            }
            ChangeInput[2].onfocus = function(){
                alertPriceNum.style.visibility = 'visible';
                this.style.borderColor = '#2ECC71';
            }
            ChangeInput[2].onblur = function(){
                alertPriceNum.style.visibility = 'hidden';
                this.style.borderColor = '#BDC3C7';
            }
    }

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
        var changeRadioYes = document.getElementById('changeRadioYes');
        var changeRadioNo = document.getElementById('changeRadioNo');
        changeRadioYes.checked = false;
        changeRadioNo.checked = false;
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
            addBtn.style.visibility = 'hidden';
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
        addBtn.style.visibility = 'visible';
        
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
            if(searchInput.value == ""){
                location.reload();
            }else{
                searchFunc();
            }
            
        }
    }
    function searchFunc(){
        $.ajax({
            url:'http://118.195.129.130:3000/order/getInfoByKw_order',
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
                        inquireTbodyTr[i].children[2].innerHTML = data.data[i].amount;
                        inquireTbodyTr[i].children[3].innerHTML = data.data[i].phone;
                        if(data.data[i].pay == 0){
                            inquireTbodyTr[i].children[4].children[0].checked = false;
                        }
                        else{
                            inquireTbodyTr[i].children[4].children[0].checked = true;
                        }
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