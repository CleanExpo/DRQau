import { baseTemplate } from './base'

export const welcomeTemplate = (name) => {
    const content = `
        <h1 style="color: #333; font-size: 24px; text-align: center; margin-bottom: 20px;">
            Welcome to ConsultAI${name ? `, ${name}` : ''}!
        </h1>
        
        <div style="margin: 30px 0;">
            <p style="margin-bottom: 20px; font-size: 16px;">
                Thank you for verifying your email address. Your account is now fully activated and you can start using all our features.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 30px 0;">
                <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">
                    Here's what you can do next:
                </h2>
                
                <ul style="padding-left: 20px; margin: 0;">
                    <li style="margin-bottom: 10px;">Complete your profile information</li>
                    <li style="margin-bottom: 10px;">Schedule your first consultation</li>
                    <li style="margin-bottom: 10px;">Explore our AI-powered features</li>
                    <li style="margin-bottom: 10px;">Set up your preferences</li>
                </ul>
            </div>
            
            <p style="margin-top: 30px; font-size: 16px;">
                If you need any assistance, our support team is always here to help.
            </p>
        </div>
    `
    return baseTemplate(content)
}
