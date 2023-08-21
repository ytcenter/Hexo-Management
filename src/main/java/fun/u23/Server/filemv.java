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
修改文件名
 */
@WebServlet("/admin/filemv")
public class filemv extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String jsonData=Fileutools.getbody(req.getReader());
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=utf-8");
        if(JSONObject.isValid(jsonData)){
            JSONObject jsonObject=JSONObject.parseObject(jsonData);
            String ori_name=jsonObject.getString("ori_name");
            String new_name=jsonObject.getString("new_name");

            ProcessBuilder processBuilder = new ProcessBuilder("mv","/root/blog/myblog/source/_posts/"+ori_name,"/root/blog/myblog/source/_posts/"+new_name);
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
                map.put("result",new_name);
                JSONObject relast= (JSONObject) JSONObject.toJSON(map);
                resp.getWriter().println(relast);

            }
            else {
                Map<Object,Object> map=new HashMap<Object, Object>();
                map.put("stat","failed");
                map.put("result",ori_name);
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
