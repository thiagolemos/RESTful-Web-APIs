import { Request, Response } from "express";
import { ContactController } from '../controllers/crmController';


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
            .get(this.contactController.getContacts)
            //POST endpoint
            .post((req: Request, res: Response) => {
                //Create new contact
                res.status(200).send(this.contactController.addNewContact);
            })

        //Contact detail
        app.route('/contact/:contactId')
            //Get especific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    }

}