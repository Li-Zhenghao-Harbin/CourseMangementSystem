package org.cms.common.Utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtils {
    public static String getCurrentDate() {
        Date currentDate = new Date();
        String currentDateStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);
        return currentDateStr;
    }
}
