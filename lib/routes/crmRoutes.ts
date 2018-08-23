import { Request, Response } from "express";
import { ContactController } from '../controllers/crmController';
import { NextFunction } from "express-serve-static-core";


export class Routes {

    public contactController: ContactController = new ContactController();

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {

                res.status(200).send({
                    message: 'Get request SucessFul!'
                })
            })

        //Contact
        app.route('/contact')
            //Get endpoint
            .get((req: Request, res: Response, next: NextFunction) => {
                //middleware
                if (req.query.key !== '9f4da15fd9ac5ba8e52ab6f14c18e69c60ba6d5b') {
                    res.status(401).send('You shall not pass!');
                } else {
                    next();
                }
            }, this.contactController.getContacts)
            //POST endpoint
            .post(this.contactController.addNewContact)

        //Contact detail
        app.route('/contact/:contactId')
            //Get especific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    }

}