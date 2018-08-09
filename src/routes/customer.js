import {
  Router
} from 'express';
import CustomerService from '../services/customerService';

const router = new Router();


router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    let customerService = new CustomerService();

    const digitizedContent = await customerService.createCustomer(payload);
    res.json(digitizedContent);
  } catch (error) {
    console.log('Error while digitizing the document:', error);
    res.boom.badRequest(`error occured while processing file, ${error.message}`);
  }
});

router.get('/', async (req, res) => {
  try {
    const payload = req.body;
    let customerService = new CustomerService();
    const digitizedContent = await customerService.getCustomers();
    res.json(digitizedContent);
  } catch (error) {
    console.log('Error while digitizing the document:', error);
    res.boom.badRequest(`error occured while processing file, ${error.message}`);
  }
});

router.get('/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    let customerService = new CustomerService();
    let customerDetails = await customerService.getCustomer(customerId);
    if (customerDetails)
      return res.json(customerDetails);
    return res.boom.notFound();
  } catch (err) {
    return res.boom.badData(err);
  }
});


export default router;