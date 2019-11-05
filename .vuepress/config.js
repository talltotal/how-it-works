module.exports = {
    base: '/how-it-works/',
    title: 'How It Works',
    description: '...',
    head: [
        ['link', { rel: 'icon', href: '/imgs/logo.png' }]
    ],
    markdown: {
        config (md) {
            md.renderer.rules.softbreak = (tokens, idx, options, env, vm) => {
                return '</p><p>'
                // return '<br />'
            }
        }
    },
    theme: 'talltotal',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: 'github', link: 'https://github.com/talltotal/how-it-works' },
        ],
        listAllSidebar: {
            ignore: ['/build/', '/node_modules'],
            showIndex: 'Home',
            groupByDir: true,
        },
        sidebar: 'auto',
        lastUpdated: '最后更新',
    },
}
