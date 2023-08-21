package fun.u23.Utools;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Fileutools {


    public static long size(String path){
        try {
            File file = new File(path);
            long filesize = file.length(); // 获取文件大小
            return filesize;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    public static String time(String path){
        try {
            File file = new File(path);
            long modifyTime = file.lastModified(); // 获取修改时间（返回毫秒数）
            Date modifyDate = new Date(modifyTime); // 将毫秒数转换为日期对象
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String relast= dateFormat.format(modifyDate); // 格式化日期对象为字符串
            return relast;
        } catch (Exception e) {
            e.printStackTrace();
            return "0";
        }

    }

    public static String getbody(BufferedReader bufferedReader) throws IOException {
        StringBuilder sb = new StringBuilder();
        String line = null;
        while ((line = bufferedReader.readLine()) != null) {
            sb.append(line);
        }
        String jsonData = sb.toString();

        return jsonData;

    }

    public static String GetTime(long runtime){
        // 计算天、小时、分钟和秒
        long days = runtime / (24 * 60 * 60 * 1000);
        long hours = (runtime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000) % 24;
        long minutes = ((runtime % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000);
        // 构造可读性的时间字符串
        StringBuilder sb = new StringBuilder();
        if (days >= 0) {
            sb.append(days).append("天 ");
        }
        if (hours >= 0) {
            sb.append(hours).append("小时 ");
        }
        if (minutes >= 0) {
            sb.append(minutes).append("分钟 ");
        }
        return sb.toString();
    }
    public final static long getsize(){
        return 821251;

    }


}
