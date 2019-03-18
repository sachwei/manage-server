var index = require('./index');
var user = require('./login/user');
var data = require('./common/data');
var exportExcel = require('./excel/exportExcel')
var importExcel = require('./excel/importExcel')
var message = require('./message/message')
var group = require('./group/group')
var schedule = require('./schedule/schedule')

// 白明单
// 路径全匹配
var passUrl = [
    { url: '/' },
    { url: '/work' },
    { url: '/work/' },
    { url: '/work/login' },
    { url: '/work/logout'},
    { url: '/work/data/find/backlogs' }
];

// 前缀匹配
var preUrl = [
    { url: '/work/static' },
    { url: '/work/data/find/imgs' },
    { url: '/work/schedule/deployCheck' }
];

module.exports = {
    initRoutes(server) {
        server.use('/', index);
        server.use('/work', user);
        server.use('/work/data', data);
        server.use('/work/excel', exportExcel);
        server.use('/work/excel/import', importExcel);
        server.use('/work/message', message);
        server.use('/work/group', group);
        server.use('/work/schedule', schedule);
    },

    routeRule(req){        
        var result = false;

        // 已登录
        if(req.cookies['user']){
            result = true;
        }
        
        if(passUrl.find((item) => item.url === req.url)){
            result = true;
        }        
        
        if(preUrl.find((item) => req.url.indexOf(item.url) != -1)){
            result = true;
        }
        return result;
    }
}