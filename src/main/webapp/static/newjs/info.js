

var description_list;
function get_file_list(){
    //首页文章列表信息更新
    $.ajax({
        url:"admin/fileslist",
        type:"POST",
        contentType: 'application/json',
        success:function (data) {
            if(data.stat==="success"){
                description_list=data.result;
                let html = '';
                for(let i=0;i<description_list.length;i++){
                    if(i<=8){
                        html = html + '<div>\
            <svg xmlns="http://www.w3.org/2000/svg" class="icon text-green" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
            <path d="M5 12l5 5l10 -10"></path></svg>&nbsp;&nbsp;' + description_list[i].server_file_name + '</div>';
                    }

                }
                $('#supershell-version-description').html(html);
                //设置总文章数量
                var pagemu=description_list.length;
                $("#page-num").html(pagemu);
                //设置今日更新数量
                var addpage=0;
                for (let i = 0; i < description_list.length; i++) {
                    if (description_list[i].server_file_time.indexOf(getdate())!==-1){
                        addpage++;
                    }
                }
                $("#addpage-num").text(addpage);

            }
            else {
                toastr.error("获取文章列表为空")
            }
        },
        error:function () {
            toastr.error("服务器错误")
        }
    })


}
function  getinfo() {
        //获取登录时间
        //获取运行天数
        //获取今日新增文章数量
    $.ajax({
        type: "POST",
        url: "admin/getinfo",
        success:function (data) {
            $("#status-title").text("上次登录时间 "+data.LoginTime);
            $("#runtime1").text(data.RunTime);

        }
    })

}
//获取今日日期
function getdate() {
    var today = new Date();
    var year = today.getFullYear(); // 获取年份
    var month = today.getMonth() + 1; // 获取月份（注意月份从0开始，需要加1）
    var day = today.getDate(); // 获取日期

// 格式化日期
    var formattedDate = year + "-" + addZero(month) + "-" + addZero(day);

// 在个位数前添加0
    function addZero(num) {
        return num < 10 ? "0" + num : num;
    }
    return formattedDate;

}
function outlogin() {
    $.ajax({
        url:"admin/outlogin",
        type:"POST",
        success:function (data) {
            if(data.result==="success"){
                location.href="login.html";
            }
        }
    })

    
}
