package fun.u23.Server;


import com.alibaba.fastjson.JSONObject;
import fun.u23.Utools.Fileutools;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/admin/set")
public class set  extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");
        String data=Fileutools.getbody(req.getReader());
        if(JSONObject.isValid(data)){
            JSONObject jsondata= (JSONObject) JSONObject.parseObject(data);
            if(jsondata.getString("filesize")!=null){
                int size=Integer.parseInt(jsondata.getString("filesize"));
                long filesize= 1024L*1024*size;
                fileupload.filesize=filesize;
                Map<Object,Object> map=new HashMap<Object, Object>();
                map.put("result","success");
                map.put("info",fileupload.filesize/1024/1024);
                resp.getWriter().println(JSONObject.toJSON(map));
            }
            if(jsondata.getString("filehz")!=null){
                fileupload.filehz=jsondata.getString("filehz");
                Map<Object,Object> map=new HashMap<Object, Object>();
                map.put("result","success");
                map.put("info",fileupload.filehz);
                resp.getWriter().println(JSONObject.toJSON(map));


            }



        }
        else {
            Map<Object,Object> map=new HashMap<Object, Object>();
            map.put("result","failed");
            resp.getWriter().println(JSONObject.toJSON(map));

        }


    }
}
