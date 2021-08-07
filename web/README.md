# opassword web

### 想法

- [ ] 参照这篇[blog](https://medium.com/@jan.hesters/typescript-hoc-higher-order-component-and-decorators-in-react-586787f5a9e7)用装饰器写hoc
- [ ] 把hoc里的connect-mobx跟connect-jss搬运到[react-template](https://github.com/xingzhi2107/project-templates/tree/master/react-ts)里去
- [ ] react-template里的路由配置不对，要用BrowserRouter

### 计划

- [ ] 能跑起来
  - [x] 完成App.tsx，参照mobx-in-real-world。我感觉它那个setAppLoad的做法不错，给app 配置一个 "启动过程"。
  - [ ] html骨架 + 接口整合
  - [ ] gpg管理模块，同样只有html骨架
- [ ] 体验优化  
  - [ ] css样式
  - [ ] 表单校验与
- [ ] 待研究问题
  - [ ] 为什么connJss/withStyles的组件props没办法go to define？ts的补全性能变得极差。
  - [ ] mobx不推荐直接修改obs，要用action来mutation，看看这是为什么？
  - [ ] 有没有必要把所有的逻辑都抽离到mobx里去？
  - [ ] 构建完整的entity缓存机制。目前看来，server对entity的类型定义有点问题。
  
### 来不及细看的东西

- [ ] 关于ts的这个选项[useDefineForClassFields](https://zhuanlan.zhihu.com/p/258906525)，貌似很值得深入学习。
