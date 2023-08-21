$(function (){
    //文件上传
    $("#server-file-upload").change(function () {

        var formData = new FormData();
        var file = $('#server-file-upload')[0].files[0];
        formData.append("upload",file);
        $.ajax({
            url:"admin/fileupload",
            async:true,
            processData: false,   // jQuery不要去处理发送的数据
            contentType: false,   // jQuery不要去设置Content-Type请求头
            type:"POST",
            data: formData,
            dataType:"json", //设置反回数据类型
            success:function (data) {
                if(data.stat==="success"){
                    toastr.success("文件上传成功")
                    get_server_files_list();
                }else{
                    toastr.error("文件上传失败");
                }
            },
            error:function () {
                toastr.error("服务器错误");
            },
        });

    })
    //搜索方法
    $("#search").keydown(function (event) {
        if(event.which===13){
            var searchdata=[];
            var a= $("#search").val();
            for (let i = 0; i < server_files_list.length; i++) {
                if(server_files_list[i].server_file_name.indexOf(a) !== -1){
                    searchdata.push(server_files_list[i]);

                }
            }
            show_server_files_single_page(server_files_pages_size, searchdata, 1);
            $('#serverFiles-loader').html('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
                    <path d="M5 12l5 5l10 -10"></path>\
                </svg>')


        }



    })
})

/*
    通用方法
*/


// 文件大小转换
function renderSize(value){
    if(value === null || value === '' || value === 0){
        return "0 B";
    }
    var unitArr = new Array("B","KB","MB","GB","TB","PB","EB","ZB","YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size.toString() + ' ' + unitArr[index];
}


// 列表排序
var sortBy = function (field, rev) {
    rev = (rev) ? -1 : 1;
    return function (a, b) {
        a = a[field];
        b = b[field];
        if (a < b) { return rev * -1; }
        if (a > b) { return rev * 1; }
        return 1;
    }
};


// 速度单位转化
function speedUnit(bspeed){
    let speed = bspeed;
    let units = 'B/S';
    if(speed / 1024 > 1){
        speed = speed/1024;
        units = 'KB/S';
    }
    if(speed / 1024 > 1){
        speed = speed / 1024;
        units = 'MB/S';
    }
    return speed.toFixed(2).toString() + ' ' + units;
}


// 时间单位转换
function formatSeconds(value) {
    var theTime = parseInt(value);
    var theTime1 = 0;
    var theTime2 = 0;
    var theTime3 = 0;
    if(theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
            if(theTime2 > 24){
                theTime3 = parseInt(theTime2 / 24);
                theTime2 = parseInt(theTime2 % 24);
            }
        }
    }
    var result = '';
    if(theTime > 0){
        result = ""+parseInt(theTime) + "秒";
    }
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1) + "分" + result;
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2) + "小时" + result;
    }
    if(theTime3 > 0) {
        result = ""+parseInt(theTime3) + "天" + result;
    }
    return result;
}





/*
    常用文件相关js方法
*/


// 常用文件点击排序按钮方法
function sort_by_field_server_files(id_field, rev){
    let field = id_field.substring(6);
    server_files_list.sort(sortBy(field, rev));
    show_server_files_single_page(server_files_pages_size, server_files_list, 1);
    $('#' + id_field).attr('onclick', 'sort_by_field_server_files($(this).attr(\'id\'), ' + !rev + ')');
}


// 获取常用文件表格中操作html
function get_server_files_operate_html(file_name){
    let operate_html = '';
    let download_link = '/supershell/server/files/download/' + file_name;
    operate_html = '<div class="dropdown">\
    <a href="javascripy:void(0)" class="btn-action" data-bs-toggle="dropdown" aria-expanded="false" id="filemen1">\
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>\
        <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>\
        <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>\
      </svg>\
    </a>\
    <div class="dropdown-menu" id="filemen2">\
      <a class="dropdown-item" href="javascript:void(0);" onclick="show_renameServerFile(\'' + file_name + '\');">\
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate-rectangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
            <path d="M10.09 4.01l.496 -.495a2 2 0 0 1 2.828 0l7.071 7.07a2 2 0 0 1 0 2.83l-7.07 7.07a2 2 0 0 1 -2.83 0l-7.07 -7.07a2 2 0 0 1 0 -2.83l3.535 -3.535h-3.988"></path>\
            <path d="M7.05 11.038v-3.988"></path>\
        </svg>\
        &nbsp;&nbsp;重命名\
      </a>\
      <a class="dropdown-item" href="' + download_link + '">\
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-download" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>\
            <path d="M7 11l5 5l5 -5"></path>\
            <path d="M12 4l0 12"></path>\
        </svg>\
        &nbsp;&nbsp;下载文件\
      </a>\
      <div class="dropdown-divider"></div>\
      <a class="dropdown-item" href="javascript:void(0);" onclick="show_deleteServerFile(\'' + file_name + '\');">\
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
           <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
           <path d="M4 7l16 0"></path>\
           <path d="M10 11l0 6"></path>\
           <path d="M14 11l0 6"></path>\
           <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>\
           <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>\
        </svg>\
        &nbsp;&nbsp;删除文件\
      </a>\
    </div>\
  </div>';
    return operate_html;
}


// 显示常用文件表格中文件信息
function show_server_files_table(files_list){
    let num = 0;
    let html = '';
    for (let i=0;i<files_list.length;i++){
        num = num + 1;
        let file_size = renderSize(files_list[i]['server_file_size']);
        let operate_html = get_server_files_operate_html(files_list[i]['server_file_name']);
        html = html + '<tr>\
        <td>' + num.toString() + '</td>\
        <td style="color: #206BC4">' + files_list[i]['server_file_name'] + '</td>\
        <td>' + file_size + '</td>\
        <td>' + files_list[i]['server_file_time'] + '</td>\
        <td>' + operate_html + '</td>\
    </tr>';
        $('#server_files_table').html(html);
    }
}


// 划分原始常用文件列表数据
function divide_clients(files_num, pages_size, files_list){
    // 按pages_size分割数组
    let num = Math.ceil(files_num / pages_size);
    let pages_list = new Array(num);
    let index = 0;
    let resindex = 0;
    while (index < files_num) {
        pages_list[resindex++] = files_list.slice(index, (index += pages_size));
    }
    return pages_list
}


// 设置常用文件某页页面属性
function set_server_files_pages(pages_list, files_num, pages_size, no){
    // 设置左边页数提示
    let start = (no-1) * pages_size + 1;
    let end = (no-1) * pages_size + pages_list[no-1].length;

    $('#serverFilesPages-info').text('显示第 ' + start.toString() + ' 到第 ' + end.toString() + ' 条记录; 共 ' + files_num.toString() + ' 条');
    // 设置右边页数按钮信息
    let pages_html = '<li id="serverFilespage-prev"><a class="page-link" href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="15 6 9 12 15 18" /></svg></a></li>';
    for (let i=0;i<pages_list.length;i++){
        pages_html = pages_html + '<li id="serverFilespage-' + (i+1).toString() + '" class="page-item"><a class="page-link" href="javascript:void(0)" onclick="show_server_files_single_page(server_files_pages_size, server_files_list, ' + (i+1).toString() + ')">' + (i+1).toString() + '</a></li>';
    }
    pages_html = pages_html + '<li id="serverFilespage-next"><a class="page-link" href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="9 6 15 12 9 18" /></svg></a></li>'
    $('#serverFilesPages-button').html(pages_html);
    // 设置右边页数按钮激活状态
    $('#serverFilespage-' + no.toString()).attr('class', 'page-item active');
    // 设置右边页数上一页按钮
    if (no === 1){
        $('#serverFilespage-prev').attr('class', 'page-item disabled');
        $('#serverFilespage-prev').children().attr('aria-disabled', 'true');
    }
    else {
        $('#serverFilespage-prev').attr('class', 'page-item');
        $('#serverFilespage-prev').children().attr('aria-disabled', 'false');
        $('#serverFilespage-prev').children().attr('onclick', 'show_server_files_single_page(server_files_pages_size, server_files_list, ' + (no-1).toString() + ');');
    }
    // 设置右边页数下一页按钮
    if (no === pages_list.length){
        $('#serverFilespage-next').attr('class', 'page-item disabled');
        $('#serverFilespage-next').children().attr('aria-disabled', 'true');
    }
    else {
        $('#serverFilespage-next').attr('class', 'page-item');
        $('#serverFilespage-next').children().attr('aria-disabled', 'false');
        $('#serverFilespage-next').children().attr('onclick', 'show_server_files_single_page(server_files_pages_size, server_files_list, ' + (no+1).toString() + ');');
    }
}


// 显示常用文件单页数据
function show_server_files_single_page(pages_size, files_list, no){
    let files_num = files_list.length; // 获取原始常用文件列表类型文件数据有多少条数据
    let pages_list = divide_clients(files_num, pages_size, files_list); //划分原始列表类型文件数据
    if (pages_list.length === 0){
        $('#serverFilesPages-info').text('无数据');
        $('#server_files_table').html('');
        $('#serverFilesPages-button').html('');
        return;
    }
    set_server_files_pages(pages_list, files_num, pages_size, no); // 设置常用文件某页页面属性
    show_server_files_table(pages_list[no-1]); // 显示常用文件表格数据
}


// 根据路径获取常用文件列表的请求方法
function get_server_files_list(){
    $('#serverFiles-loader').html('<div class="spinner-border spinner-border-sm text-muted" role="status"></div>')
    $.ajax({
        type: "POST",
        url: "admin/fileslist",
        contentType: 'application/json;charset=utf-8',
        success: function(res) {
            if (res.stat === 'failed'){

                toastr.error('获取常用文件列表失败');
                $('#serverFiles-loader').html('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
                <path d="M11.99 1.968c1.023 0 1.97 .521 2.512 1.359l.103 .172l7.1 12.25l.062 .126a3 3 0 0 1 -2.568 4.117l-.199 .008h-14l-.049 -.003l-.112 .002a3 3 0 0 1 -2.268 -1.226l-.109 -.16a3 3 0 0 1 -.32 -2.545l.072 -.194l.06 -.125l7.092 -12.233a3 3 0 0 1 2.625 -1.548zm.02 12.032l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -6a1 1 0 0 0 -.993 .883l-.007 .117v2l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"></path>\
             </svg>')
            }
            else if (res.stat === 'success'){
                server_files_list = res.result;
                show_server_files_single_page(server_files_pages_size, res.result, 1);
                $('#serverFiles-loader').html('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
                    <path d="M5 12l5 5l10 -10"></path>\
                </svg>')
            }
        },
        error: function(data, type, error) {
            console.log(error);
            toastr.error(error.name + ": " + error.message, '获取常用文件列表失败');
            $('#serverFiles-loader').html('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
            <path d="M11.99 1.968c1.023 0 1.97 .521 2.512 1.359l.103 .172l7.1 12.25l.062 .126a3 3 0 0 1 -2.568 4.117l-.199 .008h-14l-.049 -.003l-.112 .002a3 3 0 0 1 -2.268 -1.226l-.109 -.16a3 3 0 0 1 -.32 -2.545l.072 -.194l.06 -.125l7.092 -12.233a3 3 0 0 1 2.625 -1.548zm.02 12.032l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -6a1 1 0 0 0 -.993 .883l-.007 .117v2l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"></path>\
         </svg>')
        },
    });
}


// 显示常用文件重命名模态框
function show_renameServerFile(ori_name){
    $('#rename_server_file_name').val('');
    $('#renameServerFile-loader').css('display', 'none');
    $('#renameServerFile-btn').css('display', 'block');
    $('#ori_rename_server_file_name').text(ori_name);
    $('#rename_server_file').modal('show');
}


// 常用文件重命名方法
function renameServerFile(ori_name, new_name){
    $('#renameServerFile-btn').css('display', 'none');
    $('#renameServerFile-loader').css('display', 'block');
    $('#rename_server_file_name').attr('disabled', 'disabled');
    let input_data = {
        'ori_name': ori_name,
        'new_name': new_name
    };
    $.ajax({
        type: "POST",
        url: "admin/filemv",
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(input_data),
        success: function(res) {
            if (res.stat === 'failed'){
                $('#renameServerFile-loader').css('display', 'none');
                $('#renameServerFile-btn').css('display', 'block');
                $('#rename_server_file_name').removeAttr('disabled');
                toastr.error(res.result, '重命名失败');
            }
            else if (res.stat === 'success'){
                $('#renameServerFile-loader').css('display', 'none');
                $('#renameServerFile-btn').css('display', 'block');
                $('#rename_server_file_name').removeAttr('disabled');
                $('#rename_server_file').modal('hide');
                toastr.success(res.result, '重命名成功');
                get_server_files_list();
            }
        },
        error: function(data, type, error) {
            $('#renameServerFile-loader').css('display', 'none');
            $('#renameServerFile-btn').css('display', 'block');
            $('#rename_server_file_name').removeAttr('disabled');
            console.log(error);
            toastr.error(error.name + ": " + error.message, '重命名失败');
        },
    });
}


// 显示删除模态框
function show_deleteServerFile(filename){
    $('#deleteServerFile-loader').css('display', 'none');
    $('#deleteServerFile-btn').css('display', 'block');
    $('#delete_server_file_name').text(filename);
    $('#delete_server_file').modal('show');
}


// 删除方法
function deleteServerFile(filename){
    $('#deleteServerFile-btn').css('display', 'none');
    $('#deleteServerFile-loader').css('display', 'block');
    let input_data = {
        'filename': filename
    };
    $.ajax({
        type: "POST",
        url: "admin/filerm",
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(input_data),
        success: function(res) {
            if (res.stat === 'failed'){
                $('#deleteServerFile-loader').css('display', 'none');
                $('#deleteServerFile-btn').css('display', 'block');
                $('#delete_server_file').modal('hide');
                toastr.error(res.result, '删除失败');
            }
            else if (res.stat === 'success'){
                $('#deleteServerFile-loader').css('display', 'none');
                $('#deleteServerFile-btn').css('display', 'block');
                $('#delete_server_file').modal('hide');
                toastr.success(res.result, '删除成功');
                get_server_files_list();
            }
        },
        error: function(data, type, error) {
            $('#deleteServerFile-loader').css('display', 'none');
            $('#deleteServerFile-btn').css('display', 'block');
            $('#delete_server_file').modal('hide');
            console.log(error);
            toastr.error(error.name + ": " + error.message, '删除失败');
        },
    });



}

