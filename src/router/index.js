import Vue from 'vue'
import Router from 'vue-router'
import topics from '@/view/topics/topics'
import message from '@/view/message/message'
import push from '@/view/push/push'
import user from '@/view/user/user'
import usertopics from '@/view/user/usertopics/usertopics'
import details from '@/components/details/details'
import comments from '@/components/comments/comments'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/topics',
      name: 'topics',
      component: topics,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/push',
      name: 'push',
      component: push
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/usertopics/:type',
      name: 'usertopics',
      component: usertopics
    },
    {
      path: '/details/:id',
      name: 'details',
      component: details
    },
    {
      path: 'comments',
      name: 'comments',
      component: comments
    }
  ]
})

router.push({name: 'topics'})

export default router
