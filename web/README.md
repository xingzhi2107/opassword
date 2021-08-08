# opassword web

### 想法

- [ ] 参照这篇[blog](https://medium.com/@jan.hesters/typescript-hoc-higher-order-component-and-decorators-in-react-586787f5a9e7)用装饰器写hoc
- [ ] 把hoc里的connect-mobx跟connect-jss搬运到[react-template](https://github.com/xingzhi2107/project-templates/tree/master/react-ts)里去
- [ ] react-template里的路由配置不对，要用BrowserRouter

### 计划

- [ ] 能跑起来
  - [x] 完成App.tsx，参照mobx-in-real-world。我感觉它那个setAppLoad的做法不错，给app 配置一个 "启动过程"。
  - [x] html骨架 + 接口整合
  - [x] gpg管理模块，同样只有html骨架
- [ ] 体验优化  
  - [ ] css样式
  - [ ] 表单校验与
  - [ ]
- [ ] 安全
  - [ ] 研究下如何把gpg key加密存储在localStorage里
    - [ ] 对gpg key做一个md5sum，作为gpg key的"ID"。每个密码都需要有一个gpg key hash，来确定密码是用哪个gpg key加密的。
    - [ ] 每个账号都需要配置一个security token，用来对存储在localStorage的gpg key进行加密/解密。加解密过程放在server端来做。
    - [ ] 每个用户都默认生成一个gpg key用来加密不重要的账号，对于检测到重要的账号，建议用户导入自己的gpg key。
  - [ ] csp
  - [ ] csrf
- [ ] 待研究问题
  - [ ] 为什么connJss/withStyles的组件props没办法go to define？ts的补全性能变得极差。
  - [ ] mobx不推荐直接修改obs，要用action来mutation，看看这是为什么？
  - [ ] 有没有必要把所有的逻辑都抽离到mobx里去？
  - [ ] 构建完整的entity缓存机制。目前看来，server对entity的类型定义有点问题。
- [ ] 需求想法
  - [ ] 通过app，生成一个密码短链，用户在浏览器中访问这个链接，来获取密码。仅限用默认gpg key加密的密码。
  - [ ] 自动更改密码的功能
  
### 来不及细看的东西

- [ ] 关于ts的这个选项[useDefineForClassFields](https://zhuanlan.zhihu.com/p/258906525)，貌似很值得深入学习。
