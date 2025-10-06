// week-navigation.js - 完整的周导航功能
class WeekNavigation {
    constructor() {
        this.currentWeekOffset = 0; // 0表示当前周
        this.maxWeekOffset = 52; // 最多可以往后看52周（一年）
        this.minWeekOffset = -52; // 最多可以往前看52周（一年）
        
        this.init();
    }
    
    init() {
        // 绑定按钮事件
        document.getElementById('prevWeek').addEventListener('click', () => this.previousWeek());
        document.getElementById('nextWeek').addEventListener('click', () => this.nextWeek());
        
        // 如果有回到今天的按钮，也绑定事件
        const currentWeekBtn = document.getElementById('currentWeek');
        if (currentWeekBtn) {
            currentWeekBtn.addEventListener('click', () => this.goToCurrentWeek());
        }
        
        // 初始显示
        this.updateDisplay();
    }
    
    // 切换到上一周
    previousWeek() {
        if (this.currentWeekOffset > this.minWeekOffset) {
            this.currentWeekOffset--;
            this.updateDisplay();
        }
        this.updateButtonStates();
    }
    
    // 切换到下一周
    nextWeek() {
        if (this.currentWeekOffset < this.maxWeekOffset) {
            this.currentWeekOffset++;
            this.updateDisplay();
        }
        this.updateButtonStates();
    }
    
    // 更新显示
    updateDisplay() {
        this.updateWeekDisplay();
        // this.updateCalendarDisplay();
        this.updateTimetable();
    }
    
    // 更新周显示标题
    updateWeekDisplay() {
        const weekRange = getWeekRange(this.currentWeekOffset);
        const displayElement = document.getElementById('weekDisplay');
        
        let weekLabel = '';
        if (this.currentWeekOffset === 0) {
            weekLabel = '本周';
        } else if (this.currentWeekOffset > 0) {
            weekLabel = `${this.currentWeekOffset}周后`;
        } else {
            weekLabel = `${Math.abs(this.currentWeekOffset)}周前`;
        }
        
        const displayText = `${weekLabel}：${formatDate(weekRange.startDate)} 至 ${formatDate(weekRange.endDate)}`;
        displayElement.textContent = displayText;
    }
    
    // 更新日历显示
    // updateCalendarDisplay() {
    //     const weekDays = getWeekDays(this.currentWeekOffset);
    //     const calendarElement = document.getElementById('weekCalendar');
        
    //     let html = '';
    //     weekDays.forEach(day => {
    //         const weekendClass = day.isWeekend ? 'weekend' : '';
    //         const todayClass = this.isToday(day.date) ? 'today' : '';
            
    //         html += `
    //             <div class="day ${weekendClass} ${todayClass}">
    //                 <div class="date">${day.formattedDate}</div>
    //                 <div class="day-name">${day.dayOfWeek}</div>
    //             </div>
    //         `;
    //     });
        
    //     calendarElement.innerHTML = html;
    // }
    
    // 更新课程表（如果存在）
    updateTimetable() {
        // 如果课程表实例存在，则更新
        if (window.courseTimetable && typeof window.courseTimetable.setCurrentWeekDays === 'function') {
            const weekDays = getWeekDays(this.currentWeekOffset);
            window.courseTimetable.setCurrentWeekDays(weekDays);
        }
        
        // 如果有自定义的更新函数，也调用
        if (typeof this.onWeekChange === 'function') {
            const weekRange = getWeekRange(this.currentWeekOffset);
            this.onWeekChange(weekRange, this.currentWeekOffset);
        }
    }
    
    // 检查是否是今天
    isToday(date) {
        const today = new Date();
        return formatDate(date) === formatDate(today);
    }
    
    // 更新按钮状态
    updateButtonStates() {
        const prevButton = document.getElementById('prevWeek');
        const nextButton = document.getElementById('nextWeek');
        
        if (prevButton) {
            prevButton.disabled = this.currentWeekOffset <= this.minWeekOffset;
        }
        
        if (nextButton) {
            nextButton.disabled = this.currentWeekOffset >= this.maxWeekOffset;
        }
    }
    
    // 跳转到指定周
    goToWeek(weekOffset) {
        if (weekOffset >= this.minWeekOffset && weekOffset <= this.maxWeekOffset) {
            this.currentWeekOffset = weekOffset;
            this.updateDisplay();
            this.updateButtonStates();
        }
    }
    
    // 回到当前周
    goToCurrentWeek() {
        this.currentWeekOffset = 0;
        this.updateDisplay();
        this.updateButtonStates();
    }
    
    // 获取当前周信息
    getCurrentWeekInfo() {
        return {
            weekOffset: this.currentWeekOffset,
            weekRange: getWeekRange(this.currentWeekOffset),
            weekDays: getWeekDays(this.currentWeekOffset)
        };
    }
    
    // 设置周变化回调函数
    setOnWeekChange(callback) {
        this.onWeekChange = callback;
    }
    
    // 获取当前周偏移量
    getCurrentWeekOffset() {
        return this.currentWeekOffset;
    }
    
    // 设置周偏移量限制
    setWeekOffsetLimits(min, max) {
        this.minWeekOffset = min;
        this.maxWeekOffset = max;
        this.updateButtonStates();
    }
}

// 日期工具函数
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

function getChineseDayOfWeek(date) {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[date.getDay()];
}

function getWeekRange(weekOffset = 0, baseDate = new Date()) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + weekOffset * 7);
    
    const dayOfWeek = date.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startDate = new Date(date);
    startDate.setDate(date.getDate() + mondayOffset);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return {
        startDate: startDate,
        endDate: endDate
    };
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

// 初始化函数
function initWeekNavigation() {
    // 创建周导航实例
    const weekNav = new WeekNavigation();
    
    // 将实例暴露到全局，以便其他脚本使用
    window.weekNavigation = weekNav;
    
    // 返回实例，以便链式调用
    return weekNav;
}

// 自动初始化（当DOM加载完成时）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWeekNavigation);
} else {
    initWeekNavigation();
}

// 导出供模块化使用（如果环境支持）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WeekNavigation,
        formatDate,
        getChineseDayOfWeek,
        getWeekRange,
        getWeekDays,
        initWeekNavigation
    };
}

// 在 week-navigation.js 文件末尾添加
console.log('week-navigation.js 已加载');

// 自动初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - 开始初始化周导航');
    initWeekNavigation();
});