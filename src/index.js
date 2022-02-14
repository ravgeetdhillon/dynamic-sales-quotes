require('dotenv').config();

const hellosign = require('hellosign-sdk')({ key: process.env.HELLOSIGN_API_KEY });
const argv = require('minimist');
const { v1: uuidv1 } = require('uuid');

// Destructure command line arguments
let { title, subject, message, name, company, email, price } = argv(process.argv.slice(2));

// Set default values in case the command line arguments are undefined
title = title ?? 'Web Development Project';
subject = subject ?? 'Freelance Sales Quote';
message = message ?? 'Please sign this sales quote to get started with me.';
name = name ?? 'Alice Wonder';
company = company ?? 'Foobar Inc.';
email = email ?? 'abc@example.com';
price = price ?? 1000;

// Options for HelloSign SDK
const options = {
  test_mode: 1,
  template_id: process.env.HELLOSIGN_TEMPLATE_ID,
  title: title,
  subject: subject,
  message: message,
  custom_fields: [
    {
      name: 'quote_id',
      value: uuidv1(),
    },
    {
      name: 'customer_name',
      value: name,
    },
    {
      name: 'customer_company',
      value: company,
    },
    {
      name: 'price',
      value: price,
    },
    {
      name: 'total',
      value: price,
    },
  ],
  signers: [
    {
      email_address: email,
      name: name,
      role: 'Client',
    },
  ],
};

async function index() {
  try {
    await hellosign.signatureRequest.sendWithTemplate(options);
  } catch (err) {
    console.error(err);
    return;
  }
}

index();
