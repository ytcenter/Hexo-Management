

import java.io.IOException;



public class test {

   public static void main(String[] args) throws IOException, InterruptedException {

       // 获取程序开始时间
       long startTime = System.currentTimeMillis();

       // 执行你的程序逻辑
       yourProgramLogic();

       // 获取程序结束时间
       long endTime = System.currentTimeMillis();

       // 计算程序运行时间（毫秒）
       long runtime = endTime - startTime;

       // 将毫秒转换为可读性时间格式
       String formattedRuntime = formatRuntime(runtime);

       // 输出程序运行时间
       System.out.println("程序运行时间：" + formattedRuntime);
   }

    public static void yourProgramLogic() {
        // 在这里编写你的程序逻辑
        // ...
        System.out.println("开始执行程序逻辑");
        try {
            Thread.sleep(70000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static String formatRuntime(long runtime) {
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






   }



