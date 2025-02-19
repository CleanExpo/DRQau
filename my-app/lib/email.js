import nodemailer from "nodemailer"
import { verificationEmailTemplate } from "./email-templates/verification"
import { passwordResetTemplate } from "./email-templates/reset-password"
import { welcomeTemplate } from "./email-templates/welcome"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendVerificationEmail(to, verifyUrl, name = "") {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Verify your email address - ConsultAI",
    html: verificationEmailTemplate(name, verifyUrl)
  }

  await transporter.sendMail(mailOptions)
}

export async function sendResetEmail(to, resetUrl, name = "") {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Reset your password - ConsultAI",
    html: passwordResetTemplate(name, resetUrl)
  }

  await transporter.sendMail(mailOptions)
}

export async function sendWelcomeEmail(to, name = "") {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Welcome to ConsultAI!",
    html: welcomeTemplate(name)
  }

  await transporter.sendMail(mailOptions)
}

export async function sendOnboardingEmail(to, name, step = 'welcome') {
  await sendEmail(
    to,
    `${step === 'welcome' ? 'Getting Started' : 'Complete Your Profile'} - ConsultAI`,
    onboardingSequenceTemplate(name, step)
  )
}

export async function sendBillingEmail(to, name, billDetails) {
  await sendEmail(
    to,
    `Invoice #${billDetails.invoiceNumber} - ConsultAI`,
    billingTemplate(name, billDetails)
  )
}

export async function sendSubscriptionEmail(to, name, subscriptionDetails) {
  await sendEmail(
    to,
    `Subscription ${subscriptionDetails.status} - ConsultAI`,
    subscriptionTemplate(name, subscriptionDetails)
  )
}

export async function sendReportEmail(to, name, reportData) {
  await sendEmail(
    to,
    `${reportData.title} - ConsultAI`,
    reportTemplate(name, reportData)
  )
}
import emailAnalytics from './utils/analytics'

export async function sendEmail(to, subject, html, userId) {
    const emailId = emailAnalytics.generateEmailId()
    const trackedHtml = emailAnalytics.addTracking(html, emailId, userId)

    // Your email sending logic here
    console.log(`Sending tracked email ${emailId} to ${to}`)

    return {
        emailId,
        status: 'sent'
    }
}

// Update existing send functions to include analytics
export async function sendEventEmail(to, name, eventDetails, options = {}) {
    const {
        type = 'invitation',
        industry = 'default',
        userData = {}
    } = options

    let template = eventTemplate[type](name, eventDetails)
    
    if (industry !== 'default') {
        template = getIndustryVariant(industry, template)
        template = personalize(template, userData)
    }

    return await sendEmail(
        to,
        `${eventDetails.title} - ConsultAI`,
        template,
        userData.id
    )
}

// Add analytics reporting function
export async function getEmailAnalytics(emailId) {
    return await emailAnalytics.getEmailStats(emailId)
}
