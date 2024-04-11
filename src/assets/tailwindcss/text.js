// my-plugin.js

// 导出一个函数，接收`addUtilities`和`theme`作为参数
module.exports = function ({ addUtilities, theme }) {
    // 定义一个新的实用工具类
    const newUtilities = {
        '.inline-code': {
            color: 'hsl(var(--primary))', // 使用Tailwind主题中的颜色
            fontSize: '14px', // 自定义字体大小
            margin: '4px',
        },
    };

    // 添加新的实用工具类到样式表中
    addUtilities(newUtilities);
};
