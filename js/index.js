window.onload = function () {
    getCityInfo(1);// 获取数据
}

var cityArr = [];// 创建一个空数组，便于后面存数据调用
var citySearch = document.querySelector('.searchCity');// 表单input
var searchList = document.querySelector('.searchList');// 表单下拉列表元素

var cityInte = document.querySelector('.cityInfo-title');// 城市信息头
var cityInfoList = document.querySelector('.cityInfoList');// 城市信息列表
var pagination = document.querySelector('.pagination');// 分页

// 下拉菜单的鼠标移出事件
searchList.addEventListener('mouseleave', function () {
    // 隐藏下拉菜单
    this.style.display = "none"
});

// 表单获得焦点事件
citySearch.addEventListener('focus', function () {
    // 表单input内有值
    if (this.value) {
        // 显示下拉菜单
        searchList.style.display = "block";
    }
});

// 初始化页面,渲染所有数据
function init(result, page) {
    // 判断搜索框内是否有值
    if (citySearch.value == "") {
        // 初始化数组
        cityArr = [];

        // 遍历100条数据
        for (let i = 0; i < result.length; i++) {
            // push到空数组cityArr里
            cityArr.push(result[i]);
        }

        cityInte.innerHTML = `
                    <svg t="1686123692337" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3110" width="24" height="24">
                        <path
                            d="M912 128c0 81.3-12.4 151.7-37 210.9-24.6 59.2-66 118.2-124.2 176.6-26.5 26.2-58.3 54.9-95.5 86.2l-9.8 185.7c-0.6 5.3-3.3 9.5-7.8 12.8L449.6 909.7c-2.3 1.3-4.9 2-7.8 2-3.9 0-7.7-1.4-11.2-4.4L399.3 876c-4.2-4.5-5.6-9.8-3.9-15.7l41.5-135.1-137.8-137.7L164 629.1c-1 0.3-2.5 0.5-4.4 0.5-4.5 0-8.3-1.4-11.2-4.4L117 593.9c-5.6-6.2-6.4-12.6-2.5-19.1l109.7-188.1c3.3-4.5 7.5-7.2 12.8-7.8l185.7-9.8c31.3-37.2 60.1-69 86.2-95.5 61.4-61.1 119.8-103.2 175.4-126.4 55.5-23.2 125.9-34.9 211.1-34.9 4.5 0 8.4 1.5 11.7 4.6 3.2 3.2 4.9 6.9 4.9 11.1zM788.5 302.4c9.2-9.2 13.7-20.3 13.7-33.3 0-13.1-4.5-24.2-13.7-33.3-9.2-9.2-20.3-13.7-33.3-13.7-13.1 0-24.2 4.5-33.3 13.7-9.2 9.2-13.7 20.3-13.7 33.3 0 13.1 4.5 24.2 13.7 33.3 9.2 9.2 20.3 13.7 33.3 13.7s24.2-4.6 33.3-13.7z"
                            fill="#333333" p-id="3111"></path>
                    </svg>
                    <span>&nbsp;&nbsp;<span class="cityName">城市</span>信息</span>`;

        cityInnerHTML(cityArr, page);// 调用函数 渲染所有数据
    }
}

// 获取数据
function getCityInfo(page) {
    // 调用封装的axios函数 发送请求
    axios({
        url: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
    }).then(result => {
        // 取前100条数据
        result = result.slice(0, 100);

        // 初始化页面
        init(result, page);

        // 表单的input输入事件
        citySearch.addEventListener('input', e => {
            // 初始化数据
            cityArr = [];
            searchList.innerHTML = '';

            // 表单input输入框内是否有值
            if (e.target.value) {
                // 设置下拉菜单样式显示
                searchList.style.display = "block";

                // 创建正则对象
                let exp = new RegExp(e.target.value, 'i');

                // 计算多少条数据
                var count = 0;

                // 遍历result数据
                for (let i = 0; i < result.length; i++) {
                    // 通过正则对象test方法匹配到包含对应的数据
                    if (exp.test(result[i].city) || exp.test(result[i].state)) {
                        count++;

                        // 添加到cityArr数组中
                        cityArr.push(result[i]);

                        // 渲染下拉菜单的数据
                        searchList.innerHTML += `<li class="city-item" data-city="${result[i].city}" data-state="${result[i].state}">${result[i].city},${result[i].state}</span></li>`;
                    }
                }

                // 点击时获取对应点击的页面并渲染
                searchLiBtn(result, page);

                // 渲染页面数据
                cityInnerHTML(cityArr, page);
                cityInte.innerHTML = `
                    <svg t="1686123692337" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3110" width="24" height="24">
                        <path
                            d="M912 128c0 81.3-12.4 151.7-37 210.9-24.6 59.2-66 118.2-124.2 176.6-26.5 26.2-58.3 54.9-95.5 86.2l-9.8 185.7c-0.6 5.3-3.3 9.5-7.8 12.8L449.6 909.7c-2.3 1.3-4.9 2-7.8 2-3.9 0-7.7-1.4-11.2-4.4L399.3 876c-4.2-4.5-5.6-9.8-3.9-15.7l41.5-135.1-137.8-137.7L164 629.1c-1 0.3-2.5 0.5-4.4 0.5-4.5 0-8.3-1.4-11.2-4.4L117 593.9c-5.6-6.2-6.4-12.6-2.5-19.1l109.7-188.1c3.3-4.5 7.5-7.2 12.8-7.8l185.7-9.8c31.3-37.2 60.1-69 86.2-95.5 61.4-61.1 119.8-103.2 175.4-126.4 55.5-23.2 125.9-34.9 211.1-34.9 4.5 0 8.4 1.5 11.7 4.6 3.2 3.2 4.9 6.9 4.9 11.1zM788.5 302.4c9.2-9.2 13.7-20.3 13.7-33.3 0-13.1-4.5-24.2-13.7-33.3-9.2-9.2-20.3-13.7-33.3-13.7-13.1 0-24.2 4.5-33.3 13.7-9.2 9.2-13.7 20.3-13.7 33.3 0 13.1 4.5 24.2 13.7 33.3 9.2 9.2 20.3 13.7 33.3 13.7s24.2-4.6 33.3-13.7z"
                            fill="#333333" p-id="3111"></path>
                    </svg>
                    <span>&nbsp;&nbsp;关于<span class="cityName">${e.target.value}</span>的城市</span>`;

                // 判断数据的计数是否为0
                if (count == 0) {
                    // 渲染数据
                    searchList.innerHTML += `<li class="city-item item">暂无相关城市信息,请重新输入！</li>`;
                    cityInfoList.innerHTML = `<section class='noCity'>暂无相关城市信息,请重新输入！</section>`;
                }
            } else {
                // 设置下拉菜单为隐藏
                searchList.style.display = "none";
                // 初始化数据
                init(result, page);
            }
        });
    }).catch(error => {
        // 捕捉错误信息
        console.log(error);
    });
}

// 点击下拉菜单中的其中一项时获取并渲染数据
function searchLiBtn(result, page) {
    // 点击事件
    document.querySelector('.searchList').addEventListener('click', e => {
        // 判断是否点击其中的li
        if (e.target.classList.contains('city-item')) {
            // 初始化数据
            cityArr = [];
            cityInfoList.innerHTML = "";

            // 设置点击其中的li时下拉菜单消失
            searchList.style.display = "none";

            // 用常量存储当前自定义的data属性的值
            const city_name = e.target.dataset.city;
            const city_state = e.target.dataset.state;

            // 通过遍历后push添加到cityArr里
            for (let l = 0; l < result.length; l++) {
                if (city_name == result[l].city) {
                    cityArr.push(result[l]);
                }
            }

            // 重新渲染数据
            cityInnerHTML(cityArr, page);
            cityInte.innerHTML = `
                <svg t="1686123692337" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3110" width="24" height="24">
                    <path
                        d="M912 128c0 81.3-12.4 151.7-37 210.9-24.6 59.2-66 118.2-124.2 176.6-26.5 26.2-58.3 54.9-95.5 86.2l-9.8 185.7c-0.6 5.3-3.3 9.5-7.8 12.8L449.6 909.7c-2.3 1.3-4.9 2-7.8 2-3.9 0-7.7-1.4-11.2-4.4L399.3 876c-4.2-4.5-5.6-9.8-3.9-15.7l41.5-135.1-137.8-137.7L164 629.1c-1 0.3-2.5 0.5-4.4 0.5-4.5 0-8.3-1.4-11.2-4.4L117 593.9c-5.6-6.2-6.4-12.6-2.5-19.1l109.7-188.1c3.3-4.5 7.5-7.2 12.8-7.8l185.7-9.8c31.3-37.2 60.1-69 86.2-95.5 61.4-61.1 119.8-103.2 175.4-126.4 55.5-23.2 125.9-34.9 211.1-34.9 4.5 0 8.4 1.5 11.7 4.6 3.2 3.2 4.9 6.9 4.9 11.1zM788.5 302.4c9.2-9.2 13.7-20.3 13.7-33.3 0-13.1-4.5-24.2-13.7-33.3-9.2-9.2-20.3-13.7-33.3-13.7-13.1 0-24.2 4.5-33.3 13.7-9.2 9.2-13.7 20.3-13.7 33.3 0 13.1 4.5 24.2 13.7 33.3 9.2 9.2 20.3 13.7 33.3 13.7s24.2-4.6 33.3-13.7z"
                        fill="#333333" p-id="3111"></path>
                </svg>
                <span>&nbsp;&nbsp;城市 - <span class="cityName">${city_name},${city_state}</span></span>`;
        }
    });
}

// 渲染获取到的数据，分页
function cityInnerHTML(result, page) {
    cityInfoList.innerHTML = '';
    pagination.innerHTML = '';

    /*分页*/
    // 通过变量来达到渲染下一页的数据
    var pagenum = (page - 1) * 8;
    // 判断有多少页
    var pageContent = Math.ceil(result.length / 8); //

    // 当数据只有一条时
    if (result.length == 1) {
        // 设置页面数据为居中显示
        document.querySelector('.cityInfoList').style.justifyContent = "center";
    } else {
        // 设置页面数据为两边靠显示
        document.querySelector('.cityInfoList').style.justifyContent = "space-between";
    }

    // 通过这些变量 遍历当前页的数据
    for (let j = pagenum; j < (pagenum + 8); j++) {
        if (j < result.length) {// 判断是否超出范围
            // 渲染城市数据
            cityInfoList.innerHTML += `
            <section class="cityInfoLi">
                <h4>城市-<span class="city">${result[j].city}</span>,<span class="state">${result[j].state}</span></h4>
                <section class="cityInfoList-content">
                    <span>2000-2013城市增长度：<span class="growth_from_2000_to_2013">${result[j].growth_from_2000_to_2013}</span></span>
                    <span>所处经度：<span class="longitude">${result[j].longitude}</span></span>
                    <span>所处纬度：<span class="latitude">${result[j].latitude}</span></span>
                    <span>人口数：<span class="population">${result[j].population}</span></span>
                    <span>城市排名：<span class="rank">${result[j].rank}</span></span>
                    <span>所属州/省：<span class="state">${result[j].state}</span></span>
                </section>
            </section>`;
        }
    }
    // 判断是否出现分页
    if (pageContent > 1) {
        // 渲染分页数据
        pagination.innerHTML +=
            `<div class='pagination_box'>
            <div id='firstpage'>首页</div>
            <div id='pageup'>上一页</div>
            <div id='nowpage' class='page'>${page}</div>
            <div id='pagedown'>下一页</div>
            <div id='lastpage'>尾页</div>
            <a id='page_num'>共${pageContent}页</a>
            </div>`;
        var pageup = document.querySelector("#pageup");// 获取上一页元素
        var pagedown = document.querySelector("#pagedown");// 获取下一页元素
        var firstpage = document.querySelector("#firstpage");// 获取首页元素
        var lastpage = document.querySelector("#lastpage");// 获取尾页元素

        // 上一页点击事件
        pageup.onclick = function () {
            // 如果当前页小于等于1则无法跳转上一页 如果大于1则可以跳转上一页
            var PageUp = (page - 1) <= 1 ? 1 : page - 1; // 上一页

            // 渲染页面数据
            cityInnerHTML(result, PageUp);
        }

        // 下一页点击事件
        pagedown.onclick = function () {
            // 如果当前页大于等于最后一页则无法跳转下一页 如果小于最后一页则可以跳转下一页
            var PageDown = (page + 1) > pageContent ? pageContent : page + 1; // 下一页

            // 渲染页面数据
            cityInnerHTML(result, PageDown);
        }

        // 首页点击事件
        firstpage.onclick = function () {
            var Fpage = 1; // 首页

            // 渲染页面数据
            cityInnerHTML(result, Fpage);
        }

        // 尾页点击事件
        lastpage.onclick = function () {
            var Lpage = pageContent; // 尾页

            // 渲染页面数据
            cityInnerHTML(result, Lpage);
        }
    }
}