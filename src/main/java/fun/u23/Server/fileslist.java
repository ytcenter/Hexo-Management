package fun.u23.Server;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import fun.u23.Utools.Fileutools;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//获取所有文件列表
@WebServlet("/admin/fileslist")
public class fileslist extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Object> list = new ArrayList<Object>();
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=utf-8");
        ProcessBuilder processBuilder = new ProcessBuilder("find","/root/blog/myblog/source/_posts/","-type","f");
        Process process = processBuilder.start();
        InputStream inputStream = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line;
        while ((line = reader.readLine()) != null) {
            if(line.endsWith("md")){
                String[] datalist2=line.split("/");
                String filename=datalist2[datalist2.length-1];
                Map<Object,Object> map=new HashMap<Object, Object>();
                map.put("server_file_name",filename);
                map.put("server_file_size", Fileutools.size(line));
                map.put("server_file_time",Fileutools.time(line));
                list.add(map);
            }
        }
        try {
            int exitCode = process.waitFor();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        Map<Object,Object> relastmap=new HashMap<Object, Object>();
        JSONArray jsonArray= (JSONArray) JSONArray.toJSON(list);
        relastmap.put("result",jsonArray);
        if(jsonArray.size()==0){
            relastmap.put("stat","failed");
            JSONObject relastjson= (JSONObject) JSONObject.toJSON(relastmap);
            resp.getWriter().println(relastjson);
        }
        else {
            relastmap.put("stat","success");
            JSONObject relastjson= (JSONObject) JSONObject.toJSON(relastmap);
            resp.getWriter().println(relastjson);
        }


    }
}
