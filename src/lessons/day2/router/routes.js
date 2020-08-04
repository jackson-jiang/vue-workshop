// TODO 动态定义
import Day1 from '@/lessons/day1/index.vue'
import Day2 from '@/lessons/day2/index.vue'
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
    path: '*'

  }
]
