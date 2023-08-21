$(function () {
    $("#btn-hz").click(function (){
        var hz = $("#download-chunk-size").val();
        var getdata1 = {
            "filehz": hz
        }
        $.ajax({
            url: "admin/set",
            type: "POST",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(getdata1),
            success: function (result) {
                if (result.result === "success") {
                    $("#download-chunk-size").val(result.info);
                    toastr.success("修改成功");

                } else {
                    toastr.error("修改失败");
                }

            },
            error: function () {
                toastr.error("修改错误");
            }


        })


    })

    $("#btn-size").click(function (){
        var size = $("#upload-max-size").val();
        var getdata = {
            "filesize": size
        }
        $.ajax({
            url: "admin/set",
            type: "POST",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(getdata),
            success: function (result) {
                if (result.result === "success") {
                    $("#upload-max-size").val(result.info);
                    toastr.success("修改成功");

                } else {
                    toastr.error("修改失败");
                }

            },
            error: function () {
                toastr.error("修改错误");
            }


        })
    })






})

function recovery(){
    var getdata={
        "filehz":"md"
    }
    $.ajax({
        url: "admin/set",
        type: "POST",
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(getdata),
        success: function (result) {
            if (result.result === "success") {
                $("#download-chunk-size").val(result.info);


            } else {

            }

        },
        error: function () {

        }


    })

    var getdata1={
        "filesize":"5"
    }
    $.ajax({
        url: "admin/set",
        type: "POST",
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(getdata1),
        success: function (result) {
            if (result.result === "success") {
                $("#upload-max-size").val(result.info);


            } else {

            }

        },
        error: function () {

        }


    })


}
function getset(){
        $.ajax({
            url:"admin/getinfo",
            type:"POST",
            success:function (data) {
                $("#download-chunk-size").val(data.filehzs);
                $("#upload-max-size").val(data.filesizes);

            }



        })



}

