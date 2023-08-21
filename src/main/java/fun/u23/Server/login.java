package fun.u23.Server;

import com.alibaba.fastjson.JSONObject;
import fun.u23.Utools.Fileutools;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
/*
登录认证
 */
@WebServlet("/login")
public class login extends HttpServlet {
    public static long LoginTime;
    private String user="admin";
    private String password="admin";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/login.html").forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String login_data= Fileutools.getbody(req.getReader());
        req.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");
        if(JSONObject.isValid(login_data)){
            JSONObject jsondata=JSONObject.parseObject(login_data);
            if(jsondata.getString("username").equals(user)&&jsondata.getString("password").equals(password)){
                Map<Object,Object> map=new HashMap<Object, Object>();
                map.put("result","success");

                HttpSession session=req.getSession();
                session.setAttribute("username",user);
                session.setAttribute("password",password);

                // 获取当前时间
                LoginTime = System.currentTimeMillis();

                resp.getWriter().println(JSONObject.toJSON(map));
            }
            else {
                Map<Object,Object> map=new HashMap<Object, Object>();
                map.put("result","failed");

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
