export class EmailPersonalization {
    constructor(userData) {
        this.userData = userData
        this.industry = userData.industry || "default"
        this.preferences = userData.preferences || {}
        this.history = userData.history || {}
    }

    getPersonalizedGreeting() {
        const hour = new Date().getHours()
        const timeOfDay = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"
        return `Good ${timeOfDay}, ${this.userData.name}`
    }

    getIndustrySpecificContent() {
        const industryContent = {
            healthcare: {
                terminology: {
                    consultation: "patient session",
                    meeting: "appointment",
                    review: "follow-up"
                },
                recommendations: [
                    "HIPAA compliance tips",
                    "Patient care best practices",
                    "Healthcare regulations updates"
                ]
            },
            legal: {
                terminology: {
                    consultation: "client meeting",
                    meeting: "briefing",
                    review: "case review"
                },
                recommendations: [
                    "Legal compliance updates",
                    "Case management tips",
                    "Legal research tools"
                ]
            }
        }

        return industryContent[this.industry] || {}
    }

    customizeTemplate(template) {
        const industryContent = this.getIndustrySpecificContent()
        
        // Replace generic terms with industry-specific terminology
        Object.entries(industryContent.terminology || {}).forEach(([generic, specific]) => {
            template = template.replace(new RegExp(generic, "gi"), specific)
        })

        return template
    }

    getPreferredSendTime() {
        return this.preferences.preferredTime || "09:00"
    }

    shouldSendEmail(emailType) {
        return this.preferences.emailPreferences?.[emailType] !== false
    }
}

export const personalize = (template, userData) => {
    const personalizer = new EmailPersonalization(userData)
    return personalizer.customizeTemplate(template)
}
