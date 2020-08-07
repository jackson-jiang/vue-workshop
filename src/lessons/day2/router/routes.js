// TODO 动态定义
import Day1 from '@/lessons/day1'
import Day2 from '@/lessons/day2'
// import DeDuplicate from '@/basic/DeDuplicate'
import Home from '@/Home.vue'
export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/day1',
    component: Day1,
  },
  {
    path: '/day2',
    component: Day2,
  },
  {
    path: '/day3',
    component: () => import('@/lessons/day3')
  },
  {
    path: '/de-duplicate',
    // component: DeDuplicate,
    component: () => import('@/basic/DeDuplicate')
  },
  {
    path: '*'

  }
]
