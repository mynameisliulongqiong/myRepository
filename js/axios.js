// 封装axios函数 请求
function axios(config) {
    // 返回promise对象便于随后捕捉数据及抛出错误
    return new Promise((resolve, reject) => {
        // 创建xhr对象
        const xhr = new XMLHttpRequest();

        // 判断是否有params参数
        if (config.params) {
            const paramsObj = new URLSearchParams(config.params);
            const queryString = paramsObj.toString();
            config.url += `?${queryString}`;
        }

        // 请求
        xhr.open(config.method || 'GET', config.url);

        // 监听数据
        xhr.addEventListener('loadend', () => {
            // 判断是否有数据
            if (xhr.readyState == 4) {
                // 判断响应的状态码是否成功
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(new Error(xhr.response));
                }
            }
        });

        // 判断是否有请求体
        if (config.data) {
            const jsonStr = JSON.stringify(config.data);
            // 设置请求头
            xhr.setRequestHeader('Content-Type', 'application/json')
            // 最后发送请求
            xhr.send(jsonStr);
        } else {
            xhr.send();
        }
    });
}