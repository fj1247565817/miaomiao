import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'
import adminRouter from './admin'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        movieRouter,
        mineRouter,
        cinemaRouter,
		adminRouter,
		{
			path: '/test',
			component: () => import('@/views/Test'),
		},
		// 重定向
        {
            path:'/*',
            redirect:'/movie'
        }
    ]
})