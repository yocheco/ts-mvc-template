import { Request, Response } from 'express'

class IndexController {
  public index (req: Request, res: Response) {
    return res.render('frontend/home/index', { layout: 'frontend/index', active: { index: true } })
  }
}

const indexController = new IndexController()

export default indexController
