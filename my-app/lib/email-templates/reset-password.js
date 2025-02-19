import { baseTemplate } from './base'

export const passwordResetTemplate = (name, resetUrl) => {
    const content = `
        <h1 style="color: #333; font-size: 24px; text-align: center; margin-bottom: 20px;">
            Reset Your Password
        </h1>
        
        <div style="margin: 30px 0; text-align: center;">
            <p style="margin-bottom: 20px; font-size: 16px;">
                Hello${name ? ` ${name}` : ''},<br>
                We received a request to reset your password. Click the button below to create a new password:
            </p>
            
            <a href="${resetUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                Reset Password
            </a>

            <p style="margin-top: 20px; font-size: 14px; color: #666;">
                This link will expire in 1 hour. If you did not request a password reset, please ignore this email.
            </p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                <p style="margin: 0; font-size: 14px; color: #666;">
                    If the button above doesn't work, you can also copy and paste this link into your browser:
                </p>
                <p style="margin: 10px 0; word-break: break-all; font-size: 14px; color: #0284c7;">
                    ${resetUrl}
                </p>
            </div>
        </div>
    `
    return baseTemplate(content)
}
