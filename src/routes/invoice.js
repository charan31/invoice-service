import {
    Router
  } from 'express';
  import InvoiceService from '../services/invoiceService';
  
  const router = new Router();
  
  
  router.post('/', async (req, res) => {
    try {
      const payload = req.body;
      let invoiceService = new InvoiceService();
  
      const data = await invoiceService.createInvoice(payload);
      res.json(data);
    } catch (error) {
      console.log('Error while digitizing the document:', error);
      res.boom.badRequest(`error occured while processing file, ${error.message}`);
    }
  });
   
  router.get('/:invoiceId', async (req, res) => {
    try {
      const invoiceId = req.params.invoiceId;
      let invoiceService = new InvoiceService();
      let invoiceDetails = await invoiceService.getInvoiceDetails(invoiceId);
      if (invoiceDetails)
        return res.json(invoiceDetails);
      return res.boom.notFound();
    } catch (err) {
      return res.boom.badData(err);
    }
  });
  
  
  export default router;