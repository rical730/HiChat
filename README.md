# HiChat
A web application for chat


## Background
 * 为了进一步熟悉react开发，练手的了个Web聊天室，结合React+React-Router+React-Redux +socket.io 实现页面功能。

## Tech
 * [webpack](http://www.jianshu.com/p/42e11515c10f)
 	* 模块打包机：可以分析项目结构，根据入口文件（如index.js) 分析项目以来的所有文件，找到JS模块和一些浏览器不能直接运行的拓展语言，用loaders处理他们，把它们转换和打包为一个或多个浏览器可识别的JS文件
 * [React](https://discountry.github.io/react/)
 	* React是Facebook和Instagram用来创建用户界面的JS库。可以轻松使用组件化的开发思想
 * [Redux](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html) 
 	* 其实和React没有什么必然关系，仅仅只是为了管理state而生，刚好适合解决React在组件嵌套复杂的时候产生的数据传递逻辑复杂的问题。也可以用Flux代替Redux，只是Redux更为简化。
 	* 主要工作流程是：
 		* -->注册一个全局唯一的store对象
 		* -->用来维护整个应用的state
 		* -->当要变更state时就dispacth一个action
 		* -->交由reducer根据action更新相应的state
 	* 核心一：Provider：包裹着state传递给全局使用
 	* 核心二：[connect函数](https://github.com/reactjs/react-redux/blob/master/docs/api.md/)，GitHub上react-redux/docs/api.md里有详细介绍，主要是前两个参数mapStateToProps和mapDispatchToProps
 		* mapStateToProps是把state注入视图组件
 		* mapDispatchToProps可以借助[bindActionCreators](http://redux.js.org/docs/api/bindActionCreators.html/)来实现一旦create action就dispatch
 * [React-Redux](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)  (react-router3.0.5)
 	* 一个轻量级的库，把所有组件分成两大类：
 		* UI组件（负责UI的呈现，不含有状态）
 		* 容器组件（负责数据和逻辑，可以包含UI组件）
 	* Provider方法可以包裹元应用组件的最外层，使得整个应用成为其子组件。这样一来，App的所有子组件就默认都可以拿到state了
 	* connect方法才是Redux的核心方法，可以连接React和Redux进行数据传输。将state映射到 UI 组件的参数（props）
 * [Babel](http://babeljs.cn/)
 	* 转化JSX语法，转化ES6，ES7
 * [socket.io](https://socket.io/docs/) 
 	* 官方文档看起来很简洁，使用方法也很简洁。通信功能是基于WebSocket做的，可以服务器与单个客户端通信，也可以同时与多个客户端通信，rooms和namespace的用法可以实现很多功能。这里的在线聊天只是服务器简单地给所有客户端转发消息。

## Install
```
git clone https://github.com/rical730/HiChat.git
cd HiChat
npm install
sudo npm install -global babel-cli
cd server
babel-node server.js
```
然后打开127.0.0.1:3000就可以访问啦

## Problem

