import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributeView;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class test2 {

    public static void main(String[] args) {
        String filePath = "F:\\渗透测试\\poc\\\u200B金蝶云星空命令执行.md"; // 文件路径

        try {
            File file = new File(filePath);

            long size = file.length(); // 获取文件大小
            long modifyTime = file.lastModified(); // 获取修改时间（返回毫秒数）

            System.out.println("Size: " + size);
            System.out.println("Modify: " + modifyTime);
        } catch (Exception e) {
            e.printStackTrace();
        }




    }
}
