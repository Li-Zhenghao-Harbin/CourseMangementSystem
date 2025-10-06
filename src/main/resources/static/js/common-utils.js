function getWeekRange(weekOffset = 0, baseDate = new Date()) {
    // 复制日期对象，避免修改原日期
    const date = new Date(baseDate);
    
    // 计算目标周的任意一天（这里用基准日期所在周）
    date.setDate(date.getDate() + weekOffset * 7);
    
    // 获取当前是周几（0是周日，1是周一，...，6是周六）
    const dayOfWeek = date.getDay();
    
    // 计算周一的日期（如果当前是周日，需要减去6天；如果是周一，减去0天，以此类推）
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startDate = new Date(date);
    startDate.setDate(date.getDate() + mondayOffset);
    
    // 计算周日的日期（周一 + 6天）
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return {
        startDate: startDate,
        endDate: endDate
    };
}

/**
 * 获取连续多周的起止日期
 * @param {number} weekCount - 周数
 * @param {number} startWeekOffset - 起始周偏移，0表示从当前周开始
 * @returns {Array} 每周的日期范围数组
 */
function getMultipleWeekRanges(weekCount = 4, startWeekOffset = 0) {
    const weekRanges = [];
    
    for (let i = 0; i < weekCount; i++) {
        const weekOffset = startWeekOffset + i;
        const weekRange = getWeekRange(weekOffset);
        
        weekRanges.push({
            weekNumber: i + 1,
            weekOffset: weekOffset,
            ...weekRange
        });
    }
    
    return weekRanges;
}

/**
 * 日期格式化函数
 * @param {Date} date - 日期对象
 * @param {string} format - 格式字符串，默认 'YYYY-MM-DD'
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

/**
 * 获取中文星期几
 * @param {Date} date - 日期对象
 * @returns {string} 中文星期几
 */
function getChineseDayOfWeek(date) {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[date.getDay()];
}

function getWeekDays(weekOffset = 0) {
    const weekRange = getWeekRange(weekOffset);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekRange.startDate);
        date.setDate(weekRange.startDate.getDate() + i);
        
        days.push({
            date: date,
            dayOfWeek: getChineseDayOfWeek(date),
            formattedDate: formatDate(date),
            isWeekend: i === 5 || i === 6 // 周日或周六
        });
    }
    
    return days;
}

/**
 * 日期转周数数字
 * @param {*} dateString 
 * @returns 周一为0，周日为6
 */
function getWeekdayNumber(dateString) {
  const date = new Date(dateString);
  const day = date.getDay(); // 原生JS返回0(周日)到6(周六)
  
  // 转换规则：周一=0 → (day+6)%7
  return (day + 6) % 7;
}
