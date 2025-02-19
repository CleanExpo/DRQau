import { baseTemplate } from '../base'

export const consultationReminderTemplate = (name, consultationDetails) => {
    const formattedDate = new Date(consultationDetails.datetime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    const content = `
        <div style="text-align: center; padding: 20px;">
            <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">
                Upcoming Consultation Reminder
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: left;">
                <h2 style="color: #0284c7; font-size: 20px; margin-bottom: 15px;">
                    Consultation Details
                </h2>
                
                <div style="margin-bottom: 15px;">
                    <strong style="color: #333;">Date & Time:</strong>
                    <div style="color: #666; margin-top: 5px;">${formattedDate}</div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <strong style="color: #333;">Topic:</strong>
                    <div style="color: #666; margin-top: 5px;">${consultationDetails.title}</div>
                </div>
                
                ${consultationDetails.description ? `
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #333;">Description:</strong>
                        <div style="color: #666; margin-top: 5px;">${consultationDetails.description}</div>
                    </div>
                ` : ''}
            </div>

            <div style="margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/consultations/${consultationDetails.id}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
                    View Consultation Details
                </a>
            </div>

            <div style="margin-top: 20px; padding: 20px; background-color: #f0f9ff; border-radius: 5px; text-align: left;">
                <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Preparation Tips:</h3>
                <ul style="color: #666; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Review any relevant documents or notes</li>
                    <li style="margin-bottom: 8px;">Test your audio and video if it's a virtual consultation</li>
                    <li style="margin-bottom: 8px;">Prepare any questions you'd like to discuss</li>
                    <li style="margin-bottom: 8px;">Ensure you have a stable internet connection</li>
                </ul>
            </div>
        </div>
    `
    return baseTemplate(content)
}
