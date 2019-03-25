module.exports = {
    base: '/how-it-works/',
    title: 'How It Works',
    description: '...',
    head: [
        ['link', { rel: 'icon', href: '/imgs/logo.png' }]
    ],
    theme: 'talltotal',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
        ],
        listAllSidebar: {
            ignore: ['/docs/interview.'],
            showIndex: 'Home',
            groupByDir: true,
        },
        sidebar: 'auto',
        lastUpdated: '最后更新',
    },
}
