import { Router } from 'express'
import indexController from '../../controllers/backend/indexController'

const router: Router = Router()

router.get('/', indexController.index)

export default router
