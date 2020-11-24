const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const QRCode = require('qrcode')
const uri = 'https://contact-trace-and-menu.web.app/customer';
const app = express();

sgMail.setApiKey('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');

app.use(cors({ origin: true }));

app.post('/', async(req, res) => {

    attachments = [];

    for (const tbl of req.body.tables) {
        // eslint-disable-next-line no-await-in-loop
        let qrCode = await QRCode.toDataURL(`${uri}/${req.body.uid}/${tbl}`);
        attachments.push({
          content: qrCode.split('data:image/png;base64,')[1],
          filename: `${tbl}.png`,
          type: "image/png",
          disposition: "attachment"
          })
      }
    const msg = {
        to: req.body.email,
        from: 'arvin@damienwhite.com',
        subject: 'Table QRCodes',
        text: 'Download now',

        attachments
      };
      sgMail.send(msg).then(() => res.status(200).send('SENT')).catch(err => {
        console.log(err);
        res.status(500).send('ERROR')
      });
});
// Expose Express API as a single Cloud Function:
exports.sendEmail = functions.https.onRequest(app);