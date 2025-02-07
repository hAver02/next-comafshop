import { EmailTemplate } from "@/components/email-template";
import {Resend} from 'resend';

const resend = new Resend('re_XUa4hRQA_9bCPVBFz2Sq8t5ANkXFgjMui')

export async function sendEmail(email :string){
    try {
        console.log('enviamos mail');
        const {data, error} = await resend.emails.send({
            from : 'pazluciano.dev@gmail.com',
            to : [email],
            subject : ' Hello world',
            react : EmailTemplate({firstName : 'Luchi'})
        })
        if(error) throw new Error('Error sending email');
        return data
    } catch (error) {
        console.log(error);
        
    }
}