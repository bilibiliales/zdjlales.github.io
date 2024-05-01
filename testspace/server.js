// 引入必要的模块
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// 创建 Express 应用
const app = express();

// 解析 JSON 请求体
app.use(bodyParser.json());

// 设置静态文件目录（可选，用于提供前端文件）
app.use(express.static(path.join(__dirname, 'public'))); // 假设你的 HTML 文件在 public 文件夹中

// 定义一个路由来处理 JSON 文件更新
app.post('/update-json', (req, res) => {
  // 假设你的 JSON 文件名为 data.json，位于项目的根目录下
  const filePath = path.join(__dirname, 'data.json');

  // 从请求体中获取 start 参数
  const { start } = req.body;

  // 读取 JSON 文件
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }

    // 解析 JSON 数据
    try {
      const jsonData = JSON.parse(data);

      // 在这里添加你的逻辑来更新 jsonData 对象
      // 例如，你可以检查 start 参数并更新 jsonData 中的某个值
      // 假设我们要更新一个名为 "startTime" 的字段
      if (start) {
        jsonData.startTime = start;
      }

      // 将更新后的对象转换回 JSON 字符串
      const updatedData = JSON.stringify(jsonData, null, 2);

      // 写入 JSON 文件
      fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).send('Error writing file');
        }

        // 返回成功的响应
        res.send('JSON file updated successfully!');
      });
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return res.status(500).send('Error parsing JSON');
    }
  });
});

// 设置服务器监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
