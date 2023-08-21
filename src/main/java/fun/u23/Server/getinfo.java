package fun.u23.Server;

import com.alibaba.fastjson.JSONObject;
import fun.u23.Server.filter.adminfilter;
import fun.u23.Utools.Fileutools;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/*
获取信息
 */
@WebServlet("/admin/getinfo")
public class getinfo extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");
        Map<Object,Object> map=new HashMap<Object, Object>();
        map.put("stat","success");
        map.put("RunTime",Fileutools.GetTime(System.currentTimeMillis()- adminfilter.StartTime));
        Date modifyDate = new Date(login.LoginTime);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String relast= dateFormat.format(modifyDate);
        map.put("LoginTime",relast);
        map.put("filesizes",fileupload.filesize/1024/1024);
        map.put("filehzs",fileupload.filehz);
        resp.getWriter().println(JSONObject.toJSON(map));
    }
}
