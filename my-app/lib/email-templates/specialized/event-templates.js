import { baseTemplate } from '../base'

export const eventTemplate = (name, eventDetails, variant = 'invitation') => {
    const templates = {
        invitation: {
            title: "You're Invited!",
            content: `
                <div style="text-align: center; padding: 20px;">
                    <h1 style="color: #0284c7; margin-bottom: 20px;">${eventDetails.title}</h1>
                    
                    <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: left;">
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #333;">Date & Time:</strong>
                            <div style="color: #666;">${new Date(eventDetails.datetime).toLocaleString()}</div>
                        </div>
                        
                        ${eventDetails.location ? `
                            <div style="margin-bottom: 15px;">
                                <strong style="color: #333;">Location:</strong>
                                <div style="color: #666;">${eventDetails.location}</div>
                            </div>
                        ` : ''}
                        
                        ${eventDetails.description ? `
                            <div style="margin-bottom: 15px;">
                                <strong style="color: #333;">Description:</strong>
                                <div style="color: #666;">${eventDetails.description}</div>
                            </div>
                        ` : ''}
                    </div>

                    <div style="margin: 30px 0;">
                        <a href="${eventDetails.rsvpUrl}" 
                           style="display: inline-block; padding: 12px 24px; background: #0284c7; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">
                            RSVP Now
                        </a>
                        <a href="${eventDetails.calendarUrl}" 
                           style="display: inline-block; padding: 12px 24px; border: 1px solid #0284c7; color: #0284c7; text-decoration: none; border-radius: 5px;">
                            Add to Calendar
                        </a>
                    </div>
                </div>
            `
        },
        reminder: {
            title: "Event Reminder",
            content: `
                <div style="padding: 20px;">
                    <h1 style="color: #0284c7; margin-bottom: 20px;">Your Event is Coming Up!</h1>
                    <!-- Similar structure to invitation but with reminder-specific content -->
                </div>
            `
        },
        followup: {
            title: "Thank You for Attending",
            content: `
                <div style="padding: 20px;">
                    <h1 style="color: #0284c7; margin-bottom: 20px;">Thank You for Participating</h1>
                    <!-- Follow-up specific content -->
                </div>
            `
        }
    }

    const selectedTemplate = templates[variant] || templates.invitation
    return baseTemplate(selectedTemplate.content)
}

// Industry-specific variants
export const getIndustryEventTemplate = (industry) => {
    const industryStyles = {
        healthcare: {
            primaryColor: '#4CAF50',
            secondaryColor: '#E8F5E9',
            icons: {
                calendar: '🏥',
                location: '🗺️',
                description: '📋'
            }
        },
        legal: {
            primaryColor: '#3F51B5',
            secondaryColor: '#E8EAF6',
            icons: {
                calendar: '⚖️',
                location: '🏛️',
                description: '📜'
            }
        },
        technology: {
            primaryColor: '#2196F3',
            secondaryColor: '#E3F2FD',
            icons: {
                calendar: '💻',
                location: '🏢',
                description: '🔧'
            }
        }
        // Add more industry styles
    }

    return (name, eventDetails, variant = 'invitation') => {
        const style = industryStyles[industry] || industryStyles.default
        // Modify template with industry-specific styling
        // Return customized template
    }
}
