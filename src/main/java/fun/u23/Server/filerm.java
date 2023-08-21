package fun.u23.Server;

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
import java.util.HashMap;
import java.util.Map;
/*
删除文件
 */
@WebServlet("/admin/filerm")
public class filerm extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String jsondata=Fileutools.getbody(req.getReader());
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=utf-8");
        if(JSONObject.isValid(jsondata)){
            JSONObject jsonObject= (JSONObject) JSONObject.parseObject(jsondata);
            String filename=jsonObject.getString("filename");

            ProcessBuilder processBuilder = new ProcessBuilder("rm","-rf","/root/blog/myblog/source/_posts/"+filename);
            Process process = processBuilder.start();
            InputStream inputStream = process.getInputStream();
            BufferedReader reader2 = new BufferedReader(new InputStreamReader(inputStream));
            String line2;
            Boolean shellrelast=true;
            while ((line2 = reader2.readLine()) != null) {
                shellrelast = false;
            }
            try {
                int exitCode = process.waitFor();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

            if(shellrelast){
                Map<Object,Object> map=new HashMap<Object, Object>();
                map.put("stat","success");
                map.put("result",filename);
                JSONObject relast= (JSONObject) JSONObject.toJSON(map);
                resp.getWriter().println(relast);


            }
            else {
                Map<Object,Object> map=new HashMap<Object, Object>();
                map.put("stat","failed");
                map.put("result",filename);
                JSONObject relast= (JSONObject) JSONObject.toJSON(map);
                resp.getWriter().println(relast);

            }

        }
        else {
            Map<Object,Object> map=new HashMap<Object, Object>();
            map.put("stat","erro");
            JSONObject relast= (JSONObject) JSONObject.toJSON(map);
            resp.getWriter().println(relast);

        }

    }
}
