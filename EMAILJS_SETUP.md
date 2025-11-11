# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Create a Service
1. In your EmailJS dashboard, go to "Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you want emails in your Gmail)
4. Connect your Gmail account
5. Copy the "Service ID" (something like 'service_xxxxxxx')

## Step 3: Create an Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

--
This email was sent from your portfolio contact form.
```

4. Copy the "Template ID" (something like 'template_xxxxxxx')

## Step 4: Get Public Key
1. Go to "Account" > "General"
2. Copy your "Public Key" (something like 'xxxxxxxxxxxxxxx')

## Step 5: Update Contact Component
Replace these placeholders in Contact.tsx:
- YOUR_SERVICE_ID: with your Service ID
- YOUR_TEMPLATE_ID: with your Template ID  
- YOUR_PUBLIC_KEY: with your Public Key

## Step 6: Test
1. Fill out the contact form on your website
2. Check your Gmail inbox for the message
3. If it doesn't work, check the browser console for errors

## Alternative: Formspree (Even Simpler)
If EmailJS seems complicated, you can use Formspree:
1. Go to https://formspree.io/
2. Sign up and get a form endpoint
3. Update your form action to point to Formspree endpoint

Let me know if you need help with any of these steps!
