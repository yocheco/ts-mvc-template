import { Router } from 'express'
import indexController from '../../controllers/frontend/indexController'

const router: Router = Router()

router.get('/', indexController.index)

export default router
