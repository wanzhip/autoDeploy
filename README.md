# docker-demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### docker文章
https://yeasy.gitbook.io/docker_practice/introduction/why

```
docker pull nginx  // 拉取Nginx镜像
```

```
Dockerfile文件配置镜像
// FROM
// TO
```

```
docker build -t  <镜像名> . //   构建镜像,-t参数命名镜像 .标识基于当前目录Dockerfile构建镜像
```

```
docker run -d -p 3000:80 --name <容器名> <镜像名>
// -d 设置容器在后台运行
// -i 交互式操作
// -t 终端
// -p 端口映射，把本机3000端口到容器的80的端口 外网可以通过3000端口访问
// --name 设置容器名称
// <name> 指镜像名称
```

### docker常用操作

#### 查看镜像
```
docker image ls // 列出所有镜像
// 详细命令 https://yeasy.gitbook.io/docker_practice/image/list
```

#### 删除镜像
```
docker rmi [-f] <name> // 删除镜像，如果有该镜像生成的容器，不可删除，使用-f可强制删除
```

#### 清理镜像
```
docker image [options] prune // 
// options可选 -a删除无用镜像 -filter只删除符合过滤条件的镜像 -f强制删除镜像
```

#### 导出镜像
```
docker save image -o <filename>
```

#### 导入镜像
```
docker load -i <filename>
```

#### 上传镜像
```
docker push <镜像ID> // 需要先登录
```

#### 制作镜像
```
docker commit --author "T" --message "修改了默认网页" <容器名或容器ID>
```
#### 查看容器名
```
docker ps -a -f "name=^docker" --format="{{.Names}}" // 查看所有 name 以 docker 开头的 docker 容器，并只输出容器名
```

#### 停止容器
```
docker stop <容器名>
```

#### 删除容器
```
docker rm <容器名> // 容器必须已经stop
```