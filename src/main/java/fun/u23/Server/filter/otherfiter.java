package fun.u23.Server.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


@WebFilter("/file.html")
public class otherfiter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req=(HttpServletRequest) servletRequest;
        HttpServletResponse resp=(HttpServletResponse) servletResponse;
        HttpSession session=req.getSession();
        if(session.getAttribute("username")=="admin"&&session.getAttribute("password")=="admin"){
            filterChain.doFilter(req,resp);
        }
        else {
            resp.sendRedirect("/login.html");

        }


    }

    public void destroy() {

    }
}
