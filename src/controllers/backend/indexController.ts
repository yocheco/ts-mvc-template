import { Request, Response } from 'express'

class IndexController {
  public index (req: Request, res: Response) {
    return res.render('backend/index/index', { layout: 'backend/dashboard', active: { index: true } })
  }
}

const indexController = new IndexController()

export default indexController
