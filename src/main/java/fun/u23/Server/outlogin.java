package fun.u23.Server;

import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/*
删除session
 */
@WebServlet("/admin/outlogin")
public class outlogin extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json;charset=utf-8");
        HttpSession session=req.getSession();
        session.removeAttribute("username");
        session.removeAttribute("password");
        Map<Object,Object> map=new HashMap<Object, Object>();
        map.put("result","success");
        resp.getWriter().println(JSONObject.toJSON(map));

    }
}
