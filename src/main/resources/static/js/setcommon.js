window.onload = new function() {
    setMainMenu();
}

function setMainMenu() {    
    // 获取当前脚本的路径，用来确定项目根目录
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var scriptPath = currentScript.src;
    
    // 计算项目根路径
    var projectRoot = '';
    if (scriptPath.includes('/js/')) {
        // 如果脚本在js目录中，项目根目录就是上一级
        projectRoot = scriptPath.substring(0, scriptPath.indexOf('/js/') + 1);
    } else {
        // 否则使用当前页面路径计算
        var currentPath = window.location.href;
        projectRoot = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        
        // 如果在student目录，需要回到项目根目录
        if (currentPath.includes('/student/')) {
            projectRoot = projectRoot.substring(0, projectRoot.lastIndexOf('/student/') + 1);
        }
    }
    var html = 
    `
        <div class="menu">
            <ul>
                <li><a href="${projectRoot}index.html"><b style="color:#88abda;">课程表</b></a></li>
                <li><a href="${projectRoot}teacher/index.html"><b>教师</b></a></li>
                <li><a href="${projectRoot}student/index.html"><b>学生</b></a>
                    <ul>
                        <li><a href="${projectRoot}student/register.html">添加学生</a></li>
                        <li><a href="${projectRoot}student/remove.html">删除学生</a></li>
                        </li>
                    </ul>
                </li>
                <li><a href="course/index.html"><b>课程</b></a></li>
            </ul>
        </div>
    `;
    document.getElementById("main_menu").innerHTML = html;
}