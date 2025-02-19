import { baseTemplate } from '../base'

export const appointmentConfirmationTemplate = (name, appointment) => {
    const formattedDate = new Date(appointment.datetime).toLocaleString('en-US', {
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
                Appointment Confirmed
            </h1>
            
            <div style="background-color: #f0f9ff; border: 1px solid #0284c7; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: left;">
                <div style="margin-bottom: 15px;">
                    <strong style="color: #333; display: block; margin-bottom: 5px;">Date & Time:</strong>
                    <span style="color: #0284c7; font-size: 18px;">${formattedDate}</span>
                </div>
                
                ${appointment.location ? `
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #333; display: block; margin-bottom: 5px;">Location:</strong>
                        <span style="color: #666;">${appointment.location}</span>
                    </div>
                ` : ''}
                
                ${appointment.notes ? `
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #333; display: block; margin-bottom: 5px;">Additional Notes:</strong>
                        <span style="color: #666;">${appointment.notes}</span>
                    </div>
                ` : ''}
            </div>

            <div style="margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/calendar/add?id=${appointment.id}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">
                    Add to Calendar
                </a>
                <a href="${process.env.NEXTAUTH_URL}/appointments/${appointment.id}" 
                   style="display: inline-block; padding: 12px 24px; border: 1px solid #0284c7; color: #0284c7; text-decoration: none; border-radius: 5px;">
                    View Details
                </a>
            </div>

            <div style="margin-top: 20px; padding: 20px; background-color: #f8f9fa; border-radius: 5px; text-align: left;">
                <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Important Information:</h3>
                <ul style="color: #666; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Please arrive 5 minutes before your scheduled time</li>
                    <li style="margin-bottom: 8px;">Bring any relevant documentation</li>
                    <li style="margin-bottom: 8px;">If you need to reschedule, please do so at least 24 hours in advance</li>
                </ul>
            </div>
        </div>
    `
    return baseTemplate(content)
}
