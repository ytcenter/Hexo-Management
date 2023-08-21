package fun.u23.Server;

import com.alibaba.fastjson.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

//上传文件
@WebServlet("/admin/fileupload")
@MultipartConfig(maxFileSize = 1024*1024*10)
public class fileupload extends HttpServlet {
    public static String filehz="md";
    public static long filesize=1024*1024*5;
    public static String filepath;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        MultipartConfigElement config = new MultipartConfigElement("/tmp", filesize, -1L, 0);
//        req.setAttribute("javax.servlet.multipartConfig", config);
        Part file=req.getPart("upload");
        req.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");
        String filename=file.getSubmittedFileName();
        if(filename.endsWith(filehz)){
            if(file==null||file.getSize()==0){
                Map<String,String> data=new HashMap<String, String>();
                data.put("stat","failed");
                data.put("info","File empty!");
                JSONObject jsondata= (JSONObject) JSONObject.toJSON(data);
                resp.getWriter().println(jsondata);
            }
            else {
                file.write("/root/blog/myblog/source/_posts/"+filename);
                Map<String,String> data=new HashMap<String, String>();
                data.put("stat","success");
                data.put("info","File Upload ok");
                JSONObject jsondata= (JSONObject) JSONObject.toJSON(data);
                resp.getWriter().println(jsondata);

            }


        }
        else {
            Map<String,String> data=new HashMap<String, String>();
            data.put("stat","failed");
            data.put("info","文件上传类型错误!");
            JSONObject jsondata= (JSONObject) JSONObject.toJSON(data);
            resp.getWriter().println(jsondata);


        }


    }
}
