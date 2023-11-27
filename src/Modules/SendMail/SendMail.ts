/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
 
// eslint-disable-next-line @typescript-eslint/no-var-requires
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import { IPayment } from '../PaymentModules/payment.interface';


const auth = {
    auth: {
      api_key: '1f0fe6867e7660e680ea9f7466cc6919-30b58138-38efa8bb',
      domain: 'sandboxe0cf13a5ede743fd992dd571f6e9d525.mailgun.org'
    }
  }
  
  const transporter = nodemailer.createTransport(mg(auth));


 const sendPaymentConfimationEmail = (paymentDetails: IPayment) => {
    transporter.sendMail({
        from: 'admin@bistro-boss.com',
        to: 'kabirnisharga@gmail.com', 
        subject: 'Your Order is Confirmed',
        html: `<div>
        <b>Thanks for your Order</b>
        <p>Date: ${paymentDetails?.date}</p>
        <p>Your Ordered: ${paymentDetails?.productNames.join(',')}</p>
        <p>Quantity: ${paymentDetails?.quantity}</p>
        <p>Price: ${paymentDetails?.price}</p>
        <p>Trxid: ${paymentDetails?.trxid}</p>
        <p>Status: ${paymentDetails?.status}</p>
        <p>Customer Email: ${paymentDetails?.email}</p>
        </div>`,
      }, (err, info) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
        else {
          console.log(`Response: ${info}`);
        }
      });
 }

 export default sendPaymentConfimationEmail;