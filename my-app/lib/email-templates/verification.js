import { baseTemplate } from './base'

export const verificationEmailTemplate = (name, verifyUrl) => {
    const content = `
        <h1 style="color: #333; font-size: 24px; text-align: center; margin-bottom: 20px;">
            Welcome to ConsultAI${name ? `, ${name}` : ''}!
        </h1>
        
        <div style="margin: 30px 0; text-align: center;">
            <p style="margin-bottom: 20px; font-size: 16px;">
                Thank you for signing up. To start using our services, please verify your email address by clicking the button below:
            </p>
            
            <a href="${verifyUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                Verify Email Address
            </a>

            <p style="margin-top: 20px; font-size: 14px; color: #666;">
                This link will expire in 24 hours.
            </p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                <p style="margin: 0; font-size: 14px; color: #666;">
                    If the button above doesn't work, you can also copy and paste this link into your browser:
                </p>
                <p style="margin: 10px 0; word-break: break-all; font-size: 14px; color: #0284c7;">
                    ${verifyUrl}
                </p>
            </div>
        </div>
    `
    return baseTemplate(content)
}
