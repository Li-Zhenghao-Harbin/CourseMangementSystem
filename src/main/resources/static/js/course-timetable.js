// course-timetable.js - 完整的课程表显示功能
class CourseTimetable {
    constructor(options = {}) {
        // 默认配置
        this.config = {
            startHour: options.startHour || 8,      // 开始时间（小时）
            endHour: options.endHour || 22,         // 结束时间（小时）
            timeSlotDuration: options.timeSlotDuration || 30, // 时间槽间隔（分钟）
            showWeekends: options.showWeekends !== true,     // 是否显示周末
            ...options
        };
        
        this.timeSlots = [];
        this.courseData = null;
        this.currentWeekDays = [];
        this.courseColors = {}; // 存储课程颜色映射
        
        this.init();
    }
    
    init() {
        this.generateTimeSlots();
        this.generateCourseColors();
    }
    
    // 生成时间槽
    generateTimeSlots() {
        const { startHour, endHour, timeSlotDuration } = this.config;
        this.timeSlots = [];
        
        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += timeSlotDuration) {
                // 跳过超出结束时间的时间槽
                if (hour === endHour && minute > 0) break;
                
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                this.timeSlots.push({
                    time: timeString,
                    hour: hour,
                    minute: minute,
                    displayTime: this.formatDisplayTime(hour, minute)
                });
            }
        }
    }
    
    // 格式化显示时间
    formatDisplayTime(hour, minute) {
        if (minute === 0) {
            return `${hour}:00`;
        }
        return `${hour}:${minute.toString().padStart(2, '0')}`;
    }
    
    // 生成课程颜色映射
    generateCourseColors() {
        const colorPalette = [
            '#007bff', '#28a745', '#dc3545', '#6f42c1', '#fd7e14', 
            '#20c997', '#e83e8c', '#6c757d', '#17a2b8', '#ffc107',
            '#6610f2', '#0dcaf0', '#198754', '#0d6efd', '#6f42c1'
        ];
        
        let colorIndex = 0;
        
        // 为每个课程名称分配颜色
        this.getCourseColorClass = (courseName) => {
            if (!courseName) return 'course-default';
            
            const normalizedName = courseName.toLowerCase().trim();
            
            if (!this.courseColors[normalizedName]) {
                this.courseColors[normalizedName] = colorPalette[colorIndex % colorPalette.length];
                colorIndex++;
            }
            
            return this.courseColors[normalizedName];
        };
    }
    
    // 设置课程数据
    setCourseData(courseData) {
        this.courseData = courseData;
        this.renderTimetable();
    }
    
    // 设置当前周的日期
    setCurrentWeekDays(weekDays) {
        this.currentWeekDays = weekDays;
        this.renderTimetable();
    }
    
    // 渲染课程表
    renderTimetable() {
        if (!this.courseData || this.currentWeekDays.length === 0) {
            this.renderEmptyTimetable();
            return;
        }

        const timetableElement = document.getElementById('courseTimetable');
        if (!timetableElement) {
            console.error('找不到课程表容器元素 #courseTimetable');
            return;
        }
        
        // 清空课程表
        timetableElement.innerHTML = '';

        // 添加表头
        this.renderTableHeaders(timetableElement);
        
        // 添加时间槽和课程
        this.renderTimeSlotsAndCourses(timetableElement);
    }
    
    // 渲染空课程表（没有数据时）
    renderEmptyTimetable() {
        const timetableElement = document.getElementById('courseTimetable');
        if (!timetableElement) return;
        
        timetableElement.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #6c757d;">
                <div>暂无课程数据</div>
                <div style="font-size: 14px; margin-top: 10px;">当前周没有安排的课程</div>
            </div>
        `;
    }
    
    // 渲染表头
    renderTableHeaders(timetableElement) {
        // 左上角空白单元格
        timetableElement.innerHTML += '<div class="time-header"></div>';
        
        // 星期几表头
        this.currentWeekDays.forEach(day => {
            if (!this.config.showWeekends && day.isWeekend) {
                return; // 如果不显示周末，跳过周末列
            }
            
            const weekendClass = day.isWeekend ? 'weekend' : '';
            const todayClass = this.isToday(day.date) ? 'today-header' : '';
            
            timetableElement.innerHTML += `
                <div class="day-header ${weekendClass} ${todayClass}">
                    <div class="day-name">${day.dayOfWeek}</div>
                    <div class="date">${day.formattedDate}</div>
                </div>
            `;
        });
    }
    
    // 渲染时间槽和课程
    renderTimeSlotsAndCourses(timetableElement) {
        this.timeSlots.forEach((timeSlot, timeIndex) => {
            // 时间标签
            timetableElement.innerHTML += `
                <div class="time-header">
                    ${timeSlot.displayTime}
                </div>
            `;

            // 每天的时间槽
            this.currentWeekDays.forEach(day => {
                if (!this.config.showWeekends && day.isWeekend) {
                    return; // 如果不显示周末，跳过周末列
                }
                
                const weekendClass = day.isWeekend ? 'weekend' : '';
                const todayClass = this.isToday(day.date) ? 'today-slot' : '';
                
                timetableElement.innerHTML += `
                    <div class="time-slot ${weekendClass} ${todayClass}" 
                         data-date="${day.formattedDate}" 
                         data-time="${timeSlot.time}"
                         data-hour="${timeSlot.hour}"
                         data-minute="${timeSlot.minute}">
                    </div>
                `;
            });
        });

        // 在所有时间槽创建完成后，渲染课程方块
        setTimeout(() => {
            this.renderCourseBlocks();
        }, 0);
    }
    
    // 渲染课程方块
    renderCourseBlocks() {
        if (!this.courseData || !this.courseData.data) return;

        // 清空现有的课程方块（防止重复）
        document.querySelectorAll('.course-block').forEach(block => block.remove());
        
        // 收集所有要渲染的课程
        const coursesToRender = [];
        
        this.courseData.data.forEach(course => {
            if (course.lessons && course.lessons.length > 0) {
                course.lessons.forEach(lesson => {
                    coursesToRender.push({
                        course: course,
                        lesson: lesson
                    });
                });
            }
        });
        
        // 按开始时间排序，确保渲染顺序一致
        coursesToRender.sort((a, b) => {
            return a.lesson.startTime.localeCompare(b.lesson.startTime);
        });
        
        // 渲染每个课程
        coursesToRender.forEach(({course, lesson}) => {
            this.renderCourseBlock(course, lesson);
        });
    }
    
    // 渲染单个课程方块
    renderCourseBlock(course, lesson) {
        // 检查课程是否在当前周
        const lessonDate = lesson.date;
        const dayIndex = this.currentWeekDays.findIndex(day => 
            day.formattedDate === lessonDate
        );

        if (dayIndex === -1) return; // 课程不在当前周
        
        // 如果不显示周末且这天是周末，跳过
        if (!this.config.showWeekends && this.currentWeekDays[dayIndex].isWeekend) {
            return;
        }

        // 计算课程的开始和结束时间位置
        const startPosition = this.calculateTimePosition(lesson.startTime);
        const endPosition = this.calculateTimePosition(lesson.endTime);
        
        if (startPosition === -1 || endPosition === -1) {
            console.warn(`课程时间超出范围: ${course.courseName} ${lesson.startTime}-${lesson.endTime}`);
            return;
        }

        // 计算课程持续的时间槽数量
        const durationSlots = endPosition - startPosition;
        if (durationSlots <= 0) {
            console.warn(`课程时间无效: ${course.courseName} ${lesson.startTime}-${lesson.endTime}`);
            return;
        }

        // 找到对应的时间槽容器
        const timeSlotSelector = `.time-slot[data-date="${lessonDate}"][data-time="${this.timeSlots[startPosition].time}"]`;
        const timeSlotElement = document.querySelector(timeSlotSelector);
        
        if (!timeSlotElement) {
            console.warn(`找不到时间槽元素: ${timeSlotSelector}`);
            return;
        }

        // 创建课程方块
        const courseBlock = document.createElement('div');
        courseBlock.className = 'course-block';
        courseBlock.style.backgroundColor = this.getCourseColorClass(course.courseName);
        courseBlock.style.height = `calc(${durationSlots * 100}% + ${(durationSlots - 1) * 1}px)`;
        courseBlock.style.zIndex = durationSlots; // 持续时间长的课程显示在上层
        
        // 添加课程信息作为数据属性
        courseBlock.dataset.courseId = course.id;
        courseBlock.dataset.lessonId = lesson.id;
        courseBlock.dataset.courseName = course.courseName;
        
        courseBlock.innerHTML = `
            <div class="course-content">
                <div class="course-name">${course.courseName}</div>
                <div class="course-time">${this.formatTimeRange(lesson.startTime, lesson.endTime)}</div>
                ${course.teacherName ? `<div class="course-teacher">${course.teacherName}</div>` : ''}
                ${lesson.classroom ? `<div class="course-location">${lesson.classroom}</div>` : ''}
            </div>
        `;

        // 添加点击事件
        courseBlock.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showCourseDetails(course, lesson);
        });

        timeSlotElement.appendChild(courseBlock);
    }
    
    // 计算时间在时间槽数组中的位置
    calculateTimePosition(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        
        for (let i = 0; i < this.timeSlots.length; i++) {
            const slot = this.timeSlots[i];
            if (slot.hour === hours && slot.minute === minutes) {
                return i;
            }
            
            // 如果找不到精确匹配，找到最接近的时间槽
            if (slot.hour > hours || (slot.hour === hours && slot.minute > minutes)) {
                return i > 0 ? i - 1 : 0;
            }
        }
        
        return -1; // 未找到对应时间槽
    }
    
    // 格式化时间范围
    formatTimeRange(startTime, endTime) {
        const formatTime = (timeStr) => {
            const [hours, minutes] = timeStr.split(':');
            return `${parseInt(hours)}:${minutes}`;
        };
        
        return `${formatTime(startTime)}-${formatTime(endTime)}`;
    }
    
    // 检查日期是否是今天
    isToday(date) {
        const today = new Date();
        const todayFormatted = formatDate(today);
        return date.formattedDate === todayFormatted;
    }
    
    // 显示课程详情
    showCourseDetails(course, lesson) {
        // 创建详情模态框
        this.createCourseDetailModal(course, lesson);
    }
    
    // 创建课程详情模态框
    createCourseDetailModal(course, lesson) {
        // 移除已存在的模态框
        const existingModal = document.getElementById('courseDetailModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // 创建模态框
        const modal = document.createElement('div');
        modal.id = 'courseDetailModal';
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>课程详情</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="detail-item">
                        <label>课程名称:</label>
                        <span>${course.courseName}</span>
                    </div>
                    <div class="detail-item">
                        <label>上课日期:</label>
                        <span>${lesson.date}</span>
                    </div>
                    <div class="detail-item">
                        <label>上课时间:</label>
                        <span>${this.formatTimeRange(lesson.startTime, lesson.endTime)}</span>
                    </div>
                    ${course.teacherName ? `
                    <div class="detail-item">
                        <label>授课教师:</label>
                        <span>${course.teacherName}</span>
                    </div>
                    ` : ''}
                    ${lesson.classroom ? `
                    <div class="detail-item">
                        <label>教室:</label>
                        <span>${lesson.classroom}</span>
                    </div>
                    ` : ''}
                    ${course.description ? `
                    <div class="detail-item">
                        <label>课程描述:</label>
                        <span>${course.description}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="modal-footer">
                    <button class="btn-close">关闭</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加事件监听
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.btn-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', function closeModalOnEsc(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeModalOnEsc);
            }
        });
    }
    
    // 更新配置
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.generateTimeSlots();
        this.renderTimetable();
    }
    
    // 获取当前显示的课程
    getCurrentCourses() {
        if (!this.courseData || !this.courseData.data) return [];
        
        const currentCourses = [];
        const currentDates = this.currentWeekDays.map(day => day.formattedDate);
        
        this.courseData.data.forEach(course => {
            if (course.lessons) {
                course.lessons.forEach(lesson => {
                    if (currentDates.includes(lesson.date)) {
                        currentCourses.push({
                            course: course,
                            lesson: lesson
                        });
                    }
                });
            }
        });
        
        return currentCourses;
    }
    
    // 清除课程表
    clear() {
        this.courseData = null;
        this.currentWeekDays = [];
        const timetableElement = document.getElementById('courseTimetable');
        if (timetableElement) {
            timetableElement.innerHTML = '';
        }
    }
}

// 添加课程表样式
function injectTimetableStyles() {
    if (document.getElementById('timetable-styles')) return;
    
    const styles = `
        .timetable-container {
            margin: 20px 0;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .timetable {
            display: grid;
            grid-template-columns: 80px repeat(7, 1fr);
            width: 100%;
            background: white;
        }
        
        .time-header, .day-header {
            background: #f8f9fa;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            border-bottom: 1px solid #dee2e6;
            border-right: 1px solid #dee2e6;
            font-size: 14px;
        }
        
        .day-header {
            background: #e9ecef;
            padding: 8px 5px;
        }
        
        .day-header.today-header {
            background: #d4edda;
            color: #155724;
        }
        
        .day-header .day-name {
            font-size: 16px;
            margin-bottom: 2px;
        }
        
        .day-header .date {
            font-size: 12px;
            font-weight: normal;
            color: #6c757d;
        }
        
        .time-slot {
            padding: 2px;
            border-bottom: 1px solid #dee2e6;
            border-right: 1px solid #dee2e6;
            min-height: 40px;
            position: relative;
            background: white;
        }
        
        .time-slot.weekend {
            background: #f8f9fa;
        }
        
        .time-slot.today-slot {
            background: #f0f9ff;
        }
        
        .course-block {
            position: absolute;
            left: 1px;
            right: 1px;
            top: 1px;
            color: white;
            padding: 4px 6px;
            border-radius: 4px;
            font-size: 11px;
            overflow: hidden;
            cursor: pointer;
            z-index: 1;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .course-block:hover {
            opacity: 0.95;
            transform: translateY(-1px);
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
            z-index: 10;
        }
        
        .course-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .course-name {
            font-weight: bold;
            margin-bottom: 2px;
            line-height: 1.2;
        }
        
        .course-time, .course-teacher, .course-location {
            font-size: 9px;
            opacity: 0.9;
            line-height: 1.1;
        }
        
        /* 模态框样式 */
        .course-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        
        .modal-header {
            padding: 15px 20px;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #333;
        }
        
        .close-modal {
            font-size: 24px;
            cursor: pointer;
            color: #6c757d;
        }
        
        .close-modal:hover {
            color: #333;
        }
        
        .modal-body {
            padding: 20px;
        }
        
        .detail-item {
            display: flex;
            margin-bottom: 12px;
            align-items: flex-start;
        }
        
        .detail-item label {
            font-weight: bold;
            width: 80px;
            flex-shrink: 0;
            color: #495057;
        }
        
        .detail-item span {
            flex: 1;
            color: #333;
        }
        
        .modal-footer {
            padding: 15px 20px;
            border-top: 1px solid #dee2e6;
            text-align: right;
        }
        
        .btn-close {
            padding: 8px 16px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .btn-close:hover {
            background: #5a6268;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .timetable {
                grid-template-columns: 60px repeat(7, 1fr);
                font-size: 12px;
            }
            
            .time-header, .day-header {
                padding: 5px 3px;
                font-size: 12px;
            }
            
            .day-header .day-name {
                font-size: 14px;
            }
            
            .course-block {
                font-size: 10px;
                padding: 2px 4px;
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'timetable-styles';
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

// 初始化函数
function initCourseTimetable(options = {}) {
    // 注入样式
    injectTimetableStyles();
    
    // 创建课程表实例
    const courseTimetable = new CourseTimetable(options);
    
    // 将实例暴露到全局
    window.courseTimetable = courseTimetable;
    
    return courseTimetable;
}

// 自动初始化（当DOM加载完成时）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 等待一段时间确保其他组件已初始化
        setTimeout(() => {
            initCourseTimetable();
        }, 100);
    });
} else {
    setTimeout(() => {
        initCourseTimetable();
    }, 100);
}

// 导出供模块化使用（如果环境支持）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CourseTimetable,
        initCourseTimetable,
        injectTimetableStyles
    };
}

// 在 course-timetable.js 文件末尾添加
console.log('course-timetable.js 已加载');

// 自动初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - 开始初始化课程表');
    initCourseTimetable();
});

// 或者使用 load 事件作为备选
window.addEventListener('load', function() {
    console.log('window.load - 课程表组件已准备就绪');
});