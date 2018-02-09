import Vue from 'vue'
import Router from 'vue-router'
import topics from '@/views/topics/Topics'
import message from '@/views/message/Message'
import push from '@/views/push/Push'
import user from '@/views/user/User'
import usertopics from '@/views/user/usertopics/UserTopics'
import details from '@/components/details/Details'
import comments from '@/components/comments/Comments'

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
