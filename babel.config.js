module.exports = {
    presets: [
        [
 
            "@babel/preset-env",//使用babel的预设 基本语法的处理 变量的转换
        ],
        [
            "@babel/preset-typescript",//使用babel-ts的预设处理
            {
                allExtensions: true, //支持所有文件扩展名
            },
        ],
    ]
}