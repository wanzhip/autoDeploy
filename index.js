const http = require("http")
const { execSync } = require("child_process")
const path = require("path")
const fs = require("fs")

// 递归删除目录
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            const curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

const resolvePost = req =>
    new Promise(resolve => {
        let chunk = "";
        req.on("data", data => {
            chunk += data;
        });
        req.on("end", () => {
            console.log(chunk, 'chunk');
            // resolve(JSON.parse(chunk));
        });
    });

http.createServer(async (req, res) => {
    console.log('receive request')
    console.log(req.url, 'url')
    if (req.method === 'GET' && req.url === '/test') {
        console.log('进入');
        // const data = await resolvePost(req);
        // console.log(data, '--');
        const repositoryname = 'docker-test';
        const projectDir = path.resolve(`./docker-test`)
        console.log(projectDir, 'projectDir');
        deleteFolderRecursive(projectDir)

        // 拉取仓库最新代码
        // https://github.com/wanzhip/docker-test.git
        execSync(`git clone https://github.com/wanzhip/docker-test.git ${projectDir}`, {
            stdio: 'inherit',
        });
        // 复制 Dockerfile 到项目目录
        fs.copyFileSync(path.resolve(`./Dockerfile`), path.resolve(projectDir, './Dockerfile'))

        // 复制 .dockerignore 到项目目录
        fs.copyFileSync(path.resolve(__dirname, `./.dockerignore`), path.resolve(projectDir, './.dockerignore'))

        // 创建 docker 镜像
        execSync(`docker build . -t ${repositoryname}-image:latest `, {
            stdio: 'inherit',
            cwd: projectDir
        })

        // 销毁 docker 容器
        execSync(`docker ps -a -f "name=^${repositoryname}-container" --format="{{.Names}}" | xargs -r docker stop | xargs -r docker rm`, {
            stdio: 'inherit',
        })

        // 创建 docker 容器
        execSync(`docker run -d -p 8888:80 --name ${repositoryname}-container  ${repositoryname}-image:latest`, {
            stdio: 'inherit',
        })

        console.log('deploy success')

    }
    res.end('okkk')
}).listen(3000, () => {
    console.log('server is ready')
})
